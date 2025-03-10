(*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *)

open! IStd
module F = Format
module L = Logging
open PulseBasicInterface
open PulseDomainInterface

(** {2 machinery to apply a pre/post pair corresponding to a function's summary in a function call
    to the current state}

    *Unsafe* Stack, etc. modules used here are safe when used on the callee's summary (because
    values in summaries are all canonical) *)

module AddressSet = AbstractValue.Set
module AddressMap = AbstractValue.Map

(** stuff we carry around when computing the result of applying one pre/post pair *)
type call_state =
  { astate: AbductiveDomain.t  (** caller's abstract state computed so far *)
  ; subst: (AbstractValue.t * ValueHistory.t) AddressMap.t
        (** translation from callee addresses to caller addresses and their caller histories *)
  ; rev_subst: AbstractValue.t AddressMap.t
        (** the inverse translation from [subst] from caller addresses to callee addresses *)
  ; visited: AddressSet.t
        (** set of callee addresses that have been visited already

            NOTE: this is not always equal to the domain of [rev_subst]: when applying the post we
            visit each subgraph from each formal independently so we reset [visited] between the
            visit of each formal *) }

let pp_call_state fmt {astate; subst; rev_subst; visited} =
  F.fprintf fmt
    "@[<v>{ astate=@[<hv2>%a@];@,\
    \ subst=@[<hv2>%a@];@,\
    \ rev_subst=@[<hv2>%a@];@,\
    \ visited=@[<hv2>%a@]@,\
    \ }@]" AbductiveDomain.pp astate
    (AddressMap.pp ~pp_value:(fun fmt (addr, _) -> AbstractValue.pp fmt addr))
    subst
    (AddressMap.pp ~pp_value:AbstractValue.pp)
    rev_subst AddressSet.pp visited


let pp_call_state = Pp.html_collapsible_block ~name:"Show/hide the call state" pp_call_state

type contradiction =
  | Aliasing of
      { addr_caller: AbstractValue.t
      ; addr_callee: AbstractValue.t
      ; addr_callee': AbstractValue.t
      ; call_state: call_state }
      (** raised when the precondition and the current state disagree on the aliasing, i.e. some
          addresses [callee_addr] and [callee_addr'] that are distinct in the pre are aliased to a
          single address [caller_addr] in the caller's current state. Typically raised when calling
          [foo(z,z)] where the spec for [foo(x,y)] says that [x] and [y] are disjoint. *)
  | DynamicTypeNeeded of AbstractValue.t Specialization.HeapPath.Map.t
  | CapturedFormalActualLength of
      { captured_formals: (Var.t * Typ.t) list
      ; captured_actuals: ((AbstractValue.t * ValueHistory.t) * Typ.t) list }
  | FormalActualLength of
      {formals: (Var.t * Typ.t) list; actuals: ((AbstractValue.t * ValueHistory.t) * Typ.t) list}
  | PathCondition

let pp_contradiction fmt = function
  | Aliasing {addr_caller; addr_callee; addr_callee'; call_state} ->
      F.fprintf fmt
        "address %a in caller already bound to %a, not %a@\nnote: current call state was %a"
        AbstractValue.pp addr_caller AbstractValue.pp addr_callee' AbstractValue.pp addr_callee
        pp_call_state call_state
  | DynamicTypeNeeded heap_paths ->
      F.fprintf fmt "Heap paths %a need to give their dynamic types"
        (Specialization.HeapPath.Map.pp ~pp_value:AbstractValue.pp)
        heap_paths
  | CapturedFormalActualLength {captured_formals; captured_actuals} ->
      F.fprintf fmt "captured formals have length %d but captured actuals have length %d"
        (List.length captured_formals) (List.length captured_actuals)
  | FormalActualLength {formals; actuals} ->
      F.fprintf fmt "formals have length %d but actuals have length %d" (List.length formals)
        (List.length actuals)
  | PathCondition ->
      F.pp_print_string fmt "path condition evaluates to false"


let log_contradiction = function
  | Aliasing _ ->
      Stats.incr_pulse_aliasing_contradictions ()
  | DynamicTypeNeeded _ ->
      ()
  | FormalActualLength _ ->
      Stats.incr_pulse_args_length_contradictions ()
  | CapturedFormalActualLength _ ->
      Stats.incr_pulse_captured_vars_length_contradictions ()
  | PathCondition ->
      ()


let is_aliasing_contradiction = function
  | Aliasing _ ->
      true
  | DynamicTypeNeeded _ | CapturedFormalActualLength _ | FormalActualLength _ | PathCondition ->
      false


let is_dynamic_type_needed_contradiction = function
  | DynamicTypeNeeded heap_paths ->
      Some heap_paths
  | Aliasing _ | CapturedFormalActualLength _ | FormalActualLength _ | PathCondition ->
      None


exception Contradiction of contradiction

let raise_if_unsat contradiction = function
  | Sat x ->
      x
  | Unsat ->
      raise_notrace (Contradiction contradiction)


let fold_globals_of_callee_stack {PathContext.timestamp} call_loc stack call_state ~f =
  (* safe to use [UnsafeStack] because these stacks come from a summary *)
  PulseResult.container_fold ~fold:(IContainer.fold_of_pervasives_map_fold UnsafeStack.fold)
    stack ~init:call_state ~f:(fun call_state (var, stack_value) ->
      match var with
      | Var.ProgramVar pvar when Pvar.is_global pvar ->
          let call_state, addr_hist_caller =
            let astate, var_value =
              Stack.eval
                (ValueHistory.singleton (VariableAccessed (pvar, call_loc, timestamp)))
                var call_state.astate
            in
            if phys_equal astate call_state.astate then (call_state, var_value)
            else ({call_state with astate}, var_value)
          in
          f pvar ~stack_value ~addr_hist_caller call_state
      | _ ->
          Ok call_state )


let and_aliasing_arith ~addr_callee ~addr_caller0 call_state =
  match AddressMap.find_opt addr_callee call_state.subst with
  | Some (addr_caller', _) when not (AbstractValue.equal addr_caller' addr_caller0) ->
      (* NOTE: discarding new equalities here instead of passing them to
         {!AbductiveDomain.incorporate_new_eqs} because it would be too slow to do each time we
         visit a new address. We should re-normalize at the end of the call instead (TODO). *)
      let path_condition, _new_eqs =
        Formula.and_equal_vars addr_caller0 addr_caller'
          call_state.astate.AbductiveDomain.path_condition
        |> raise_if_unsat PathCondition
      in
      {call_state with astate= AbductiveDomain.set_path_condition path_condition call_state.astate}
  | _ ->
      call_state


let visit call_state ~pre ~addr_callee ~addr_hist_caller =
  let addr_caller = fst addr_hist_caller in
  let call_state =
    match AddressMap.find_opt addr_caller call_state.rev_subst with
    | Some addr_callee' when not (AbstractValue.equal addr_callee addr_callee') ->
        if
          (* [addr_caller] corresponds to several values in the callee, see if that's a problem for
             applying the pre-condition, i.e. if both values are addresses in the callee's heap,
             which means they must be disjoint. If so, raise a contradiction, but if not then
             continue as it just means that the callee doesn't care about the value of these
             variables, but record that they are equal. *)
          UnsafeMemory.mem addr_callee pre.BaseDomain.heap
          && UnsafeMemory.mem addr_callee' pre.BaseDomain.heap
        then
          raise_notrace
            (Contradiction (Aliasing {addr_caller; addr_callee; addr_callee'; call_state}))
        else and_aliasing_arith ~addr_callee:addr_callee' ~addr_caller0:addr_caller call_state
    | _ ->
        call_state
  in
  let call_state = and_aliasing_arith ~addr_callee ~addr_caller0:addr_caller call_state in
  if AddressSet.mem addr_callee call_state.visited then (`AlreadyVisited, call_state)
  else
    ( `NotAlreadyVisited
    , { call_state with
        visited= AddressSet.add addr_callee call_state.visited
      ; subst= AddressMap.add addr_callee addr_hist_caller call_state.subst
      ; rev_subst= AddressMap.add addr_caller addr_callee call_state.rev_subst } )


(** HACK: we don't need to update the [rev_subst] of a call state when generating a fresh value for
    the caller because there's no chance that value appears anywhere else in the caller state, hence
    we cannot possibly get clashes about that caller value, which is the only thing [rev_subst] is
    used for. This is why this function is allowed to take only [subst] as argument and not a full
    call state. *)
let subst_find_or_new subst addr_callee ~default_hist_caller =
  match AddressMap.find_opt addr_callee subst with
  | None ->
      (* map restricted (≥0) values to restricted values to preserve their semantics *)
      let addr_caller = AbstractValue.mk_fresh_same_kind addr_callee in
      L.d_printfln "new subst %a <-> %a (fresh)" AbstractValue.pp addr_callee AbstractValue.pp
        addr_caller ;
      let addr_hist_fresh = (addr_caller, default_hist_caller) in
      (AddressMap.add addr_callee addr_hist_fresh subst, addr_hist_fresh)
  | Some addr_hist_caller ->
      (subst, addr_hist_caller)


let translate_access_to_caller subst (access_callee : Access.t) : _ * Access.t =
  match access_callee with
  | ArrayAccess (typ, val_callee) ->
      let subst, (val_caller, _) =
        subst_find_or_new subst val_callee ~default_hist_caller:ValueHistory.epoch
      in
      (subst, ArrayAccess (typ, val_caller))
  | FieldAccess _ | TakeAddress | Dereference ->
      (subst, access_callee)


(* {3 reading the pre from the current state} *)

(** Materialize the (abstract memory) subgraph of [pre] reachable from [addr_pre] in
    [call_state.astate] starting from address [addr_caller]. Report an error if some invalid
    addresses are traversed in the process. *)
let rec materialize_pre_from_address ~pre ~addr_pre ~addr_hist_caller call_state =
  match visit call_state ~pre ~addr_callee:addr_pre ~addr_hist_caller with
  | `AlreadyVisited, call_state ->
      Ok call_state
  | `NotAlreadyVisited, call_state -> (
      L.d_printfln "visiting from address %a <-> %a" AbstractValue.pp addr_pre AbstractValue.pp
        (fst addr_hist_caller) ;
      match UnsafeMemory.find_opt addr_pre pre.BaseDomain.heap with
      | None ->
          Ok call_state
      | Some edges_pre ->
          PulseResult.container_fold ~fold:UnsafeMemory.Edges.fold ~init:call_state edges_pre
            ~f:(fun call_state (access_callee, (addr_pre_dest, _)) ->
              (* HACK: we should probably visit the value in the (array) access too, but since it's
                 a value normally it shouldn't appear in the heap anyway so there should be nothing
                 to visit. *)
              let subst, access_caller =
                translate_access_to_caller call_state.subst access_callee
              in
              let astate, addr_hist_dest_caller =
                Memory.eval_edge addr_hist_caller access_caller call_state.astate
              in
              let call_state = {call_state with astate; subst} in
              materialize_pre_from_address ~pre ~addr_pre:addr_pre_dest
                ~addr_hist_caller:addr_hist_dest_caller call_state ) )


let callee_deref_non_c_struct addr typ astate =
  match typ.Typ.desc with
  | Tstruct _ ->
      Some addr
  | _ ->
      UnsafeMemory.find_edge_opt addr Dereference astate |> Option.map ~f:fst


(** materialize subgraph of [pre] rooted at the address represented by a [formal] parameter that has
    been instantiated with the corresponding [actual] into the current state [call_state.astate] *)
let materialize_pre_from_actual ~pre ~formal:(formal, typ) ~actual:(actual, _) call_state =
  L.d_printfln "Materializing PRE from [%a <- %a]" Var.pp formal AbstractValue.pp (fst actual) ;
  (let open IOption.Let_syntax in
   let* addr_formal_pre, _ = UnsafeStack.find_opt formal pre.BaseDomain.stack in
   let+ formal_pre = callee_deref_non_c_struct addr_formal_pre typ pre.BaseDomain.heap in
   materialize_pre_from_address ~pre ~addr_pre:formal_pre ~addr_hist_caller:actual call_state )
  |> function Some result -> result | None -> Ok call_state


let is_cell_read_only ~edges_pre_opt ~cell_post:(_, attrs_post) =
  match edges_pre_opt with None -> false | Some _ -> not (Attributes.is_modified attrs_post)


let materialize_pre_for_captured_vars ~pre ~captured_formals ~captured_actuals call_state =
  match
    PulseResult.list_fold2 captured_formals captured_actuals ~init:call_state
      ~f:(fun call_state formal actual ->
        materialize_pre_from_actual ~pre ~formal ~actual call_state )
  with
  | Unequal_lengths ->
      raise_notrace (Contradiction (CapturedFormalActualLength {captured_formals; captured_actuals}))
  | Ok result ->
      result


let materialize_pre_for_parameters ~pre ~formals ~actuals call_state =
  (* For each [(formal, actual)] pair, resolve them to addresses in their respective states then
     call [materialize_pre_from] on them.  Give up if calling the function introduces aliasing.
  *)
  match
    PulseResult.list_fold2 formals actuals ~init:call_state ~f:(fun call_state formal actual ->
        materialize_pre_from_actual ~pre ~formal ~actual call_state )
  with
  | Unequal_lengths ->
      raise_notrace (Contradiction (FormalActualLength {formals; actuals}))
  | Ok result ->
      result


let materialize_pre_for_globals path call_location ~pre call_state =
  fold_globals_of_callee_stack path call_location pre.BaseDomain.stack call_state
    ~f:(fun _var ~stack_value:(addr_pre, _) ~addr_hist_caller call_state ->
      materialize_pre_from_address ~pre ~addr_pre ~addr_hist_caller call_state )


let conjoin_callee_arith pre_or_post callee_path_condition call_state =
  let open PulseResult.Let_syntax in
  L.d_printfln "applying callee path condition: (%a)[%a]" Formula.pp callee_path_condition
    (AddressMap.pp ~pp_value:(fun fmt (addr, _) -> AbstractValue.pp fmt addr))
    call_state.subst ;
  let subst, path_condition, new_eqs =
    match pre_or_post with
    | `Pre ->
        Formula.and_callee_pre call_state.subst call_state.astate.path_condition
          ~callee:callee_path_condition
        |> raise_if_unsat PathCondition
    | `Post ->
        Formula.and_callee_post call_state.subst call_state.astate.path_condition
          ~callee:callee_path_condition
        |> raise_if_unsat PathCondition
  in
  let astate = AbductiveDomain.set_path_condition path_condition call_state.astate in
  let+ astate =
    AbductiveDomain.incorporate_new_eqs new_eqs astate
    |> raise_if_unsat PathCondition |> AccessResult.of_abductive_result
  in
  {call_state with astate; subst}


let caller_attrs_of_callee_attrs timestamp callee_proc_name call_location caller_history call_state
    callee_attrs =
  let subst_ref = ref call_state.subst in
  let f_subst v =
    let subst, (v', _hist) =
      subst_find_or_new !subst_ref v ~default_hist_caller:ValueHistory.epoch
    in
    subst_ref := subst ;
    v'
  in
  let attrs =
    Attributes.add_call_and_subst f_subst timestamp callee_proc_name call_location caller_history
      callee_attrs
  in
  ({call_state with subst= !subst_ref}, attrs)


let apply_arithmetic_constraints pre_or_post {PathContext.timestamp} callee_proc_name call_location
    callee_summary call_state =
  let open PulseResult.Let_syntax in
  let one_address_sat callee_attrs (addr_caller, caller_history) call_state =
    let call_state, attrs_caller =
      caller_attrs_of_callee_attrs timestamp callee_proc_name call_location caller_history
        call_state callee_attrs
    in
    let astate = AddressAttributes.abduce_and_add addr_caller attrs_caller call_state.astate in
    if phys_equal astate call_state.astate then call_state else {call_state with astate}
  in
  let+ call_state =
    conjoin_callee_arith pre_or_post
      (AbductiveDomain.Summary.get_path_condition callee_summary)
      call_state
  in
  AddressMap.fold
    (fun addr_callee addr_hist_caller call_state ->
      match
        UnsafeAttributes.find_opt addr_callee (AbductiveDomain.Summary.get_pre callee_summary).attrs
      with
      | None ->
          call_state
      | Some callee_attrs ->
          one_address_sat callee_attrs addr_hist_caller call_state )
    call_state.subst call_state


let materialize_pre path callee_proc_name call_location callee_summary ~captured_formals
    ~captured_actuals ~formals ~actuals call_state =
  PerfEvent.(log (fun logger -> log_begin_event logger ~name:"pulse call pre" ())) ;
  let r =
    let callee_precondition = AbductiveDomain.Summary.get_pre callee_summary in
    let open PulseResult.Let_syntax in
    (* first make as large a mapping as we can between callee values and caller values... *)
    materialize_pre_for_parameters ~pre:callee_precondition ~formals ~actuals call_state
    >>= materialize_pre_for_captured_vars ~pre:callee_precondition ~captured_formals
          ~captured_actuals
    >>= materialize_pre_for_globals path call_location ~pre:callee_precondition
    >>= (* ...then relational arithmetic constraints in the callee's attributes will make sense in
           terms of the caller's values *)
    apply_arithmetic_constraints `Pre path callee_proc_name call_location callee_summary
  in
  PerfEvent.(log (fun logger -> log_end_event logger ())) ;
  r


(* {3 applying the post to the current state} *)

let call_state_subst_find_or_new call_state addr_callee ~default_hist_caller =
  let new_subst, addr_hist_caller =
    subst_find_or_new call_state.subst addr_callee ~default_hist_caller
  in
  if phys_equal new_subst call_state.subst then (call_state, addr_hist_caller)
  else ({call_state with subst= new_subst}, addr_hist_caller)


let delete_edges_in_callee_pre_from_caller ~edges_pre_opt addr_caller call_state =
  match
    UnsafeMemory.find_opt addr_caller (call_state.astate.AbductiveDomain.post :> BaseDomain.t).heap
  with
  | None ->
      (call_state.subst, BaseMemory.Edges.empty)
  | Some old_post_edges -> (
    match edges_pre_opt with
    | None ->
        (call_state.subst, old_post_edges)
    | Some edges_pre ->
        let subst, translated_accesses_pre =
          UnsafeMemory.Edges.fold ~init:(call_state.subst, AccessSet.empty) edges_pre
            ~f:(fun (subst, accesses) (access_callee, _) ->
              let subst, access = translate_access_to_caller subst access_callee in
              (subst, AccessSet.add access accesses) )
        in
        let post_edges =
          (* abuse of [UnsafeMemory.Edges]; it's fine because [post_edges] is used to *write* to
             the current state. Edges are allowed to contain non-normalized values (though it
             shouldn't even be the case here!) since we'll normalize them on the fly on read. *)
          UnsafeMemory.Edges.filter old_post_edges ~f:(fun (access_caller, _) ->
              (* delete edge if some edge for the same access exists in the pre *)
              not (AccessSet.mem access_caller translated_accesses_pre) )
        in
        (subst, post_edges) )


let record_post_cell ({PathContext.timestamp} as path) callee_proc_name call_loc ~edges_pre_opt
    ~cell_callee_post:(edges_callee_post, attrs_callee_post) (addr_caller, hist_caller) call_state =
  let call_state =
    let call_state, attrs_post_caller =
      caller_attrs_of_callee_attrs timestamp callee_proc_name call_loc hist_caller call_state
        attrs_callee_post
    in
    let astate =
      if Attributes.is_java_resource_released attrs_post_caller then
        PulseOperations.java_resource_release ~recursive:true addr_caller call_state.astate
      else if Attributes.is_csharp_resource_released attrs_post_caller then
        PulseOperations.csharp_resource_release ~recursive:true addr_caller call_state.astate
      else call_state.astate
    in
    let astate = AddressAttributes.abduce_and_add addr_caller attrs_post_caller astate in
    {call_state with astate}
  in
  let subst, translated_post_edges =
    UnsafeMemory.Edges.fold ~init:(call_state.subst, BaseMemory.Edges.empty) edges_callee_post
      ~f:(fun (subst, translated_edges) (access_callee, (addr_callee, trace_post)) ->
        let subst, (addr_curr, hist_curr) =
          subst_find_or_new subst addr_callee ~default_hist_caller:hist_caller
        in
        let subst, access = translate_access_to_caller subst access_callee in
        let translated_edges =
          UnsafeMemory.Edges.add access
            ( addr_curr
            , ValueHistory.sequence ~context:path.conditions
                (Call {f= Call callee_proc_name; location= call_loc; in_call= trace_post; timestamp})
                hist_curr )
            translated_edges
        in
        (subst, translated_edges) )
  in
  let call_state = {call_state with subst} in
  let subst, post_edges_minus_pre =
    delete_edges_in_callee_pre_from_caller ~edges_pre_opt addr_caller call_state
  in
  let edges_post_caller =
    BaseMemory.Edges.union_left_biased translated_post_edges post_edges_minus_pre
  in
  { call_state with
    subst
  ; astate= AbductiveDomain.set_post_edges addr_caller edges_post_caller call_state.astate }


let rec record_post_for_address path callee_proc_name call_loc callee_summary ~addr_callee
    ~addr_hist_caller call_state =
  L.d_printf "visiting %a<->%a.. " AbstractValue.pp addr_callee AbstractValue.pp
    (fst addr_hist_caller) ;
  match
    visit call_state
      ~pre:(AbductiveDomain.Summary.get_pre callee_summary)
      ~addr_callee ~addr_hist_caller
  with
  | `AlreadyVisited, call_state ->
      call_state
  | `NotAlreadyVisited, call_state -> (
    match
      BaseDomain.find_cell_opt addr_callee (AbductiveDomain.Summary.get_post callee_summary)
    with
    | None ->
        call_state
    | Some ((edges_post, attrs_post) as cell_callee_post) ->
        let edges_pre_opt =
          UnsafeMemory.find_opt addr_callee
            (AbductiveDomain.Summary.get_pre callee_summary).BaseDomain.heap
        in
        let call_state_after_post =
          if is_cell_read_only ~edges_pre_opt ~cell_post:cell_callee_post then (
            L.d_printfln "cell at %a is read-only, not modifying@\n" AbstractValue.pp addr_callee ;
            call_state )
          else
            record_post_cell path callee_proc_name call_loc ~edges_pre_opt addr_hist_caller
              ~cell_callee_post:(edges_post, attrs_post) call_state
        in
        UnsafeMemory.Edges.fold ~init:call_state_after_post edges_post
          ~f:(fun call_state (_access, (addr_callee_dest, _)) ->
            let call_state, addr_hist_curr_dest =
              call_state_subst_find_or_new call_state addr_callee_dest
                ~default_hist_caller:(snd addr_hist_caller)
            in
            record_post_for_address path callee_proc_name call_loc callee_summary
              ~addr_callee:addr_callee_dest ~addr_hist_caller:addr_hist_curr_dest call_state ) )


let record_post_for_actual path callee_proc_name call_loc callee_summary ~formal:(formal, typ)
    ~actual:(actual, _) call_state =
  L.d_printfln_escaped "Recording POST from [%a] <-> %a" Var.pp formal AbstractValue.pp (fst actual) ;
  match
    let open IOption.Let_syntax in
    let* addr_formal_pre, _ =
      UnsafeStack.find_opt formal (AbductiveDomain.Summary.get_pre callee_summary).BaseDomain.stack
    in
    let+ formal_pre =
      callee_deref_non_c_struct addr_formal_pre typ
        (AbductiveDomain.Summary.get_pre callee_summary).BaseDomain.heap
    in
    record_post_for_address path callee_proc_name call_loc callee_summary ~addr_callee:formal_pre
      ~addr_hist_caller:actual call_state
  with
  | Some call_state ->
      call_state
  | None ->
      call_state


let record_post_for_return ({PathContext.timestamp} as path) callee_proc_name call_loc
    (callee_summary : AbductiveDomain.Summary.t) call_state =
  let return_var = Var.of_pvar (Pvar.get_ret_pvar callee_proc_name) in
  match Stack.find_opt return_var (callee_summary :> AbductiveDomain.t) with
  | None ->
      (call_state, None)
  | Some (addr_return, _) -> (
    match
      UnsafeMemory.find_edge_opt addr_return Dereference
        (AbductiveDomain.Summary.get_post callee_summary).BaseDomain.heap
    with
    | None ->
        (call_state, None)
    | Some (return_callee, return_callee_hist) ->
        let return_caller, return_caller_hist =
          match AddressMap.find_opt return_callee call_state.subst with
          | Some return_caller_hist ->
              return_caller_hist
          | None ->
              (AbstractValue.mk_fresh_same_kind return_callee, ValueHistory.epoch)
        in
        L.d_printfln_escaped "Recording POST from [return] <-> %a" AbstractValue.pp return_caller ;
        let call_state =
          record_post_for_address path callee_proc_name call_loc callee_summary
            ~addr_callee:return_callee
            ~addr_hist_caller:(return_caller, return_caller_hist)
            call_state
        in
        (* need to add the call to the returned history too *)
        let return_caller_hist =
          ValueHistory.sequence ~context:path.conditions
            (Call
               {f= Call callee_proc_name; location= call_loc; in_call= return_callee_hist; timestamp}
            )
            return_caller_hist
        in
        (call_state, Some (return_caller, return_caller_hist)) )


let apply_post_for_remaining_pre path callee_proc_name call_location callee_summary call_state =
  (* Applies post to the rest of the values recorded in pre state. *)
  let pre = AbductiveDomain.Summary.get_pre callee_summary in
  let addresses = BaseDomain.reachable_addresses pre in
  AbstractValue.Set.fold
    (fun addr_callee call_state ->
      match AddressMap.find_opt addr_callee call_state.subst with
      | Some addr_hist_caller ->
          record_post_for_address path callee_proc_name call_location callee_summary ~addr_callee
            ~addr_hist_caller call_state
      | None ->
          call_state )
    addresses call_state


let apply_post_for_parameters path callee_proc_name call_location callee_summary ~formals ~actuals
    call_state =
  (* for each [(formal_i, actual_i)] pair, do [post_i = post union subst(graph reachable from
     formal_i in post)], deleting previous info when comparing pre and post shows a difference
     (TODO: record in the pre when a location is written to instead of just comparing values
     between pre and post since it's unreliable, eg replace value read in pre with same value in
     post but nuke other fields in the meantime? is that possible?). *)
  match
    List.fold2 formals actuals ~init:call_state ~f:(fun call_state formal actual ->
        record_post_for_actual path callee_proc_name call_location callee_summary ~formal ~actual
          call_state )
  with
  | Unequal_lengths ->
      (* should have been checked before by [materialize_pre] *)
      L.(die InternalError) "formals and actuals have different lengths"
  | Ok call_state ->
      call_state


let apply_post_for_captured_vars path callee_proc_name call_location callee_summary
    ~captured_formals ~captured_actuals call_state =
  match
    List.fold2 captured_formals captured_actuals ~init:call_state
      ~f:(fun call_state formal actual ->
        record_post_for_actual path callee_proc_name call_location callee_summary ~formal ~actual
          call_state )
  with
  | Unequal_lengths ->
      (* should have been checked before by [materialize_pre] *)
      L.(die InternalError) "captured formals and captured actuals have different lengths"
  | Ok result ->
      result


let apply_post_for_globals path callee_proc_name call_location callee_summary call_state =
  fold_globals_of_callee_stack path call_location
    (AbductiveDomain.Summary.get_pre callee_summary).BaseDomain.stack call_state
    ~f:(fun _var ~stack_value:(addr_callee, _) ~addr_hist_caller call_state ->
      Ok
        (record_post_for_address path callee_proc_name call_location callee_summary ~addr_callee
           ~addr_hist_caller call_state ) )
  |> (* always return [Ok _] above *) PulseResult.ok_exn


let record_post_remaining_attributes {PathContext.timestamp} callee_proc_name call_loc
    callee_summary call_state =
  BaseAddressAttributes.fold
    (fun addr_callee attrs call_state ->
      if AddressSet.mem (CanonValue.downcast addr_callee) call_state.visited then
        (* already recorded the attributes when we were walking the edges map *)
        call_state
      else
        match AddressMap.find_opt (CanonValue.downcast addr_callee) call_state.subst with
        | None ->
            (* callee address has no meaning for the caller *) call_state
        | Some (addr_caller, history) ->
            let call_state, attrs' =
              caller_attrs_of_callee_attrs timestamp callee_proc_name call_loc history call_state
                attrs
            in
            let astate = AddressAttributes.abduce_and_add addr_caller attrs' call_state.astate in
            {call_state with astate} )
    (AbductiveDomain.Summary.get_post callee_summary).attrs call_state


let record_skipped_calls callee_proc_name call_loc callee_summary call_state =
  let callee_skipped_calls =
    SkippedCalls.map
      (fun trace ->
        Trace.ViaCall
          {f= Call callee_proc_name; location= call_loc; history= ValueHistory.epoch; in_call= trace}
        )
      (AbductiveDomain.Summary.get_skipped_calls callee_summary)
  in
  let astate = AbductiveDomain.add_skipped_calls callee_skipped_calls call_state.astate in
  {call_state with astate}


let record_need_closure_specialization callee_summary call_state =
  if AbductiveDomain.Summary.need_closure_specialization callee_summary then
    {call_state with astate= AbductiveDomain.set_need_closure_specialization call_state.astate}
  else call_state


let apply_unknown_effects callee_summary call_state =
  let open IOption.Let_syntax in
  L.d_printfln "Applying unknown effects, call_state before = %a" pp_call_state call_state ;
  let is_modified_by_call addr_caller access =
    match AddressMap.find_opt addr_caller call_state.rev_subst with
    | None ->
        false
    | Some addr_callee ->
        let edges_callee_pre =
          UnsafeMemory.find_opt addr_callee (AbductiveDomain.Summary.get_pre callee_summary).heap
          |> Option.value ~default:BaseMemory.Edges.empty
        in
        let edges_callee_post =
          UnsafeMemory.find_opt addr_callee (AbductiveDomain.Summary.get_post callee_summary).heap
          |> Option.value ~default:BaseMemory.Edges.empty
        in
        let pre_value = UnsafeMemory.Edges.find_opt access edges_callee_pre >>| fst in
        let post_value = UnsafeMemory.Edges.find_opt access edges_callee_post >>| fst in
        (* havoc only fields that haven't been havoc'd already during the call *)
        not (Option.equal AbstractValue.equal post_value pre_value)
  in
  let astate =
    BaseAddressAttributes.fold
      (fun addr_callee attrs astate ->
        (let* _, havoc_hist = Attributes.get_unknown_effect attrs in
         let+ addr_caller, _ =
           AddressMap.find_opt (CanonValue.downcast addr_callee) call_state.subst
         in
         (* NOTE: could be optimized to remember the addresses already visited in case many
            addresses have the [UnknownEffect] attribute and share important parts of the memory
            graph (unlikely) *)
         L.d_printfln "applying unknown effects on %a@\n  @[<2>" AbstractValue.pp addr_caller ;
         let astate =
           AbductiveDomain.apply_unknown_effect havoc_hist addr_caller astate
             ~havoc_filter:(fun addr_caller access _ ->
               (* havoc only fields that haven't been havoc'd already during the call *)
               not (is_modified_by_call addr_caller access) )
         in
         L.d_printfln "@]" ;
         astate )
        |> Option.value ~default:astate )
      (AbductiveDomain.Summary.get_post callee_summary).attrs call_state.astate
  in
  {call_state with astate}


(* All substitutions from callee to caller should use the canonical representation
   of values and edges to ensure information is well connected between the two.
   This is necessary for arrays because they can have different accesses with
   different indices which are actually equal.
   To do so, we add equalities in the state's formula for eveything we know should
   be considered equal and get rid of the "non-canonical" representation of values
   to avoid future conflicts with the canonical values.

   e.g.
    We can have { v1 -> { [v2] -> v3; [v4] -> v5 }} with v2 = v4. In that case, we
    want to ensure that we always use v2 and v3 in the substitution rather than
    v4 and v5. Therefore, we need to add the v3 = v5 equality in the formula and
    ensure v5 will not conflict with v3 in the future.

   These cases appear because when we link the arguments in the caller with the
   parameters in the callee, we don't look into the array accesses to match the
   indices with known values and also because some equalities may not be known at
   the time we process an argument.
   e.g.
    when calling f(array, 0), we will only see that the second parameter is equal
    to 0 after we already processed the first one so if one of the indices in the
    given array is 0 and one in the parameter is equal to the second argument, we
    would only know it after processing all the arguments and therefore after
    having created values to represent the "new" index and value in the given array
*)
let canonicalize ~actuals call_state =
  let incorporate_eqs_on_array_cells actuals astate =
    let rec aux visited addrs astate replaced =
      (* We keep track of the values from the callee that we replaced with values
         from the caller to later remove their edges from the memory to avoid
         getting an [Unsat] in [PulseUnsafeMemory.subst_var] which happens when we
         [AbductiveDomain.incorporate_new_eqs] during the application of the post *)
      let post_heap = (astate.AbductiveDomain.post :> BaseDomain.t).heap in
      match addrs with
      | [] ->
          (astate, replaced)
      | addr :: addrs when AddressSet.mem addr visited ->
          aux visited addrs astate replaced
      | addr :: addrs -> (
          let visited = AddressSet.add addr visited in
          match UnsafeMemory.find_opt addr post_heap with
          | None ->
              aux visited addrs astate replaced
          | Some edges ->
              let merge_edges ~get_var_repr accessed accessed' astate =
                (* Given 2 addresses [accessed] and [accessed'], merge their canonicalized
                   edges and update the edges of accessed' with the result. In case an
                   edge belongs to both addresses, the one from [accessed'] is kept. *)
                match UnsafeMemory.find_opt accessed post_heap with
                | None ->
                    astate
                | Some edges ->
                    (* the callee value may know some edges that the caller is
                       not aware of. We want to add them *)
                    let edges' =
                      match UnsafeMemory.find_opt accessed' post_heap with
                      | None ->
                          UnsafeMemory.Edges.empty
                      | Some edges' ->
                          UnsafeMemory.Edges.canonicalize ~get_var_repr edges'
                    in
                    let edges = UnsafeMemory.Edges.canonicalize ~get_var_repr edges in
                    let merged_edges = UnsafeMemory.Edges.union_left_biased edges' edges in
                    AbductiveDomain.set_post_edges accessed' merged_edges astate
              in
              let add_new_eq_aux accessed accessed' (replaced, astate) =
                (* Set the [accessed'] as equal to [accessed] in [astate.path_condition]
                   and set its edges to their merged canonicalized edges *)
                match
                  Formula.and_equal (AbstractValueOperand accessed) (AbstractValueOperand accessed')
                    astate.AbductiveDomain.path_condition
                with
                | Unsat ->
                    (replaced, astate)
                | Sat (formula, _new_eqs) ->
                    let get_var_repr v = Formula.get_var_repr formula v in
                    let astate' = merge_edges ~get_var_repr accessed accessed' astate in
                    let replaced =
                      if phys_equal astate astate' then replaced else accessed :: replaced
                    in
                    let astate' = AbductiveDomain.set_path_condition formula astate' in
                    (replaced, astate')
              in
              let add_new_eq accessed addr' access' ((_, astate) as acc) =
                (* Set the value accesssible from [addr'] and [access'] as equal to
                   [accessed] in [astate.path_condition] and merge their edges *)
                let formula = astate.AbductiveDomain.path_condition in
                let get_var_repr v = Formula.get_var_repr formula v in
                match UnsafeMemory.find_edge_opt ~get_var_repr addr' access' post_heap with
                | None ->
                    acc
                | Some (accessed', _)
                  when AbstractValue.equal (get_var_repr accessed') (get_var_repr accessed) ->
                    acc
                | Some (accessed', _) ->
                    add_new_eq_aux accessed accessed' acc
              in
              let replaced, astate, addrs =
                UnsafeMemory.Edges.fold edges ~init:(replaced, astate, addrs)
                  ~f:(fun (replaced, astate, addrs) (access, (accessed, _)) ->
                    let formula = astate.AbductiveDomain.path_condition in
                    let get_var_repr v = Formula.get_var_repr formula v in
                    let addr' = get_var_repr addr in
                    let access' = Access.canonicalize ~get_var_repr access in
                    let replaced, astate =
                      add_new_eq accessed addr' access (replaced, astate)
                      |> add_new_eq accessed addr access'
                    in
                    (replaced, astate, accessed :: addrs) )
              in
              aux visited addrs astate replaced )
    in
    let astate, replaced =
      aux AddressSet.empty (List.map actuals ~f:(fun ((addr, _), _) -> addr)) astate []
    in
    List.fold replaced ~init:astate ~f:(fun astate addr ->
        AbductiveDomain.remove_from_post addr astate )
  in
  let astate = incorporate_eqs_on_array_cells actuals call_state.astate in
  if phys_equal call_state.astate astate then call_state else {call_state with astate}


let apply_post path callee_proc_name call_location callee_summary ~captured_formals
    ~captured_actuals ~formals ~actuals call_state =
  let open PulseResult.Let_syntax in
  PerfEvent.(log (fun logger -> log_begin_event logger ~name:"pulse call post" ())) ;
  let normalize_subst_for_post call_state =
    (* Exploit known equalities to deduce new ones by relying on the canonical representation
       of values and edge. This is necessary for arrays because they rely on values in their
       index access representation *)
    let call_state = canonicalize ~actuals call_state in
    let call_state = canonicalize ~actuals:captured_actuals call_state in
    (* Now that all equalities are deduced and set, we can exploit them to use the canonical
       representation of values in the subst and rev_subst maps *)
    let get_var_repr v = Formula.get_var_repr call_state.astate.AbductiveDomain.path_condition v in
    let subst =
      AddressMap.map
        (fun (v_caller, hist) ->
          let v_caller_canon = get_var_repr v_caller in
          (v_caller_canon, hist) )
        call_state.subst
    in
    let rev_subst =
      AddressMap.fold
        (fun v_caller v_callee rev_subst ->
          let v_caller_canon = get_var_repr v_caller in
          AddressMap.add v_caller_canon v_callee rev_subst )
        call_state.rev_subst AddressMap.empty
    in
    {call_state with subst; rev_subst}
  in
  let r =
    let call_state, return_caller_opt =
      (* subst was suitable for pre but post may know more equalities, take them into account now *)
      normalize_subst_for_post call_state
      |> apply_unknown_effects callee_summary
      |> apply_post_for_parameters path callee_proc_name call_location callee_summary ~formals
           ~actuals
      |> apply_post_for_captured_vars path callee_proc_name call_location callee_summary
           ~captured_formals ~captured_actuals
      |> apply_post_for_globals path callee_proc_name call_location callee_summary
      |> apply_post_for_remaining_pre path callee_proc_name call_location callee_summary
      |> record_post_for_return path callee_proc_name call_location callee_summary
    in
    let+ call_state =
      record_post_remaining_attributes path callee_proc_name call_location callee_summary call_state
      |> record_skipped_calls callee_proc_name call_location callee_summary
      |> record_need_closure_specialization callee_summary
      |> conjoin_callee_arith `Post (AbductiveDomain.Summary.get_path_condition callee_summary)
      (* normalize subst again now that we know more arithmetic facts *)
      >>| normalize_subst_for_post
    in
    let return_caller_opt =
      Option.map return_caller_opt ~f:(fun (return_caller, return_hist) ->
          ( Formula.get_var_repr call_state.astate.AbductiveDomain.path_condition return_caller
          , return_hist ) )
    in
    (call_state, return_caller_opt)
  in
  PerfEvent.(log (fun logger -> log_end_event logger ())) ;
  r


let check_all_valid path callee_proc_name call_location ~pre call_state =
  (* collect all the checks to perform then do each check in timestamp order to make sure we report
     the first issue if any *)
  let addresses_to_check =
    AddressMap.fold
      (fun addr_pre addr_hist_caller to_check ->
        let to_check =
          match UnsafeAttributes.get_must_be_valid addr_pre pre.BaseDomain.attrs with
          | None ->
              to_check
          | Some must_be_valid_data ->
              (addr_hist_caller, `MustBeValid must_be_valid_data) :: to_check
        in
        match UnsafeAttributes.get_must_be_initialized addr_pre pre.BaseDomain.attrs with
        | None ->
            to_check
        | Some must_be_init_data ->
            (addr_hist_caller, `MustBeInitialized must_be_init_data) :: to_check )
      call_state.subst []
  in
  let timestamp_of_check = function
    | `MustBeValid (timestamp, _, _) | `MustBeInitialized (timestamp, _) ->
        timestamp
  in
  List.sort addresses_to_check ~compare:(fun (_, check1) (_, check2) ->
      (* smaller timestamp first *)
      Timestamp.compare (timestamp_of_check check1) (timestamp_of_check check2) )
  |> List.fold_result ~init:call_state.astate ~f:(fun astate ((addr_caller, hist_caller), check) ->
         let mk_access_trace callee_access_trace =
           Trace.ViaCall
             { in_call= callee_access_trace
             ; f= Call callee_proc_name
             ; location= call_location
             ; history= hist_caller }
         in
         match check with
         | `MustBeValid (_timestamp, callee_access_trace, must_be_valid_reason) ->
             let access_trace = mk_access_trace callee_access_trace in
             AddressAttributes.check_valid path access_trace addr_caller astate
             |> Result.map_error ~f:(fun (invalidation, invalidation_trace) ->
                    L.d_printfln ~color:Red "ERROR: caller's %a invalid!" AbstractValue.pp
                      addr_caller ;
                    AccessResult.ReportableError
                      { diagnostic=
                          AccessToInvalidAddress
                            { calling_context= []
                            ; invalid_address= Decompiler.find addr_caller astate
                            ; invalidation
                            ; invalidation_trace
                            ; access_trace
                            ; must_be_valid_reason }
                      ; astate } )
         | `MustBeInitialized (_timestamp, callee_access_trace) ->
             let access_trace = mk_access_trace callee_access_trace in
             AddressAttributes.check_initialized path access_trace addr_caller astate
             |> Result.map_error ~f:(fun () ->
                    L.d_printfln ~color:Red "ERROR: caller's %a is uninitialized!" AbstractValue.pp
                      addr_caller ;
                    AccessResult.ReportableError
                      { diagnostic= ReadUninitializedValue {calling_context= []; trace= access_trace}
                      ; astate } ) )


let check_config_usage_at_call location ~pre:{BaseDomain.attrs= pre_attrs} subst astate =
  let open PulseResult.Let_syntax in
  AddressMap.fold
    (fun addr_pre addr_hist acc ->
      Option.value_map (UnsafeAttributes.get_used_as_branch_cond addr_pre pre_attrs) ~default:acc
        ~f:(fun (pname_using_config, branch_location, trace) ->
          let* acc in
          PulseOperations.check_used_as_branch_cond addr_hist ~pname_using_config ~branch_location
            ~location trace acc ) )
    subst (Ok astate)


let check_all_taint_valid path callee_proc_name call_location callee_summary astate call_state =
  let open PulseResult.Let_syntax in
  AddressMap.fold
    (fun addr_pre ((_, hist_caller) as addr_hist_caller) astate_result ->
      let sinks =
        UnsafeAttributes.get_must_not_be_tainted addr_pre
          (AbductiveDomain.Summary.get_pre callee_summary).attrs
      in
      let trace_via_call trace =
        Trace.ViaCall
          {in_call= trace; f= Call callee_proc_name; location= call_location; history= hist_caller}
      in
      Attribute.TaintSinkSet.fold
        (fun Attribute.TaintSink.{sink; trace} astate_result ->
          let* astate = astate_result in
          let sink_and_trace = (sink, trace_via_call trace) in
          let+ _, astate =
            PulseTaintOperations.check_flows_wrt_sink path call_location ~sink:sink_and_trace
              ~source:addr_hist_caller astate
          in
          astate )
        sinks astate_result )
    call_state.subst (Ok astate)


(* - read all the pre, assert validity of addresses and materializes *everything* (to throw stuff
   in the *current* pre as appropriate so that callers of the current procedure will also know
   about the deeper reads)

   - for each actual, write the post for that actual

   - if aliasing is introduced at any time then give up *)
let apply_summary path callee_proc_name call_location ~callee_summary ~captured_formals
    ~captured_actuals ~formals ~actuals astate =
  let aux () =
    let empty_call_state =
      {astate; subst= AddressMap.empty; rev_subst= AddressMap.empty; visited= AddressSet.empty}
    in
    (* read the precondition *)
    match
      materialize_pre path callee_proc_name call_location callee_summary ~captured_formals
        ~captured_actuals ~formals ~actuals empty_call_state
    with
    | exception Contradiction reason ->
        (* can't make sense of the pre-condition in the current context: give up on that particular
           pre/post pair *)
        L.d_printfln ~color:Orange "Cannot apply precondition: %a@\n" pp_contradiction reason ;
        log_contradiction reason ;
        (Unsat, Some reason)
    | result -> (
      try
        let subst =
          (let open IOption.Let_syntax in
           let+ call_state = PulseResult.ok result in
           call_state.subst )
          |> Option.value ~default:AbstractValue.Map.empty
        in
        let res =
          let open PulseResult.Let_syntax in
          let* call_state = result in
          L.d_printfln "Pre applied successfully, call_state after = %a" pp_call_state call_state ;
          let pre = AbductiveDomain.Summary.get_pre callee_summary in
          let* astate =
            check_all_valid path callee_proc_name call_location ~pre call_state
            |> AccessResult.of_result
          in
          let* astate = check_config_usage_at_call call_location ~pre call_state.subst astate in
          (* reset [visited] *)
          let call_state = {call_state with astate; visited= AddressSet.empty} in
          (* apply the postcondition *)
          let* call_state, return_caller =
            apply_post path callee_proc_name call_location callee_summary ~captured_formals
              ~captured_actuals ~formals ~actuals call_state
          in
          let astate =
            if Topl.is_active () then
              let callee_is_manifest = PulseArithmetic.is_manifest callee_summary in
              AbductiveDomain.Topl.large_step ~call_location ~callee_proc_name
                ~substitution:call_state.subst
                ~callee_summary:(AbductiveDomain.Summary.get_topl callee_summary)
                ~callee_is_manifest call_state.astate
            else call_state.astate
          in
          let astate =
            Option.fold ~init:astate return_caller ~f:(fun astate ret_v ->
                Decompiler.add_call_source (fst ret_v) (Call callee_proc_name) actuals astate )
          in
          let+ astate =
            (* This has to happen after the post has been applied so that we are aware of any
               sanitizers applied to tainted values too, otherwise we'll report false positives if
               the callee both taints and sanitizes a value *)
            check_all_taint_valid path callee_proc_name call_location callee_summary astate
              call_state
          in
          (astate, return_caller, call_state.subst)
        in
        let contradiciton =
          let callee_heap_paths =
            AbductiveDomain.Summary.heap_paths_that_need_dynamic_type_specialization callee_summary
          in
          if Specialization.HeapPath.Map.is_empty callee_heap_paths then None
          else
            let caller_heap_paths =
              Specialization.HeapPath.Map.fold
                (fun heap_path addr map ->
                  match AbstractValue.Map.find_opt addr subst with
                  | Some (addr_in_caller, _) ->
                      L.d_printfln
                        "dynamic type is required for address %a reachable from heap path %a in \
                         callee (%a in caller)"
                        AbstractValue.pp addr Specialization.HeapPath.pp heap_path AbstractValue.pp
                        addr_in_caller ;
                      Specialization.HeapPath.Map.add heap_path addr_in_caller map
                  | None ->
                      L.d_printfln
                        "dynamic type is required for address %a reachable from heap path %a in \
                         callee (not found in caller)"
                        AbstractValue.pp addr Specialization.HeapPath.pp heap_path ;
                      map )
                callee_heap_paths Specialization.HeapPath.Map.empty
            in
            Some (DynamicTypeNeeded caller_heap_paths)
        in
        (Sat res, contradiciton)
      with Contradiction reason ->
        L.d_printfln "Cannot apply post-condition: %a" pp_contradiction reason ;
        log_contradiction reason ;
        (Unsat, Some reason) )
  in
  let pp_formals = Pp.seq ~sep:"," (fun f (var, _) -> Var.pp f var) in
  let pp_summary =
    Pp.html_collapsible_block ~name:"Show/hide the summary" AbductiveDomain.Summary.pp
  in
  L.d_with_indent ~collapsible:true "Applying pre/post for %a(%a):" Procname.pp callee_proc_name
    pp_formals formals ~f:(fun () ->
      L.d_printfln "%a" pp_summary callee_summary ;
      aux () )

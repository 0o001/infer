"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7718],{3905:function(e,r,t){t.d(r,{Zo:function(){return c},kt:function(){return m}});var n=t(7294);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function l(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?l(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)t=l[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)t=l[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=n.createContext({}),u=function(e){var r=n.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):o(o({},r),e)),t},c=function(e){var r=u(e.components);return n.createElement(s.Provider,{value:r},e.children)},f="mdxType",p={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},_=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),f=u(t),_=a,m=f["".concat(s,".").concat(_)]||f[_]||p[_]||l;return t?n.createElement(m,o(o({ref:r},c),{},{components:t})):n.createElement(m,o({ref:r},c))}));function m(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var l=t.length,o=new Array(l);o[0]=_;var i={};for(var s in r)hasOwnProperty.call(r,s)&&(i[s]=r[s]);i.originalType=e,i[f]="string"==typeof e?e:a,o[1]=i;for(var u=2;u<l;u++)o[u]=t[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,t)}_.displayName="MDXCreateElement"},7101:function(e,r,t){t.r(r),t.d(r,{assets:function(){return c},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return i},metadata:function(){return u},toc:function(){return f}});var n=t(7462),a=t(3366),l=(t(7294),t(3905)),o=["components"],i={title:"Buffer Overrun Analysis (InferBO)",description:"InferBO is a detector for out-of-bounds array accesses."},s=void 0,u={unversionedId:"checker-bufferoverrun",id:"version-1.0.0/checker-bufferoverrun",title:"Buffer Overrun Analysis (InferBO)",description:"InferBO is a detector for out-of-bounds array accesses.",source:"@site/versioned_docs/version-1.0.0/checker-bufferoverrun.md",sourceDirName:".",slug:"/checker-bufferoverrun",permalink:"/docs/1.0.0/checker-bufferoverrun",draft:!1,tags:[],version:"1.0.0",frontMatter:{title:"Buffer Overrun Analysis (InferBO)",description:"InferBO is a detector for out-of-bounds array accesses."},sidebar:"version-1.0.0/docs",previous:{title:"Biabduction",permalink:"/docs/1.0.0/checker-biabduction"},next:{title:"Config Checks between Markers",permalink:"/docs/1.0.0/checker-config-checks-between-markers"}},c={},f=[{value:"List of Issue Types",id:"list-of-issue-types",level:2}],p={toc:f},_="wrapper";function m(e){var r=e.components,t=(0,a.Z)(e,o);return(0,l.kt)(_,(0,n.Z)({},p,t,{components:r,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"InferBO is a detector for out-of-bounds array accesses."),(0,l.kt)("p",null,"Activate with ",(0,l.kt)("inlineCode",{parentName:"p"},"--bufferoverrun"),"."),(0,l.kt)("p",null,"Supported languages:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"C/C++/ObjC: Yes"),(0,l.kt)("li",{parentName:"ul"},"Java: Yes")),(0,l.kt)("p",null,"You can read about its origins in this ",(0,l.kt)("a",{parentName:"p",href:"https://research.fb.com/inferbo-infer-based-buffer-overrun-analyzer/"},"blog post"),"."),(0,l.kt)("h2",{id:"list-of-issue-types"},"List of Issue Types"),(0,l.kt)("p",null,"The following issue types are reported by this checker:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#buffer_overrun_l1"},"BUFFER_OVERRUN_L1")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#buffer_overrun_l2"},"BUFFER_OVERRUN_L2")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#buffer_overrun_l3"},"BUFFER_OVERRUN_L3")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#buffer_overrun_l4"},"BUFFER_OVERRUN_L4")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#buffer_overrun_l5"},"BUFFER_OVERRUN_L5")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#buffer_overrun_s2"},"BUFFER_OVERRUN_S2")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#buffer_overrun_u5"},"BUFFER_OVERRUN_U5")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#condition_always_false"},"CONDITION_ALWAYS_FALSE")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#condition_always_true"},"CONDITION_ALWAYS_TRUE")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#inferbo_alloc_is_big"},"INFERBO_ALLOC_IS_BIG")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#inferbo_alloc_is_negative"},"INFERBO_ALLOC_IS_NEGATIVE")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#inferbo_alloc_is_zero"},"INFERBO_ALLOC_IS_ZERO")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#inferbo_alloc_may_be_big"},"INFERBO_ALLOC_MAY_BE_BIG")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#inferbo_alloc_may_be_negative"},"INFERBO_ALLOC_MAY_BE_NEGATIVE")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#integer_overflow_l1"},"INTEGER_OVERFLOW_L1")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#integer_overflow_l2"},"INTEGER_OVERFLOW_L2")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#integer_overflow_l5"},"INTEGER_OVERFLOW_L5")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#integer_overflow_u5"},"INTEGER_OVERFLOW_U5")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#unreachable_code"},"UNREACHABLE_CODE"))))}m.isMDXComponent=!0}}]);
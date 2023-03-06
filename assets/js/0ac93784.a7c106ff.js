"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6634],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return h}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=s(n),f=a,h=u["".concat(l,".").concat(f)]||u[f]||d[f]||i;return n?r.createElement(h,o(o({ref:t},p),{},{components:n})):r.createElement(h,o({ref:t},p))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=f;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[u]="string"==typeof e?e:a,o[1]=c;for(var s=2;s<i;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},8770:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return l},default:function(){return h},frontMatter:function(){return c},metadata:function(){return s},toc:function(){return u}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=["components"],c={title:"Annotation Reachability",description:"Given a pair of source and sink annotation, e.g. `@PerformanceCritical` and `@Expensive`, this checker will warn whenever some method annotated with `@PerformanceCritical` calls, directly or indirectly, another method annotated with `@Expensive`"},l=void 0,s={unversionedId:"checker-annotation-reachability",id:"version-1.0.0/checker-annotation-reachability",title:"Annotation Reachability",description:"Given a pair of source and sink annotation, e.g. `@PerformanceCritical` and `@Expensive`, this checker will warn whenever some method annotated with `@PerformanceCritical` calls, directly or indirectly, another method annotated with `@Expensive`",source:"@site/versioned_docs/version-1.0.0/checker-annotation-reachability.md",sourceDirName:".",slug:"/checker-annotation-reachability",permalink:"/docs/1.0.0/checker-annotation-reachability",draft:!1,tags:[],version:"1.0.0",frontMatter:{title:"Annotation Reachability",description:"Given a pair of source and sink annotation, e.g. `@PerformanceCritical` and `@Expensive`, this checker will warn whenever some method annotated with `@PerformanceCritical` calls, directly or indirectly, another method annotated with `@Expensive`"},sidebar:"version-1.0.0/docs",previous:{title:"List of all issue types",permalink:"/docs/1.0.0/all-issue-types"},next:{title:"Biabduction",permalink:"/docs/1.0.0/checker-biabduction"}},p={},u=[{value:"List of Issue Types",id:"list-of-issue-types",level:2}],d={toc:u},f="wrapper";function h(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)(f,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Given a pair of source and sink annotation, e.g. ",(0,i.kt)("inlineCode",{parentName:"p"},"@PerformanceCritical")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"@Expensive"),", this checker will warn whenever some method annotated with ",(0,i.kt)("inlineCode",{parentName:"p"},"@PerformanceCritical")," calls, directly or indirectly, another method annotated with ",(0,i.kt)("inlineCode",{parentName:"p"},"@Expensive")),(0,i.kt)("p",null,"Activate with ",(0,i.kt)("inlineCode",{parentName:"p"},"--annotation-reachability"),"."),(0,i.kt)("p",null,"Supported languages:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"C/C++/ObjC: Yes"),(0,i.kt)("li",{parentName:"ul"},"Java: Yes")),(0,i.kt)("h2",{id:"list-of-issue-types"},"List of Issue Types"),(0,i.kt)("p",null,"The following issue types are reported by this checker:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#checkers_allocates_memory"},"CHECKERS_ALLOCATES_MEMORY")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#checkers_annotation_reachability_error"},"CHECKERS_ANNOTATION_REACHABILITY_ERROR")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#checkers_calls_expensive_method"},"CHECKERS_CALLS_EXPENSIVE_METHOD")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/1.0.0/all-issue-types#checkers_expensive_overrides_unannotated"},"CHECKERS_EXPENSIVE_OVERRIDES_UNANNOTATED"))))}h.isMDXComponent=!0}}]);
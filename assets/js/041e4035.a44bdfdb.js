"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3847],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return m}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(r),d=o,m=p["".concat(l,".").concat(d)]||p[d]||f[d]||a;return r?n.createElement(m,i(i({ref:t},u),{},{components:r})):n.createElement(m,i({ref:t},u))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},7151:function(e,t,r){r.r(t),r.d(t,{assets:function(){return u},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return p}});var n=r(7462),o=r(3366),a=(r(7294),r(3905)),i=["components"],s={title:"Starvation",description:"Detect various kinds of situations when no progress is being made because of concurrency errors."},l=void 0,c={unversionedId:"checker-starvation",id:"checker-starvation",title:"Starvation",description:"Detect various kinds of situations when no progress is being made because of concurrency errors.",source:"@site/docs/checker-starvation.md",sourceDirName:".",slug:"/checker-starvation",permalink:"/docs/next/checker-starvation",draft:!1,tags:[],version:"current",frontMatter:{title:"Starvation",description:"Detect various kinds of situations when no progress is being made because of concurrency errors."},sidebar:"docs",previous:{title:"Self in Block",permalink:"/docs/next/checker-self-in-block"},next:{title:"Topl",permalink:"/docs/next/checker-topl"}},u={},p=[{value:"List of Issue Types",id:"list-of-issue-types",level:2}],f={toc:p},d="wrapper";function m(e){var t=e.components,r=(0,o.Z)(e,i);return(0,a.kt)(d,(0,n.Z)({},f,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Detect various kinds of situations when no progress is being made because of concurrency errors."),(0,a.kt)("p",null,"Activate with ",(0,a.kt)("inlineCode",{parentName:"p"},"--starvation"),"."),(0,a.kt)("p",null,"Supported languages:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"C/C++/ObjC: Yes"),(0,a.kt)("li",{parentName:"ul"},"C#/.Net: No"),(0,a.kt)("li",{parentName:"ul"},"Erlang: No"),(0,a.kt)("li",{parentName:"ul"},"Hack: No"),(0,a.kt)("li",{parentName:"ul"},"Java: Yes")),(0,a.kt)("p",null,'Detect several kinds of "starvation" problems:'),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"deadlocks"),(0,a.kt)("li",{parentName:"ul"},"violations of ",(0,a.kt)("inlineCode",{parentName:"li"},"@Lockless")," annotations"),(0,a.kt)("li",{parentName:"ul"},"violations of ",(0,a.kt)("a",{parentName:"li",href:"https://developer.android.com/reference/android/os/StrictMode"},'Android\'s "strict mode"')),(0,a.kt)("li",{parentName:"ul"},"doing expensive operations on the Android UI thread")),(0,a.kt)("h2",{id:"list-of-issue-types"},"List of Issue Types"),(0,a.kt)("p",null,"The following issue types are reported by this checker:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/next/all-issue-types#arbitrary_code_execution_under_lock"},"ARBITRARY_CODE_EXECUTION_UNDER_LOCK")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/next/all-issue-types#deadlock"},"DEADLOCK")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/next/all-issue-types#ipc_on_ui_thread"},"IPC_ON_UI_THREAD")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/next/all-issue-types#lockless_violation"},"LOCKLESS_VIOLATION")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/next/all-issue-types#regex_op_on_ui_thread"},"REGEX_OP_ON_UI_THREAD")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/next/all-issue-types#starvation"},"STARVATION")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/next/all-issue-types#strict_mode_violation"},"STRICT_MODE_VIOLATION"))))}m.isMDXComponent=!0}}]);
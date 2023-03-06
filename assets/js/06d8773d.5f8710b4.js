"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6767],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=l(n),d=o,f=u["".concat(s,".").concat(d)]||u[d]||h[d]||i;return n?r.createElement(f,a(a({ref:t},c),{},{components:n})):r.createElement(f,a({ref:t},c))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[u]="string"==typeof e?e:o,a[1]=p;for(var l=2;l<i;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8250:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return p},metadata:function(){return l},toc:function(){return u}});var r=n(7462),o=n(3366),i=(n(7294),n(3905)),a=["components"],p={title:'Litho "Required Props"',description:"Checks that all non-optional `@Prop`s have been specified when constructing Litho components."},s=void 0,l={unversionedId:"checker-litho-required-props",id:"checker-litho-required-props",title:'Litho "Required Props"',description:"Checks that all non-optional `@Prop`s have been specified when constructing Litho components.",source:"@site/docs/checker-litho-required-props.md",sourceDirName:".",slug:"/checker-litho-required-props",permalink:"/docs/next/checker-litho-required-props",draft:!1,tags:[],version:"current",frontMatter:{title:'Litho "Required Props"',description:"Checks that all non-optional `@Prop`s have been specified when constructing Litho components."},sidebar:"docs",previous:{title:"Inefficient keySet Iterator",permalink:"/docs/next/checker-inefficient-keyset-iterator"},next:{title:"Liveness",permalink:"/docs/next/checker-liveness"}},c={},u=[{value:"What are required Props?",id:"what-are-required-props",level:2},{value:"List of Issue Types",id:"list-of-issue-types",level:2}],h={toc:u},d="wrapper";function f(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)(d,(0,r.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Checks that all non-optional ",(0,i.kt)("inlineCode",{parentName:"p"},"@Prop"),"s have been specified when constructing Litho components."),(0,i.kt)("p",null,"Activate with ",(0,i.kt)("inlineCode",{parentName:"p"},"--litho-required-props"),"."),(0,i.kt)("p",null,"Supported languages:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"C/C++/ObjC: No"),(0,i.kt)("li",{parentName:"ul"},"C#/.Net: No"),(0,i.kt)("li",{parentName:"ul"},"Erlang: No"),(0,i.kt)("li",{parentName:"ul"},"Hack: No"),(0,i.kt)("li",{parentName:"ul"},"Java: Yes")),(0,i.kt)("p",null,"This analysis checks that all non-optional ",(0,i.kt)("a",{parentName:"p",href:"https://fblitho.com/docs/props"},(0,i.kt)("inlineCode",{parentName:"a"},"@Prop")),"`s have been specified when constructing Litho components. This is a ",(0,i.kt)("a",{parentName:"p",href:"https://fblitho.com/"},"Litho")," specific checker."),(0,i.kt)("h2",{id:"what-are-required-props"},"What are required Props?"),(0,i.kt)("p",null,"In a nutshell, a Litho Component is essentially a class that defines immutable inputs, called prop (annotated with ",(0,i.kt)("inlineCode",{parentName:"p"},"@Prop"),") in component hierarchy methods. For each Component there is a corresponding spec class which defines the required props:. E.g:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"class MyComponentSpec {\n\n  static void onCreate(\n      ComponentContext c,\n      @Prop(optional = true) String prop1, @Prop int prop2) {\n    ...\n  }\n  ...\n}\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"MyComponentSpec")," defines two props: a String prop called ",(0,i.kt)("inlineCode",{parentName:"p"},"prop1")," and an int prop named ",(0,i.kt)("inlineCode",{parentName:"p"},"prop2"),". For each prop defined on the spec, the annotation processor creates a builder pattern method that has the same name as the prop."),(0,i.kt)("p",null,"Developers pass down values for these props by calling the appropriate methods:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},'MyComponent.create(c)\n    .prop1("My prop 1")\n    .prop2(256)\n    .build();\n')),(0,i.kt)("p",null,"If the required props are not called, then annotation processor throws an exception in run time. This is really bad and that's where this checker comes into play to detect such cases statically."),(0,i.kt)("p",null,"Note that, the functions ",(0,i.kt)("inlineCode",{parentName:"p"},"create()")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"build()")," could be defined in different methods and there could be various function calls, aliasing, and control flow patterns in between. Hence, this checker is inter-procedural."),(0,i.kt)("p",null,"Check out the examples defined in the issue type ",(0,i.kt)("a",{parentName:"p",href:"/docs/next/all-issue-types#missing_required_prop"},"MISSING_REQUIRED_PROP"),"."),(0,i.kt)("h2",{id:"list-of-issue-types"},"List of Issue Types"),(0,i.kt)("p",null,"The following issue types are reported by this checker:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/next/all-issue-types#missing_required_prop"},"MISSING_REQUIRED_PROP"))))}f.isMDXComponent=!0}}]);
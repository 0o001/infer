"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2338],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return m}});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),c=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},u=function(e){var n=c(e.components);return r.createElement(s.Provider,{value:n},e.children)},f="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),f=c(t),d=a,m=f["".concat(s,".").concat(d)]||f[d]||p[d]||i;return t?r.createElement(m,o(o({ref:n},u),{},{components:t})):r.createElement(m,o({ref:n},u))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=d;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[f]="string"==typeof e?e:a,o[1]=l;for(var c=2;c<i;c++)o[c]=t[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},4791:function(e,n,t){t.r(n),t.d(n,{assets:function(){return u},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return f}});var r=t(7462),a=t(3366),i=(t(7294),t(3905)),o=["components"],l={id:"steps-for-ci",title:"Recommended flow for CI"},s=void 0,c={unversionedId:"steps-for-ci",id:"steps-for-ci",title:"Recommended flow for CI",description:"The recommended flow for CI integration is to determine the modified files, and",source:"@site/docs/01-steps-for-ci.md",sourceDirName:".",slug:"/steps-for-ci",permalink:"/docs/next/steps-for-ci",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{id:"steps-for-ci",title:"Recommended flow for CI"},sidebar:"docs",previous:{title:"Analyzing apps or projects",permalink:"/docs/next/analyzing-apps-or-projects"},next:{title:"infer",permalink:"/docs/next/man-infer"}},u={},f=[{value:"Differential Workflow",id:"differential-workflow",level:3},{value:"Example: Android Gradle",id:"example-android-gradle",level:3}],p={toc:f},d="wrapper";function m(e){var n=e.components,t=(0,a.Z)(e,o);return(0,i.kt)(d,(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"The recommended flow for CI integration is to determine the modified files, and\nrun the analysis in reactive mode starting from those files. If you would like\nto run more than one analyzer, it is more efficient to separate the capture\nphase, so that the result can be used by all the analyzers."),(0,i.kt)("h3",{id:"differential-workflow"},"Differential Workflow"),(0,i.kt)("p",null,"Here's how to run infer on two versions of a project and compare the results in\ngeneral."),(0,i.kt)("p",null,"Assume the project uses git, ",(0,i.kt)("inlineCode",{parentName:"p"},"feature")," is the feature branch (the code change\nyou want to analyze), ",(0,i.kt)("inlineCode",{parentName:"p"},"main")," is the main branch, and ",(0,i.kt)("inlineCode",{parentName:"p"},"make")," builds the\nproject."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# go to feature branch if not there already\ngit checkout feature\n# get list of changed files\ngit diff --name-only origin/feature..origin/main > index.txt\n## first run: feature branch\n# run infer on the feature branch\ninfer capture -- make -j 4  # assuming a machine with 4 cores\ninfer analyze --changed-files-index index.txt\n# store the infer report\ncp infer-out/report.json report-feature.json\n## second run: main branch\ngit checkout main\n# run capture in reactive mode so that previously-captured source files are kept if they are up-to-date\ninfer capture --reactive -- make -j 4\ninfer analyze --reactive --changed-files-index index.txt\n# compare reports\ninfer reportdiff --report-current report-feature.json --report-previous infer-out/report.json\n")),(0,i.kt)("p",null,'At the end of this process, "infer-out/differential/" contains three files,\nwhich follow the same format as normal infer JSON reports:'),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"introduced.json contains the issues found in the feature branch but not in\nmain;"),(0,i.kt)("li",{parentName:"ul"},"fixed.json contains the issues found in main but not in the feature branch;"),(0,i.kt)("li",{parentName:"ul"},"preexisting.json contains the issues found in both branches.")),(0,i.kt)("h3",{id:"example-android-gradle"},"Example: Android Gradle"),(0,i.kt)("p",null,"The following CI script runs the ",(0,i.kt)("inlineCode",{parentName:"p"},"infer")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"eradicate")," analyzers. Assume again\nthat ",(0,i.kt)("inlineCode",{parentName:"p"},"feature")," is the feature branch, and ",(0,i.kt)("inlineCode",{parentName:"p"},"main")," is the main branch."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"git diff --name-only origin/feature..origin/main > index.txt\ninfer capture -- ./gradlew --offline assembleDebug\ninfer analyze --fail-on-issue --eradicate --changed-files-index ./index.txt\n")),(0,i.kt)("p",null,"Notice that"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"We use git to find the changed files ",(0,i.kt)("inlineCode",{parentName:"li"},"git diff --name-only")),(0,i.kt)("li",{parentName:"ul"},"We run capture only once, and the output is kept for the subsequent analyses"),(0,i.kt)("li",{parentName:"ul"},"We run the eradicate analysis alongside the default analyses: ",(0,i.kt)("inlineCode",{parentName:"li"},"--eradicate")),(0,i.kt)("li",{parentName:"ul"},"We analyze only the changed files ",(0,i.kt)("inlineCode",{parentName:"li"},"--changed-files-index ./index.txt"))))}m.isMDXComponent=!0}}]);
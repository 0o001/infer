"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6217],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return m}});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=r.createContext({}),p=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},u=function(e){var n=p(e.components);return r.createElement(s.Provider,{value:n},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},f=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=p(t),f=o,m=d["".concat(s,".").concat(f)]||d[f]||c[f]||i;return t?r.createElement(m,a(a({ref:n},u),{},{components:t})):r.createElement(m,a({ref:n},u))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=f;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[d]="string"==typeof e?e:o,a[1]=l;for(var p=2;p<i;p++)a[p]=t[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},7243:function(e,n,t){t.r(n),t.d(n,{assets:function(){return u},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return d}});var r=t(7462),o=t(3366),i=(t(7294),t(3905)),a=["components"],l={title:"Infer | Need help?",id:"support"},s=void 0,p={unversionedId:"support",id:"support",title:"Infer | Need help?",description:"Need help?",source:"@site/docs/support.md",sourceDirName:".",slug:"/support",permalink:"/docs/next/support",draft:!1,tags:[],version:"current",frontMatter:{title:"Infer | Need help?",id:"support"}},u={},d=[{value:"Need help?",id:"need-help",level:2},{value:"GitHub issues",id:"github-issues",level:3},{value:"Updates",id:"updates",level:3},{value:"IRC",id:"irc",level:3},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"Infer cannot analyze my CocoaPods project",id:"infer-cannot-analyze-my-cocoapods-project",level:3},{value:"<code>infer [options] -- &lt;build command&gt;</code> fails during a linking step",id:"infer-options----build-command-fails-during-a-linking-step",level:3},{value:"I get a compilation error involving PCH files when running Infer",id:"i-get-a-compilation-error-involving-pch-files-when-running-infer",level:3},{value:"Infer reports a &quot;Too many open files&quot; error",id:"infer-reports-a-too-many-open-files-error",level:3},{value:"I get a lint error when running Infer with gradle",id:"i-get-a-lint-error-when-running-infer-with-gradle",level:3},{value:"Running <code>infer [options] -- &lt;build command&gt;</code> fails with some other error",id:"running-infer-options----build-command-fails-with-some-other-error",level:3},{value:"I get errors compiling Infer",id:"i-get-errors-compiling-infer",level:3},{value:"My problem is not listed here",id:"my-problem-is-not-listed-here",level:3},{value:"FAQ",id:"faq",level:2},{value:"How do I suppress Infer warnings on a class or method?",id:"how-do-i-suppress-infer-warnings-on-a-class-or-method",level:3},{value:"Is Infer supported for Windows?",id:"is-infer-supported-for-windows",level:3},{value:"How does Infer compare to the Clang Static Analyzer?",id:"how-does-infer-compare-to-the-clang-static-analyzer",level:3},{value:"How does Infer compare to Android linters and Findbugs?",id:"how-does-infer-compare-to-android-linters-and-findbugs",level:3}],c={toc:d},f="wrapper";function m(e){var n=e.components,t=(0,o.Z)(e,a);return(0,i.kt)(f,(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"need-help"},"Need help?"),(0,i.kt)("p",null,"Do not hesitate to ask questions using the following channels, or to submit pull\nrequest!"),(0,i.kt)("h3",{id:"github-issues"},"GitHub issues"),(0,i.kt)("p",null,"The ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/facebook/Infer/issues"},"GitHub issues")," page is a good\nplace to ask questions, find answers, and report issues."),(0,i.kt)("p",null,"Please include as many details as possible when submitting a GitHub issue. If\nyou are able to run Infer, please include the contents of\n",(0,i.kt)("inlineCode",{parentName:"p"},"infer-out/toplevel.log")," in your report. If not, please include at least your\noperating system and the version of Infer that you are using."),(0,i.kt)("h3",{id:"updates"},"Updates"),(0,i.kt)("p",null,"Keep up to date with the latest Infer news on our\n",(0,i.kt)("a",{parentName:"p",href:"https://www.facebook.com/inferstaticanalyzer/"},"Facebook page")," and our\n",(0,i.kt)("a",{parentName:"p",href:"https://twitter.com/fbinfer"},"Twitter account"),"."),(0,i.kt)("h3",{id:"irc"},"IRC"),(0,i.kt)("p",null,"Our IRC channel is ",(0,i.kt)("a",{parentName:"p",href:"irc://irc.libera.chat/infer"},(0,i.kt)("inlineCode",{parentName:"a"},"#infer"))," on ",(0,i.kt)("a",{parentName:"p",href:"https://libera.chat/"},"Libera Chat"),"."),(0,i.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,i.kt)("h3",{id:"infer-cannot-analyze-my-cocoapods-project"},"Infer cannot analyze my CocoaPods project"),(0,i.kt)("p",null,"In the presence of CocoaPods, you should use xcworkspace and not xcodeproj in\nthe compilation command that you supply to Infer. Here is an example you can\nadapt to your project:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"infer run -- xcodebuild -workspace HelloWorld.xcworkspace -scheme HelloWorld\n")),(0,i.kt)("h3",{id:"infer-options----build-command-fails-during-a-linking-step"},(0,i.kt)("inlineCode",{parentName:"h3"},"infer [options] -- <build command>")," fails during a linking step"),(0,i.kt)("p",null,"The linker will sometimes not work if files have been compiled using a different\ncompiler, such as the one Infer uses ",(0,i.kt)("a",{parentName:"p",href:"/docs/next/infer-workflow"},"under the hood")," to\nanalyze your files."),(0,i.kt)("p",null,"A workaround consists in setting the ",(0,i.kt)("inlineCode",{parentName:"p"},"LD")," environment variable to a dummy\nlinker, for instance:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"LD=/bin/true infer [options] -- <build command>\n")),(0,i.kt)("h3",{id:"i-get-a-compilation-error-involving-pch-files-when-running-infer"},"I get a compilation error involving PCH files when running Infer"),(0,i.kt)("p",null,"For instance,\n",(0,i.kt)("inlineCode",{parentName:"p"},"error: PCH file uses an older PCH format that is no longer supported"),"."),(0,i.kt)("p",null,"This is a ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/facebook/infer/issues/96"},"known issue"),"."),(0,i.kt)("p",null,"Please run Infer with the following environment variable setting:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"GCC_PRECOMPILE_PREFIX_HEADER=NO\n")),(0,i.kt)("h3",{id:"infer-reports-a-too-many-open-files-error"},'Infer reports a "Too many open files" error'),(0,i.kt)("p",null,"The maximum number of files a program can simultaneously hold open is a bit low\non MacOs. You can increase the limit by running these commands for example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"sysctl -w kern.maxfiles=20480\nsysctl -w kern.maxfilesperproc=22480\nulimit -S -n 2048\n")),(0,i.kt)("p",null,"Note that the settings will be reset at the next reboot."),(0,i.kt)("p",null,"See also ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/facebook/infer/issues/22"},"this GitHub issue"),"."),(0,i.kt)("h3",{id:"i-get-a-lint-error-when-running-infer-with-gradle"},"I get a lint error when running Infer with gradle"),(0,i.kt)("p",null,"You need to manually disable linters to run Infer. For instance"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"infer run -- gradle build -x lint\n")),(0,i.kt)("p",null,"See also ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/facebook/infer/issues/58"},"this GitHub issue"),"."),(0,i.kt)("h3",{id:"running-infer-options----build-command-fails-with-some-other-error"},"Running ",(0,i.kt)("inlineCode",{parentName:"h3"},"infer [options] -- <build command>")," fails with some other error"),(0,i.kt)("p",null,"Please make sure that:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"<build command>")," runs successfully on its own."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"infer")," is in your ",(0,i.kt)("inlineCode",{parentName:"li"},"$PATH")," (try ",(0,i.kt)("inlineCode",{parentName:"li"},"which infer"),", it should show where ",(0,i.kt)("inlineCode",{parentName:"li"},"infer")," is\nlocated)")),(0,i.kt)("h3",{id:"i-get-errors-compiling-infer"},"I get errors compiling Infer"),(0,i.kt)("p",null,"Make sure the dependencies are up to date. They may change as we\nupdate Infer itself. See the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/facebook/infer/blob/main/INSTALL.md"},"installation\ndocument"),"\nfor an up-to-date list of dependencies and how to get them."),(0,i.kt)("h3",{id:"my-problem-is-not-listed-here"},"My problem is not listed here"),(0,i.kt)("p",null,"Do not hesitate to ",(0,i.kt)("a",{parentName:"p",href:"support#need-help?"},"contact us"),"."),(0,i.kt)("h2",{id:"faq"},"FAQ"),(0,i.kt)("p",null,"Here are some frequently asked questions. More to come."),(0,i.kt)("h3",{id:"how-do-i-suppress-infer-warnings-on-a-class-or-method"},"How do I suppress Infer warnings on a class or method?"),(0,i.kt)("p",null,"In Java code, you can do this ",(0,i.kt)("em",{parentName:"p"},"for some error types")," by annotating\nyour class or method with ",(0,i.kt)("inlineCode",{parentName:"p"},'@SuppressLint("<ISSUE_TYPE>")'),", for example\n",(0,i.kt)("inlineCode",{parentName:"p"},'@SuppressLint("NULL_DEREFERENCE")'),". However, not all checkers honor\nthis annotation."),(0,i.kt)("h3",{id:"is-infer-supported-for-windows"},"Is Infer supported for Windows?"),(0,i.kt)("p",null,"Infer is not supported on Windows at the moment. You may try installing Infer on\na Linux virtual machine if your project can be compiled on Linux."),(0,i.kt)("h3",{id:"how-does-infer-compare-to-the-clang-static-analyzer"},"How does Infer compare to the Clang Static Analyzer?"),(0,i.kt)("p",null,"Infer and Clang Static Analyzer (CSA) will typically find different\nkinds of issues on the same project. One thing that sets Infer apart\nfrom other static analysis tools is its ability to reason and find\nissues across multiple files. But CSA will find many kinds of issues\nthat Infer doesn't find: we send big respect to CSA! Really, these\ntools complement one another and it makes sense to use both."),(0,i.kt)("h3",{id:"how-does-infer-compare-to-android-linters-and-findbugs"},"How does Infer compare to Android linters and Findbugs?"),(0,i.kt)("p",null,"Infer finds deeper infer-procedural bugs sometimes spanning multiple files.\nLinters, in contrast, typically implement simple syntactic checks that are local\nwithin one procedure. But they are valuable and Infer doesn't try to duplicate\nwhat they are good at. At Facebook we run both Infer and a collection of Android\nlinters. Findbugs can be useful too; it is more akin to linters."))}m.isMDXComponent=!0}}]);
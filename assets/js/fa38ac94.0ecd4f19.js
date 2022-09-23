"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9410],{3905:function(e,n,t){t.d(n,{Zo:function(){return d},kt:function(){return u}});var a=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var l=a.createContext({}),c=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},d=function(e){var n=c(e.components);return a.createElement(l.Provider,{value:n},e.children)},h={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},p=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=c(t),u=i,m=p["".concat(l,".").concat(u)]||p[u]||h[u]||r;return t?a.createElement(m,o(o({ref:n},d),{},{components:t})):a.createElement(m,o({ref:n},d))}));function u(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=t.length,o=new Array(r);o[0]=p;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var c=2;c<r;c++)o[c]=t[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}p.displayName="MDXCreateElement"},2741:function(e,n,t){t.r(n),t.d(n,{contentTitle:function(){return l},default:function(){return p},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return d}});var a=t(7462),i=t(3366),r=(t(7294),t(3905)),o=["components"],s={title:"RacerD",description:"Thread safety analysis."},l=void 0,c={unversionedId:"checker-racerd",id:"checker-racerd",title:"RacerD",description:"Thread safety analysis.",source:"@site/docs/checker-racerd.md",sourceDirName:".",slug:"/checker-racerd",permalink:"/docs/next/checker-racerd",tags:[],version:"current",frontMatter:{title:"RacerD",description:"Thread safety analysis."},sidebar:"docs",previous:{title:"Quandary",permalink:"/docs/next/checker-quandary"},next:{title:"Resource Leak Lab Exercise",permalink:"/docs/next/checker-resource-leak-lab"}},d=[{value:"Background",id:"background",children:[],level:2},{value:"Triggering the analysis",id:"triggering-the-analysis",children:[],level:2},{value:"Warnings",id:"warnings",children:[{value:"Unprotected write",id:"unprotected-write",children:[],level:3},{value:"Read/Write Race",id:"readwrite-race",children:[],level:3},{value:"Interface not thread-safe",id:"interface-not-thread-safe",children:[],level:3}],level:2},{value:"Annotations to help RacerD understand your code",id:"annotations-to-help-racerd-understand-your-code",children:[{value:"<code>@ThreadConfined</code>",id:"threadconfined",children:[],level:3},{value:"<code>@Functional</code>",id:"functional",children:[],level:3},{value:"<code>@ReturnsOwnership</code>",id:"returnsownership",children:[],level:3},{value:"<code>@VisibleForTesting</code>",id:"visiblefortesting",children:[],level:3}],level:2},{value:"Interprocedural Reasoning",id:"interprocedural-reasoning",children:[],level:2},{value:'<a name="context"></a> Context and Selected Related Work',id:"-context-and-selected-related-work",children:[],level:2},{value:"Limitations",id:"limitations",children:[],level:2},{value:"List of Issue Types",id:"list-of-issue-types",children:[],level:2}],h={toc:d};function p(e){var n=e.components,t=(0,i.Z)(e,o);return(0,r.kt)("wrapper",(0,a.Z)({},h,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Thread safety analysis."),(0,r.kt)("p",null,"Activate with ",(0,r.kt)("inlineCode",{parentName:"p"},"--racerd"),"."),(0,r.kt)("p",null,"Supported languages:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"C/C++/ObjC: Yes"),(0,r.kt)("li",{parentName:"ul"},"C#/.Net: Yes"),(0,r.kt)("li",{parentName:"ul"},"Erlang: No"),(0,r.kt)("li",{parentName:"ul"},"Hack: No"),(0,r.kt)("li",{parentName:"ul"},"Java: Yes")),(0,r.kt)("p",null,"RacerD finds data races in your C++/Objective C and Java code. This page gives a more in-depth\nexplanation of how the analysis works ",(0,r.kt)("em",{parentName:"p"},"for Java code"),", but may be less complete than the\n",(0,r.kt)("a",{parentName:"p",href:"/docs/next/all-issue-types#thread_safety_violation"},"Thread Safety Violation bug description page"),".\nFor information on C++ and Objective C, see the\n",(0,r.kt)("a",{parentName:"p",href:"/docs/next/all-issue-types#lock_consistency_violation"},"Lock Consistency violation page"),"."),(0,r.kt)("p",null,"To run the analysis, you can use plain ",(0,r.kt)("inlineCode",{parentName:"p"},"infer")," (to run RacerD along with other\nanalyses that are run by default) or ",(0,r.kt)("inlineCode",{parentName:"p"},"infer --racerd-only")," (to run only RacerD)."),(0,r.kt)("p",null,"For example, the command ",(0,r.kt)("inlineCode",{parentName:"p"},"infer --racerd-only -- javac File.java")," will run\nRacerD on File.java."),(0,r.kt)("h2",{id:"background"},"Background"),(0,r.kt)("p",null,"RacerD statically analyzes Java code to detect potential concurrency bugs. This\nanalysis does not attempt to prove the absence of concurrency issues, rather, it\nsearches for a high-confidence class of data races. At the moment RacerD\nconcentrates on race conditions between methods in a class that is itself\nintended to be thread safe. A race condition occurs when there are two\nconcurrent accesses to a class member variable that are not separated by mutual\nexclusion, and at least one of the accesses is a write. Mutual exclusion can be\nensured by synchronization primitives such as locks, or by knowledge that both\naccesses occur on the same thread."),(0,r.kt)("h2",{id:"triggering-the-analysis"},"Triggering the analysis"),(0,r.kt)("p",null,"RacerD doesn't try to check ",(0,r.kt)("em",{parentName:"p"},"all")," code for concurrency issues; it only looks at\ncode that it believes can run in a concurrent context. There are two signals\nthat RacerD looks for: (1) Explicitly annotating a class/method with\n",(0,r.kt)("inlineCode",{parentName:"p"},"@ThreadSafe")," and (2) using a lock via the ",(0,r.kt)("inlineCode",{parentName:"p"},"synchronized")," keyword. In both\ncases, RacerD will look for concurrency issues in the code containing the signal\nand all of its dependencies. In particular, it will report races between any\nnon-",(0,r.kt)("inlineCode",{parentName:"p"},"private")," methods of the same class that can peform conflicting accesses.\nAnnotating a class/interface with ",(0,r.kt)("inlineCode",{parentName:"p"},"@ThreadSafe")," also triggers checking for all\nof the subclasses of the class/implementations of the interface."),(0,r.kt)("h2",{id:"warnings"},"Warnings"),(0,r.kt)("p",null,"Let's take a look at the different types of concurrency issues that RacerD\nflags. Two of the warning types are data races (",(0,r.kt)("inlineCode",{parentName:"p"},"Unprotected write")," and\n",(0,r.kt)("inlineCode",{parentName:"p"},"Read/write race"),"), and the third warning type encourages adding ",(0,r.kt)("inlineCode",{parentName:"p"},"@ThreadSafe"),"\nannotations to interfaces to trigger additional checking."),(0,r.kt)("h3",{id:"unprotected-write"},"Unprotected write"),(0,r.kt)("p",null,"RacerD will report an unprotected write when one or more writes can run in\nparallel without synchronization. These come in two flavors: (1) a self-race (a\nwrite-write race that occurs due to a method running in parallel with itself)\nand (2) two conflicting writes to the same location. Here's an example of the\nself-race flavor:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"@ThreadSafe\npublic class Dinner {\n  private int mTemperature;\n\n  public void makeDinner() {\n    boilWater();\n  }\n\n  private void boilWater() {\n    mTemperature = 100; // unprotected write.\n  }\n}\n")),(0,r.kt)("p",null,"The class ",(0,r.kt)("inlineCode",{parentName:"p"},"Dinner")," will generate the following report on the public method\n",(0,r.kt)("inlineCode",{parentName:"p"},"makeDinner()"),":"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"There may be a Thread Safety Violation: makeDinner() indirectly writes to mTemperature outside of synchronization.")),(0,r.kt)("p",null,"This warning can be fixed by synchronizing the access to ",(0,r.kt)("inlineCode",{parentName:"p"},"mTemperature"),", making\n",(0,r.kt)("inlineCode",{parentName:"p"},"mTemperature")," ",(0,r.kt)("inlineCode",{parentName:"p"},"volatile"),", marking ",(0,r.kt)("inlineCode",{parentName:"p"},"makeDinner")," as ",(0,r.kt)("inlineCode",{parentName:"p"},"@VisibleForTesting"),", or\nsuppressing the warning by annotating the ",(0,r.kt)("inlineCode",{parentName:"p"},"Dinner")," class or ",(0,r.kt)("inlineCode",{parentName:"p"},"makeDinner")," method\nwith ",(0,r.kt)("inlineCode",{parentName:"p"},"@ThreadSafe(enableChecks = false)"),"."),(0,r.kt)("h3",{id:"readwrite-race"},"Read/Write Race"),(0,r.kt)("p",null,"We sometimes need to protect read accesses as well as writes. Consider the\nfollowing class with unsynchronized methods."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"@ThreadSafe\npublic class Account {\n\n  int mBalance = 0;\n\n  public void deposit(int amount) {\n    if (amount > 0) {\n      mBalance += amount;\n    }\n  }\n\n  public int withdraw(int amount){\n    if (amount >= 0 && mBalance - amount >= 0) {\n      mBalance -= amount;\n      return mBalance;\n    } else {\n      return 0;\n    }\n  }\n}\n")),(0,r.kt)("p",null,"If you run the ",(0,r.kt)("inlineCode",{parentName:"p"},"withdraw()")," method in parallel with itself or with ",(0,r.kt)("inlineCode",{parentName:"p"},"deposit()"),"\nyou can get unexpected results here. For instance, if the stored balance is 11\nand you run ",(0,r.kt)("inlineCode",{parentName:"p"},"withdraw(10)")," in parallel with itself you can get a negative\nbalance. Furthermore, if you synchronize only the write statement\n",(0,r.kt)("inlineCode",{parentName:"p"},"mBalance -= amount"),", then you can still get this bad result. The reason is that\nthere is a read/write race between the boolean condition\n",(0,r.kt)("inlineCode",{parentName:"p"},"mBalance - amount >= 0")," and the writes. RacerD will duly warn"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"Read/Write race. Public method int Account.withdraw(int) reads from field Account.mBalance. Potentially races with writes in methods void Account.deposit(int), int Account.withdraw(int)")),(0,r.kt)("p",null,"on the line with this boolean condition."),(0,r.kt)("p",null,"A solution to the threading problem here is to make both methods ",(0,r.kt)("inlineCode",{parentName:"p"},"synchronized"),"\nto wrap both read and write accesses, or to use an ",(0,r.kt)("inlineCode",{parentName:"p"},"AtomicInteger")," for\n",(0,r.kt)("inlineCode",{parentName:"p"},"mBalance")," rather than an ordinary ",(0,r.kt)("inlineCode",{parentName:"p"},"int"),"."),(0,r.kt)("h3",{id:"interface-not-thread-safe"},"Interface not thread-safe"),(0,r.kt)("p",null,"In the following code, RacerD will report an ",(0,r.kt)("inlineCode",{parentName:"p"},"Interface not thread-safe")," warning\non the call to ",(0,r.kt)("inlineCode",{parentName:"p"},"i.bar()"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"interface I {\n  void bar();\n}\n\n@ThreadSafe\nclass C {\n  void foo(I i) {\n    i.bar(); // RacerD warns here\n  }\n}\n")),(0,r.kt)("p",null,"The way to fix this warning is to add a ",(0,r.kt)("inlineCode",{parentName:"p"},"@ThreadSafe")," annotation to the\ninterface ",(0,r.kt)("inlineCode",{parentName:"p"},"I"),", which will enforce the thread-safety of each of the\nimplementations of ",(0,r.kt)("inlineCode",{parentName:"p"},"I"),"."),(0,r.kt)("p",null,"You might wonder why it's necessary to annotate ",(0,r.kt)("inlineCode",{parentName:"p"},"I")," -- can't RacerD just look at\nall the implementations of ",(0,r.kt)("inlineCode",{parentName:"p"},"i")," at the call site for ",(0,r.kt)("inlineCode",{parentName:"p"},"bar"),"? Although this is a\nfine idea idea in principle, it's a bad idea in practice due to a (a) separate\ncompilation and (b) our diff-based deployment model. In the example above, the\ncompiler doesn't have to know about all implementations (or indeed, any\nimplementations) of ",(0,r.kt)("inlineCode",{parentName:"p"},"I")," at the time it compiles this code, so there's no\nguarantee that RacerD will know about or be able to check all implementations of\n",(0,r.kt)("inlineCode",{parentName:"p"},"I"),". That's (a). For (b), say that we check that all implementations of ",(0,r.kt)("inlineCode",{parentName:"p"},"I")," are\nthread-safe at the time this code is written, but we don't add the annotation.\nIf someone else comes along and adds a new implementation of ",(0,r.kt)("inlineCode",{parentName:"p"},"I")," that is not\nthread-safe, RacerD will have no way of knowing that this will cause a potential\nbug in ",(0,r.kt)("inlineCode",{parentName:"p"},"foo"),". But if ",(0,r.kt)("inlineCode",{parentName:"p"},"I")," is annotated, RacerD will enforce that all new\nimplementations of ",(0,r.kt)("inlineCode",{parentName:"p"},"I")," are thread-safe, and ",(0,r.kt)("inlineCode",{parentName:"p"},"foo")," will remain bug-free."),(0,r.kt)("h2",{id:"annotations-to-help-racerd-understand-your-code"},"Annotations to help RacerD understand your code"),(0,r.kt)("p",null,"Getting started with RacerD doesn't require any annotations at all -- RacerD\nwill look at your usage of locks and figure out what data is not guarded\nconsistently. But increasing the coverage and signal-to-noise ratio may require\nadding ",(0,r.kt)("inlineCode",{parentName:"p"},"@ThreadSafe")," annotations along with some of the other annotations\ndescribed below. Most of annotations described below can be used via the Maven\nCentral package available\n",(0,r.kt)("a",{parentName:"p",href:"https://maven-repository.com/artifact/com.facebook.infer.annotation/infer-annotation"},"here"),"."),(0,r.kt)("h3",{id:"threadconfined"},(0,r.kt)("inlineCode",{parentName:"h3"},"@ThreadConfined")),(0,r.kt)("p",null,"The intuitive idea of thread-safety is that a class is impervious to concurrency\nissues for all concurrent contexts, even those that have not been written yet\n(it is future-proof). RacerD implements this by naively assuming that any method\ncan potentially be called on any thread. You may determine, however, that an\nobject, method, or field is only ever accessed on a single thread during program\nexecution. Annotating such elements with ",(0,r.kt)("inlineCode",{parentName:"p"},"@ThreadConfined")," informs RacerD of\nthis restriction. Note that a thread-confined method cannot race with itself but\nit can still race with other methods."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"List mCache;\n\n@ThreadConfined(UI)\nvoid prepareCache() {\n  // populate the cache\n  mCache.add(...);\n  // post cache cleanup task to run later\n  mUIExecutor.execute(new Runnable() {\n    @ThreadConfined(UI)\n    public void run() {\n      mCache.clear();\n    }\n  });\n}\n")),(0,r.kt)("p",null,"In this example, both ",(0,r.kt)("inlineCode",{parentName:"p"},"prepareCache")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"run")," touch ",(0,r.kt)("inlineCode",{parentName:"p"},"mCache"),". But there's no\npossibility of a race between the two methods because both of them will run\nsequentially on the UI thread. Adding a ",(0,r.kt)("inlineCode",{parentName:"p"},"@ThreadConfined(UI)")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"@UiThread"),"\nannotation to these methods will stop it from warning that there is a race on\n",(0,r.kt)("inlineCode",{parentName:"p"},"mCache"),". We could also choose to add a ",(0,r.kt)("inlineCode",{parentName:"p"},"@ThreadConfined")," annotation to ",(0,r.kt)("inlineCode",{parentName:"p"},"mCache"),"\nitself."),(0,r.kt)("h3",{id:"functional"},(0,r.kt)("inlineCode",{parentName:"h3"},"@Functional")),(0,r.kt)("p",null,"Not all races are bugs; a race can be benign. Consider the following:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"@Functional Boolean askNetworkIfShouldShowFeature();\n\nprivate Boolean mShouldShowFeature;\n\n@ThreadSafe boolean shouldShowFeature() {\n  if (mShouldShowFeature == null) {\n    mShouldShowFeature = askNetworkIfShouldShowFeature();\n  }\n  return mShouldShowFeature;\n}\n")),(0,r.kt)("p",null,"This code caches the result of an expensive network call that checks whether the\ncurrent user should be shown an experimental feature. This code looks racy, and\nindeed it is: if two threads execute ",(0,r.kt)("inlineCode",{parentName:"p"},"shouldShowFeature()")," at the same time, one\nmay read ",(0,r.kt)("inlineCode",{parentName:"p"},"mShouldShowFeature")," at the same time the other is writing it."),(0,r.kt)("p",null,"However, this is actually a ",(0,r.kt)("em",{parentName:"p"},"benign")," race that the programmer intentionally\nallows for performance reasons. The reason this code is safe is that the\nprogrammer knows that ",(0,r.kt)("inlineCode",{parentName:"p"},"askNetworkIfShouldShowFeature()")," will always return the\nsame value in the same run of the app. Adding synchronization would remove the\nrace, but acquiring/releasing locks and lock contention would potentially slow\ndown every call to ",(0,r.kt)("inlineCode",{parentName:"p"},"shouldShowFeature()"),". The benign race approach makes every\ncall after the first fast without changing the safety of the code."),(0,r.kt)("p",null,"RacerD will report a race on this code by default, but adding the\n",(0,r.kt)("inlineCode",{parentName:"p"},"@Functional annotation to askNetworkIfShouldShowFeature()")," informs RacerD that\nthe function is always expected to return the same value. This assumption allows\nRacerD to understand that this particular code is safe, though it will still\n(correctly) warn if ",(0,r.kt)("inlineCode",{parentName:"p"},"mShouldShowFeature")," is read/written elsewhere."),(0,r.kt)("p",null,"Be sure not to use the ",(0,r.kt)("inlineCode",{parentName:"p"},"@Functional")," pattern for ",(0,r.kt)("em",{parentName:"p"},"singleton instantiation"),', as\nit\'s possible the "singleton" can be constructed more than once.'),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"public class MySingleton {\n  private static sInstance;\n\n  // Not @Functional\n  public MySingleton getInstance() {\n    if (sInstance == null) {\n      // Different threads may construct their own instances.\n      sInstance == new MySingleton();\n    }\n    return sInstance;\n  }\n}\n")),(0,r.kt)("h3",{id:"returnsownership"},(0,r.kt)("inlineCode",{parentName:"h3"},"@ReturnsOwnership")),(0,r.kt)("p",null,"RacerD does not warn on unprotected writes to ",(0,r.kt)("em",{parentName:"p"},"owned")," objects. An object is\nowned if it has been freshly allocated in the current thread and has not escaped\nto another thread. RacerDf automatically tracks ownership in most cases, but it\nneeds help with ",(0,r.kt)("inlineCode",{parentName:"p"},"abstract")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"interface")," methods that return ownership:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"@ThreadSafe\npublic interface Car {\n  @ReturnsOwnership abstract Car buyCar();\n\n  void carsStuff() {\n    Car myCar = new Car();\n    myCar.wheels = 4; // RacerD won't warn here because it knows myCar is owned\n    Car otherCar = buyCar();\n    otherCar.wheels = 3; // RacerD would normally warn here, but won't because of the `@ReturnsOwnership` annotation\n  }\n}\n")),(0,r.kt)("h3",{id:"visiblefortesting"},(0,r.kt)("inlineCode",{parentName:"h3"},"@VisibleForTesting")),(0,r.kt)("p",null,"RacerD reports races between any two non",(0,r.kt)("inlineCode",{parentName:"p"},"-private")," methods of a class that may\nrun in a concurrent context. Sometimes, a RacerD report may be false because one\nof the methods cannot actually be called from outside the current class. One fix\nis making the method ",(0,r.kt)("inlineCode",{parentName:"p"},"private")," to enforce this, but this might break unit tests\nthat need to call the method in order to test it. In this case, the\n",(0,r.kt)("inlineCode",{parentName:"p"},"@VisibleForTesting")," annotation will allow RacerD to consider the method as\neffectively ",(0,r.kt)("inlineCode",{parentName:"p"},"private")," will still allowing it to be called from the unit test:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"@VisibleForTesting void setF() {\n  this.f = ...; // RacerD would normally warn here, but @VisibleForTesting will silence the warning\n}\n\nsynchronized void setFWithLock() {\n  setF();\n}\n")),(0,r.kt)("p",null,"Unlike the other annotations shown here, this one lives in\n",(0,r.kt)("a",{parentName:"p",href:"https://developer.android.com/reference/android/support/annotation/VisibleForTesting.html"},"Android"),"."),(0,r.kt)("h2",{id:"interprocedural-reasoning"},"Interprocedural Reasoning"),(0,r.kt)("p",null,"An important feature of RacerD is that it finds races by analyzing not just one\nfile or class, but by looking at memory accesses that occur after going through\nseveral procedure calls. It handles this even between classes and between files."),(0,r.kt)("p",null,"Here is a very basic example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"@ThreadSafe\nclass A{\n\n  void m1(B bb) {\n    bb.meth_write();\n  }\n}\n\nclass B{\n Integer x;\n\n void meth_write() {\n   x = 88;\n }\n\n}\n")),(0,r.kt)("p",null,"Class ",(0,r.kt)("inlineCode",{parentName:"p"},"B")," is not annotated ",(0,r.kt)("inlineCode",{parentName:"p"},"@ThreadSafe")," and does not have any locks, so RacerD\ndoes not directly look for threading issues there. However, method ",(0,r.kt)("inlineCode",{parentName:"p"},"m1()")," in\nclass ",(0,r.kt)("inlineCode",{parentName:"p"},"A")," has a potential self-race, if it is run in parallel with itself and\nthe same argument for each call. RacerD discovers this."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"InterProc.java:17: error: THREAD_SAFETY_VIOLATION\n  Unprotected write. Non-private method `A.m1` indirectly writes to field `&this.B.x` outside of synchronization.\n Reporting because the current class is annotated `@ThreadSafe`, so we assume that this method can run in\n parallel with other non-private methods in the class (incuding itself).\n  15.\n  16.     void m1(B bb) {\n  17. >     bb.meth_write();\n  18.     }\n  19.   }\n")),(0,r.kt)("p",null,"RacerD does this sort of reasoning using what is known as a ",(0,r.kt)("em",{parentName:"p"},"compositional\ninteprocedural analysis"),". There, each method is analyzed independently of its\ncontext to produce a summary of the behaviour of the procedure. In this case the\nsummaries for ",(0,r.kt)("inlineCode",{parentName:"p"},"m1()' and"),"meth()' include information as follows."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Procedure: void A.m1(B)\nAccesses: { Unprotected({ 1 }) -> { Write to &bb.B.x at void B.meth_write() at line 17 } }\n\nProcedure: void B.meth_write()\nAccesses { Unprotected({ 0 }) -> { Write to &this.B.x at  at line 25 } }\n")),(0,r.kt)("p",null,"The descriptions here are cryptic and do not include all the information in the\nsummaries, but the main point is that you can use RacerD to look for races in\ncodebases where the mutations done by threads might occur only after a chain of\nprocedure calls."),(0,r.kt)("h2",{id:"-context-and-selected-related-work"},(0,r.kt)("a",{name:"context"})," Context and Selected Related Work"),(0,r.kt)("p",null,"Reasoning about concurrency divides into bug detection and proving absence of\nbugs. RacerD is on the detection side of reasoning."),(0,r.kt)("p",null,"The rapid growth in the number of interleavings is problematic for tools that\nattempt exhaustive exploration. With just 150 instructions for two threads, the\nnumber 10^88 of interleavings is more that the estimated number of atoms in the\nknown universe.\n",(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Partial_order_reduction"},"There has been important work which uses various techniques to attempt to reduce the number of interleavings"),"\nwhile still in principle covering all possibilities, but scale is still a\nchallenge. Note that RacerD is not exhaustive: it has false negatives (missed\nbugs). But in compensation it is fast, and effective (it finds bugs in\npractice)."),(0,r.kt)("p",null,"Static analysis for concurrency has attracted a lot of attention from\nresearchers, but difficulties with scalability and precision have meant that\nprevious techniques have had little industrial impact. Automatic static race\ndetection itself has seen significant work. The most advanced approaches,\nexemplified by the ",(0,r.kt)("a",{parentName:"p",href:"http://www.cis.upenn.edu/~mhnaik/pubs/pldi06.pdf"},"Chord"),"\ntool, often use a whole-program analysis paired with a sophisticated alias\nanalysis, two features we have consciously avoided. Generally speaking, the\nleading research tools can be more precise, but RacerD is faster and can operate\nwithout the whole program: we have opted to go for speed in a way that enables\nindustrial deployment on a large, rapidly changing codebase, while trying to use\nas simple techniques as possible to cover many (not all) of the patterns covered\nby slower but precise research tools."),(0,r.kt)("p",null,"An industrial static analysis tool from\n",(0,r.kt)("a",{parentName:"p",href:"http://homepages.inf.ed.ac.uk/dts/pub/avocs2015.pdf"},"Contemplate")," also targets\n@ThreadSafe annotations, but limits the amount of inter-procedural reasoning:\n\u201cThis analysis is interprocedural, but to keep the overall analysis scalable,\nonly calls to private and protected methods on the same class are followed\u201d.\nRacerD does deep, cross-file and cross-class inter-procedural reasoning, and yet\nstill scales; the inter-class capability was one of the first requests from\nFacebook engineers.\n",(0,r.kt)("a",{parentName:"p",href:"https://code.facebook.com/posts/1537144479682247/finding-inter-procedural-bugs-at-scale-with-infer-static-analyzer/"},"A separate blog post looked at 100 recent data race fixes"),"\nin Infer's deployment in various bug categories, and for data races observed\nthat 53 of them were inter-file (and thus involving multiple classes).\n",(0,r.kt)("a",{parentName:"p",href:"#interprocedural-reasoning"},"See above")," for an example of RacerD's interprocedural\ncapabilities."),(0,r.kt)("p",null,"One reaction to the challenge of developing effective static race detectors has\nbeen to ask the programmer to do more work to help the analyzer. Examples of\nthis approach include the\n",(0,r.kt)("a",{parentName:"p",href:"https://clang.llvm.org/docs/ThreadSafetyAnalysis.html"},"Clang Thread Safety Analyzer"),",\nthe typing of ",(0,r.kt)("a",{parentName:"p",href:"https://doc.rust-lang.org/std/sync/struct.Mutex.html"},"locks")," in\nRust, and the use/checking of @GuardedBy annotations in\n",(0,r.kt)("a",{parentName:"p",href:"https://homes.cs.washington.edu/~mernst/pubs/locking-semantics-nfm2016.pdf"},"Java"),"\nincluding in\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/google/error-prone/blob/master/docs/bugpattern/GuardedBy.md"},"Google's Error Prone analyzer"),".\nWhen lock annotations are present they make the analyzer's life easier. It is possible to have a very effective race analysis without decreeing\nthat such annotations must be present. This was essential for our deployment,\nsince ",(0,r.kt)("em",{parentName:"p"},"requiring")," lock annotations would have been a show stopper for converting\nmany thousands of lines of code to a concurrent context. We believe that this\nfinding should be transportable to new type systems and language designs, as\nwell as to other analyses for existing languages."),(0,r.kt)("p",null,"Another reaction to difficulties in static race detection has been to instead\ndevelop dynamic analyses, automatic testing tools which work by running a\nprogram to attempt to find flaws. Google's Thread Sanitizer is a widely used and\nmature tool in this area, which has been used in production to find many bugs in\nC-family languages.\n",(0,r.kt)("a",{parentName:"p",href:"http://www.cs.columbia.edu/~junfeng/11fa-e6121/papers/thread-sanitizer.pdf"},"The Thread Sanitizer authors explicitly call out limitations with static race analyzers"),"\nas part of their motivation: \u201cIt seems unlikely that static detectors will work\neffectively in our environment: Google\u2019s code is large and complex enough that\nit would be expensive to add the annotations required by a typical static\ndetector\u201d."),(0,r.kt)("p",null,"We have worked to limit the annotations that RacerD needs, for reasons similar\nthose expressed by the Thread Sanitizer authors. And we have sought to bring the\ncomplementary benefits of static analysis \u2014 possibility of cheaper analysis and\nfast reporting, and ability to analyze code before it is placed in a context to\nrun \u2014 to race detection. But we are interested as well in the future in\nleveraging ideas in the dynamic techniques to improve or add to our analysis for\nrace detection."),(0,r.kt)("h2",{id:"limitations"},"Limitations"),(0,r.kt)("p",null,"There are a number of known limitations to the design of the race detector."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"It looks for races involving syntactically identical access paths, and misses\nraces due to aliasing"),(0,r.kt)("li",{parentName:"ul"},"It misses races that arise from a locally declared object escaping its scope"),(0,r.kt)("li",{parentName:"ul"},"It uses a boolean locks abstraction, and so misses races where two accesses\nare mistakenly protected by different locks"),(0,r.kt)("li",{parentName:"ul"},"It assumes a deep ownership model, which misses races where local objects\nrefer to or contain non-owned objects."),(0,r.kt)("li",{parentName:"ul"},"It avoids reasoning about weak memory and Java's volatile keyword")),(0,r.kt)("p",null,"Most of these limitations are consistent with the design goal of reducing false\npositives, even if they lead to false negatives. They also allow technical\ntradeoffs which are different than if we were to favour reduction of false\nnegatives over false positives."),(0,r.kt)("p",null,"A different kind of limitation concerns the bugs searched for: Data races are\nthe most basic form of concurrency error, but there are many types of\nconcurrency issues out there that RacerD does not check for (but might in the\nfuture). Examples include deadlock, atomicity, and check-then-act bugs (shown\nbelow). You must look for these bugs yourself!"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"@ThreadSafe\npublic class SynchronizedList<T> {\n  synchronized boolean isEmpty() { ... }\n  synchronized T add(T item) { ... }\n\n// Not thread safe!!!\npublic class ListUtil<T> {\n  public void addIfEmpty(SynchronizedList<T> list, T item) {\n    if (list.isEmpty()) {\n      // In a race, another thread can add to the list here.\n      list.add(item);\n    }\n  }\n}\n")),(0,r.kt)("p",null,"Finally, using ",(0,r.kt)("inlineCode",{parentName:"p"},"synchronized")," blindly as a means to fix every unprotected write\nor read is not always safe. Even with RacerD, finding, understanding, and fixing\nconcurrency issues is difficult. If you would like to learn more about best\npractices, ",(0,r.kt)("a",{parentName:"p",href:"http://jcip.net/"},"Java Concurrency in Practice")," is an excellent\nresource."),(0,r.kt)("h2",{id:"list-of-issue-types"},"List of Issue Types"),(0,r.kt)("p",null,"The following issue types are reported by this checker:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/next/all-issue-types#guardedby_violation"},"GUARDEDBY_VIOLATION")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/next/all-issue-types#interface_not_thread_safe"},"INTERFACE_NOT_THREAD_SAFE")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/next/all-issue-types#lock_consistency_violation"},"LOCK_CONSISTENCY_VIOLATION")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/next/all-issue-types#thread_safety_violation"},"THREAD_SAFETY_VIOLATION"))))}p.isMDXComponent=!0}}]);
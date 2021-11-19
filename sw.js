(()=>{"use strict";var e={913:()=>{try{self["workbox:core:6.2.4"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:6.2.4"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.2.4"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.2.4"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,s),i.exports}(()=>{s(913);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},n=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),i=e=>e||n(a.precache),r=e=>e||n(a.runtime);function c(e,t){const s=t();return e.waitUntil(s),s}s(977);function o(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:a}=e;if(!a)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),i=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:i.href}}class h{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class l{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let u;async function f(e,s){let a=null;if(e.url){a=new URL(e.url).origin}if(a!==self.location.origin)throw new t("cross-origin-copy-response",{origin:a});const n=e.clone(),i={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=s?s(i):i,c=function(){if(void 0===u){const e=new Response("");if("body"in e)try{new Response(e.body),u=!0}catch(e){u=!1}u=!1}return u}()?n.body:await n.blob();return new Response(c,r)}function d(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class p{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const g=new Set;s(873);function y(e){return"string"==typeof e?new Request(e):e}class w{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new p,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let a=y(e);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const i=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:i,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:i.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=y(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,i=await this.getCacheKey(t,"read"),r=Object.assign(Object.assign({},n),{cacheName:a});s=await caches.match(i,r);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(e,s){const a=y(e);var n;await(n=0,new Promise((e=>setTimeout(e,n))));const i=await this.getCacheKey(a,"write");if(!s)throw new t("cache-put-with-no-response",{url:(r=i.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const c=await this._ensureResponseSafeToCache(s);if(!c)return!1;const{cacheName:o,matchOptions:h}=this._strategy,l=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),f=u?await async function(e,t,s,a){const n=d(t.url,s);if(t.url===n)return e.match(t,a);const i=Object.assign(Object.assign({},a),{ignoreSearch:!0}),r=await e.keys(t,i);for(const t of r)if(n===d(t.url,s))return e.match(t,a)}(l,i.clone(),["__WB_REVISION__"],h):null;try{await l.put(i,u?c.clone():c)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of g)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:f,newResponse:c.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){if(!this._cacheKeys[t]){let s=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))s=y(await e({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[t]=s}return this._cacheKeys[t]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n=Object.assign(Object.assign({},a),{state:s});return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class _ extends class{constructor(e={}){this.cacheName=r(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new w(this,{event:t,request:s,params:a}),i=this._getResponse(n,s,t);return[i,this._awaitComplete(i,n,s,t)]}async _getResponse(e,s,a){let n;await e.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const i of e.iterateCallbacks("handlerDidError"))if(n=await i({error:t,event:a,request:s}),n)break;if(!n)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,i;try{n=await e}catch(i){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(i=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:i}),t.destroy(),i)throw i}}{constructor(e={}){e.cacheName=i(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(_.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let a;const n=s.params||{};if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{0;const t=n.integrity,i=e.integrity,r=!i||i===t;if(a=await s.fetch(new Request(e,{integrity:i||t})),t&&r){this._useDefaultCacheabilityPluginIfNeeded();await s.cachePut(e,a.clone());0}}return a}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(e);if(!await s.cachePut(e,a.clone()))throw new t("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==_.copyRedirectedCacheableResponsesPlugin&&(a===_.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(_.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}_.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},_.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await f(e):e};class v{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new _({cacheName:i(e),plugins:[...t,new l({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const a of e){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:e,url:n}=o(a),i="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==a.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,a.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,i),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return c(e,(async()=>{const t=new h;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),i=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:i,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return c(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}s(80);(async()=>{const e=function(){const e=JSON.parse(new URLSearchParams(self.location.search).get("params"));return e.debug&&console.log("[Docusaurus-PWA][SW]: Service Worker params:",e),e}(),t=[{"revision":"eead1ffa29ee1442911bfd224fc37945","url":"404.html"},{"revision":"0ed1822738cea2d8819a1c365b7082d6","url":"A-Introduction/compilers.html"},{"revision":"c89f986f0a0b11619ea22c6da07348bc","url":"A-Introduction/computers.html"},{"revision":"10ef570fafe2a502fdfdc13e314304e8","url":"A-Introduction/information.html"},{"revision":"bf7dce3db9f4a254799b919cc0b6defc","url":"assets/css/styles.d34e8f2b.css"},{"revision":"781cc76c94226c460eb1aea6adb22329","url":"assets/js/0cc29fcc.35339f06.js"},{"revision":"92b5aa69bfeabf775887cad91dcf1509","url":"assets/js/0e384e19.9b718041.js"},{"revision":"33ea4cbf4baccb9f527f1f77be4b49e7","url":"assets/js/131.4480e2ac.js"},{"revision":"01ed574a7b77f38f5399038f29cb87e0","url":"assets/js/17896441.0be45d8d.js"},{"revision":"653dc3a18da0a92a9e1b04a6b146344f","url":"assets/js/1be78505.33bb9fea.js"},{"revision":"14a56351979c49dcd1fcacf598352af6","url":"assets/js/2cf355b8.e1264b40.js"},{"revision":"bd3d2edd6fc3791cf66760b068b40215","url":"assets/js/3382963c.6f837b73.js"},{"revision":"5fcb86745bab0519026a7947ee7d8333","url":"assets/js/33fabada.6a383243.js"},{"revision":"07eaad9b546db7cd5fdfc3f9fad6ff11","url":"assets/js/403.3c033790.js"},{"revision":"22a8deae64802dd034e779372cf20897","url":"assets/js/4032b14d.ad58d45a.js"},{"revision":"1183f09da1d73940586e31ee961c50e4","url":"assets/js/422db77a.c2a9f4e2.js"},{"revision":"493c7f663621335409c2c856d4198773","url":"assets/js/4303f665.998a7f76.js"},{"revision":"a92ebecaf97af0ac85e2fc6a4040ecfa","url":"assets/js/4515fa64.7e948f5c.js"},{"revision":"447740c7df6d745600d178573bd868f5","url":"assets/js/56a8551a.055a18bf.js"},{"revision":"8d5f5794e1fa816d26ce482878845a3b","url":"assets/js/5a0316ec.2b1d9315.js"},{"revision":"383e2f95ffff807a1f681865734bb845","url":"assets/js/5a489454.8b1e011b.js"},{"revision":"faab83752b3037032416ecb0712888c4","url":"assets/js/5b5f059d.24664473.js"},{"revision":"ecd82da8743f0de5b510f5fa3559ed92","url":"assets/js/662be6d3.11ba8859.js"},{"revision":"bba448dde255f7fd3a2eee93aaf70e02","url":"assets/js/6bc3106f.b8192116.js"},{"revision":"b7c4abc60fc422e3ef36265265599ccd","url":"assets/js/749ee8a4.b0d3abf7.js"},{"revision":"7ccaf68cc8352d3105816873e21239a9","url":"assets/js/75.0707712b.js"},{"revision":"f806762d4089edef2b196008ebb34f60","url":"assets/js/7d53361e.2c7fd756.js"},{"revision":"899b8a69b795a0b2570972fcdb440420","url":"assets/js/9052a911.56808051.js"},{"revision":"6bc5af79a2c2a72402305c2465877fc2","url":"assets/js/923.52611baf.js"},{"revision":"a5f44877749ddc93f5614c3ed3a213a2","url":"assets/js/935f2afb.715ba283.js"},{"revision":"fae588fdd80fe9471a3d20cb09c2a557","url":"assets/js/937af094.b6fe585c.js"},{"revision":"a2cea5278455bb2927a45c4d1bf4c83e","url":"assets/js/938.91de8cce.js"},{"revision":"c1dadfcf2fd91a0ca1d58db10d77be09","url":"assets/js/9e4087bc.673565e0.js"},{"revision":"678a6b29a7b5d42594661cb263c52de7","url":"assets/js/a4ceae05.1388b2cc.js"},{"revision":"bd3b0e4c62f335632d10062a42613172","url":"assets/js/a6fda238.93c094f0.js"},{"revision":"0d206d16e173a0f85357c3b902ac24b4","url":"assets/js/b2f554cd.bf55c8bb.js"},{"revision":"3dc7c1d3dd75d095aca0a220036a8ca6","url":"assets/js/b4ee539c.d0795d78.js"},{"revision":"33362a1ed11a459818df34e40355086f","url":"assets/js/b5beb390.35c60705.js"},{"revision":"b95d250afe9d3c82f84fca561d4dc68d","url":"assets/js/b5eb431a.67bddcb2.js"},{"revision":"81e6ba5d7dcc76bfe490a4a59de546ad","url":"assets/js/c732709b.b7c2779b.js"},{"revision":"3481c6bfe9b8c79fb005c53127be52f0","url":"assets/js/c87e92e6.9e854f79.js"},{"revision":"3989e9f06189e85b8233281f32d63209","url":"assets/js/cee6b58e.9d836912.js"},{"revision":"051ecd950e7096d3865aa673fc63f519","url":"assets/js/d6ffb831.d89f04a5.js"},{"revision":"e2b61324578b8494ad6cd834238dc962","url":"assets/js/d83e5981.b4e744df.js"},{"revision":"38eb4fe7e98bdf127406ddf0eab3ba7c","url":"assets/js/dc5ffb51.c6ba105c.js"},{"revision":"05c60157330d6fa5e9eea5f87bb27550","url":"assets/js/dd68b280.eba364d5.js"},{"revision":"2b5adddbbfd5b3ccaedfff52e713d2a9","url":"assets/js/ef36065f.2ddff225.js"},{"revision":"de2809a005441db85f9e5e65f6cac69b","url":"assets/js/main.383d19ed.js"},{"revision":"2b8ce6133b8a02e4583a67e231c5a293","url":"assets/js/runtime~main.fd1ab60b.js"},{"revision":"12b482cf94398a9800b5d54f26a85d37","url":"B-Computations/a-simple-calculation.html"},{"revision":"60aa909089e3282cbe46c3116f8aba7b","url":"B-Computations/expressions.html"},{"revision":"863bf91d8f172e0eb9305d4305d8bede","url":"B-Computations/logic.html"},{"revision":"58ded6ad94f3fef4f5744b36a4508f2b","url":"B-Computations/style-guidelines.html"},{"revision":"feec0278256dcead379972e686be54cb","url":"B-Computations/testing-and-debugging.html"},{"revision":"fc826dddcbf44a4bc3753fccee747bd9","url":"B-Computations/types.html"},{"revision":"be7d06630f5b6497654d713fba56f648","url":"blog/archive.html"},{"revision":"75f532c68574c92cbcbd9b1bf2b2d6af","url":"C-Data-Structures/arrays.html"},{"revision":"16db3bb8e71b2b7577eb8a43e10045c5","url":"C-Data-Structures/structures.html"},{"revision":"036a59210a9cd4a9c1a49dbfb3bf6c73","url":"D-Modularity/functions-arrays-and-structs.html"},{"revision":"ce26af81d4a406babae584c1675e035d","url":"D-Modularity/functions.html"},{"revision":"e64c2c71411eb429a2891c42e7749cad","url":"D-Modularity/input-functions.html"},{"revision":"acc23767f1d118de5f383f5fe0f46b75","url":"D-Modularity/library-functions.html"},{"revision":"1f2ecc302e39a88d18f34666c3a56e4a","url":"D-Modularity/output-functions.html"},{"revision":"03e2d0f00a462633e6fda28a28852964","url":"D-Modularity/pointers.html"},{"revision":"b9eb97e799e4f94aa3c0c8d977228c1f","url":"E-Secondary-Storage/records-and-files.html"},{"revision":"4cd7bad669587656fc188dbfa6b0a835","url":"E-Secondary-Storage/text-files.html"},{"revision":"11a4ff88d2d147f2e209b8ffeb76bee5","url":"F-Refinements/character-strings.html"},{"revision":"b9564f20b00ccdc45544e94fe18d2312","url":"F-Refinements/more-input-and-output.html"},{"revision":"3e8ecddf6f5ef4f06c2466459d38c07e","url":"F-Refinements/pointers-arrays-and-structs.html"},{"revision":"30ae2df07192144d400b33852b99dfa4","url":"F-Refinements/portability.html"},{"revision":"e02ac16047c32b0f2ead69e0b97cf015","url":"F-Refinements/string-library.html"},{"revision":"8c67e89921ecbb2a2dbd04c4792665e3","url":"F-Refinements/two-dimensional-arrays.html"},{"revision":"efa5d2cb8e367bf2785bc8f6328670b6","url":"index.html"},{"revision":"8fe72f0bd462e60b454aed3ab6a6de54","url":"manifest.json"},{"revision":"c35e05c6e0b1119e6b36cba7d43653bb","url":"refinements/algorithms.html"},{"revision":"c61a1e4d9f492d81b9d0624ef7b97685","url":"Resources-Appendices/ascii-collating-sequence.html"},{"revision":"28dffa6b6afdac4a01ac82f2d3a4e23a","url":"Resources-Appendices/data-conversions.html"},{"revision":"b0069b0144fe16a2bbd86aa1f6bf0684","url":"Resources-Appendices/ebcdic-collating-sequence.html"},{"revision":"66958e6ca9e5807ac661fa3f04b5871a","url":"Resources-Appendices/operators.html"},{"revision":"1f733369c636a3a5c83ba5c1285a9763","url":"weeklyContents.html"},{"revision":"0b582513eb9d32ce418453e573a2ff3d","url":"assets/images/bytenibbit-07ecd6ebcd709b1c68b3165fc4eb7b70.jpg"},{"revision":"01aadc3b47eabec27d4bf956fa38f496","url":"assets/images/image10-3c0860c71abc76d650a0449f46788e88.png"},{"revision":"eb0d033ef7680c48fa9d042f456177c9","url":"assets/images/image18-74e59c9cc7d90ed0fa02b5202e54ebf7.png"},{"revision":"9564946e4f14735e4dd73b3e0440b3cc","url":"assets/images/image21-c93c5084abf036eda1ad8eb8c2aadadc.png"},{"revision":"3a3505e1e75686eeb7ea7aaddd54e70c","url":"assets/images/image22-370ae9217a1e66a4113df60b3d130760.png"},{"revision":"613bfcdd913759af82ec9e2c8d269085","url":"assets/images/image25-38f7668be78f6c4d46f7a13beda33269.png"},{"revision":"6ef6f40b4dbec1ea55a37ca398d5fd59","url":"assets/images/image26-392914dc0ad33c98f016eea21d8ef845.png"},{"revision":"5b23e56cbef4781c15380c6b075f8585","url":"assets/images/image33-97a20f7670ce93f5d6ebee76821303e8.png"},{"revision":"f82e6853dd0b7131ceb284213b7ee975","url":"assets/images/image34-b8bf0942477cf59e59625ef8331d322f.png"},{"revision":"573b329ad70ee785c3d5800f18c3acdb","url":"assets/images/image35-5827db2e30ddd672401f42ba2755d93e.png"},{"revision":"e850dd3120e0ccd511027cf1db2811c5","url":"assets/images/image36-3127a2d41d51f435d25c95e6c51b453a.png"},{"revision":"17073ae4bd575ff6a35d290f226e5c6d","url":"assets/images/image5-14e94d08f2f4ec8c26a25039f68b3063.png"},{"revision":"0b582513eb9d32ce418453e573a2ff3d","url":"img/bytenibbit.jpg"},{"revision":"7fa1a026116afe175cae818030d4ffc4","url":"img/docusaurus.png"},{"revision":"ef2266bfb84465c731756b58cde0afb8","url":"img/favicon.ico"},{"revision":"01aadc3b47eabec27d4bf956fa38f496","url":"img/image10.png"},{"revision":"eb0d033ef7680c48fa9d042f456177c9","url":"img/image18.png"},{"revision":"9564946e4f14735e4dd73b3e0440b3cc","url":"img/image21.png"},{"revision":"3a3505e1e75686eeb7ea7aaddd54e70c","url":"img/image22.png"},{"revision":"613bfcdd913759af82ec9e2c8d269085","url":"img/image25.png"},{"revision":"6ef6f40b4dbec1ea55a37ca398d5fd59","url":"img/image26.png"},{"revision":"5b23e56cbef4781c15380c6b075f8585","url":"img/image33.png"},{"revision":"f82e6853dd0b7131ceb284213b7ee975","url":"img/image34.png"},{"revision":"573b329ad70ee785c3d5800f18c3acdb","url":"img/image35.png"},{"revision":"e850dd3120e0ccd511027cf1db2811c5","url":"img/image36.png"},{"revision":"17073ae4bd575ff6a35d290f226e5c6d","url":"img/image5.png"},{"revision":"22c6eb8088b86099d5a78b5a13f7b24d","url":"img/logo-dark.svg"},{"revision":"8817e00103e8837d17c2758b0ce25c41","url":"img/logo.svg"},{"revision":"2e1cb1ba37fc5ae886ea57248bdb60bd","url":"img/pwa/icon-192x192.png"},{"revision":"a0f8ed72d3d3489353a57a03aeac9b0d","url":"img/pwa/icon-256x256.png"},{"revision":"ab9ed19e2716b5c233d6132d66204d53","url":"img/pwa/icon-384x384.png"},{"revision":"b71acc5b894ccfac0c22eb39a590f2a0","url":"img/pwa/icon-512x512.png"},{"revision":"b9d9189ed8f8dd58e70d9f8b3f693b3e","url":"img/tutorial/docsVersionDropdown.png"},{"revision":"c14bff79aafafca0957ccc34ee026e2c","url":"img/tutorial/localeDropdown.png"},{"revision":"ce755140e9d62cab518a32783aa092da","url":"img/undraw_docusaurus_mountain.svg"},{"revision":"c5239a068160423f513702f53e8a3589","url":"img/undraw_docusaurus_react.svg"},{"revision":"932b535fc71feb29877bc4b9d708b1d0","url":"img/undraw_docusaurus_tree.svg"}],s=new v({fallbackToNetwork:!0});e.offlineMode&&(s.addToCacheList(t),e.debug&&console.log("[Docusaurus-PWA][SW]: addToCacheList",{precacheManifest:t})),await async function(e){}(),self.addEventListener("install",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: install event",{event:t}),t.waitUntil(s.install(t))})),self.addEventListener("activate",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: activate event",{event:t}),t.waitUntil(s.activate(t))})),self.addEventListener("fetch",(async t=>{if(e.offlineMode){const a=t.request.url,n=function(e){const t=[],s=new URL(e,self.location.href);return s.origin!==self.location.origin||(s.search="",s.hash="",t.push(s.href),s.pathname.endsWith("/")?t.push(`${s.href}index.html`):t.push(`${s.href}/index.html`)),t}(a);for(let i=0;i<n.length;i+=1){const r=n[i],c=s.getCacheKeyForURL(r);if(c){const s=caches.match(c);e.debug&&console.log("[Docusaurus-PWA][SW]: serving cached asset",{requestURL:a,possibleURL:r,possibleURLs:n,cacheKey:c,cachedResponse:s}),t.respondWith(s);break}}}})),self.addEventListener("message",(async t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: message event",{event:t});"SKIP_WAITING"===(t.data&&t.data.type)&&self.skipWaiting()}))})()})()})();
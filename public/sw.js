if(!self.define){let e,s={};const c=(c,t)=>(c=new URL(c+".js",t).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(t,n)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let i={};const r=e=>c(e,a),d={module:{uri:a},exports:i,require:r};s[a]=Promise.all(t.map((e=>d[e]||r(e)))).then((e=>(n(...e),i)))}}define(["./workbox-8ddf8a8c"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/bKpT_WPvt66S3PprxiXWK/_buildManifest.js",revision:"5febe9182e489088eb2255e91c2840f5"},{url:"/_next/static/bKpT_WPvt66S3PprxiXWK/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/bKpT_WPvt66S3PprxiXWK/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/106-71c110c0a44c2c7b.js",revision:"71c110c0a44c2c7b"},{url:"/_next/static/chunks/136-e9c4b4256c8d0f7c.js",revision:"e9c4b4256c8d0f7c"},{url:"/_next/static/chunks/1484b9de.dac03858ae0054a6.js",revision:"dac03858ae0054a6"},{url:"/_next/static/chunks/252f366e-c7812e62ceef0705.js",revision:"c7812e62ceef0705"},{url:"/_next/static/chunks/258.e9806b7d3e40828b.js",revision:"e9806b7d3e40828b"},{url:"/_next/static/chunks/35-3430ff52d65a4ccc.js",revision:"3430ff52d65a4ccc"},{url:"/_next/static/chunks/358-ab8161bd54aaacf1.js",revision:"ab8161bd54aaacf1"},{url:"/_next/static/chunks/396.8aa00ad974252c4b.js",revision:"8aa00ad974252c4b"},{url:"/_next/static/chunks/548-14b8fe9134942a79.js",revision:"14b8fe9134942a79"},{url:"/_next/static/chunks/562-7de40447d3b21f76.js",revision:"7de40447d3b21f76"},{url:"/_next/static/chunks/592-49a8c5267c666045.js",revision:"49a8c5267c666045"},{url:"/_next/static/chunks/743.b12ed851f6dfe625.js",revision:"b12ed851f6dfe625"},{url:"/_next/static/chunks/821.81815d61dba4bb02.js",revision:"81815d61dba4bb02"},{url:"/_next/static/chunks/894.1d453c233c9d153f.js",revision:"1d453c233c9d153f"},{url:"/_next/static/chunks/924-b943a965a675d65a.js",revision:"b943a965a675d65a"},{url:"/_next/static/chunks/933.7c7422896ab528ff.js",revision:"7c7422896ab528ff"},{url:"/_next/static/chunks/d7eeaac4-3dba12233f524d08.js",revision:"3dba12233f524d08"},{url:"/_next/static/chunks/framework-0ba0ddd33199226d.js",revision:"0ba0ddd33199226d"},{url:"/_next/static/chunks/main-3bc66c120287eef1.js",revision:"3bc66c120287eef1"},{url:"/_next/static/chunks/pages/%5Bsection%5D/%5Bslug%5D-8cba2b316d4afd5d.js",revision:"8cba2b316d4afd5d"},{url:"/_next/static/chunks/pages/%5Bsection%5D/demand-response/%5Bslug%5D-5fbc0760c2108d3c.js",revision:"5fbc0760c2108d3c"},{url:"/_next/static/chunks/pages/%5Bsection%5D/eagle-express/%5Bslug%5D-a3f7e6ec48776ffd.js",revision:"a3f7e6ec48776ffd"},{url:"/_next/static/chunks/pages/%5Bsection%5D/jobs/%5Bslug%5D-8c7f158c55e33e31.js",revision:"8c7f158c55e33e31"},{url:"/_next/static/chunks/pages/%5Bsection%5D/news/%5Bslug%5D-1b4bcd54c7f41b88.js",revision:"1b4bcd54c7f41b88"},{url:"/_next/static/chunks/pages/%5Bsection%5D/news/story/%5Bslug%5D-0fd696ba25ed78d5.js",revision:"0fd696ba25ed78d5"},{url:"/_next/static/chunks/pages/%5Bsection%5D/performance/%5Bslug%5D-f030ec8d53671658.js",revision:"f030ec8d53671658"},{url:"/_next/static/chunks/pages/%5Bsection%5D/rantoul-connector/%5Bslug%5D-38d29965b06f57b4.js",revision:"38d29965b06f57b4"},{url:"/_next/static/chunks/pages/_app-8429fedd096f7209.js",revision:"8429fedd096f7209"},{url:"/_next/static/chunks/pages/_error-05780d4e12a40463.js",revision:"05780d4e12a40463"},{url:"/_next/static/chunks/pages/index-38c5c2527f8caaf6.js",revision:"38c5c2527f8caaf6"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-af8eb5a8f631cb57.js",revision:"af8eb5a8f631cb57"},{url:"/among.png",revision:"7e40e78d43f944abb48b2a0f30713e7d"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/(?:fonts\.gstatic\.com\/|use\.typekit\.net\/af\/).*$/i,new e.CacheFirst({cacheName:"webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/(?:fonts\.googleapis\.com\/|use\.typekit\.net\/[a-z]+\.css).*/i,new e.StaleWhileRevalidate({cacheName:"font-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET")}));

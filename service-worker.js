/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "1970/01/01/be/index.html",
    "revision": "8a9605176c90dd93c3fea27511996d35"
  },
  {
    "url": "1970/01/01/code/index.html",
    "revision": "d71ccb3608ee69830aa885d41729cecd"
  },
  {
    "url": "1970/01/01/fe/index.html",
    "revision": "19db349a3ddcaf2d0c8820403d1b0974"
  },
  {
    "url": "1970/01/01/life/index.html",
    "revision": "b58a5046efa1e82d7838241d5e2cf477"
  },
  {
    "url": "1970/01/01/staticsitegenerators/index.html",
    "revision": "f2d8263a9fb9a2845c1eb01593e3e816"
  },
  {
    "url": "404.html",
    "revision": "b83a8905dc6f0fa2811c3eda247c89fd"
  },
  {
    "url": "About.html",
    "revision": "73f5430dd9a052b4f0665c557f1a1669"
  },
  {
    "url": "assets/css/0.styles.88e42282.css",
    "revision": "eb2ae46ada25af6401e15b78a910ee0f"
  },
  {
    "url": "assets/fonts/EJRVQgYoZZY2vCFuvAFbzr-_dSb_nco.9738e026.woff2",
    "revision": "9738e026c7397b4e3b543ae7f1cf4b6c"
  },
  {
    "url": "assets/fonts/EJRVQgYoZZY2vCFuvAFWzr-_dSb_.b450bfca.woff2",
    "revision": "b450bfca16a8beb05580180de7b678f0"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.d3c7e9dc.js",
    "revision": "0f52f6d6a2b05307c09f64a88b65e91f"
  },
  {
    "url": "assets/js/11.6d99e566.js",
    "revision": "41b750ef83fd74b79d8667d50ccb6445"
  },
  {
    "url": "assets/js/12.c630e80f.js",
    "revision": "d5703861b78e5a5fc46640fd786bef27"
  },
  {
    "url": "assets/js/13.9cdd8004.js",
    "revision": "27965f94265124bcb5f9d151d366d2f4"
  },
  {
    "url": "assets/js/14.1a3c900a.js",
    "revision": "49354b6fe58adcc77e00714b39dbcf3c"
  },
  {
    "url": "assets/js/15.32afd64b.js",
    "revision": "ae925c914199eacb59f349597ea4df67"
  },
  {
    "url": "assets/js/16.c74530da.js",
    "revision": "79198a00d9def2cbe996a4970552db24"
  },
  {
    "url": "assets/js/17.75d572fe.js",
    "revision": "d46c7b61472eea053f9d6de364c88433"
  },
  {
    "url": "assets/js/18.aad00b1b.js",
    "revision": "0533a937ac9a6fbd1d9fd754bab6c417"
  },
  {
    "url": "assets/js/19.d971b8b1.js",
    "revision": "971a4f97d121ecd9af4e95a8c3dc8a43"
  },
  {
    "url": "assets/js/20.9f3ce586.js",
    "revision": "2abe24675c488ee0acc261f4e2d6556d"
  },
  {
    "url": "assets/js/21.ce6eb5e1.js",
    "revision": "2b609f37aa550df98f3c779a64beafee"
  },
  {
    "url": "assets/js/22.63492d80.js",
    "revision": "76c692f4ef564a96913d2e5025788f85"
  },
  {
    "url": "assets/js/4.d92bc27b.js",
    "revision": "c5248a74056577a2eb72e36f67c5ef03"
  },
  {
    "url": "assets/js/5.2081952b.js",
    "revision": "7a497927cac88b7b7dba72a154f73f5d"
  },
  {
    "url": "assets/js/6.54161de5.js",
    "revision": "7594156f87d812ee389698e46e415b4b"
  },
  {
    "url": "assets/js/7.d68bb164.js",
    "revision": "d57352b93f7f036edca1614d28bed497"
  },
  {
    "url": "assets/js/8.91b39225.js",
    "revision": "bddd7c5cb211be06a11a44c13500f14d"
  },
  {
    "url": "assets/js/9.07684b3f.js",
    "revision": "80f44016aaa51fceb389f185adc2876b"
  },
  {
    "url": "assets/js/app.4fab7013.js",
    "revision": "b17dc90d302d8f1d0ba814fb66d77576"
  },
  {
    "url": "assets/js/vendors~flowchart.bac55ae0.js",
    "revision": "c249397c380d6c04e5cbad23d2918fbc"
  },
  {
    "url": "assets/js/vuejs-paginate.79d57625.js",
    "revision": "f3913135604a44face8fceba58158966"
  },
  {
    "url": "code/index.html",
    "revision": "98ffbe9ad87aa4807c9e3564f07935a1"
  },
  {
    "url": "img/logo.png",
    "revision": "3881df6a1f13cc38c051d4755ed20d33"
  },
  {
    "url": "index.html",
    "revision": "c0064577339ac44a7ab31d1c1cf71b6d"
  },
  {
    "url": "life/index.html",
    "revision": "ec6bcb2f5d33aab591a71081be3e1b47"
  },
  {
    "url": "tag/frontend/index.html",
    "revision": "c5a7ed02f16b8e6335b36deb8f054657"
  },
  {
    "url": "tag/index.html",
    "revision": "434dba0fd655617d7bfd3527b5296203"
  },
  {
    "url": "tag/no/index.html",
    "revision": "88e101c83cb748d1e99ce64143776210"
  },
  {
    "url": "tag/stack/index.html",
    "revision": "289b05c100e4141f77bf85da7f7e03a5"
  },
  {
    "url": "tag/tst/index.html",
    "revision": "f4afd76ce3aa4507fef624f8f5570e97"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})

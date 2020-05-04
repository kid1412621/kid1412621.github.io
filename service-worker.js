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
    "url": "1970/01/01/code/index.html",
    "revision": "1eed8366fafa679c6104b5a0fff01a79"
  },
  {
    "url": "1970/01/01/staticsitegenerators/index.html",
    "revision": "2a7194ecda7b26b67b0e988e8a5a735f"
  },
  {
    "url": "1970/01/01/try/index.html",
    "revision": "18bf959cc5a6fd8996d14c5fd73a69dc"
  },
  {
    "url": "2020/05/03/life/index.html",
    "revision": "b5fca7bce71d50dc07e8e3df2a321770"
  },
  {
    "url": "404.html",
    "revision": "efc045ffce87565604cc92978156e2c7"
  },
  {
    "url": "About.html",
    "revision": "c1552bf9ed45bd6472cfd62625fe2c01"
  },
  {
    "url": "assets/css/0.styles.a47f3d25.css",
    "revision": "aaf66617da369a08903ab33d8b86a856"
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
    "url": "assets/js/15.62f05014.js",
    "revision": "74e3c9acab9700f7359c8f668d475e80"
  },
  {
    "url": "assets/js/16.46385916.js",
    "revision": "cd3d9ce4a61a8451a542c242273e287c"
  },
  {
    "url": "assets/js/17.3e15a370.js",
    "revision": "db422fe428070860310dc2d9d91f1642"
  },
  {
    "url": "assets/js/18.e181b976.js",
    "revision": "71862c1454994adc84ae9ad4440b1bd5"
  },
  {
    "url": "assets/js/19.7986686b.js",
    "revision": "550a2676d128fb89482b64b5709cad4c"
  },
  {
    "url": "assets/js/20.1e1d9e97.js",
    "revision": "5f63abe01310ce39c49dc15cc5023d24"
  },
  {
    "url": "assets/js/21.6e006c01.js",
    "revision": "12d3f927a9c687d1a2f5afd31abfc3aa"
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
    "url": "assets/js/app.aaa5ff4d.js",
    "revision": "6f9dbb04498f5105a28865546a1c28d1"
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
    "revision": "bdfd9d613f6d3c7e705da2e185d7f7ef"
  },
  {
    "url": "img/logo.png",
    "revision": "3881df6a1f13cc38c051d4755ed20d33"
  },
  {
    "url": "index.html",
    "revision": "d785ea1dd6eb3fabd1c38e285e947cea"
  },
  {
    "url": "life/index.html",
    "revision": "de53ee60096272889e2006bd84f3d1eb"
  },
  {
    "url": "tag/frontend/index.html",
    "revision": "6414986528d19d86c2c4b86a467d5105"
  },
  {
    "url": "tag/Genesis/index.html",
    "revision": "e02c7cce16d49bd7c2afcececb70f5fa"
  },
  {
    "url": "tag/index.html",
    "revision": "e0c91136cfdd8bfa37100d9df936f037"
  },
  {
    "url": "tag/index/index.html",
    "revision": "020ce9eaa21bdedbb81330fec0de37e1"
  },
  {
    "url": "tag/stack/index.html",
    "revision": "a4dac73b15ffe63a128a450e207ac67d"
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

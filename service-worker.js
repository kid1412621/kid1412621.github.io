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
    "revision": "4ffee9bd4c57be9d3a6ac038064d5f20"
  },
  {
    "url": "1970/01/01/staticsitegenerators/index.html",
    "revision": "ea34ef4f27cbc28a4fb68abe50892038"
  },
  {
    "url": "1970/01/01/try/index.html",
    "revision": "0266110559ff391ac53f7c18d3401104"
  },
  {
    "url": "2020/05/03/life/index.html",
    "revision": "bc746bd7ac873c02bab33811ae565f6e"
  },
  {
    "url": "404.html",
    "revision": "9e7649e40ab0aacb93b0b1c567c8f79f"
  },
  {
    "url": "About.html",
    "revision": "e33a7078ed48e14a2acc307856c65df4"
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
    "url": "assets/js/18.fcb14715.js",
    "revision": "0d07baee44b68809adb1cf058ab89f03"
  },
  {
    "url": "assets/js/19.31e76758.js",
    "revision": "c2e656c0d13cb4de6c061ca330ac3d93"
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
    "url": "assets/js/app.c6eaabad.js",
    "revision": "39048799507428d66b9513b8edf55daa"
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
    "revision": "fb29e75f7d6a0de76fc35e81908b4618"
  },
  {
    "url": "img/logo.png",
    "revision": "3881df6a1f13cc38c051d4755ed20d33"
  },
  {
    "url": "index.html",
    "revision": "bb90bc033fda405a0732167d2de3521e"
  },
  {
    "url": "life/index.html",
    "revision": "f66430b1fb9c7280373300145ecbd05c"
  },
  {
    "url": "tag/frontend/index.html",
    "revision": "17987cbcc89769074a514c7ec5ce6892"
  },
  {
    "url": "tag/Genesis/index.html",
    "revision": "0be74717da9319aba6cb65356b2b2d50"
  },
  {
    "url": "tag/index.html",
    "revision": "b864996ebb0f41a695ed0b4a4b157729"
  },
  {
    "url": "tag/index/index.html",
    "revision": "9ba9e08e77ea800e83c4970f8c3a3f1b"
  },
  {
    "url": "tag/stack/index.html",
    "revision": "08d046828095ae73169e032ceecc3a64"
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

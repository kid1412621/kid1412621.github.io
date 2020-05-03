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
    "revision": "602b723fcf6783a3b6af53f41d2d56cf"
  },
  {
    "url": "1970/01/01/code/index.html",
    "revision": "21bea7d0e1cecd0323c9c8c5d81e068b"
  },
  {
    "url": "1970/01/01/fe/index.html",
    "revision": "4f85d2529e90151f7c3f457730216731"
  },
  {
    "url": "1970/01/01/staticsitegenerators/index.html",
    "revision": "7902571c06b89bf9cd0ca97a0b699ffe"
  },
  {
    "url": "2020/05/03/life/index.html",
    "revision": "9407bc204ebab9f47e7a730d79eb6eaa"
  },
  {
    "url": "404.html",
    "revision": "5b147c17af0e034042029c03c360596d"
  },
  {
    "url": "About.html",
    "revision": "85de7a6ddbbd09dfa92bbd6e6b96b155"
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
    "url": "assets/js/15.8a27103d.js",
    "revision": "cef02f2eba7601a2f717079183bedb2a"
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
    "url": "assets/js/20.4e53681b.js",
    "revision": "e24581e25909bd4c3178b603c23eeb77"
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
    "url": "assets/js/app.ca02653a.js",
    "revision": "1d8c1b218c308f088ac00b6429e6a689"
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
    "revision": "0ee1988d6daf24a5a4fc25f1f1be19b3"
  },
  {
    "url": "img/cover.jpeg",
    "revision": "362405406545b6679db7d33275946591"
  },
  {
    "url": "img/logo.png",
    "revision": "3881df6a1f13cc38c051d4755ed20d33"
  },
  {
    "url": "index.html",
    "revision": "bbb01a9db59a4b4981329713636f85fe"
  },
  {
    "url": "life/index.html",
    "revision": "781527cfa44fe79fb82f124750e5d6af"
  },
  {
    "url": "tag/frontend/index.html",
    "revision": "368f7f9d5bb04584d59eb96424f1aee3"
  },
  {
    "url": "tag/index.html",
    "revision": "09485939b50d75508ebd5999c7a193ef"
  },
  {
    "url": "tag/JavaScript/index.html",
    "revision": "8a0d21a32018478395c32c5dcf61f52c"
  },
  {
    "url": "tag/no/index.html",
    "revision": "74bdda032fc6bd113c4700dd0703fefc"
  },
  {
    "url": "tag/stack/index.html",
    "revision": "ae3adc29b15d7729778ff3a6fcb3beb3"
  },
  {
    "url": "tag/tst/index.html",
    "revision": "8f3eaa994aa67539cd2c9b53a34f699e"
  },
  {
    "url": "tag/Vue/index.html",
    "revision": "764c5fd6179f5b468ceba33ebe580ee1"
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

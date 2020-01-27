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
    "url": "404.html",
    "revision": "d5f68ab33420c9676625ee07208b7a20"
  },
  {
    "url": "assets/css/0.styles.1d1d0211.css",
    "revision": "75d5766b3f447b03c3f7776055c1a25b"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.c56983e5.js",
    "revision": "0d57852a7300ae25fa883875cfb35e15"
  },
  {
    "url": "assets/js/11.8b0c455f.js",
    "revision": "ac8143f0532b5a52dde6658a2d3f734f"
  },
  {
    "url": "assets/js/12.753688e6.js",
    "revision": "e87ba715410eb4c9c17b2afbd3e4512f"
  },
  {
    "url": "assets/js/2.b1a7afec.js",
    "revision": "7973c4a59ce3673d5872d7b422b54f07"
  },
  {
    "url": "assets/js/3.cc2d29a8.js",
    "revision": "66c3f23fab02065c02431e599339573a"
  },
  {
    "url": "assets/js/4.a1423ae1.js",
    "revision": "355e2ec390a29a0ff43e89ddd8fe4450"
  },
  {
    "url": "assets/js/5.55bda819.js",
    "revision": "1f86f27ba5817f38b109d5ad16d34e01"
  },
  {
    "url": "assets/js/6.fb50e303.js",
    "revision": "db71676d37eaf4ccc14d2fa788711f87"
  },
  {
    "url": "assets/js/7.be3db7f7.js",
    "revision": "f37c83b4ea8511eebfe8d1e305fa3787"
  },
  {
    "url": "assets/js/8.3d135f03.js",
    "revision": "d102b6f5f1103eb733399484b0a50059"
  },
  {
    "url": "assets/js/9.1973daa5.js",
    "revision": "907039fcece0e0a5c97b37b552f82ae3"
  },
  {
    "url": "assets/js/app.8355ce81.js",
    "revision": "7dd8b3815a00501cc4d8e815b166d825"
  },
  {
    "url": "backend/be.html",
    "revision": "77f0f3dbdb434555c1635efc9225f41b"
  },
  {
    "url": "en/backend/be.html",
    "revision": "b38615b5a400114ddcde93009b8f57ba"
  },
  {
    "url": "en/frontend/fe.html",
    "revision": "14c59455a9e21ba2b5ac61bdfae3118e"
  },
  {
    "url": "en/index.html",
    "revision": "9eb51138211cdca58fce63e99ff42c56"
  },
  {
    "url": "frontend/fe.html",
    "revision": "50ef0c5b7f5d7e4adfe36efcbddd3d64"
  },
  {
    "url": "img/logo.jpeg",
    "revision": "08b9eec0d547d199b7ec3f71377e03e3"
  },
  {
    "url": "index.html",
    "revision": "e1a9b36b7afee252f0b8d8eeecba91ab"
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

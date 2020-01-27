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
    "revision": "d1c711777ee3fee1d286ddef3165e1ed"
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
    "url": "assets/js/app.f9d80ce8.js",
    "revision": "c8ff4ae5fc6a7883ce36dc04da3ec523"
  },
  {
    "url": "backend/be.html",
    "revision": "01ca05900e2a24e89bbe48a5cd9f695e"
  },
  {
    "url": "en/backend/be.html",
    "revision": "e2999b7b94ce10e87581b1db2e8e0172"
  },
  {
    "url": "en/frontend/fe.html",
    "revision": "47acbd3ed596b0d8c8d626d9cb0b62bc"
  },
  {
    "url": "en/index.html",
    "revision": "b50d18404e2575cb02b89a2e8c5954e8"
  },
  {
    "url": "frontend/fe.html",
    "revision": "86231f39700f4cefabcda917b4b6d2b3"
  },
  {
    "url": "img/logo.jpeg",
    "revision": "08b9eec0d547d199b7ec3f71377e03e3"
  },
  {
    "url": "index.html",
    "revision": "366c0aa86ab4f1f61123a4c3e530196c"
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

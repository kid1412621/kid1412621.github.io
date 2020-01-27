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
    "revision": "4fd937cad674b25da4dedd1d27c374db"
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
    "url": "assets/js/10.1fd2b47e.js",
    "revision": "594461c5a144e7c8192f7e770eb4f0fe"
  },
  {
    "url": "assets/js/11.df4e0aa7.js",
    "revision": "41d1920f83a69800b18c4236c06094b4"
  },
  {
    "url": "assets/js/12.ea57374b.js",
    "revision": "a9b03dc3b06e61fa10dd4a03f07eb4db"
  },
  {
    "url": "assets/js/13.891d75fc.js",
    "revision": "0f8c2c246e7af7658f741550740e6dbc"
  },
  {
    "url": "assets/js/14.0b77af6a.js",
    "revision": "5770c2a0a3919a896181784b26d198a1"
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
    "url": "assets/js/4.b92cc844.js",
    "revision": "c3dc1ebe4750d932c946db58420b5ec4"
  },
  {
    "url": "assets/js/5.55bda819.js",
    "revision": "1f86f27ba5817f38b109d5ad16d34e01"
  },
  {
    "url": "assets/js/6.999f5352.js",
    "revision": "2528f045dae215bd3b132c0641fbda0f"
  },
  {
    "url": "assets/js/7.10a7c868.js",
    "revision": "aa582dce466bb85642e89f4dcd264c9d"
  },
  {
    "url": "assets/js/8.f09abf99.js",
    "revision": "3742ade85756f9a83c53a0a7b0e8f8af"
  },
  {
    "url": "assets/js/9.092a5955.js",
    "revision": "cfabb6dd54b3c6e6e8a50c53dd27b1d1"
  },
  {
    "url": "assets/js/app.28434e89.js",
    "revision": "e29d328551504345cb3c31aadbbeb6d0"
  },
  {
    "url": "backend/be.html",
    "revision": "795a64b738cc94a4f95dd917ef17cb92"
  },
  {
    "url": "backend/index.html",
    "revision": "7e43f1eb44bd25f993df0c764f566ae1"
  },
  {
    "url": "en/backend/be.html",
    "revision": "938e12ac6a652604d37f022a44dd6874"
  },
  {
    "url": "en/frontend/fe.html",
    "revision": "1119d9026aa7db99bcd61c52c29815c0"
  },
  {
    "url": "en/index.html",
    "revision": "724799251004d8c1b00373519b8ddb53"
  },
  {
    "url": "frontend/fe.html",
    "revision": "cc27503d9e7a5eea600746182f753817"
  },
  {
    "url": "frontend/index.html",
    "revision": "ccb289db13db5cbd1f890ece0daf3594"
  },
  {
    "url": "img/logo.jpeg",
    "revision": "08b9eec0d547d199b7ec3f71377e03e3"
  },
  {
    "url": "index.html",
    "revision": "8a6aab32db1a5aead622107fcb6c849a"
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

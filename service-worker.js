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
    "revision": "71c975469d80caf4ace40345f61176ed"
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
    "url": "assets/js/6.1bf5955d.js",
    "revision": "ea29ace2f284016c0d4ceb268ef02f00"
  },
  {
    "url": "assets/js/7.5eeec794.js",
    "revision": "16772613b667d438342893c8bb68e08f"
  },
  {
    "url": "assets/js/8.2c55ebd6.js",
    "revision": "5ce89666387e8ec2dc8b1b769982d10f"
  },
  {
    "url": "assets/js/9.092a5955.js",
    "revision": "cfabb6dd54b3c6e6e8a50c53dd27b1d1"
  },
  {
    "url": "assets/js/app.7cf531e8.js",
    "revision": "878c012efb765bccd0d17e09cc4cf9e5"
  },
  {
    "url": "backend/be.html",
    "revision": "e34d9baa25669d9c799d2ac4ccb9a574"
  },
  {
    "url": "backend/index.html",
    "revision": "3aafec01d3e4463450877024241e8c25"
  },
  {
    "url": "en/backend/be.html",
    "revision": "81b3f25a780f95c152ab2d168edb3956"
  },
  {
    "url": "en/frontend/fe.html",
    "revision": "22bc8ba2787926e97eac3330ad766eab"
  },
  {
    "url": "en/index.html",
    "revision": "7d2bc9f44107cca87cdfc52ad44bde27"
  },
  {
    "url": "frontend/fe.html",
    "revision": "ba07158871ee3e1c758515d4c7503323"
  },
  {
    "url": "frontend/index.html",
    "revision": "c12f13acee4529088d85f168ff089aa7"
  },
  {
    "url": "img/logo.png",
    "revision": "3881df6a1f13cc38c051d4755ed20d33"
  },
  {
    "url": "index.html",
    "revision": "47544a7f426afe0c24b2267bdb344a41"
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

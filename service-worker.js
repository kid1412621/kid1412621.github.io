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
    "revision": "2ca0bcff300433ddd3306c94e71fe59e"
  },
  {
    "url": "assets/css/0.styles.b94b2d70.css",
    "revision": "7b86bda3bcb135fe6c59eb2022b3ee60"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.8cb5753a.js",
    "revision": "b3ef790cbc1b051a404613d15d6126ee"
  },
  {
    "url": "assets/js/11.703734eb.js",
    "revision": "b043bf86952cb6733f748cd203a09231"
  },
  {
    "url": "assets/js/12.9f1072d6.js",
    "revision": "9fa06e048d64631deaeda001378c3ea5"
  },
  {
    "url": "assets/js/13.8ae58fc5.js",
    "revision": "3f7ba41edc9b4e77dde253f83d5be041"
  },
  {
    "url": "assets/js/14.e9787d8e.js",
    "revision": "fa17f56da28a8009b981fd2bc9c1e68e"
  },
  {
    "url": "assets/js/15.9a34182b.js",
    "revision": "3974959be0f3b3192259d112fa9efd80"
  },
  {
    "url": "assets/js/3.c8a99ffa.js",
    "revision": "77bbbf02c629a71627ae0dcb7df8cf07"
  },
  {
    "url": "assets/js/4.638c4452.js",
    "revision": "c5cc04f8cfa3c722c0aa2d96a83712a5"
  },
  {
    "url": "assets/js/5.8e9a78d3.js",
    "revision": "5eb188b86a1e1e39b73556b355ce5cce"
  },
  {
    "url": "assets/js/6.93a72e0d.js",
    "revision": "0af7b91ee904b94b95af8837d76b19c3"
  },
  {
    "url": "assets/js/7.95fc7ad8.js",
    "revision": "41916215c449b29658c9f1ffdaf82fcb"
  },
  {
    "url": "assets/js/8.e3c10d68.js",
    "revision": "850cd3be3883efea363bdf580f5dc154"
  },
  {
    "url": "assets/js/9.cbed7647.js",
    "revision": "e7de697b42391c2d2c96b4c568841793"
  },
  {
    "url": "assets/js/app.e4582aa1.js",
    "revision": "c94e891c4e9d7e650f44d80a8da50bbd"
  },
  {
    "url": "assets/js/vendors~flowchart.63ead12e.js",
    "revision": "8995397d997c57c9d5a4f0683267a03d"
  },
  {
    "url": "backend/be.html",
    "revision": "45d4e1810dd4034ea0a62b63a828d547"
  },
  {
    "url": "backend/index.html",
    "revision": "8b25bad23315662d8aee93b0b2132654"
  },
  {
    "url": "en/backend/be.html",
    "revision": "07b5fe43d6afa573ce43c01ac202fa8f"
  },
  {
    "url": "en/frontend/fe.html",
    "revision": "39c8585210e86abfde873f11b125515f"
  },
  {
    "url": "en/index.html",
    "revision": "72932f174be8b036248c5a74cab0181e"
  },
  {
    "url": "frontend/fe.html",
    "revision": "f7ddd78d1b983d569e72152f855e8e56"
  },
  {
    "url": "frontend/index.html",
    "revision": "18160c4af8b02747ada0986ca3b79ea8"
  },
  {
    "url": "img/logo.png",
    "revision": "3881df6a1f13cc38c051d4755ed20d33"
  },
  {
    "url": "index.html",
    "revision": "1e75544ac88024944c327be918238b13"
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

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
    "revision": "3c4fc9c17c088e71252ac1196a08ec56"
  },
  {
    "url": "1970/01/01/staticsitegenerators/index.html",
    "revision": "3861a62802b80a20498d11edac5e275f"
  },
  {
    "url": "1970/01/01/try/index.html",
    "revision": "c8df58c9bedfae5247548bdd98fd46be"
  },
  {
    "url": "2020/05/03/life/index.html",
    "revision": "f1a870bf9fe209d8e06019252161a01d"
  },
  {
    "url": "404.html",
    "revision": "8af26df15229dfb9afea22953898c151"
  },
  {
    "url": "About.html",
    "revision": "02caf18ac6cbc8751909611dbd44e882"
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
    "url": "assets/js/19.1809d45c.js",
    "revision": "9bf6fce8c26b48bb6e782181bc4d1760"
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
    "url": "assets/js/app.d1909a9a.js",
    "revision": "b4907d6658c0f1a3ec9182f4cb3c85c1"
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
    "revision": "36b702e399b67fcde2467ea631feb239"
  },
  {
    "url": "img/logo.png",
    "revision": "3881df6a1f13cc38c051d4755ed20d33"
  },
  {
    "url": "index.html",
    "revision": "2aeb90a234bb428e5002689219734450"
  },
  {
    "url": "life/index.html",
    "revision": "353accafcca24d548f0abb9581c1eaec"
  },
  {
    "url": "tag/frontend/index.html",
    "revision": "1d8a9ae017278c3c75111d0198d373eb"
  },
  {
    "url": "tag/Genesis/index.html",
    "revision": "1d76c81cf12fc5d92b30781445cccedf"
  },
  {
    "url": "tag/index.html",
    "revision": "31b95bba33fc6d21a738a78c4cd896b3"
  },
  {
    "url": "tag/index/index.html",
    "revision": "8510d4daa096c6aece583b79b5078d92"
  },
  {
    "url": "tag/stack/index.html",
    "revision": "6ed0ec9c45c8046204ce201c42f77d55"
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

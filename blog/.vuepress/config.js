module.exports = {
  // base
  title: "NanoNova's cyberspace",
  description: 'The ubiquitous uniqueness',
  head: [
    ['link', { rel: 'icon', href: '/img/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'referrer', content: 'no-referrer' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  //theming
  theme: '@vuepress/theme-blog',
  themeConfig: {
    logo: '',
    sidebar: 'auto',
    lastUpdated: true,
    smoothScroll: true,
    directories: [
      { id: 'code', dirname: '_code', path: '/code/', title: '编码', frontmatter: { tag: 'code' } },
      { id: 'life', dirname: '_life', path: '/life/', title: '周遭', frontmatter: { tag: 'life' } },
      { id: 'world', dirname: '_world', path: '/world/', title: '世界', frontmatter: { tag: 'world' } }
    ],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Code', link: '/code/' },
      { text: 'Life', link: '/life/' },
      { text: 'World', link: '/world/' },
      { text: 'Tags', link: '/tag/' },
      { text: 'About', link: '/about' },
    ],
    footer: {
      contact: [
        { type: 'github', link: 'https://github.com/kid1412621' },
        { type: 'twitter', link: 'https://twitter.com/kid1412621' },
        { type: 'instagram', link: 'https://instagram.com/kid1412621' },
      ],
    },
    comment: { service: 'vssue' },
    feed: {
      canonical_base: 'https://nanonova.space',
      posts_directories: ['/_code/', '/_life']
    },
    sitemap: {
      hostname: 'https://nanonova.space'
    }
  },

  // plugin
  plugins: {
    '@vuepress/back-to-top': {},
    '@vuepress/nprogress': {},
    '@vuepress/medium-zoom': {
      options: {
        margin: 20
      }
    },
    '@vuepress/`pwa`': {
      serviceWorker: true,
      updatePopup: true
    },
    '@vuepress/google-analytics': {
      'ga': 'UA-165369471-1'
    },
    'img-lazy': {},
    'flowchart': {},
    '@vssue/vuepress-plugin-vssue': {
      platform: 'github-v4',
      owner: 'kid1412621',
      repo: 'blogCmt',
      clientId: '69804ae7507313e777e3',
      clientSecret: '7d46b6f908f1ed970f0a12ba48c501e2414c6bd9',
    },
  },
  markdown: {
    lineNumbers: true,
    extendMarkdown: md => {
      md.use(require('markdown-it-plantuml'))
        .use(require('markdown-it-footnote'))
    }
  },
  evergreen: true
}
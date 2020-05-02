module.exports = {
  // base
  title: "NanoNova's cyberspace",
  description: 'The ubiquitous uniqueness',
  head: [
    ['link', { rel: 'icon', href: '/img/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }]
  ],

  //theming
  theme: '@vuepress/theme-blog',
  themeConfig: {
    logo: '',
    sidebar: 'auto',
    lastUpdated: true,
    smoothScroll: true,
    directorires: [
      {
        id: 'code',
        dirname: '_code',
        path: '/code/',
        title: '编码',
        frontmatter: { tag: 'code' },
      },
      {
        id: 'life',
        dirname: '_life',
        path: '/life/',
        title: '周遭',
        frontmatter: { tag: 'life' },
      }
    ],
    nav: [
      { text: 'Blog', link: '/' },
      { text: 'Tags', link: '/tag/' },
      { text: 'About', link: '/About' },
    ],
    footer: {
      contact: [
        { type: 'github', link: 'https://github.com/kid1412621' },
        { type: 'twitter', link: 'https://twitter.com/kid1412621' },
        { type: 'instagram', link: 'https://instagram.com/kid1412621' },
      ],
    },
    comment: { service: 'vssue' }
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
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: true
    },
    'img-lazy': {},
    'flowchart': {},
    'feed': {
      canonical_base: 'https://nanonova.space',
      posts_directories: ['/']
    },
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
import { defineConfig } from 'vitepress'
import { genFeed } from './genFeed.js'
import MarkdownItPlantuml from 'markdown-it-plantuml'
import MarkdownItFootnote from 'markdown-it-footnote'

export default defineConfig({
  title: "NanoNova's Cyberspace",
  description: 'The ubiquitous uniqueness, Yet Another Personal Odyssey',
  cleanUrls: true,
  head: [
    ['meta', { name: 'twitter:site', content: '@kid1412621' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://nanova.me/logo.svg'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'NYHGSGQV',
        'data-spa': 'auto',
        defer: ''
      }
    ]
  ],
  markdown: {
    config: (md) => {
      md.use(MarkdownItFootnote).use(MarkdownItPlantuml)
    }
  },
  buildEnd: genFeed
})

import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'
import { genFeed } from './genFeed.js'
import MarkdownItPlantuml from 'markdown-it-plantuml'
import MarkdownItFootnote from 'markdown-it-footnote'
import { withMermaid } from 'vitepress-plugin-mermaid'

const viteConfig = defineConfig({
  title: 'Yet another personal odyssey',
  description: 'The ubiquitous uniqueness',
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
  vite: {
    plugins: [tailwindcss()]
  },
  buildEnd: genFeed
})

export default withMermaid({
  ...viteConfig,
  mermaid: {}
})

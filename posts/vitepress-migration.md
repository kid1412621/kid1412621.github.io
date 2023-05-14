---
title: VitePress migration from VuePress
date: 2023-05-14
---

The laziest way.

---

[Vue.js team decided replace VuePress with VitePress totally](https://github.com/vuejs/vitepress/discussions/548). And they're planning to ship VitePress as VuePress 3 to drop webpack support. In current stage, the VitePress is still in alpha and not fully ready yet. So the migration is not smooth due to some features missing.

Anyway, once I've been attracted by the new toy, there's no turning back. Learning the new API, or polishing the details to solve the issues isn't my option, hence I choose the laziest way for the sake of time.

## Replace the default theme

If you follow the [VitePress documentation](https://vitepress.dev/guide/getting-started) to start the project, you will get a default theme which is targeting doucmentation instead of blog. Absence of third-party theme, I don't want to make efforts to create my own one. (Off course you can implement by youself, I'm lazy, remember?). Wait a sec, is [the official Vue.js blog](https://blog.vuejs.org/) using the VitePress? Why I just clone the code and make some changes?

```bash
git clone https://github.com/vuejs/blog.git
```

Ok, let's try out:

```bash
cd blog && npm i && npm run dev
```

Perfect, it works.

Now copy my old post markdown files into /posts, and renaming the metadata, icons.

What I still miss? Oh right, VuePress plugins.

Hers's the list of plugins I've been using:

`.vuepress/config.js`

```javascript
module.exports = {
  plugins: {
    '@vuepress/back-to-top': {},
    '@vuepress/nprogress': {},
    '@vuepress/medium-zoom': {},
    '@vuepress/`pwa`': {},
    '@vuepress/google-analytics': {},
    'img-lazy': {},
    flowchart: {},
    '@vssue/vuepress-plugin-vssue': {},
    'vuepress-plugin-mermaidjs': {}
  }
}
```

Like third-party theme support, the plugin system is not abundant as VuePress. So my solution is just to leave them since I think content is more important than experience. Those nice-to-have features won't help my blog content better or helpful. The fewer plugin, the more minimalism and maintainability. It's bearable. (Especially the comment system which implemented by [vussue](https://github.com/meteorlxy/vssue) is never been used before)

## Markdown plugins

As the VuePress, under the hood VitePress use [Markdown-it](https://github.com/markdown-it/markdown-it) to handle markdown files. Therefore, I can still use [Markdown-it plugins](https://www.npmjs.com/search?q=keywords:markdown-it-plugin) to customize the markdown parsing.

`.vuepress/config.js`

```javascript
module.exports = {
  markdown: {
    lineNumbers: true,
    extendMarkdown: (md) => {
      md.use(require('markdown-it-footnote')).use(
        require('markdown-it-plantuml')
      )
    }
  }
}
```

Above configs need to be changed into this since Vite only support ESM:

`.vitepress/config.ts`

```typescript
import { defineConfig } from 'vitepress'
import MarkdownItPlantuml from 'markdown-it-plantuml'
import MarkdownItFootnote from 'markdown-it-footnote'

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(MarkdownItFootnote).use(MarkdownItPlantuml)
    }
  }
})
```

## Tweak few styles

The overrall style of Vue.js blog is good except the style of inline fenced code block is not I want.
What I do to alter this is quite simple and straightforward(no time to learn Tailwind):

Appending to `.vitepress/theme/style.css`

```css
p code {
  border-radius: 4px;
  padding: 3px 6px;
  font-weight: 500 !important;
  color: var(--c-brand-light) !important;
  background-color: #f6f6f7;
  transition: color 0.5s, background-color 0.5s;
}

.dark p code {
  color: #c9def1 !important;
  background-color: #313136;
}

p code::before {
  content: '' !important;
}

p code::after {
  content: '' !important;
}
```

## Permalink

So far, VitePress is not support permalink which's quite important for sharing URL.
My solution is to hardcode the certain permalinlks in the 404 page to redirect.

`.vitepress/theme/NotFound.vue`

```vue
<script setup lang="ts">
import { useRouter } from 'vitepress'

const { route, go } = useRouter()
if (route.path.includes('permalink1')) {
  go('./posts/correct-url-1')
} else if (route.path.includes('permalink2')) {
  go('./posts/correct-url-2')
}
</script>
```

## Deploy

VitePress comes with [official Github Pages support via Github Action](https://vitepress.dev/guide/deploy#github-pages), no more need for TravisCI and seperation of source branch and build branch.

`.github/workflows/deploy.yml`

```yml
name: Deploy
on:
  workflow_dispatch: {}
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: npm
      - run: npm ci
      - name: Build
        run: npm run build
      - uses: actions/configure-pages@v2
      - uses: actions/upload-pages-artifact@v1
        with:
          path: .vitepress/dist
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v1
```

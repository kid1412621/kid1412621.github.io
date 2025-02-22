import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './.vitepress/theme/**/*.vue',
    './**/*.md',
    './.vitepress/theme/style.css'
  ],
  theme: {
    extend: {}
  },
  plugins: [typography]
}

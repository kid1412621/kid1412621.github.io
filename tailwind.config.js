import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./.vitepress/theme/**/*.vue', './**/*.md'],
  theme: {
    extend: {}
  },
  plugins: [typography]
}

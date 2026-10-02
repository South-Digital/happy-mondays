import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync, rmSync } from 'node:fs'
import { resolve, join } from 'node:path'

let thisOutputDirectory = ''
const noindex = { 'X-Robots-Tag': 'noindex, nofollow' }

export default defineConfig({
  plugins: [react(), {
    name: 'client-review-delivery',
    transformIndexHtml(html) {
      if (process.env.VITE_CLIENT_REVIEW !== 'true') return html
      return html
        .replace('Internal prototype — not for public distribution.', 'Explore two refined design directions for Happy Mondays.')
        .replace('Happy Mondays — prototypes', 'Happy Mondays — Design directions')
    },
    configResolved(config) { thisOutputDirectory = resolve(config.root, config.build.outDir) },
    closeBundle() {
      // Source/provenance notes stay in Git, outside the client-facing build.
      const removeNotes = (directory: string) => {
        for (const item of readdirSync(directory, { withFileTypes: true })) {
          const path = join(directory, item.name)
          if (item.isDirectory()) removeNotes(path)
          else if (!/^licen[cs]e/i.test(item.name) && /\.md$|provenance|prompts?(?:\.|-)/i.test(item.name)) rmSync(path)
        }
      }
      removeNotes(thisOutputDirectory)
      // Unused superseded studies must not ship with the client preview.
      for (const folder of ['at-present', 'commerce-scenes']) {
        rmSync(join(thisOutputDirectory, 'images', folder), { recursive: true, force: true })
      }
    },
  }],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: { headers: noindex },
  preview: { headers: noindex },
})

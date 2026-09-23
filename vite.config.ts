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
      if (process.env.VITE_CLIENT_REVIEW !== 'true') return
      // Source/provenance notes stay in Git, outside the client-facing build.
      const removeNotes = (directory: string) => {
        for (const item of readdirSync(directory, { withFileTypes: true })) {
          const path = join(directory, item.name)
          if (item.isDirectory()) removeNotes(path)
          else if (item.name.endsWith('.md')) rmSync(path)
        }
      }
      removeNotes(thisOutputDirectory)
    },
  }],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: { headers: noindex },
  preview: { headers: noindex },
})

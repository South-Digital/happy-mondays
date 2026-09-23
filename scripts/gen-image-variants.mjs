/**
 * Generates the WebP variant ladder for every photo in public/images and writes
 * the manifest src/lib/image-variants.json, which <Photo> reads to build srcset.
 *
 *   node scripts/gen-image-variants.mjs          # generate what is missing
 *   node scripts/gen-image-variants.mjs --force  # re-encode everything
 *
 * It never upscales: a width is only emitted when the source is at least that
 * wide, so a photo that cannot cover its slot at DPR 2 stays visibly missing in
 * the report rather than being stretched to hide it. Re-run it after dropping
 * higher-resolution exports into public/images and the new rungs appear with no
 * code change.
 */
import sharp from 'sharp'
import { readdirSync, statSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const DIR = 'public/images'
const LADDER = [1000, 1200, 1600, 2400, 3200, 4000]
const QUALITY = 84
const force = process.argv.includes('--force')

/** Files small enough that the ladder is pointless — they ship at source size. */
const MIN_WIDTH_TO_SPLIT = 1100

const base = readdirSync(DIR)
  .filter((f) => f.endsWith('.webp') && !/-\d+\.webp$/.test(f))
  .sort()

const manifest = {}
let made = 0

for (const file of base) {
  const src = join(DIR, file)
  const { width, height } = await sharp(src).metadata()
  const key = `/images/${file}`
  manifest[key] = { w: width, h: height, variants: [] }
  if (width < MIN_WIDTH_TO_SPLIT) continue

  for (const target of LADDER) {
    // Never upscale. A rung wider than the source simply does not exist.
    if (target >= width) continue
    const out = join(DIR, file.replace(/\.webp$/, `-${target}.webp`))
    if (force || !existsSync(out)) {
      await sharp(src).resize({ width: target, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(out)
      made++
    }
    manifest[key].variants.push(target)
  }
}

writeFileSync('src/lib/image-variants.json', JSON.stringify(manifest, null, 2) + '\n')

const short = []
for (const [k, v] of Object.entries(manifest)) {
  const largest = Math.max(v.w, ...v.variants)
  if (v.w >= MIN_WIDTH_TO_SPLIT) short.push(`${k.replace('/images/', '')}  source ${v.w}px  ladder ${[...v.variants, v.w].join('/')}`)
}
console.log(`${made} file(s) encoded at q${QUALITY}`)
console.log(short.join('\n'))

/** Tiny inline previews use the approved images, crop and colours unchanged; soften low-resolution texture. */
const sharp = require('sharp');
const { mkdirSync, statSync } = require('node:fs');
(async () => {
  mkdirSync('src/concepts/a/assets', { recursive: true });
  for (const [name, source] of [
    ['coast', 'public/images/hero-a-terrace/coast-3548.webp'],
    ['terrace', 'public/images/hero-a-terrace-extended/coast-1586.webp'],
  ]) {
    const output = `src/concepts/a/assets/${name}-preview.webp`;
    await sharp(source).resize({ width: 192 }).blur(1.5).webp({ quality: 65 }).toFile(output);
    console.log(`${output}: ${statSync(output).size} bytes`);
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

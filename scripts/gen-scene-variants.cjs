/** Original assets remain untouched. Run with sharp available to Node. */
const sharp = require('sharp');
const { statSync } = require('node:fs');

const scenes = {
  morrow: { courtyard: [800, 1280], 'grip-sock': [600, 1000], 'product-0': [240, 480], 'product-1': [240, 480], 'product-2': [240, 480], 'product-3': [240, 480] },
  serein: { atelier: [800], collection: [600, 1000], 'product-0': [240, 480], 'product-1': [240, 480] },
};

(async () => {
  for (const [brand, assets] of Object.entries(scenes)) {
    for (const [name, widths] of Object.entries(assets)) {
      const source = `public/images/${brand}/${name}.webp`;
      for (const width of widths) {
        const output = `public/images/${brand}/${name}-${width}.webp`;
        await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 86, alphaQuality: 100 }).toFile(output);
        console.log(`${output}: ${Math.round(statSync(output).size / 1024)} KB`);
      }
    }
  }
  // Delivery-only encodes: preserve the approved coastal composition and WebP fallback.
  for (const width of [960, 1942]) {
    const output = `public/images/page-atmosphere/terrace-coastal-${width}.avif`;
    await sharp('public/images/page-atmosphere/terrace-coastal-1942.webp')
      .resize({ width })
      .avif({ quality: 65, effort: 6, chromaSubsampling: '4:4:4' })
      .toFile(output);
    console.log(`${output}: ${Math.round(statSync(output).size / 1024)} KB`);
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

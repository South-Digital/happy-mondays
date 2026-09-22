/**
 * Asset manifest — §8 export list.
 *
 * Files are expected in `public/images/` at 2x, WebP. They are not committed to
 * this repo yet; every consumer degrades to a tuned CSS fallback (see `<Photo>`)
 * so the prototypes render and lay out correctly without them. Drop the real
 * exports in with these exact filenames and they go live with no code change.
 */
export const IMG = {
  /** A hero background — Zac's Magnific image, node 2171:556 */
  aHeroBg: '/images/a-hero-bg.webp',
  /** A foreground rooftop cut-out — node 2171:561, alpha required */
  aHeroFg: '/images/a-foreground.webp',
  /** B hero photo (Santorini) — node 2171:677 */
  bHero: '/images/b-hero.webp',
  /** Pillar card backdrops — nodes 2171:313 / 374 / 437 */
  pillar1: '/images/pillar-1-backdrop.webp',
  pillar2: '/images/pillar-2-backdrop.webp',
  pillar3: '/images/pillar-3-backdrop.webp',
  /** Search & shopping panel backdrop — node 2171:513 */
  panelBackdrop: '/images/panel-backdrop.webp',
  /** Lucky Honey product photos — nodes 2171:531 / 537 / 543 */
  productJuliet: '/images/product-juliet-grip-sock.webp',
  productCheckered: '/images/product-checkered-crew-grip-sock.webp',
  productStripe: '/images/product-crew-stripe-grip-sock.webp',
  /** Weekly-Loom video thumbnail (pillar 3) */
  videoThumb: '/images/video-thumb.webp',
} as const

export type ImgKey = keyof typeof IMG

/** §8 logo strip — 8 brands, nodes 2171:660–674. Rendered grey at ~50% opacity. */
export const LOGOS = [
  { name: 'At Present', src: '/images/logo-at-present.svg', node: '2171:660' },
  { name: 'JPHA', src: '/images/logo-jpha.svg', node: '2171:662' },
  { name: 'Reincoat', src: '/images/logo-reincoat.svg', node: '2171:664' },
  { name: 'Plum', src: '/images/logo-plum.svg', node: '2171:666' },
  { name: 'Lucky Honey', src: '/images/logo-lucky-honey.svg', node: '2171:668' },
  { name: 'Go Flower', src: '/images/logo-go-flower.svg', node: '2171:670' },
  { name: 'Nativemed', src: '/images/logo-nativemed.svg', node: '2171:672' },
  { name: 'Our Pets Life', src: '/images/logo-our-pets-life.svg', node: '2171:674' },
] as const

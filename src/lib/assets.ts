/**
 * Asset manifest — §8 export list.
 *
 * Every export has now been delivered. Each is committed as the supplied PNG
 * (source of record) and as the WebP the app serves; alpha is preserved where
 * the export has it. Filenames follow the exports as delivered.
 *
 * `<Photo>` still falls back to a CSS gradient if a file ever goes missing, so
 * a bad path degrades rather than leaving a hole.
 */
export const IMG = {
  /** A hero background — node 2171:556. 2000×1786 */
  aHeroBg: '/images/a-hero-bg.webp',
  /** A foreground rooftop cut-out — node 2171:561. 2000×467, alpha */
  aHeroFg: '/images/a-foreground.webp',
  /** B hero photo (Santorini) — node 2171:677. 2000×1667 */
  bHero: '/images/b-hero.webp',

  /** Shopify window, exported from Figma rather than rebuilt in HTML. */
  dashSidebar: '/images/dash-sidebar.webp', // 440×1318 (220×659 @2x)
  dashPanel: '/images/dash-panel.webp', // 1816×1230 (908×615 @2x)
  dashNewOrder: '/images/dash-neworder.webp', // 836×228 (418×114 @2x)

  /** Pillar card backdrops — nodes 2171:313 / 374 / 437. 768×672 (384×336 @2x) */
  pillar1: '/images/pillar-bg-1.webp',
  pillar2: '/images/pillar-bg-2.webp',
  pillar3: '/images/pillar-bg-3.webp',

  /** Search & shopping panel backdrop — node 2171:513. 1760×1296 (880×648 @2x) */
  panelBackdrop: '/images/panel-bg.webp',

  /** Lucky Honey product photos — nodes 2171:531 / 537 / 543. 358×247 */
  productJuliet: '/images/product-juliet.webp',
  productCheckered: '/images/product-checkered.webp',
  productStripe: '/images/product-crewstripe.webp',

  /** Happy Mondays wordmark — nav, node 2171:569. 313×71 */
  wordmark: '/images/logo-hm.webp',

  /**
   * Proof-row partner marks, cropped from the delivered lockups (§2171:646).
   * The exports arrived as icon + label lockups rather than bare icons, so the
   * marks are cropped out and the label stays as markup in the row's own type.
   * The lockups are kept alongside as the source of record — see
   * public/images/README.md.
   */
  shopifyPartner: '/images/icon-shopify.png',
  googleAdsPartner: '/images/icon-google-ads.svg',

  /**
   * Weekly-Loom thumbnail (pillar 3). Not part of §8 and not delivered — this
   * one still renders as a CSS fallback.
   */
  videoThumb: '/images/video-thumb.webp',
} as const

export type ImgKey = keyof typeof IMG

/** Product photos are landscape, not square — see §A3 Shopping graphic. */
export const PRODUCT_ASPECT = '358 / 247'

/** The Figma window composes as sidebar + panel, top-aligned. */
export const DASH = {
  sidebarW: 220,
  sidebarH: 659,
  panelW: 908,
  panelH: 615,
  /** Combined window, which the glass rim wraps. */
  width: 1128,
  height: 659,
  newOrderW: 418,
  newOrderH: 114,
} as const

/** §8 logo strip — 8 brands, nodes 2171:660–674. Rendered as one flat grey. */
export const LOGOS = [
  { name: 'At Present', src: '/images/logo-atpresent.webp', node: '2171:660' },
  { name: 'JPHA', src: '/images/logo-jpha.webp', node: '2171:662' },
  { name: 'Reincoat', src: '/images/logo-reincoat.webp', node: '2171:664' },
  { name: 'Plum', src: '/images/logo-plum.webp', node: '2171:666' },
  { name: 'Lucky Honey', src: '/images/logo-luckyhoney.webp', node: '2171:668' },
  { name: 'Go Flower', src: '/images/logo-goflower.webp', node: '2171:670' },
  { name: 'Nativemed', src: '/images/logo-nativemed.webp', node: '2171:672' },
  { name: 'Our Pets Life', src: '/images/logo-ourpetslife.webp', node: '2171:674' },
] as const

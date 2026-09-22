# Image assets

The exports listed in §8 of the build spec are **not committed to this repo**. This
session could not fetch them: the Figma MCP resolves the nodes, but the Figma asset
CDN (`www.figma.com`) is blocked by the environment's egress policy, so the files
could not be downloaded here.

Every consumer degrades gracefully — `<Photo>` (src/components/Photo.tsx) falls back
to a tuned CSS gradient when a file is missing, so layout, spacing and intrinsic
sizes are correct without them. **Drop the real exports in at these exact filenames
and they go live with no code change.**

All at **2x, WebP** unless noted.

| File | Figma node | Notes |
|---|---|---|
| `a-hero-bg.webp` | `2171:556` | Concept A hero background (Zac's Magnific image) |
| `a-hero-foreground.webp` | `2171:561` | Rooftop cut-out — **alpha required** |
| `b-hero.webp` | `2171:677` | Concept B hero photo (Santorini) |
| `pillar-1-backdrop.webp` | `2171:313` | Backdrop layer only (hide graphics before export) |
| `pillar-2-backdrop.webp` | `2171:374` | As above |
| `pillar-3-backdrop.webp` | `2171:437` | As above |
| `panel-backdrop.webp` | `2171:513` | Search & shopping panel backdrop |
| `product-juliet-grip-sock.webp` | `2171:531` | Lucky Honey product photo |
| `product-checkered-crew-grip-sock.webp` | `2171:537` | Lucky Honey product photo |
| `product-crew-stripe-grip-sock.webp` | `2171:543` | Lucky Honey product photo |
| `video-thumb.webp` | — | Weekly-Loom thumbnail (pillar 3) |

## Logos (SVG preferred, rendered grey via CSS)

`logo-at-present.svg` `2171:660` · `logo-jpha.svg` `2171:662` ·
`logo-reincoat.svg` `2171:664` · `logo-plum.svg` `2171:666` ·
`logo-lucky-honey.svg` `2171:668` · `logo-go-flower.svg` `2171:670` ·
`logo-nativemed.svg` `2171:672` · `logo-our-pets-life.svg` `2171:674`

The Happy Mondays wordmark (`2171:569`) and the Shopify / Google Ads partner icons
are drawn inline as SVG in the components, so they need no export.

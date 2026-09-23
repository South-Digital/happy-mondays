# Refinement assets and evidence

23 September 2026. These assets support internal homepage concept review. Final delivery is still Framer.

## Nature imagery

Originals were generated with the built-in image generation tool, then upscaled through the user-authorised Magnific connector at 4×. These are AI-created landscapes, not photographs of a verified location. No real people or brand marks were generated. Magnific charged 450 existing credits per upscale (900 total); no credits or subscription were purchased.

| Asset | Native generation | Magnific master | Served variants |
| --- | --- | --- | --- |
| Coastal morning / A | 1,774 × 887 | 7,088 × 3,536 | 800, 1,440, 2,400, 3,840 px wide |
| Coastal hillside / B | 1,122 × 1,402 | 4,480 × 5,600 | 800, 1,440, 2,400 px wide |

Magnific slightly adjusts dimensions to its output grid. The master dimensions are verified from the downloaded files. Higher output resolution does not mean that every fine detail was present in the native generation.

Full-resolution local working files, excluded from Git and the public deployment:

- `.design/sources/coastal-morning-original.png`
- `.design/sources/coastal-morning-magnific-4x.jpg`
- `.design/sources/hillside-original.png`
- `.design/sources/hillside-magnific-4x.jpg`

Site-ready exports live in `public/images/refinement/`. `<picture>` serves AVIF with WebP fallback and width-based `srcset`; the highest-resolution masters are never downloaded by ordinary page visitors. AVIF quality 70, WebP quality 88, downsampling with Lanczos. No additional semantic image editing was applied during export.

Generation prompt briefs (reconstructed from the generation instructions):

**A — photorealistic-natural.** A panoramic 2:1 Mediterranean coast in clear morning sunlight. Pale limestone in the foreground, open quiet blue sea, horizon around the upper third, a small headland on the left and an olive branch entering from the upper right. Real surface texture and natural photographic light. Calm space suitable for a homepage composition. No people, buildings, furniture, devices, text or logos. Avoid haze and an artificial rendered appearance.

**B — photorealistic-natural.** Portrait 4:5 editorial photograph of a sunlit coastal hillside, fresh muted greens and golden grasses, a Mediterranean pine framing the right edge and a blue sea opening into the distance. Natural sunlight, detailed grasses, rock and foliage, believable photographic texture. No people, buildings, text or logos.

Both selected outputs were visually reviewed, as were 1,000 px detail crops of the Magnific results. Rendered crops were then reviewed in the browser. Do not describe the master as native 7K photography.

## People and testimony

**Keanu Fischell portrait:** recovered from page 52 of the client-supplied 57-page Babydoc audit. Embedded source: 1,600 × 1,066 JPEG. It has not been AI-reconstructed. Exports: 480, 960 and 1,600 px wide. Local source PDF: `/Users/zacsanter/HappyMondays/95-research/2026-09-23/babydoc-audit.pdf`.

Source message: https://southdigitalgroup.slack.com/archives/C0BSCJZAV44/p1788858977633579

**Gary Ingram quote:** page 56 of the same supplied audit, attributed to Co-Founder, The Diamond Store. The wording used on the page is a faithful excerpt. No revenue, ROAS or growth statistic is attached to the quote. Confirm publication permission and final attribution before public launch.

**Founder credentials:** the source content plan identifies four years inside Google. The refined copy applies the Google background to Keanu, not to every member of the team. Research authority: `doc-early-content-plan.txt`, the supplied copy/strategy materials and `PROJECT_UNDERSTANDING.md` in the dated research folder.

## Brands and products

Happy Mondays wordmark, Shopify/Google partner marks and six client logos are the supplied repository assets. Client logo exports contain substantial transparent padding and 50% alpha. The refinement variants crop that padding without redrawing or altering the marks; CSS supplies a consistent monochrome treatment.

Lucky Honey is an existing supplied example brand. Two higher-resolution product photographs were recovered from the brand's own public catalogue, correcting the duplicated image previously used for Crew Stripe:

- Juliet Grip Sock, Baby Blue: https://luckyhoney.nyc/products/the-juliet-sock
- Image: https://luckyhoney.nyc/cdn/shop/files/JULIET_Baby_Blue_4.jpg?v=1776707608&width=1530
- Crew Stripe Grip Sock, White / Rose: https://luckyhoney.nyc/products/the-crew-grip-sock
- Image: https://luckyhoney.nyc/cdn/shop/files/CREW_STRIPE_Rose_4.png?v=1775055998&width=2295

The checkered product remains the supplied Figma export, used at a small display size. All product prices, placements, search ads and video creative are part of an explicitly labelled illustrative demonstration, not a live product feed or approved advertising campaign. Confirm client approval of final imagery/creative before public launch.

## Prototype boundaries

- Booking buttons show an accessible preview message. The historical 30-minute Calendly link does not resolve the newer 15-minute/two-path brief, so no event has been silently selected.
- Dashboard sales, orders, conversion rates, ROAS and the order notification are fictional illustration data, visibly labelled.
- The service demonstration does not send data to Google, Shopify or Lucky Honey.
- The 5.0 Clutch treatment follows the current supplied direction; the old review-count claim was removed.
- Current partner status, client-logo permissions, testimonial publication approval and the final booking event remain launch inputs.
- The previous 60–70% split, 4–6-account capacity and weekly-Loom promises were removed.

## Source-grounded Concept A hero study — 23 September

The new hero uses `public/images/hero-a-v2/`. Its exact ImageGen prompt, original dimensions, Magnific 4× master dimensions and responsive export details are documented in that folder's `README.md` and `HERO_A_REVIEW.md`. This photograph replaces the earlier coastal image only in the new hero study; earlier generated assets remain attached to the rejected pass.

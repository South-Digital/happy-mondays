# Image assets

Every §8 export has been delivered and is wired in, plus the Shopify window as
three images. Each is committed both as the supplied PNG (source of record) and
as the WebP the app serves; alpha is preserved where the export has it.

`<Photo>` still falls back to a tuned CSS gradient if a file goes missing, so a
bad path degrades rather than leaving a hole.

| File | Figma node | Size | Notes |
|---|---|---|---|
| `a-hero-bg` | `2171:556` | 2000×1786 | Concept A hero background |
| `a-foreground` | `2171:561` | 2000×467, alpha | Rooftop cut-out |
| `b-hero` | `2171:677` | 2000×1667 | Concept B hero photo |
| `dash-sidebar` | — | 440×1318 (220×659 @2x) | Shopify sidebar |
| `dash-panel` | — | 1816×1230 (908×615 @2x) | Analytics panel |
| `dash-neworder` | — | 836×228 (418×114 @2x) | "New order" card |
| `pillar-bg-1/2/3` | `2171:313/374/437` | 768×672 (384×336 @2x) | Pillar backdrops |
| `panel-bg` | `2171:513` | 1760×1296 (880×648 @2x) | Search & shopping backdrop |
| `product-juliet` | `2171:531` | 358×247 | Lucky Honey product photo |
| `product-checkered` | `2171:537` | 358×247 | Lucky Honey product photo |
| `product-crewstripe` | `2171:543` | 358×247 | Lucky Honey product photo |
| `logo-hm` | `2171:569` | 313×71 | Happy Mondays wordmark |
| `logo-*` ×8 | `2171:660`–`674` | 327×144 | Client logos |

| `icon-shopify` | `2171:648` | 32×36 | Shopify mark, proof row |
| `icon-google-ads` | `2171:651` | 18×18 SVG | Google Ads mark, proof row |
| `partner-*-lockup` | `2171:647/650` | 234×44, 142×22 | Delivered lockups, kept as source |

Not delivered: `video-thumb`, the weekly-Loom thumbnail in pillar 3 (not part of
§8). `IMG.videoThumb` is deliberately an empty string — pointing it at a missing
file put a 404 in the console on every load, and `<Photo>` renders its CSS
fallback for an empty src without making a request. Set it to the real path once
the thumbnail exists.

## Narrow variants

The large photographs also ship a `-1000.webp` variant, offered through `srcSet`
by `<Photo responsive>`, so a phone does not download a 2000px image:
`a-hero-bg`, `a-foreground`, `b-hero`, `panel-bg`, `dash-panel`. This took
Concept A's Lighthouse mobile performance from 77 to 88 and its LCP from 4.6s to
3.5s. Regenerate a variant with the same basename if its source is ever
replaced.

## The partner marks

The two partner assets arrived as **icon + label lockups** (the Figma
*Containers*, `2171:647` and `2171:650`) rather than the bare icons — the words
"Shopify Partner" and "Google Ads Partner" are baked into the artwork. Using them
whole would have printed each label twice, once from the image and once from the
row's own markup, and would have replaced the row's Manrope with whatever type
the lockups carry.

So the marks are cropped out and the labels stay as markup:

- `icon-shopify.png` — the first 40px of the 234×44 lockup, trimmed to the mark
  (32×36; the frame draws it at 16×19).
- `icon-google-ads.svg` — the lockup's viewBox narrowed to `0 2 18 18`, which
  crops to the mark losslessly without touching the paths.

The delivered lockups are kept as `partner-shopify-lockup.png` and
`partner-google-ads-lockup.svg` in case the full badge is wanted somewhere.

## Two things to know about the exports

**`product-juliet.png` and `product-crewstripe.png` are byte-identical** (same
MD5), so two of the three Shopping results show the same photograph. Replacing
`product-crewstripe.png` with the real Crew Stripe shot fixes it with no code
change.

**The client logos already carry their ~50% grey in the alpha channel** (max
alpha is 128), so the strip must not apply a further `opacity-50` or they drop to
25% and all but vanish. They also vary in density between files, so `LogoStrip`
flattens each to a silhouette with `grayscale(1) brightness(0)` to get the single
flat grey §A1 asks for.

**Each logo export is a whole list cell, not a cropped mark** — 163.25 × 72 at 1x
(327 × 144 at 2x), with the mark already positioned and sized inside it. So the
marks come out at their drawn sizes (~32px tall, ~16px for the wider At Present
and Go Flower marks) simply by rendering each cell at full width in an eight-column
row with a 10px gutter, which is the 1376px strip from the frame. Setting a
uniform height on the images instead renders every mark at the wrong scale.

## A note on the rooftop cut-out

`a-foreground.webp` is only fully opaque across its whole width from **81% down**;
higher up, coverage drops to ~73% because the far-left terrace sits low in frame.
Concept A's hero relies on this: the dashboard is held at a constant 78vw and the
scene's bottom padding is set in `vw`, so the dashboard's bottom edge always lands
at ~90% down the rooftop — below the opaque line at every width. Changing either
value risks exposing the dashboard's lower edge. `.dev/verify-overlap.mjs` checks
this against the image's real alpha channel.

## The Shopify window

The window is the Figma export, composed as sidebar + panel side by side and
top-aligned. The sidebar (659) is taller than the panel (615) and so sets the
window height, with the card's white showing below the panel — which is how the
frame reads. There is no browser bar, per §A1.

The hand-built HTML/CSS recreation is still in the repo (`DashboardHtml`,
`DashboardHtmlMobile`, `NewOrderCardHtml` in `src/concepts/shared/Dashboard.tsx`).
Setting `USE_HTML_DASHBOARD` in `src/lib/flags.ts` to `true` swaps it back in on
both concepts.

## Motion

All motion is defined in `src/lib/motion.ts` — one easing family, one set of
durations, one stagger — and consumed from there by both concepts. Two notes
that bear on the assets:

- **The chart "draws in" by masking, not by stroke-dashing.** The panel is a
  Figma export, so there is no stroke to animate. A panel-coloured cover sits
  over the plot area and translates off to the right, which reads as the line
  drawing left to right and composites without touching layout. Its inset is set
  in percentages of the 908×615 panel, so it tracks the artwork at any width — if
  the panel export is ever replaced at a different crop, re-check `ChartReveal`
  in `src/concepts/shared/DashboardImage.tsx`.
- **The metric count-up only runs on the HTML recreation.** The exported panel's
  numbers are pixels, so they cannot count. `DashboardHtml` counts all four up
  over 900ms; the export shows them final.

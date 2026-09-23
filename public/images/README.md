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

## Variants, and the resolution ceiling

The large photographs ship `-1000.webp` and `-1600.webp` variants, offered
through `srcSet` by `<Photo responsive variants={[...]}>`.

**The three hero photographs are upscaled on large or retina screens and cannot
be fixed from the files we have.** Source width / drawn width, measured in
Chromium accounting for `object-fit: cover` (1.00 = pixel-perfect, below 1.00 =
upscaled):

| photo | source | 1440@2x | 1920@2x | 2560@2x |
|---|---|---|---|---|
| `a-hero-bg` | 2000px | 0.61 | 0.52 | 0.39 |
| `b-hero` | 2000px | 0.63 | 0.52 | 0.38 |
| `a-foreground` | 2000px | 0.58 | 0.43 | 0.33 |

Everything else measures at or above 1.00 at 2x.

No 2400 or 3200 variants are generated, deliberately: the sources are 2000px, so
those would be upscales that add bytes and no detail. Reaching 1.00 at 2560@2x
needs roughly **5200px** for the two hero backgrounds and **6100px** for the
rooftop — about a 3x export of the 1716px-wide frame. When those land, drop them
in and add their widths to the `variants` prop; nothing else changes.

Note `naturalWidth` is density-corrected once `srcSet` and `sizes` are set, so it
reports the CSS size rather than the file's pixels — measuring upscaling that way
gives a false 1.00. `.dev/img-quality2.mjs` reads the real pixel dimensions off
disk instead.

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
Concept A's hero relies on this: the dashboard is held at a constant **80vw** (the
frame's 1152/1440, node `2171:557`) and the scene's bottom padding is set in `vw`,
so the dashboard's bottom edge always lands at ~90% down the rooftop — below the
opaque line at every width. The rooftop itself is pinned to the frame's own
geometry, node `2171:561`: **117.83% wide, offset −8.243%**, which is x −118.7 to
x 1578 in a 1440 frame. All three numbers are load-bearing — changing any of them
risks exposing the dashboard's lower edge. `.dev/verify-overlap.mjs` checks this
against the image's real alpha channel and is the gate on any change here; at the
current values it measures 43 / 38 / 30px of cover at 1440 / 1280 / 1024.

## The Shopify window

Frame `2171:557` draws this as **two separate cards inside one glass rim**, not a
single split card:

```
rim       8px padding, radius 18
row       1136 wide, justify-between, items-start
sidebar   220 x 658.894, radius 18, at x0
panel     908 x 615,     radius 18, at x228   -> an 8px gap between them
```

The panel is 43.9px shorter than the sidebar, so the rim shows below it — that is
the design, not a bug. The rim's radius is 18, the same as the cards, so this
does not use the concentric 30/22 `.glass-rim-lg`; it has its own `.dash-rim`.
There is no browser bar, per §A1.

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

## Resolution and the variant ladder

`npm run images` (scripts/gen-image-variants.mjs) encodes the WebP ladder
**1000 / 1200 / 1600 / 2400 / 3200 / 4000** at quality 84 and writes
`src/lib/image-variants.json`, which `<Photo responsive>` reads to build its
srcset. It **never upscales**: a rung is only emitted when the source is at
least that wide, so a photo that cannot cover its slot stays visibly soft in
the audit rather than being stretched to hide it. Drop a larger export in here,
re-run it, and the new rungs are picked up with no code change.

`sizes` must describe the width the image actually PAINTS at, not the width of
its box. For a full-bleed `object-cover` photo those differ: concept A's hero
background paints at **119vw** (node 2171:555) and the rooftop at **118vw**
(node 2171:561). Declaring 100vw makes the browser choose a file that is too
small, which is indistinguishable from a low-resolution source.

Measured at the time of writing (painted width at a 1440 viewport, and what
DPR 2 needs), via `.dev/img-audit.mjs`:

| file | source | painted @1440 | needs @2x | ratio | verdict |
|---|---|---|---|---|---|
| a-hero-bg | 2000x1786 | 1716 | 3432 | **0.58** | re-export ≥ 4600px wide |
| a-foreground | 2000x467 | 1697 | 3394 | **0.59** | re-export ≥ 4600px wide |
| b-hero | 2000x1667 | 1584 | 3168 | **0.63** | re-export ≥ 3900px wide |
| dash-panel | 1816x1230 | 906 | 1812 | 1.00 | ok |
| dash-sidebar | 440x1318 | 220 | 440 | 1.00 | ok |
| panel-bg | 1760x1296 | 832 | 1664 | 1.06 | ok |
| pillar-bg-1/2/3 | 768x672 | 384 | 768 | 1.00 | ok |
| logo-* | 327x144 | 163 | 326 | 1.00 | ok |
| product-* | 358x247 | 123-160 | 246-320 | 1.12-2.91 | ok |

At 1920 the three photographs fall to 0.44 / 0.44 / 0.52. A 3x export from the
frame clears every case: 1716, 1697 and 1450 at 3x are 5148, 5090 and 4350.

## A note on the hero photograph's crop

Node 2171:555 renders the background **1716x1286 in a 1440x1286 hero at x-138**:
119.1667% of the hero's WIDTH, horizontally centred, top-anchored, with the
excess cropping off the bottom. It is keyed to width and never to height.

Sizing it by height - which is what `h-[115%] object-cover` did - makes the
horizontal crop depend on how tall the hero happens to be, so the visible slice
of the photograph moved with the viewport: source x 105..1895 at 1440, but
210..1790 at 1024, cutting the village and trees out of the right-hand edge.
Keyed to width it is **x 161..1839 at every width**, which is the frame's own
window. `.dev/village.mjs` measures this.

Concept B has the same height-keyed crop and has NOT been changed: its window
is x 91..1909 at 1440, 192..1808 at 1280 and the full 0..2000 at 1024, where it
flips to width-driven. Its export is a 2000x1667 **landscape** crop while the
frame uses a 1450x1933 **portrait** one (node 2166:4484, object-position centre
92%), so the frame's crop cannot be reproduced from this file at all.

## Clutch icon

`icon-clutch.svg` extracts the C-and-dot mark from the Clutch vector wordmark at https://cdn.worldvectorlogo.com/logos/clutchco.svg (source: https://worldvectorlogo.com/logo/clutchco). The C uses Clutch's dark `#17313B` for a light background; the original red dot and path geometry are retained. Used in the Concept A study’s credentials row.

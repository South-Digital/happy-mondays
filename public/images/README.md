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

Not delivered, still a fallback:

- `video-thumb` — the weekly-Loom thumbnail in pillar 3. Not part of §8.
- `icon-shopify.png` (16×19, node `2171:648`) and `icon-google-ads.svg` (18×18,
  node `2171:651`) — the proof-row partner icons. The Figma asset CDN is blocked
  by this environment's egress policy, so they could not be exported here. The
  slots are wired: drop the two files in at those paths and they replace the
  placeholder marks with no code change.

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

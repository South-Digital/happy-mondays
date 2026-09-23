# Concept A — focused hero study

23 September 2026. Internal design review, not client-approved. Builds from Emmanuel's `b8e6fa6` composition after Zac rejected the broader redesign and authorised a focused correction.

## Review

- Current hero: `/concept-a`
- Without motion: `/concept-a?motion=reduce`
- Original A: `/baseline/concept-a?motion=reduce`
- Original B: `/concept-b`
- Rejected prior pass: `/rejected/concept-a` and `/rejected/concept-b`

The current A stops after the hero and credentials. The entry page explains the scope. Visible review controls and the illustrative-data caption were removed from the concept at Zac’s request. Lower sections have not been recomposed around an unapproved hero.

## Source decisions

The [18 September call](https://docs.google.com/document/d/1QZw3pYGizFvJs8p1F_FfgZgWTCP7Plpl8sHHL8ScW_A/edit), [Miro board](https://miro.com/app/board/uXjVHmXBav0=/?share_link_id=173104433004), and [internal hero brief](https://docs.google.com/document/d/1MZWV3fJM3rNQH5ILOwxcZ7fHinERu7_SDy3vtZT6504/edit) govern this study. The diagnosis and timestamps are in DESIGN_RESET.md.

- Centred two-line headline, grey first line and near-black second line; retained service statement and one principal CTA. Flat wordmark and conventional navigation.
- Blue CTA and chart; neutral off-white surfaces. The Shopify mark remains its recognised product colour inside the UI.
- Full-width, photographic coastal scene. The white foreground plane overlaps the dashboard. Background and foreground use the same photograph and responsive source; the foreground uses a CSS clip traced against the actual architectural edge. This prevents different perspective or lighting between the two layers.
- The photograph fades into the page above and below. The initial hard image seam and a sliver of water across the dashboard edge were caught in browser review and corrected.
- A native Shopify-style analytics window replaces the raster object, retaining the recognisable store sidebar, analytics hierarchy, metrics and chart. Soft translucent rim, neutral white panels, ambient shadow and one new-order card.
- Separate phone composition: no sidebar, three metrics, cropped chart and overlapping order card. The CTA sits directly below the copy in normal flow, followed by the dashboard; scene height grows with this content instead of pinning the CTA beneath the photograph. Short-phone adjustments prevent crowded metric values.
- Small staggered entrances and a restrained chart reveal. Scroll now separates the sea, dashboard, foreground and order-card layers with responsive limits; the partner row gently settles into view. See SCROLL_DEPTH.md for movement limits and validation. System reduced motion and the review query show settled content.

## Image delivery

Built-in ImageGen source: 1774 × 887. Magnific 4× master: **7088 × 3536**. This is an AI-upscaled generated image, not native camera photography. Inspected the complete image and a detail crop of water/plaster. Magnific used 450 existing credits; no purchase.

Master: `.design/hero-a-v2/coast-magnific-4x.jpg` (local, excluded from deployment).
Web assets: `public/images/hero-a-v2/`, AVIF and WebP at 800, 1440, 2400 and 3840 px. At 1440 the AVIF is about 51 KB; at 3840 about 487 KB. Identical source requests are reused for the two scene layers. The native HTML/SVG interface scales independently of the photograph.

The exact generation prompt and method are in [the asset README](public/images/hero-a-v2/README.md).

## Verification

- Production TypeScript/Vite build passes.
- Browser visual review: 320 × 740, 390 × 844, 768 × 1024, 1440 × 1100, 1920 × 1080.
- Additional DOM boundary checks at widths 700 and 1100. No document horizontal overflow or overlap between visible metric values across the seven checked widths. On 320 × 740 the hero CTA spans y=678–727.
- Native date selector changes the example figures and chart from 7 to 30 days; the example remains labelled illustrative. This is an interaction demonstration, not a data connection.
- Mobile menu opens, Escape closes it and restores summary focus. Booking invokes the existing prototype feedback.
- Reduced-motion review mode disables entrances/chart animation/drift. Actual OS settings were not changed.
- Fresh built preview has no captured browser warnings/errors. Responsive scene images load as AVIF; source selection follows the actual rendered scene width, including its cropped phone composition.
- No new automated test suite was added for this visual study. No field performance, Lighthouse score or blanket accessibility certification is claimed.

## Remaining design and launch work

This study needs to be judged against the original and client references. The rest of A, B's refinement, the position-five-to-one Shopping narrative and early human proof remain unfinished. Booking/navigation destinations are mocked. All dashboard figures are illustrative. Final evidence/permissions, client sign-off and Framer implementation remain outside this study. Existing production is unchanged.

## Follow-up: foreground fade

Replaced the four-stop foreground fade with a longer smoothstep gradient and subtle monochrome dithering to reduce visible bands. Removed the on-page data caption and review footer at Zac’s request.

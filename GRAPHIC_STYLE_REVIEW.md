# Concept A — platform graphic refinement

30 September 2026. Supersedes the rejected catalogue, orbit diagram and waveform proposal.

## Direction

The user identified two problems: graphics did not resemble the platforms they represented, and decorative eyebrow headings made the page feel generic. This pass removes those headings from the rendered Concept A continuation and replaces the three approach graphics.

- Google Shopping: search field, navigation tabs, sponsored product listings, product titles, prices and merchant names. Uses existing actual Lucky Honey product photography, not generated jewellery imagery.
- Shopify: charcoal admin header, grey workspace, bordered white metric cards and a purple analytics chart. The numbers and chart reveal once on entering the viewport; these remain illustrative figures, not a client result.
- People: Keanu’s actual portrait and a plain name/caption. No invented player, waveform, recording duration or floating update badge. The duplicated founder teaser in the first product row is removed.

Typography, colours and surfaces follow each platform’s conventions rather than applying the same glass treatment to every graphic. These are simplified illustrative previews, not exact screenshots of current accounts. Reference structure checked against Google Shopping ad guidance and Shopify Analytics documentation:

- https://support.google.com/google-ads/answer/6275294?hl=en-uk
- https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/overview-dashboard/index

The two preceding product-story rows retain their existing generated concept photography, with provenance recorded in public/images/product-studies/README.md. Their UI overlays now use clearer Merchant Center / Analytics identity and plainer platform-specific surfaces. This pass does not claim to replace all generated photography on the page.

## Motion and verification

- Finite 3.4-second sequence; count-ups and chart reveal stop at their final state. Existing shared timeline suspends offscreen and in hidden tabs. Reduced motion shows the completed state.
- Observed normal playback from zero through intermediate $12,692 / 182 orders to final $12,846 / 184; final chart clipping width is 300.
- Visual review on desktop and 390px phone. Geometry checks at 320, 390, 760, 1000, 1001, 1100, 1440 and 1920px: no page horizontal overflow, no inner frame vertical clipping, and zero remaining decorative eyebrow elements.
- Regular and client-review TypeScript/Vite builds pass; no new dependencies; browser warning/error logs empty during local review.

The section remains after the two product-story rows and before the closing invitation. Historical baseline components remain untouched. Functional checks do not establish client aesthetic approval.

## Motion follow-up

The latest pass replaces the 3.4-second sequence described above with a 4.2-second background/interface/data choreography and independent bounded scroll travel. See MOTION_REFERENCE_REVIEW.md. The platform styling and real image assets are unchanged.

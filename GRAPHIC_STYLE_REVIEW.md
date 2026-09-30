# Concept A — graphic language refinement

30 September 2026. A design proposal for review, not client sign-off.

The supplied screenshot matches the older baseline Pillars component, which is not rendered on the current Concept A. A placement question was offered; in the absence of a reply, the new interpretation is added after the two current product stories and before the closing invitation. The historical baseline remains available locally for comparison.

## Direction

The previous set repeated a white rounded rectangle, checklist and corner badge three times. The replacement uses three distinct silhouettes with shared material treatment:

- Product expertise: photographic catalogue layers fan out and settle; a restrained Google/search layer follows. High-resolution existing concept jewellery imagery keeps the ecommerce context tangible.
- Connected approach: four softly lit nodes link through a translucent central Shopify object. Tracks draw as the scene assembles. The diagram describes connected work rather than asserting an unverified percentage of wins.
- Personal partnership: Keanu’s actual photograph and name establish the person behind the service. A separate update/waveform composition arrives afterward. It is a presentational illustration, without a fake video player or invented recording duration.

Sand, sage and slate-blue light tie the scenes to the coast and photographic continuation. CSS/SVG layers remain resolution-independent; the portrait and product photograph use responsive sources. Motion runs once for 4.6 seconds, suspends offscreen/when hidden, and waits for photographs to decode. Reduced motion presents the finished composition immediately.

## Review and verification

- Reviewed desktop, phone and tablet layouts in-browser.
- Reworked the portrait crop and layer spacing so no text is obscured by foreground panels.
- Moved to a single column at 1000px and below; avoided three tiny tablet illustrations.
- Corrected minimum-aspect-ratio overflow at 320px. Final checks at 320, 390, 760, 1000, 1001, 1440 and 1920px show no horizontal overflow, with portrait captions clear of the foreground panel.
- Sampled actual animation at 0.5, 1.8, 3.2 and 4.5 seconds: catalogue arrives before the search layer; nodes/tracks assemble; portrait precedes update panel and waveform.
- Regular and client-review TypeScript/Vite builds pass. No new dependencies. Browser warning/error logs empty.

The source call/board interpretation remains documented in PRODUCT_STORY_REVIEW.md and DESIGN_RESET.md. This is a visible art-direction proposal; functional verification does not establish aesthetic approval.

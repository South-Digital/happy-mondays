# Concept A — product-led continuation

30 September 2026. Replaces the rejected `CONCEPT_A_CONTINUATION.md` implementation, not the selected hero. Design review, not client sign-off.

## Evidence and decisions

- Call 33:11–35:14: striking florist/product photography signals the quality of their ideal ecommerce customers. Concept-brand sector images explicitly welcomed. Product imagery must dominate rather than decorate a miniature UI.
- Call 38:10–41:05 and 48:01–49:51: softened photographic colour, layered white/glass, rounded forms and composed motion. Avoid simple pastel panels and excessive competing colours.
- Call 43:21–47:00: ecommerce familiarity is a supporting detail. Avoid making visitors think they are buying a product or subscribing to an app.
- Call 57:05 onward: ranking demonstration is a separate storytelling opportunity, not the organising principle of this continuation. Defer it rather than disguise its removal as fulfilment.
- Live Miro revisited: written art-direction notes; Diamond Store product photograph grid; Solidroad blurred photographic cards; Calendly split-copy/graphic composition. The earlier board capture incorrectly labelled the jewellery grid as At Present; its screenshot visibly says The Diamond Store.
- Supplied 37-second Synex video reviewed as sampled frames through its whole duration and at 5 fps across 5–11 seconds: clear changes of scale, backgrounds preceding foreground panels, separate motion layers, quiet resting states. Rock/moss interactions are not needed. Recorded motion is a reference, not proof of production scroll implementation.
- User's latest feedback rejects the combined shopping/store module. Try two alternate image/copy rows, with enough variation to avoid a repeating template.

## Art direction

1. Jewellery / discovery. Large photographic gold hoops on ivory fabric, natural olive light. A single search cue and small overlapping Shopping result. Copy explains feeds and campaigns. No illustrated competitors, ranking claim or fake results.
2. Beauty / conversion. Amber glass product against sunlit limestone; content left and graphic right. A product/detail image control is a small meaningful ecommerce interaction. Copy explains the path after the click. No fake checkout.
3. Small founder presence within the first row, then a compact closing invitation. The agency remains visibly a people business.

Keep the two photographs related by lighting and material softness, differentiated by composition. Blue remains the action colour; gold/amber/olive belong to photography. Retain the approved A hero and B comparison.

## Motion specification

- Native page scroll, no forced scrolling or pinned reading requirement.
- Gentle photographic travel within a clipped frame; UI layer travels independently in the opposite direction. No rocking or continuous loop.
- UI entrance after the image establishes itself. Short easing tail, no abrupt blur switch or spring overshoot.
- Text remains readable. Service disclosures work by keyboard and touch, keep a clear expanded state. Gallery controls are explicit and have a stable frame.
- Reduced motion: no parallax or staged entrance; instant gallery/disclosure state. Mobile: smaller travel and deliberate image-before-copy rhythm.

## Review gates

- [x] Reconcile call, current client feedback, live board and attached motion reference.
- [x] Generate two photographic concepts and inspect material realism.
- [x] Judge the first composition in-browser before final asset production.
- [x] Review the second row and the transition between hero, proof and continuation.
- [x] Inspect image details at final export scale; produce responsive variants.
- [x] Check widths 320–1920, scene boundaries, paragraph measure and tap targets.
- [x] Check scroll, detail controls, disclosures, keyboard and reduced motion.
- [x] Production build, publish review branch, verify live alias.

Do not equate engineering checks with aesthetic approval. Photographs are AI-created concepts, not real client products. No new performance metrics or endorsements.

## Verification and refinements

- Browser geometry at 320, 390, 600, 760, 761, 900, 1024, 1440 and 1920 CSS pixels: no horizontal overflow or UI outside the viewport. Visual inspection at 320, 390, 761 and 1440. These are emulated viewports, not physical-device testing.
- Revised the smallest typography and provided 44px gallery and 48px disclosure targets.
- Moved the gallery control off the product in its default view; full image/detail controls work by click and Space and expose pressed state.
- Service disclosures animate their height, expose expanded state and hide closed content from the accessibility tree. Both contain real service explanation rather than invented product claims.
- Native scroll changes photo and glass transforms in opposite directions. Motion is bounded and has no autoplay loop or pinned scroll.
- Reduced-motion URL tested: photo/glass transforms are none, image-detail state is instant, content remains visible. OS preference uses the existing shared hook; no OS setting was changed.
- No broken loaded images or browser console warnings/errors. Responsive AVIF sources confirmed in the browser, WebP fallback provided.
- TypeScript/Vite regular and client-review builds pass; no dependency additions. Client JavaScript 321.33 kB / 104.19 kB gzip.
- Hero A and Concept B source remain unchanged in this pass.
- Published implementation commit `d91836c` through GitHub auto-deploy. The production alias renders both replacement sections; the old module is absent and all loaded images resolve. Deployment: `happy-mondays-design-review-hd2mj76au-zac-santers-projects.vercel.app`.

## Coordinated scene motion — 30 September

The first photography pass had entrance effects and parallax but no changing scene state. The follow-up now gives each product composition one finite 8.6-second timeline:

- Discovery: the search query types in, a feed-ready confirmation arrives, product views and store visits count up while the graph draws, then the confirmation dissolves.
- Shopify: sales and orders build; a new $48 order appears and contributes the final sales increment. The notification dissolves into the final state.
- A soft passing light complements the existing bounded photograph/glass parallax. No continuous looping or scroll hijacking.
- Playback starts only after the image has decoded and the metric panel has entered view. A shared clock stops offscreen, while the document is hidden, or when the visitor chooses Pause; Replay restarts the complete sequence.
- Reduced motion presents the final figures and graph immediately, with no parallax or playback controls. Accessible metric descriptions remain stable rather than announcing every frame.
- All figures are labelled illustrative and refer to concept products, not measured client results.

Validation: normal and client-review production builds passed. Browser checks at 320, 390, 760, 761, 1024, 1440 and 1920px found no horizontal overflow or escaped scene overlays. Visually inspected desktop and phone compositions. Pause held at 269ms across separate observations; resume advanced; an offscreen sales scene held at 7384ms. Reduced mode showed 2,480 views / 186 visits and $1,888 / 39 orders with no photograph transforms. No browser warning/error logs.

## Hero dashboard and entrance — 30 September

The hero now uses a single 4.8-second clock, with the visible action settling by 4.3 seconds. Both coastal layers must decode before the scene begins. Dashboard playback waits until 35% of its frame is visible and suspends offscreen or in a hidden document. The existing bounded scroll depth remains independent of the entrance transforms.

Sequence: coast and foreground crossfade together; the glass dashboard rises 26px and settles from 98.5% scale; sidebar rows resolve in a short stagger; four metrics count up; the chart line and its area reveal together; the order notification arrives and contributes $79 / one order to the final totals. No animated backdrop blur or full-area fill appearing ahead of its line. Reduced motion renders all final values immediately.

The dashboard retains its sidebar/content gap. The refinement uses softer frame highlights, neutral white content, a sage Analytics selection, consistent tabular figures, subtle metric separators, quieter comparison labels and a restrained chart endpoint. The layout is compact enough to show more chart above the foreground wall. Date range remains presentational.

Validation: regular/client builds; geometry at 320, 375, 390, 700, 701, 900, 1024, 1440 and 1920px. Fixed a 4px ROAS-column overflow at 701px; all metric columns fit afterward. Desktop, mobile and narrow-tablet screenshots reviewed. Sampled the actual load sequence: $70,216 at 1.38s; $127,367 with no order at 2.69s; $128,422 with the order entering at 3.69s; final $128,460 at 4.40s. Reduced motion has a fully drawn chart, final values, opacity 1 and no store transform. Browser warning/error logs are empty.

## 30 September — platform authenticity pass

Removed decorative pre-headings from both product rows and the closing invitation. Removed the repeated founder teaser. Simplified activity card surfaces and identified them as Merchant Center / Analytics, with Google blue and Shopify purple charts. The new approach section now uses recognisable platform layouts, actual Lucky Honey product photography and Keanu’s portrait; see GRAPHIC_STYLE_REVIEW.md. Earlier generated product-study photographs remain concept assets.

## 30 September — motion reference follow-up

The latest motion pass supersedes the earlier 8.6-second timing and minimal parallax specification. Product sequences now last 5.2 seconds, with an image-first entrance, independently arriving UI and stronger bounded camera travel. Hero typography uses masks and its dashboard entrance has greater travel. The approach scenes assemble background, interface and data over 4.2 seconds. See MOTION_REFERENCE_REVIEW.md for source observations, roadmap and validation.

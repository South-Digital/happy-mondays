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
- [ ] Production build, publish review branch, verify live alias.

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
- Production publishing and alias verification follow the final commit.

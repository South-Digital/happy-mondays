# Happy Mondays — motion direction

## Implementation update — scroll-led closing in a shared frame

The closing no longer opens at a threshold. The user now owns the whole transition through 1.7 viewport heights of scroll, with a damped follower (stiffness 105, damping 27, mass 0.55) smoothing input. The first 12% holds the three-card composition; expansion reaches full width at 90%, followed by a short final hold. Reversing scroll reverses the composition.

The real purchase section and closing share one sticky wrapper. Its measured top offset leaves an 80px slice of the purchase scene visible, then a 32px gap above the closing. Both remain at those coordinates during the sequence. The document continues scrolling normally; wheel, touch and keyboard input are not locked. The following footer stays below the viewport until the pin releases, including on tall screens.

All three cards start with top-left headings and supporting copy directly below. The centre booking action occupies the same lower slot as the outer-card signatures. As it opens, the headline grows from 34px to 66px, padding from 36px to 62px, and a bounded text column leaves the landscape open on the right. Keanu’s introduction joins the button toward the end.

Outer cards actually narrow, with padding reducing from 36px to 24px to accommodate a natural wrap. They retain full opacity through 27% of travel, then fade by 44%, before their content becomes crowded. Their shallow vertical inset adds recession without scaling the lettering. Mobile, short viewports and reduced motion retain a regular-flow layout with all content present.

## Implementation update — responsive playback and a simpler opening

The user’s subsequent feedback replaces the fixed-rate scene rule with bounded, scroll-responsive playback. The spatial parallax and closing spring remain separate from this clock.

- Establish a scene at 12% visibility. Hold after its first second until 42% of the graphic has been in view, so entering early does not spend the story below the fold.
- Measure actual page movement in viewport heights per second, including the effect of Lenis. Smooth velocity over 100ms; ease toward playback speed over 200ms when accelerating and 380ms when settling.
- At rest use 1× playback. Deliberate movement can ease toward 0.9×; fast movement and forward exit pressure can accelerate toward 1.9×. Neither direction rewinds actions or seeks through visible frames.
- Shorten commerce interface entrances to 950ms. Discovery reaches its final detail at 3.9 authored seconds; purchase confirmation completes at 5.2 seconds. The overall clock ends at 5.8 seconds, including a brief final hold.
- Once a composition is completely above the viewport, resolve its final state offscreen. Returning to a skipped section shows the finished composition. Hidden tabs and offscreen scenes otherwise pause. Reduced motion renders completed states directly.
- Hero type appears together with an 8px lift over 650ms, without masks, line staggering or blur. Supporting text has a 5px lift; the booking CTA is available immediately. Section copy enters over 600ms at 15% visibility.
- The basket subtotal changes discretely when the second item is added, matching its item count rather than counting through fictitious intermediate prices.

Validation includes six deterministic timing-policy tests (resting pace, maximum velocity, gradual deceleration, reverse movement, delayed frames, and completed-state stability), plus browser verification of visibility gating, real-scroll rate changes and reduced motion.

## Implementation update — three reasons, one invitation

The closing now develops from three cards into the existing coastal team invitation. This is a focused addition; the proposed hero and commerce choreography below remains separate work.

Roadmap for this pass:

- [x] Content: business understanding, direct senior collaboration, and a flat monthly fee. Keep Keanu as the first contact, with the agency/team as the subject.
- [x] Composition: sage and mist-blue blurred light on the outer cards; the existing pale stone, olive and sea photograph in the centre. Retain live type, rounded corners and the ocean-coloured booking CTA.
- [x] Motion: a short sticky desktop stage, independent spring-driven centre expansion, side-card fade/recession, restrained photographic settling and a delayed contact reveal. Reverse on upward scroll, with separate open/close thresholds to avoid flickering at the boundary.
- [x] Fallbacks: below 1080px wide or 700px high, use normal flow. Reduced motion also uses normal flow, showing both supporting points above the complete invitation; no information depends on animation.
- [x] Verify narrow and wide layouts, reverse/fast scroll, reduced motion and the booking preview; publish and check the live result.

Verification: production build and TypeScript checks passed. Browser review covered the 1280px three-card, intermediate and expanded compositions, 390px mobile presentation, 320px text bounds, the 1080px motion breakpoint and the 1440px reduced-motion flow. Normal reverse scroll restored the cards; a large scroll to the footer settled at full width. Booking still opens the existing design-preview message. The published page showed no console warnings or errors. Physical-device touch testing remains outside this browser check.

The expansion starts after 24% of the sticky travel, and closes below 4%. Crossing the threshold chooses a state; it does not scrub the animation. A spring of stiffness 100, damping 19 and mass 1 gives a small settle without a conspicuous bounce. Supporting cards have no focusable controls that could disappear while focused. Their copy stays available to assistive technology. The booking action remains available throughout.

1 October 2026. Original planning deliverable; see the implementation update below.

## Implementation update — Lenis foundation

Following the user’s request, Concept A now uses Lenis 1.3.26 for gentle window-based wheel smoothing (lerp 0.12, unchanged wheel distance). This supersedes the earlier recommendation against smoothing page input. Touch remains native, and OS reduced motion or `?motion=reduce` bypasses Lenis completely. Anchor navigation is enabled, mobile menu scrolling is excluded, and the instance is destroyed when the component unmounts or the preference changes.

Product timeline acceleration from scroll progress has been removed: elapsed visible time now drives their playback. The proposed new scene choreography remains future work. Browser checks confirmed smoothed wheel movement, back-to-top settling at zero, native Page Down, a skipped purchase scene pausing at 190ms rather than completing, and reduced-mode final states without Lenis. No browser console warnings/errors were observed. Touch behavior is configured but has not been verified on a physical phone.

This is the proposed next motion pass for Concept A, the client’s chosen direction. It supersedes the implementation roadmap in MOTION_REFERENCE_REVIEW.md, whose source observations remain useful but whose sections and controls no longer all exist. Concept B is outside this pass.

## Direction

Treat each composition as a small, directed scene: establish the setting, introduce the interface, demonstrate something meaningful, then let it rest. The visual ambition comes from timing, material quality, occlusion and clear cause and effect. It does not require more objects or constant motion.

Keep native page scrolling. Use restrained, delayed parallax for depth and independent, viewport-triggered timelines for the stories. A fast wheel flick must not turn a considered sequence into fast-forward playback. Text and CTAs should always remain easy to read and use.

The overall rhythm is: anticipation in the hero → reassurance in the proof → discovery and visibility → purchase and conversion → a calm, human invitation.

## Evidence reviewed

### Direct sources

- [18 September design review and transcript](https://docs.google.com/document/d/1QZw3pYGizFvJs8p1F_FfgZgWTCP7Plpl8sHHL8ScW_A/edit). Revisited the transcript, particularly 38:10–41:05, 46:52–51:54 and 57:05–1:02:08. They liked soft surfaces, subtle shadows, white space with coloured photographic/blurred compositions, and the premium feel of the wealth-management reference. They explicitly did not need growing branches or rocking objects. The proposed search-position story was about better campaign management and on-site work; Zac explicitly raised the risk of an unexplained card flying to the front.
- [1 September kickoff and transcript](https://docs.google.com/document/d/1_xX-rxHJ5r46hB8HoxGQZg0dOmgUMN2JvcK-3XcaPv8/edit), 20:05–20:56 and 25:47–31:03. The emotional premise is opening Shopify on Monday and feeling good. Voiceflow was admired for premium animation; recognisable Shopify micro-UI, order notifications and Shopping placements were discussed.
- [Client inspiration thread](https://southdigitalgroup.slack.com/archives/C0BSCJZAV44/p1788255220672529). Daniel liked Fourmula’s clean modern feel and micro-animations; both clients found Truus too colourful/playful. These are their expressed preferences, not a fresh audit of those websites.
- [Keanu’s gradient/animation feedback](https://southdigitalgroup.slack.com/archives/C0BSCJZAV44/p1790256115302199) and [Daniel’s natural colours, rounded forms and shadow feedback](https://southdigitalgroup.slack.com/archives/C0BSCJZAV44/p1790257187195239).
- Supplied Synex reference recording: `/Users/zacsanter/Downloads/2a17daf0ef6857b08c856b9bbd7ec253.mp4`. Freshly reviewed sampled frames across the recording, the opening at four frames/second and the card sequence at two frames/second. This is a motion/composition reference, not evidence of a particular production library or scroll implementation.
- Current local Concept A in normal motion mode, plus HeroAStudy, StorePreview, useHeroDepth, GrowthJourney, useSceneTimeline and the shared motion helpers.

### What the recording actually shows

In the opening, the dashboard is framed behind natural foreground objects; its value and chart resolve as the headline appears. Around 5–10 seconds, coloured backgrounds arrive before their foreground interfaces. The interfaces settle at different depths, followed by numbers and chart/map detail. The finished composition then holds. That hold is part of the design.

The recording includes page scrolling, but sampled footage cannot establish whether individual animations are scroll-scrubbed or time-triggered. Our model below is a deliberate choice for this site and this user’s request.

## Current diagnosis

- Animations have not all been removed. On the local normal route, reduced motion was false; the hero clock reached 4800ms, and the discovery clock was observed at 505ms and later 7600ms. The other scene remained unstarted while offscreen. This verifies that timelines still run, not that their quality is sufficient.
- `?motion=reduce` and the OS reduced-motion preference both render final states. Several earlier review URLs used that query. The user’s currently open tab was Concept B, so there is not enough evidence to attribute their perception to a particular setting.
- The current product scenes combine elapsed time with a scroll-derived minimum progress. Fast scrolling accelerates their clocks and can complete them offscreen. Remove this coupling.
- Existing parallax is mainly two UI planes; scenery and physical products have limited independent depth. A global zoom does much of the work. This is why the composition can feel like a moving flat picture.
- Discovery currently shifts a duplicated product track and highlights Morrow. It does not explain Happy Mondays’ intervention. A carousel slide is not a convincing before/after story.
- Purchase currently runs for 7.6 seconds and interpolates a subtotal through intermediate prices. It needs a tighter sequence and a discrete, credible basket update.
- Current source has multiple timing systems and stale shared comments. Consolidate them rather than layering another effect on top.

## The motion model

### 1. Scroll depth: responsive, with a soft finish

Use scroll only to set a bounded depth target. A damped follower moves each plane toward that target. Add a velocity limit so a large scroll jump cannot make an element whip across its available travel. A spring alone does not guarantee that limit.

Starting tuning values, to be judged in browser:

| Property | Desktop starting range | Phone starting range |
| --- | --- | --- |
| Distant photographic plane | 8–16px total travel | 4–8px |
| Mid-ground interface | 20–32px | 8–14px |
| Near interface/foreground | 36–48px | 12–20px |
| Settling after an ordinary scroll input | approximately 0.5–0.8s | approximately 0.35–0.55s |
| Decorative translation speed ceiling | 70–90px/s | 35–50px/s |

These are screen pixels and tuning hypotheses, not fixed specifications or additive offsets for every object. Every scene needs a bounded transform envelope checked against the actual crop. Perceived separation matters more than travel distance.

Scrolling upward reverses the spatial depth smoothly. It does not undo an order or count revenue backward. Never give the whole page delayed scrolling, lock input, or require visitors to finish a scene before continuing. No pinned sections in the first implementation: the existing large compositions already provide space. Fast readers may miss part of a story; forcing them to watch would be the wrong tradeoff.

### 2. Narrative: a short scene on its own clock

Preload nearby scene assets. Begin when the important part of the composition is visible and its required images are decoded. Use a short visibility dwell to avoid starting stories on a fleeting pass. Define visibility against the useful scene region, not a percentage that tall mobile scenes can never meet.

Lifecycle: ready → entering → demonstrating → settled. Pause while offscreen or the document is hidden. Resume from the same point if the visitor returns before completion. Completed scenes retain their final state for that page visit. A skipped scene can still play when deliberately revisited. Never accelerate to catch up with scrolling.

Each autonomous sequence should finish within roughly 4–5 seconds, including its entrance. No automatic replay loops. Reduced motion shows a designed final composition immediately. The message must work without watching the animation.

### 3. Interaction: small, local responses

Glass buttons get a restrained light response, a small shadow change and a 1px press. Keyboard focus gets an equally intentional visible state. Hover never moves the hit target away from the pointer. Do not turn the entire graphic into a mouse-following tilt surface. Product demonstrations stay presentational; a fake cursor or pretend interactive controls would add confusion.

## Scene 1 — opening Shopify

The hero should feel composed as soon as it appears. Show a lightweight photographic base and navigation immediately; do not gate the whole page behind image loading. Match the base and decoded image to avoid a visible sharp-to-blurred snap.

Headline and booking invitation resolve within approximately the first second. Use the existing line-based typography with a short masked translation, not word-by-word typography or blurred letters. The second line follows by about 100ms. Keep the CTA usable throughout.

The dashboard has its own viewport-gated sequence, important on a phone where it sits below the initial fold:

| Time from dashboard trigger | Choreography |
| --- | --- |
| 0–0.9s | Dashboard rises from behind the foreground, approximately 32–44px, with a subtle scale settle. Its sidebar and content read as one object; avoid animating every navigation item separately. |
| 0.65–2.5s | The sales chart traces left to right. The main sales value counts to its baseline, with orders following slightly later. Conversion and ROAS resolve quietly rather than competing as four slot machines. |
| 2.5–3.1s | Brief readable hold. The values are now stable and the chart can be understood. |
| 3.1–4.2s | One $79 order notification arrives from the near plane. Sales update from $128,381 to $128,460 and orders from 1,841 to 1,842. The final chart point receives a restrained acknowledgement. |
| After 4.2s | Hold. Only bounded scroll depth remains. |

Use one coherent illustrative dataset for totals, daily chart values and the notification. Do not independently draw an attractive curve that contradicts the metrics. Use tabular numbers and reserved widths so count-ups cannot shift the layout. Do not repeatedly announce animated digits to assistive technology.

Sea, dashboard and foreground move at different rates; the stone should pass in front of the dashboard convincingly. Start without pointer parallax or animated sea distortion. Those would add complexity before the central choreography is proven.

The partner/client proof should be a quiet interval: a short collective reveal, no logo wave, marquee or sequential counting.

## Scene 2 — good products, getting found

This is the main before/after demonstration and the first prototype to build. Preserve the courtyard, physical sock and recognisable Google Shopping surface. Replace the moving repeated track with persistent, individually positioned product cards.

Proposed sequence, approximately 4.8 seconds:

1. **Establish, 0–1.0s.** The scene is already beautiful; the Shopping surface settles into it. Morrow is visible toward the end of the row, with a less descriptive listing. Let viewers identify the same burgundy sock they will follow.
2. **Show the work, 1.0–2.6s.** A compact agency annotation briefly appears outside the Google surface: “Happy Mondays” / “Product feed + campaign refinements”. The listing title resolves into clearer product language. Keep the thumbnail recognisable, not a magical replacement of the product itself. This annotation is the only proposed extra storytelling surface; it replaces an unexplained transition and disappears before the final composition.
3. **Change the position, 2.6–3.7s.** Neighbouring cards make room as Morrow moves into a prominent position. The same DOM card travels along one legible path. Avoid a jump from the back straight over every other product. A restrained emphasis outline follows its arrival.
4. **Resolve, 3.7–4.8s.** The foreground detail surface emerges from the visual vicinity of that listing, keeping product identity continuous. Settle and leave the final image clean.

This is an illustrative improvement in visibility, not a promise of a guaranteed number-one placement. Do not add rank badges, fake revenue uplift or invented client results. Feed improvement alone should not be presented as a mechanical guarantee of ranking; the annotation deliberately refers to the combined work. Keep explanatory copy beside the scene understandable when motion is off.

The critical review question is whether a first-time viewer can say what changed and who helped. If the annotation is too small to read, redesign the composition or simplify the beat; do not extend it into a ten-second explainer. On mobile, use a deliberately composed three-card row and one clear transition rather than shrinking a desktop screenshot.

The physical sock, its contact shadow and the supporting stone must remain grounded together. Separate near foliage only if a clean mask and background reconstruction can withstand the entire travel range.

## Scene 3 — from looking to buying

This scene explains the other half of the agency’s work. Give it a different composition and beat from discovery while retaining the same motion character.

Proposed sequence, approximately 4.6 seconds:

1. **0–0.9s:** The Serein storefront resolves over the fragrance still life. Candle, diffuser, plinth and contact shadows stay physically connected.
2. **0.9–2.0s:** A tightly scoped product-page improvement becomes visible: clearer size/scent information and a well-placed complementary diffuser recommendation. Show specific useful information rather than making a deliberately ugly “before” website.
3. **2.0–3.1s:** The recommendation transfers into the bag. Its thumbnail and identity carry through into the basket row; neighbouring content adjusts smoothly within a reserved layout.
4. **3.1–3.6s:** The item count changes from one to two and subtotal from $68 to $110 as one transaction. A short digit transition is fine; do not animate through fictional intermediate prices.
5. **3.6–4.6s:** The basket settles into a restrained order-received state. No confetti, extra pop-ups or unearned growth percentage.

The adjacent Revenue Leak Audit copy supplies the agency context. This is a product-page-to-order demonstration, not a measured conversion-rate case study. Keep the $68 + $42 = $110 arithmetic and all item states consistent.

## Scene 4 — good people, on your side

After two detailed scenes, give the visitor stillness. The terrace gets a gentle depth shift only where the assets genuinely support separate planes. Leave the wall and its baked-in shadows together; do not fake an independently moving tree shadow over the photograph.

Heading, team paragraph and invitation settle in a compact sequence of roughly 0.8 seconds. Keep Keanu’s small personal introduction secondary to the team and invitation. The portrait should not orbit, bob or continuously scale. No additional floating profile card.

## Visual and engineering discipline

- Audit each image for genuine separable planes before adding movement. Never move the same tree once in the background and again in a cutout, expose a duplicate sock, detach a contact shadow or reveal an empty image edge. Prepare new masks/background plates only where needed.
- Keep text and platform UI live and crisp. Use nested wrappers to separate entrance transforms from scroll-depth transforms so they cannot overwrite one another.
- Keep glass blur stable through the entrance. Test compositing with translucent ancestors: a change of backdrop treatment at the end of an opacity animation can recreate the existing blur snap.
- Animate transforms and opacity primarily. Use bounded SVG reveals for charts. Avoid large animated blur filters and expensive repainting of whole backgrounds.
- Use existing Framer Motion capabilities initially; no library migration is needed to prove the design. Centralise one depth controller and one independent scene clock. Update motion values without rerendering the whole scene at 60fps; React state should represent meaningful state changes.
- Predecode nearby assets and preserve an attractive fallback if an asset fails. Do not leave a scene permanently transparent because one optional cutout did not load.
- Keep the current type scale, wording and established layout. This pass should not reopen the recently refined typography, make buttons bounce or restore removed eyebrows, replay captions and disclaimers.
- Touch gets reduced travel and less overlapping motion; no hover dependency. Reduced-motion mode gets all essential information and final data with no parallax or count-up.

## Roadmap and completion gates

| Stage | Work | Completion gate |
| --- | --- | --- |
| 1 — source review and plan | Review recording, client comments, transcript and implementation; decide story and timing model. | This document; no animation code changed. Complete. |
| 2 — motion study | Build one complete discovery scene locally, including its before/work/after states and independent depth controller. Record normal reading, fast scroll and reverse scroll. | Story legible in one viewing; no rushed playback, crop seams or detached product. Compare against the recording in motion, not just a still. |
| 3 — opening sequence | Apply the proven controller to the hero; coordinate reveal, chart, counts and single order. | Initial visit, cached visit and below-fold mobile dashboard all feel intentional. CTA available immediately; data consistent. |
| 4 — purchase and transitions | Build storefront-to-order sequence; tune proof interval, icons and closing invitation. | Whole page has a clear rhythm with no competing simultaneous focal points. |
| 5 — quality pass | Verify responsive layout, reduced motion, keyboard use, loading failures and real scroll behavior. Profile representative desktop/mobile hardware where available. | No clipped layers or horizontal overflow; no persistent animation tasks after settling; disclose any device checks not performed. |
| 6 — release | Review recorded full-page journey and final stills, then use the established deployment workflow once implementation is accepted for release. | Live behavior matches the reviewed build. Planning alone does not mark this complete. |

## Required review recordings and checks

- First load at the top, plus reload with cached images; no opacity/blur snap or page jump.
- Normal reading pace; each section has a discernible focal point and final hold.
- Fast scroll down several viewports; no fast-forward animation or forced scroll stop. Return to the scene and verify its defined resume behavior.
- Slow reverse scroll; smooth depth reversal with no rewinding of purchases or totals.
- Pause on each scene; complete once, remain still, consume no ongoing narrative frame loop.
- Start at an anchor or restored scroll position; content and depth initialise appropriately without sweeping in from page-top coordinates.
- Resize/orientation change during a sequence; retain state and grounded layers.
- 320, 390, 768, 1024, 1440 and 1920px layouts; test short as well as tall viewports.
- Reduced-motion preference and explicit reduced preview; final visible information, no hidden text or decorative movement.
- Slow image delivery and a failed optional asset; useful first frame and functional CTA throughout.
- Record timings/frame behavior rather than claiming “60fps” from a screenshot. Check on a physical phone if available; browser viewport emulation does not establish device performance.

The implementation order is deliberate: prove the hardest storytelling scene first, then extend its motion language. Another broad animation pass before that proof would repeat the previous problem.

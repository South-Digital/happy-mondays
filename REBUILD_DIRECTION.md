# Concept A — corrected source review · 30 September 2026

**Status: layered replacement implemented, visually reviewed and published for review.** The previous continuation was rejected. The active rebuild below supersedes earlier interpretations, including the restrictions on concept brands and translucent platform UI. Visual acceptance belongs to the user/client; successful builds alone do not establish design quality.

## Active rebuild — preserve the approved photographic composition

The user rejected the 8179359 implementation and explicitly endorsed the original generated composition. The following overrides earlier interpretations forbidding concept brands or frosted platform treatments.

Direct call evidence, 18 September 34:17–35:14: Zac proposed concept brands and striking custom imagery; Keanu agreed. At 38:56–41:05 the clients explicitly endorse soft transitions, glass, subtle shadows and coloured scenes on white. Familiarity must come from interface structure, not an obligation to reproduce an opaque screenshot.

### Roadmap and acceptance gates

1. [x] Re-read the concept-brand discussion and glass/layering feedback; inspect the supplied screenshot and motion reference again.
2. [x] Reconstruct the endorsed scene as separate photographic background, tactile foreground product and native translucent interface layers. Keep the oversized product, stone, lighting and overlap; do not reduce it to a catalogue card.
3. [x] Build one full scene and compare its browser screenshot directly with the endorsed mockup. Check composition before animation. Use a clearly identified concept brand, without implying generated products or reviews belong to actual clients.
4. [x] Choreograph depth and a meaningful search-to-product sequence. Product remains grounded; interfaces resolve at different depths. No floating-rock novelty, continual success loops or generic checklist panel.
5. [x] Extend the material language to a distinct second composition, with the same concept product and a clearer purchase journey.
6. [x] Review still and intermediate frames, scroll reversal, reduced motion, mobile recomposition, legibility, asset sharpness and load behaviour. Iterate on visual shortcomings rather than treating builds as aesthetic approval.
7. [x] Deploy only after the browser retains the endorsed composition; verify live and save review captures.

The previous implementation record below is retained as history, not approval. Its visual outcome was rejected. The gates below are now met for this review revision; this is not a claim of client approval.

### Implemented composition and motion

- Morrow Studio concept brand with original cream/burgundy, sage, charcoal and navy product imagery; no generated product or rating is attributed to a real client.
- Scene one follows the endorsed crop: olive courtyard, translucent Shopping plane behind a large tactile sock, product detail card in front. Separate photographic assets and live HTML preserve overlap and allow independent movement.
- Scene two carries the same product into warm plaster, travertine and linen. A live store panel sits behind the product; a foreground basket shows the complementary pair, counts the subtotal from $28 to $50.40 (two $28 pairs with 10% off), then confirms the illustrative order.
- The scene settles with a 3.5% camera move. UI planes enter separately and respond at different depths to scrolling. A continuous Shopping strip brings Morrow into prominence without cards crossing through one another. Each finite 7.6-second sequence supports pause and replay, stops offscreen/when hidden, and stays complete on reverse scrolling.
- All scene images decode before the entrance; glass blur remains constant rather than snapping on after load. Reduced motion renders the completed state with no camera transition or replay controls.
- Product thumbnails are individual transparent assets. The initial contact sheet produced stray neighbouring fragments and was replaced rather than masked into the final build.

### Published revision

Application commit `b1c211f`, Vercel deployment `dpl_9NoJMCT5XQDszLGUXYJ1PkrnAVAa`.

- Review: https://happy-mondays-design-review.vercel.app/concept-a
- Immutable deployment: https://happy-mondays-design-review-jilp3n53u-zac-santers-projects.vercel.app/concept-a
- Canonical page and new courtyard asset return HTTP 200 with noindex/nofollow headers. Live browser loads bundle `index-C58iWNHF.js`, the 1920px courtyard and completed native scene. No observed console warnings/errors or horizontal overflow.
- Screenshots saved from the deployed page in the parent workspace's `output/happy-mondays-layered-rebuild-2026-09-30` directory.

### Local verification

- Viewed both scenes against the target composition; inspected initial, intermediate and final browser frames. Corrected card collisions during movement, obscured purchase controls, mobile bottom spacing, a stacking regression found during cleanup, and the physical product's ground contact.
- Visually checked 320, 390, 768, 1024, 1440 and 1920 CSS-pixel widths. No horizontal page overflow. Tablet stacks the scene and copy; handheld layouts retain three results and enlarge key interface details. Cart remains inside the stage with breathing room.
- Pause held purchase time at 4119ms and subtotal $28.97 across separate checks; resume/replay completed at $50.40. Reverse scroll retained both completed timelines at 7600ms. Reduced motion produced complete scenes, full camera opacity and zero scene-control buttons.
- TypeScript lint, production client-review build and `git diff --check` pass. Browser console showed no observed warnings/errors. Hidden/offscreen lazy thumbnails are not treated as image failures.
- Source assets and provenance: `public/images/morrow/README.md`. Local review captures: `output/happy-mondays-layered-rebuild-2026-09-30` in the parent workspace. The selected hero, shared scene-clock defaults and Concept B are unchanged in this revision.


## Previous implementation pass — rejected by the user

Status: rebuilt, checked locally and verified on the Vercel review site. This is a review revision, not client approval.

- [x] Explore one full-section mockup using built-in imagegen. Adopt layered natural lighting and composition; reject its invented product/reviews and translucent Google interface.
- [x] Build two native React/CSS scenes around actual Lucky Honey photography, with real competitor assets in the Shopping example. Google retains a white surface and platform-specific typography.
- [x] Show the intervention: feed refinement and campaign alignment, followed by the Lucky Honey result moving into focus. The work panel contracts into a compact completed state so it does not obscure the result.
- [x] Follow the same product into a product page with clearer details and a complementary colour. The example total counts from $18 to $36 for two $18 items; no claimed campaign uplift.
- [x] Coordinate internal changes using a finite clock, eased advancement with forward scrolling, independent foreground/light depth, pause/replay and a complete reduced-motion state. Passed scenes settle rather than replaying on reverse scroll.
- [x] Recompose mobile: two larger Shopping results; product photograph above purchase details. Do not merely shrink the desktop UI.
- [x] Check 320, 390, 768, 1024, 1440 and 1920 widths. No page or heading overflow; visual reviews at all except 1920, which received geometry checks. Verify loaded images, pause stability, replay, normal and reduced motion, and clean browser logs.
- [x] Publish and verify the Vercel review revision. Deployment `dpl_6mbgz2pJVhgomWV2n6odQym8yahy`, application commit `8179359`. Canonical Concept A route and new product asset return HTTP 200 with noindex headers. Live browser confirms new copy, complete scenes, loaded images and no observed console errors. Closing booking button shows the intended preview message; back-to-top returns to `#ha-top` at scroll 0.

The selected coastal hero and Concept B retain their designs. The shared scene clock keeps its existing defaults for the hero. Booking and main navigation remain explicitly described design-preview interactions, not completed production integrations.

Asset details and imagegen backdrop prompt are in `public/images/commerce-scenes/README.md`. No generated product photography, people, logos or UI screenshots are used in the new sections. A separate mockup remains in the workspace output directory as an exploration artifact only.

## The central mistake

The client wants the sophistication of premium software/product marketing, expressed through recognisable Shopify and Google interfaces, ecommerce products, soft photographic colour and deliberately choreographed motion. The previous rebuild overcorrected into a conventional editorial agency page. Its large fashion portrait, white shopping card and repeated headline/paragraph/bullet rows do not deliver the reference's layered materials or explain Happy Mondays' intervention.

I treated internal summaries as though every interpretation was a client decision. In particular, “premium DTC, not SaaS” and “motion on imagery only” were over-restrictive interpretations. The actual call takes precedence.

## Primary evidence

[18 September design call — full transcript](https://docs.google.com/document/d/1QZw3pYGizFvJs8p1F_FfgZgWTCP7Plpl8sHHL8ScW_A/edit)

| Call moment | Client feedback | Consequence |
| --- | --- | --- |
| 26:19–32:13 | Nature plus dashboard; foreground/background integration; softer UI that remains Shopify-like. | Compose a scene with coherent light and depth, rather than a browser card on an unrelated photograph. |
| 33:11–36:11 | GoFlower's imagery conveys a premium price. Familiarity with their clients' products matters. | Judge photography by material detail, crop, lighting and composition. A real photograph alone is insufficient. |
| 38:10–41:05 | Turning branches green and moving rocks are unnecessary. They like slight greys, white surroundings, coloured blurred cards and frosted UI. | Borrow materials and choreography, not literal rocks. Preserve tonal depth so glass can read. |
| 43:21 | Ecommerce flourishes are a nice-to-have; the SaaS references look best to them. | Software-style sophistication is central. Avoid turning the agency into a jewellery storefront. |
| 46:52 | The premium Apple feeling is the core; ecommerce nods are the finishing detail. | Generic minimalism and literal storefront imitation both miss. |
| 48:01–49:51 | Scroll transitions matter; simple gradients feel clean but less premium than soft blurred colour. | Choreograph internal UI, not just section fades and vertical drift. |
| 50:58–51:54 | Dashboard concept liked; execution too vectorised and harsh beside the wealth reference. | Preserve platform hierarchy while improving surfaces, edges and integration. |
| 57:05–1:02:08 | Explicitly questioned three shots of one brand. Proposed showing a brand gaining prominence through campaign management and on-site work, with Happy Mondays' intervention visible. | The new three-product At Present card repeats a pattern they challenged. Replace the story as well as the styling. |

[1 September kickoff](https://docs.google.com/document/d/1_xX-rxHJ5r46hB8HoxGQZg0dOmgUMN2JvcK-3XcaPv8/edit), 20:05–20:56: the name comes from opening Shopify on Monday and feeling good about the results. At 25:47–31:03, the conversation specifically covers Voiceflow's premium animation, Shopify micro-UI and order notifications.

[17 August introduction](https://docs.google.com/document/d/1vUPppvO222DSHvnkRbHok1UYIIVfoMYaj2rObtNCWXQ/edit), 07:56–12:47 and 25:51–28:32: generic, text-heavy, visibly AI-produced agency sites are the original problem. [24 August catch-up](https://docs.google.com/document/d/1jAP8BOdzrLymlAcoXKGgLnr9eYFEQfufR0rs1Yxmyao/edit) reinforces Voiceflow and premium visual presentation.

[24 September colour/shape feedback](https://southdigitalgroup.slack.com/archives/C0BSCJZAV44/p1790257187195239): blue as an accent, other natural colours, rounder buttons and subtle shadows. [Animation feedback](https://southdigitalgroup.slack.com/archives/C0BSCJZAV44/p1790256115302199) explicitly connects gradients and motion to premium quality. The latest 30 September exchange confirms a refined hero plus a few follow-on sections to establish direction.

## How to use the references

- **Synex video and dated Miro captures:** principal benchmark for light, depth, blurred natural colour, glass and motion quality. Not a literal template.
- **Voiceflow and Fourmula:** visual communication and animated micro-UI. Both clients endorsed Fourmula in Slack. Truus was explicitly rejected as too fun/colourful.
- **Calendly, Solidroad and Peerchamber captures:** sharp UI over soft colour, overlap and edge treatment. Exact fonts/palettes are not automatically approved.
- **GoFlower, Diamond Store, Aromely, Lucky Honey, Loop, Hairlust and wider ICP references:** photographic standard, audience familiarity and merchandising details. Do not infer all are clients: the board distinguishes existing and desired clients.

The [Miro board](https://miro.com/app/board/uXjVHmXBav0=/?share_link_id=173104433004) specifies three layers: blurred background, glass panel, sharp foreground accents. The reference colour fields have meaningful light and dark areas. Pale uniform gradients beneath opaque white cards remove that depth.

## Supplied motion reference

`/Users/zacsanter/Downloads/2a17daf0ef6857b08c856b9bbd7ec253.mp4`: 37.14 seconds, 1600 × 1200, approximately 29.97 fps. Reviewed the complete visual sequence as a contact sheet, dense 5–11-second frames, and full-resolution detail frames. This does not establish the original animation library or prove every effect is scroll-scrubbed.

- Opening: typography resolves, metrics develop and foreground scenery establishes depth around the dashboard.
- Approximately 5–10 seconds: text, blurred panels and foreground interfaces arrive as distinct layers; values and diagrams animate internally. Foreground cards extend beyond their backgrounds.
- Approximately 11–17 seconds: one larger composition changes the scale, with supporting chips and internal numeric/diagram movement.
- Later: quieter diagrams and integrations alternate with larger scenes. It does not repeat the same split-row layout throughout.

Our current continuation has a 4.2-second entrance timer plus small photo/panel parallax. Those mechanics are not equivalent to the reference's choreography. Meaning, state changes, relative timing and the final composition need to be designed together.

## Critique of the current live build

At 1280px, a substantial blank gap after the logos delays the first section. A tall portrait then dominates the composition; sunglasses and the model's face compete with the product. The Google card is uniformly bright and opaque, with small product imagery. It shows a catalogue rather than Happy Mondays improving performance.

The repeated grey/black headline, subheading, paragraph, divider and three bullets reads as a template. The bag animation demonstrates a jewellery purchase, without showing what the agency improved. More pixels or longer animation does not fix either problem.

The coastal hero remains the selected direction, but it is not a finished asset: its dashboard fidelity, light, load choreography and transition into the page still require review.

## Corrected build roadmap

1. **Establish one complete graphic before repeating a system.** Graphic left, short copy right. Richer sage/stone photographic blur as a stage, with a faithful Google Shopping crop as the main sharp interface. A real product remains identifiable. Google retains its own spacing, iconography and hierarchy; do not turn its interface into invented glass UI.
2. **Give the first graphic a causal sequence.** Product among competing results → restrained Happy Mondays layer showing relevant feed/campaign work → improved prominence as neighbouring results reposition → hold the final state. Do not make every product the same brand. Present the mechanism as illustrative, not an achieved ranking or guarantee. Choose photography at its intended display size before locking the composition.
3. **Follow the same product into an improved purchase journey.** Second graphic right, copy left, related warmer stone/sand light. Show an actual on-site improvement—clearer product information, a relevant bundle or simpler selection—then the outcome. Fewer, larger UI fragments; no generic cart toast disconnected from the service. Explain how better conversion supports acquisition. No unverified 60–70% claim or invented case results.
4. **Vary the rhythm afterwards.** A wider substantiated result/story or human proof composition, not an immediate third identical row or three-card feature grid. No fake video player or fabricated testimonial.
5. **Design motion with the scene.** Specify initial, intermediate and final states. Separate scene arrival from internal activity. Use scrolling to reveal/progress the story and short eased transitions to settle objects; preserve native scrolling. Maintain product continuity. Numbers and charts must relate to the event being shown. No endless fake-success loops, fake cursor demonstrations or motion everywhere.
6. **Recompose for mobile and reduced motion.** Readable product/UI detail, shorter pacing and a coherent final state. Returning to a section cannot leave a half-built interface.

## Required review before publishing another revision

- Compare still frames with the reference at the same size: tonal depth, light, softness, edges, translucency, product scale and typography. The composition must work with animation paused.
- Watch complete sequences and intermediate states, slow/fast scroll, reversal, first load and return. The viewer should understand Happy Mondays' contribution without a paragraph of explanation.
- No eyebrows, invented brands, gratuitous badges, boilerplate bullet rows or one indiscriminate glass style.
- Verify image decoding, blur continuity, scene timing, clipping, mobile readability and reduced motion. Functional QA is necessary but separate from art direction.
- Do not call another revision client-ready merely because it builds.

## Fresh review coverage and limits

This pass re-read all four client-call transcripts (17 and 24 August, 1 and 18 September). It reopened the live Miro board and read its complete accessible outline, inspected the hero/nature images, graphic reference set and all eleven ICP image items individually, revisited the supplied video, and compared the current live continuation. It also read the company/homepage content-plan sections, original design-session and hero-route briefs, relevant internal meeting material, historical research ledger, inspiration Slack thread and latest client feedback. A fresh Drive search found a newer internal 24 September meeting record; it adds quality/workflow context, not a new client direction.

The historical ledger is an archive index, not proof of fresh exhaustive reading. This pass did not replay every historic Loom/audio recording, inspect every Figma layer, or revisit every aspirational brand's entire live site. Dated board captures and the supplied recording remain stronger evidence of the intended visual reference than subsequently changed websites.

---

## Superseded implementation record — rejected editorial rebuild

The following preserves what was implemented and technically checked. Its direction claims are withdrawn where they conflict with the source review above.

## Evidence reviewed again

- 18 September design-review call: ecommerce familiarity, genuinely strong product photography, soft photographic colour, human agency rather than SaaS; a clear search-to-store story.
- Live Miro board uXjVHmXBav0=: visual-direction notes, Synex composition and GoFlower photographic reference; reviewed original hero-routes brief and research/source-coverage ledger.
- Supplied 37-second Synex video: coordinated entrances, different section scales, foreground/background separation and time for each composition to settle. The recording does not prove the original implementation technique.
- Current Slack client thread: A selected; reduce blue dominance, use rounded forms and subtle depth. 30 September update commits to hero refinement plus a few subsequent sections for direction approval.
- User feedback: remove eyebrows, stop abstract/generic UI, use real photography, improve motion rather than piling on decorative effects.

This is a fresh review of the main design call, board, video, briefs and current feedback, not a claim that every historic connector record has been re-read in this pass.

## Rebuild decisions

1. Retain the selected coastal opening and its dashboard. Preserve the user's pill buttons, unobtrusive period label and split dashboard panels.
2. Remove the generated jewellery/RITUAL scenes and repeated three-card feature section from the rendered page.
3. Build a connected product narrative using real At Present editorial and catalogue photography. First: discovery through Google Shopping. Second: continuity into the store.
4. Use larger compositions, fewer borders, generous unboxed typography and warm photographic colour. Google uses its familiar search field, tabs, sponsored result labels and catalogue cards; the store uses actual product names and prices from the supplied asset catalogue.
5. Choreograph complete finite scenes: image, query, result cards; then product page and bag. Native scrolling adds small differential movement. Never hijack scrolling. Stop offscreen; reduced motion shows complete scenes.
6. Close with the actual founder and a short human invitation. No invented testimonial, revenue claim or team-wide ex-Google claim.
7. Review actual desktop, tablet and mobile rendering, image loading, motion completion and reduced-motion presentation; correct composition issues before deploying.
8. Publish to the existing noindex design-review project, verify live, keep Concept B unchanged.

## Asset provenance and limits

- Editorial: https://cdn.shopify.com/s/files/1/0255/1404/9590/files/fd91892f7a9b1562f7ff28d27385f2fe.jpg?v=1788877169 (At Present Splendore product photography, 1789 × 1792).
- Product photography and archived catalogue metadata: existing source-assets/shopping-rotation/at-present.json. Splendore Drop Earrings $390; Cosimo Pinky Ring $210; Luna Nera Lariat Necklace $520.
- These are illustrative shopping/store compositions using real brand assets, not screenshots of delivered campaigns or claims of achieved placements/sales. The public preview has a concise visible explanation and image credit.
- Keep assets at or below native resolution, with responsive WebP variants. No invented product brands or AI-generated product photography.

## Verification completed
- Production and client-review TypeScript/Vite builds pass; `git diff --check` clean.
- Browser width checks: 320, 375, 390, 768, 1024, 1440 and 1920px. No page overflow or heading overflow. Visual inspections at 320/390/768/1440; tablet now stacks at 900px instead of shrinking the UI beside copy.
- Real photography remains visible above the Google panel. Product catalogue and store images use `contain` to avoid cutting off jewellery at narrow widths.
- All new scene images loaded; browser console had no errors/warnings during the inspected run.
- Normal scenes stay at 0ms offscreen, begin on entry (observed 288ms), and finish at 4200ms. Reduced-motion route reports both scenes at 4200ms with complete opacity and identity transforms.
- Removed the rejected SignatureGraphics component and stylesheet, not just their visible output.
- Booking and nav remain existing design-preview interactions; illustrative product/store UI is exposed as an image to assistive technology, not fake functional commerce controls.

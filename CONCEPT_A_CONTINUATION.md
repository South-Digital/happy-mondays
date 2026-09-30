> Superseded: Zac rejected this continuation. See PRODUCT_STORY_REVIEW.md for the replacement and current verification.

# Concept A — first continuation, 30 September 2026

## Brief and authority

Keanu chose A and asked for the premium gradient/motion finish shown in the references. Daniel requested less blue dominance, other natural colours, rounder shapes and subtle shadows. Zac approved a restrained hero plus one first follow-on section, not another full homepage redesign. B remains unchanged.

Reviewed the saved September 18 call notes and relevant transcript passages (38:10–41:05, 48:01–51:54, 57:05–1:02:08), the saved Miro inventory, and the live moodboard's white UI over blurred natural colour reference. These support softly layered white surfaces, subtle shadows, and a clear Shopping before/work/after explanation. New client feedback supersedes the earlier blue-only accent restriction for supporting natural tones.

## Roadmap

- [x] Reconcile source material and the latest client/user decisions.
- [x] Preserve A's chosen composition; add restrained warm reflected light and soften the dashboard's settling motion.
- [x] Compose one sand/sage continuation with recognisable Shopping and product-page UI, soft ambient shadows, and early founder presence.
- [x] Explain the intervention before moving the same product from fifth to first. Include playback controls, manual stages and a complete reduced-motion version.
- [x] Review desktop, tablet, phone and narrow breakpoints; correct collisions and typography.
- [x] Validate all stages, pause/replay, offscreen/background suspension, keyboard and reduced motion.
- [x] Build both variants, update review context and prepare the GitHub/Vercel delivery.
- Deployment gate: verify the production alias after Git deployment before reporting completion.

## Content and assets

Existing supplied/recovered Lucky Honey photograph and sourced Keanu portrait; no new client results, testimonials or credentials. Other product tiles are deliberately anonymous schematic examples. Shopping placement movement and the product page are illustrative, not a promised ranking or reproduction of the live store. The demo states this visibly. Booking and primary navigation remain prototype actions.

Motion is finite, transform-led, and waits until the intervention card is visible. It pauses when that card leaves view or the document becomes hidden. Manual selection stops automatic playback; reduced motion shows the final state and allows instant stage selection. No scroll lock or infinite ambient loop.

## Validation

- Visual review: desktop 1280/1440, tablet 768 and mobile 390/320. Corrected the Shopping/product-card overlap at tablet widths, aligned the chapter headings and reserved narrow-phone intervention height so changing stages does not shift layout.
- Geometry: 320, 390, 600, 601, 768, 900, 901, 1440 and 1920 px. No horizontal page overflow, card collisions or cards outside the gradient scene.
- Interaction: automatic opportunity → intervention → first placement observed; settled layout verified. Replay and pause verified. Returning to the top kept stage zero paused offscreen. Space-key chapter selection works, with aria-pressed state. Narrow-phone intervention height stays 102px between stages zero and one. Background-tab visibility handling reviewed in code, not independently simulated.
- Reduced motion: final placement visible immediately, no autoplay control or layout tween, all explanations remain available. Query override tested; OS setting not changed.
- Browser console: no warnings/errors during the targeted local review. Production TypeScript/Vite build passes. Both review variants built.
- No new photography or heavy animation library added; existing product/founder images load lazily. No field performance claim.

Delivery target: https://happy-mondays-design-review.vercel.app/concept-a via the existing `codex/concept-refinement` production branch. Live verification is recorded in the task after deployment. This is a design iteration for review, not client sign-off or a finished homepage.

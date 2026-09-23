# Concept B — Nature first / room to grow

23 September 2026. Implementation and browser QA complete; design remains subject to Zac/client review. Goal: a genuinely distinct second direction in the same brand language, preserving Concept A and Emmanuel’s baseline.

## Source-led decisions

- Sept 18 call, 08:50–10:43: Google Ads and Shopify conversion work together; clients often arrive after disappointing agency experiences. Communicate a senior growth partner, not a software subscription.
- 14:50–20:05: Apple-like softness, premium photographic nature, design-conscious ecommerce brands. Keep Manrope, white/off-white, a single blue accent, realistic light and carefully controlled materials.
- 36:11–37:18 and 54:53: nature can own the opening; dashboard and Shopping immediately below. B must remain full bleed, with no dashboard above the fold.
- 38:10–41:05 and 48:01–51:54: subtle movement, softly blurred backgrounds, white surfaces and gentle transitions; clean alone is insufficient.
- 57:05–1:02:08: the same brand moves from position five to one AFTER clearly shown campaign/store work. This is a conceptual explanation, never a promised ranking or actual case-study claim.
- Miro fresh review: board outline and feedback, Greek terrace reference, layered material/reference cards. https://miro.com/app/board/uXjVHmXBav0=/?share_link_id=173104433004
- Call transcript: https://docs.google.com/document/d/1QZw3pYGizFvJs8p1F_FfgZgWTCP7Plpl8sHHL8ScW_A/edit
- Hero route brief: https://docs.google.com/document/d/1MZWV3fJM3rNQH5ILOwxcZ7fHinERu7_SDy3vtZT6504/edit

## Reviewable scope

A resolved opening sequence: immersive nature hero → store/search demonstration → client/partner proof → compact founder close. Keep the approved-in-brief headline, one clear primary action, familiar navigation, a quiet human cue within the first two scrolls. No speculative long homepage or invented case-study results. Booking stays an explicit prototype action.

## Gates

- [x] 1. Re-read call and brief; inspect Miro feedback/reference and original B. Define source-to-design rationale.
- [x] 2. Art direction: evaluate new photography in context; deliberate mobile composition; high-resolution master and responsive exports. Preserve original B at `/baseline/concept-b`.
- [x] 3. Build: carefully paced hero, early human presence, recognisable static store preview, clearly explained fifth-to-first Shopping sequence, proof and concise close.
- [x] 4. Motion/craft: restrained photographic parallax, finite in-view progression with no scroll lock, no blur snapping, intentional spacing, readable glass, consistent buttons without arrows. Reduced motion has complete information.
- [x] 5. QA: review desktop, tablet, phone and narrow widths; inspect hierarchy, contrast, overflow, keyboard menu, links, motion/reload, image selection and console. Build, document evidence, commit/push review branch, open B.

## Acceptance checks

- Opening feels photographic and spacious, with materially less dark scrim than the original.
- Architecture and type occupy intentional parts of the frame; mobile is composed rather than a squeezed desktop.
- The first follow-on section shows the work without looking like a separate SaaS product.
- Shopping narrative is clear before motion runs and remains clear without it. Same product/brand persists through all positions; intervention is visibly labelled.
- No interactive-looking date controls, no gratuitous arrows, no fake live revenue claims, no invented person/quote.
- Desktop, 768/820 tablet, 390/430 phone and 320 narrow layouts remain usable; reduced motion and keyboard interactions work.
- Source/asset and prototype limitations are recorded outside the hero. Passing engineering QA does not mean client design approval.

## Iteration decisions

- Desktop horizon moved above the headline; right-hand architecture retained with explicit object positioning.
- A separate portrait composition preserves useful water/sky space on phones. Responsive source sizes account for the actual cropped image width, not just viewport width.
- Replaced the trial pinned sequence with a finite in-view story: position five, 1.1 seconds to intervention, 3.2 seconds to the move, 850 ms eased reordering. This made short screens and tablets substantially more natural. Replay is a real control; the date label is static.
- Enlarged mobile client logos to a two-column grid, corrected the SVG chart flex bounds, kept all glass blur values constant.

Validation and remaining launch inputs: [CONCEPT_B_REVIEW.md](CONCEPT_B_REVIEW.md). A passing build and this completed roadmap are not client design sign-off.

## Second review — source reconciliation and whole-page craft

- [x] Reconcile the hero brief, original implementation specification, design-reset record, research findings and latest user corrections. Revisit the call’s 57:05–1:02:08 intervention explanation directly.
- [x] Strengthen the commercial story at rest: retain all three explanations, increase body hierarchy, explicitly name the Happy Mondays intervention before movement.
- [x] Correct chip sizing, tablet composition, short-screen menu reachability, phone analytics labels and the mobile footer wordmark.
- [x] Verify all phases, pause/resume, reduced motion, responsive bounds, phone/tablet/desktop composition, build and preview deployment.

Source conflict resolved: the internal hero brief proposes a sector bento, but the later repository implementation specification explicitly says to ignore the hidden sector-bento band. It remains outside this focused route review. The historical pillars’ 60–70% / capacity / weekly-Loom claims remain excluded because the evidence notes identify them as unresolved.

The original 1.1/3.2-second timing and transient-caption description above are historical. Current timing is 1.8 seconds at fifth, then 3.2 seconds with the work identified, then an 850ms move to first. Visibility is measured on the intervention label so short screens can trigger it. Leaving view cancels the pending advance; returning gives the current stage its full reading interval again. Static explanations remain throughout.

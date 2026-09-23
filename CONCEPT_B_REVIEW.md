# Concept B — review handoff

23 September 2026. Implemented for internal direction review, not client-approved or a finished production homepage.

## The direction

`/concept-b` is the nature-first alternative from the September 18 call: a full-bleed coastal opening with the original headline, followed immediately by a store/search demonstration, client proof and a personal close. The photograph, materials, blue accent and typography belong to the same system as A. B gives the photograph the opening; the interface appears in the next section.

The roadmap and timestamped source rationale are in [CONCEPT_B_ROADMAP.md](CONCEPT_B_ROADMAP.md). This turn reread the call transcript and internal hero brief, revisited the identified Miro board’s outline, written feedback, Greek scene and layered-card reference, and compared the preserved original B in the browser. It did not review the call recording or claim to exhaust every external reference or every possible board.

## Material changes

- A new landscape scene and separate portrait composition, with the horizon clear of the headline and architecture framed deliberately. A soft photographic fade leads into the off-white page.
- Responsive AVIF/WebP delivery from a 6688 × 3760 desktop master and 2240 × 2800 portrait master. Desktop sizes up to 3840; portrait up to 1600. Source selection accounts for object-cover cropping. These are generated images upscaled with Magnific, not native camera photographs.
- Quiet coloured partner chips, raised blue controls without arrows, familiar navigation, a single primary hero action. Date text is presentational.
- Crisp HTML/SVG store analytics, and a five-position Shopping example that keeps the same Lucky Honey product throughout. Competitors are deliberately abstract so the scene does not imply a real live result.
- The Shopping sequence starts when its intervention label is visible. It shows fifth position for 1.8 seconds, identifies the work for 3.2 seconds, then moves the product to first over 850 ms. Leaving view cancels the pending advance; returning resumes the current stage with its full reading interval. All three written explanations remain visible throughout. No pinned scrolling, infinite drift or scroll lock. Replay is explicit.
- Reduced motion disables entrances, parallax and reordering, presenting the final placement plus a complete written before/work/after explanation.
- Keanu appears in the first follow-on section and in a concise closing section. The portrait comes from the supplied Babydoc audit, page 52. The four-year Google background is stated in the supplied early content plan, About section, line 417. No generated person or invented quotation.
- Mobile client logos use a readable two-column grid. The entry page now presents both current directions and links to the original baselines.

Assets and exact built-in image-generation prompts: [public/images/hero-b-v2/README.md](public/images/hero-b-v2/README.md). Desktop and portrait masters are archived locally under `.design/hero-b-v2/`, excluded from Git/public delivery. Magnific consumed 630 existing credits in total; no purchase.

## QA evidence

- TypeScript + Vite production build passes. Git whitespace check passes.
- Browser layout checks: 320×740, 390×844, 430×932, 768×1024, 820×1180, 1280×720, 1440×900, 1920×1080. No document horizontal overflow; hero heading/button remain within bounds; SVG chart stays within its panel. A separate 640×900 visual check caught white type crossing the architecture; the portrait source now extends through 767px and the corrected composition was reviewed.
- Visual review of desktop hero, commercial section, client proof and founder close; phone hero/cards/proof/founder; 768/820 tablet and intermediate 640 layout. Compared with Emmanuel’s baseline B.
- Fixed issues found during review: scenery escaping the hero fade, horizon crossing the headline, proof-chip wrapping, narrow SVG flex overflow, undersized mobile client logos, short-screen pacing, and intermediate-width image contrast.
- Verified mobile menu, Escape dismissal and focus return, booking preview message, in-page approach link, replay starting at fifth and settling at first, and static reduced-motion output with no replay or scene transform.
- Images loaded successfully; browser selected AVIF (2400 desktop, 800 mobile at the test browser’s DPR). No captured browser warnings/errors.
- Concept A source files and original shared components are unchanged by this B pass. Original B’s components remain intact at `/baseline/concept-b`.

These are browser viewport checks, not physical iPhone/Android or cross-engine certification. No 60fps performance claim or formal WCAG audit is made. Initial image bytes vary by viewport/DPR; desktop AVIF is approximately 132 KB / 369 KB / 1 MB across the three sizes, with full-resolution masters never served.

## Remaining launch inputs

Booking and unbuilt navigation destinations intentionally show preview feedback. Store figures and Shopping positions are illustrative, not claims or ranking promises. Final copy, current partner status, logo/image publication permission and booking destination require the usual launch verification. The public production branch and deployment have not been replaced. The refinement branch auto-deploys to its existing protected Vercel preview; final project delivery remains Framer.

## Second whole-page review

Reviewed the repository’s design specification, reset/review/roadmap, A feedback and QA notes, asset provenance, and the research synthesis/coverage and second/third-pass findings. Revisited the call’s specific before/work/after discussion directly. Existing Miro findings were reconciled with the implementation; this pass does not claim a new exhaustive connector crawl or fresh review of every external object/video.

Corrections:
- Three permanent, readable explanations replace the changing small caption. The service remains understandable if visitors miss the animation. Concrete copy connects product feeds, margin-aware campaigns and the store experience.
- The intervention explicitly reads “Working with Happy Mondays” while Lucky Honey remains fifth. Four distinct abstract competitors keep the example legible without suggesting real competitor results.
- Tablet demonstrations stack through 900px, restoring three readable metrics rather than squeezing two small cards together. Supporting copy is larger; phone metric labels no longer drop to 7px.
- Fixed intrinsic chip sizing: icon and text occupy explicit grid columns, with measured 15px phone / 16px desktop right insets. Previous flex sizing let the Clutch label reach the edge.
- Short-screen menus scroll within the viewport; booking remains reachable. Corrected a mobile selector that also hid the footer wordmark.
- Updated the review entry notes and README where they incorrectly described B as the original and current analytics as raster images.

Validation: 19 viewport geometry checks from 320×568 through 2560×1440, including 600/601, 800/801 and 900/901 boundaries and 568×320 landscape. No page overflow, clipped metric values, overflowing result/intervention containers or broken loaded images. Hero CTA remains within its scene; proof-chip insets are consistent. Visual review covered desktop hero/story/proof/founder, 820px tablet, and 390/320px phone story and close.

Normal-motion browser verification captured position five, the explicit work stage still at five, and the final position one. Scrolling away during work retained that stage; returning completed the move. Reduced motion shows all three explanations plus the written 5→work→1 description, with no replay or scenery transform. Landscape menu booking closes the menu, restores focus and shows the preview message. Final production build/TypeScript and whitespace checks pass; no captured browser warnings/errors. `npm ci` still reports the four inherited dependency advisories (three moderate, one high); this visual pass does not perform a framework migration.

These checks remain viewport/browser validation, not physical-device or cross-engine certification. No additional imagery generation or Magnific credits were used in this review.

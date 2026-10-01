# Concept A — corrected source review · 30 September 2026

**Status: layered replacement implemented, visually reviewed and published for review.** The previous continuation was rejected. The active rebuild below supersedes earlier interpretations, including the restrictions on concept brands and translucent platform UI. Visual acceptance belongs to the user/client; successful builds alone do not establish design quality.

## Detail pass — 1 October 2026

### Keyboard reading structure

- Browser inspection confirmed the footer had no content-info landmark because it lived inside the main content. Moved it outside `main` while retaining its shared width container, colours and reduced-motion handling. The 1440px footer rectangle is unchanged (1320×247px at the same document position); at 390px it remains 350px wide.
- Added a focus-only Skip to content link to the hero heading. Verified first Tab reveals it, Enter focuses the heading, and the next Tab reaches Start with an audit instead of repeating navigation. Checked normal desktop and reduced-motion phone behaviour; the link is offscreen after focus leaves and causes no horizontal overflow.
- Grouped the decorative Shopify dashboard into a single labelled illustration, matching the commerce scenes. Its fictitious Analytics/chart headings and order notification no longer interrupt the real page's reading sequence. Its accessible label explicitly identifies concept data; no visual disclaimer or visual layout change was added.
- Build and lint pass. This is targeted keyboard/semantic verification, not a claim of a complete assistive-technology audit.

### Audit reading hierarchy

- Reviewed the quote → purchase scene and expanded team → audit → footer sequence. Kept those open layouts and their existing section spacing; the quieter lower page provides a useful contrast to the large photographic compositions.
- The diagnostic questions were visually subordinate to their category labels, set at 13–14px and squeezed into narrow mobile columns. Questions now use 17px ink text and receive a larger share of desktop row width; labels remain quieter. Below 480px, each label sits directly above its question, preserving comfortable type size rather than compressing both into a table.
- Verified the longest labels at 1024px and the complete desktop spread at 1440px. At 320px, all chapters reserve the same 450.67px height and the FAQ position stays unchanged when switching chapters with the keyboard. No horizontal overflow observed. No additional card surfaces, images, claims or motion were introduced.

### Motion continuity

- Checked the normal-motion journey at 1440×900 with real wheel scrolling. Discovery paused at 878ms when only its bottom edge remained visible, resumed when returned to view and retained its completed composition afterwards.
- Checked the team expansion at opening, narrowing, contact reveal and full width, then reversed. The 652px stage remained centred within 0.5px; narrowing side text stayed readable, hidden cards returned to the accessibility/focus sequence on reversal, and the expanded invitation stayed in one right-aligned row. No additional decorative motion was added.
- Corrected a clock-state inconsistency when reduced motion changes during a visit. The static completed scene now also commits its completed time, so re-enabling motion cannot rewind an already-seen composition. A temporary browser harness exercised both initially animated → reduced → animated and initially reduced → animated; both remained at the completed frame. System preferences were not changed.
- Build, lint and the six playback-policy tests pass. Continue the broader visual/content review against client feedback; these checks do not establish client acceptance.

### Tablet narrative rhythm

- Full-page and 900px review exposed mismatched layout breakpoints: the commerce wrapper became a single 580px column at 980px, but the editorial sections kept desktop columns until 800px. The audit copy was only 249px wide and its folio 279px wide; the quote and footer were similarly compressed.
- Moved the editorial stacking breakpoint to 980px to match the enclosing commerce layout. At 900px, the audit copy and folio each use the full 580px width, actions sit together, FAQs form one reading column and the footer uses two columns. No new containers or decorative cards.
- Verified 980px (stacked) and 981px (two-column audit with 400px/448px columns), plus tab selection and keyboard FAQ expansion. The desktop composition and phone rules are unchanged. This corrects responsive composition rather than reducing font sizes to fit a cramped grid.
- Live verification also exposed fresh fragment URLs landing at the hero because React had not mounted the target when the browser first resolved it. SmoothScroll now resolves the initial target after layout, refreshes Lenis's measured scroll extent (including the pinned journey), seeks immediately and transfers focus. It does not intervene when the browser has already restored a nonzero position. Fresh `#getting-started` loads verified within 0.3px of the section top in normal desktop and reduced-motion tablet views.

### Navigation and scene delivery follow-through

- Reproduced a keyboard handoff problem: activating Our approach scrolled the page but left focus in the header; the next Tab selected Pricing. The existing anchor destinations now accept programmatic/native anchor focus without adding tab stops. Verified Our approach → Explore Google Ads, Client stories → Read their story, and Back to top → the hero landmark. Mobile disclosure closes and transfers focus correctly in reduced motion as well.
- A direct mobile jump exposed a blank scene while the original asset set decoded. Added responsive WebP variants for the two commerce compositions, including individual catalogue cutouts. The predecoder and rendered images share one srcset/sizes definition, avoiding a redundant full-resolution preload. Originals remain untouched and available for larger/high-density displays. Corrected intrinsic dimensions for square Serein catalogue images.
- At the verified 1× browser resolution, the discovery asset set falls from 1,129,102 to 164,750 bytes (85% less); the Serein set falls from 558,000 to 120,638 bytes (78% less). These are selected image-file totals, not a claim about whole-page transfer or measured load-time improvement. Desktop and mobile visual review retains the approved composition and texture.
- Remaining: continue inspecting normal scroll/reversal and the overall narrative. Client acceptance and deeper routes remain open; this is not a claim of full-site completion.

Browser inspection found and corrected several small but visible inconsistencies:

- At 900px, focusing the flat-fee link scrolled its card internally by 57px and cut off the heading. Oversized gradient pseudo-elements were expanding the scrollable area. `overflow: clip` now preserves rounded edges without creating an internal scroll container. Keyboard activation verifies zero internal scroll.
- Matched side-card footer space and body baselines. Removed unnecessary percentage inner height, scaled initial titles for narrower desktop widths, and increased the shortest animated stage from 450px to 490px so the opening frame has enough room. Preserved the centred start and user-controlled expansion.
- Aligned the contact portrait with the button at intermediate widths as well as the wide final row.
- At 320px, the audit's Buying chapter shifted the FAQs by 16px. All panels now share a grid cell, reserving the tallest natural height without hard-coded text heights. Inactive panels are hidden visually and from assistive technology. Native tab semantics support arrows, Home and End, with one active tab stop.
- Removed a global focus radius that changed pill-shaped buttons to rectangles. Focus outlines remain visible; component silhouettes stay intact.

Checked mobile opening at 390px, audit height/keyboard stability at 320px, static card alignment at 900px, and the 1080×700 animated opening, narrowing and expanded states. No observed page overflow or broken loaded images. Build, lint and six scene-playback tests pass. These are targeted detail improvements; the wider continuous visual/motion review remains active.

## Homepage focus correction — 1 October 2026

This supersedes the detailed pricing and three-step audit treatment below. The user rejected the templated feel, cautioned against too many cards, and questioned whether a pricing instrument belongs on the homepage. The homepage should establish relevance, demonstrate the search-to-sale approach, supply credible evidence and invite a conversation. Detailed comparisons belong on deeper routes.

- Removed the homepage pricing section and its currency controls. Navigation, discovery and the existing flat-fee card link to the planned `/pricing` route. The pricing exploration is saved outside the app for future consideration, not represented as an implemented pricing page.
- Replaced the generic process with an open, interactive audit spread: finding products, choosing them, completing the order. These are proposed diagnostic questions, not new contractual deliverables or guarantees. No additional card containers or generated scenery were introduced.
- Reworked the verified client quote as an open editorial spread. Kept the approved coastal hero, commerce scenes and team expansion intact.
- Made faded side cards inaccessible to assistive technology and removed the pricing link from the tab sequence while hidden. Restores automatically on reverse scroll. Corrected reduced-motion selectors for the audit controls.

### Next refinement roadmap

1. [x] Remove detailed homepage pricing and retain clear route signposts.
2. [x] Open the audit and proof layouts; check the transition from the team scene.
3. [x] Verify 320, 390, 1024 and 1440px layouts, all audit selections, keyboard FAQ activation, reduced-motion rendering and hidden-card focus state.
4. [ ] Reassess the complete narrative against client review; acceptance remains unproven after the earlier rejection. Keep further changes grounded in a concrete visual or content problem.
5. [ ] Complete deeper service, pricing, case-study and booking destinations in the full site build. Current links explicitly retain preview feedback.

Validation for this iteration: client-review build, TypeScript lint, all six scene-playback tests and clean diff. No horizontal overflow at checked widths or browser warnings/errors in the current normal-motion session. Browser screenshots saved in the parent workspace `output/happy-mondays-editorial-pass-2026-10-01/`. These checks establish implementation behaviour, not client design acceptance.

## Call-grounded homepage content — 1 October 2026

Re-read all four available client calls (17 August, 24 August, 1 September and 18 September), Ellie's rough draft, and the newer answered content plan. The latter is authoritative where the earlier draft contains questions or conflicting assumptions.

Sources:
- [Ellie's rough content draft](https://docs.google.com/document/d/1diPyV-4s6ICYvUqRF2Axy882DXz6pW66/edit)
- [Answered content plan](https://docs.google.com/document/d/12DRCfA0w_32IYcG_u30bOXScNhf-dFMsEzeeFnwrmME/edit)
- Gary Ingram quote: supplied `babydoc-audit.pdf`, page 56; attribution and exact excerpt visually verified.

Implemented the wider agency story around the approved scenes: a restrained client quote between discovery and purchase; explicit spend-band pricing after the team scene; a three-step, conversation-first audit journey with four practical FAQs; and a useful footer. Hero now leads to the audit and describes a growth partner. Navigation links to the real homepage sections; planned deeper routes retain preview feedback.

Key corrections: fees stay fixed within an agreed spend band, not at every spend forever. USD/GBP use the stated local-currency bands and fees, not an exchange-rate conversion. A single busy month does not automatically move the fee. Start with a 15-minute conversation before requesting account access. Reporting, audit outputs and client fit follow the answered plan. No unresolved case-study figures, audit price, guarantee or turnaround promise have been published.

Keep the established hero, depth scenes and scroll-controlled team expansion. New content stays readable without entrance delays; native FAQ disclosures and currency controls provide useful interaction. Avoid duplicating the pin-release spacing before pricing.

Verification: client-review TypeScript/Vite build, lint, six scene-playback tests and clean diff. Visual review at 320, 390, 768, 1024 and 1440 CSS pixels; no horizontal overflow or broken loaded images. Currency switching, native FAQ mouse/keyboard interaction, mobile menu anchors and normal/reduced-motion journeys checked. No browser warnings or errors observed.

## Homepage content roles — 30 September

Reviewed the saved, answered content plan (`95-research/2026-09-23/doc-12DRCfA0w_32IYcG_u30bOXScNhf-dFMsEzeeFnwrmME.txt`, especially the positioning answer and flagship service/voice sections), the earlier content plan, and the source review of the September calls. The newer answer describes a growth partner specialising in Google Ads for Shopify, with attention to the account and to landing pages, conversion and pricing. The agreed destinations include `/google-ads-for-shopify-brands`, `/pricing` and `/revenue-leak-audit`.

The two scenes are now entry points within the wider homepage, not explanatory captions for the artwork:

- Discovery: “Your products. Their next find.” Specific feed/campaign work and margins; primary service-page link, quieter pricing link.
- Purchase: “Make more of every visit.” The commercial reason for looking at product pages, pricing and checkout; Revenue Leak Audit link for a diagnostic next step.
- Closing: the senior team and a personal contact remain the invitation to talk.

In the full build, verified case studies should provide evidence, pricing should explain the flat-fee model, and the service hub should carry the detailed account/post-click/partnership story. Those belong to their own sections/routes; these two homepage blocks should stay concise. No new metrics, guarantees, audit price or turnaround promises were introduced.

Copy uses the shared hero typography, a short lead, one compact supporting paragraph, rounded secondary actions and a quiet pricing link. No eyebrows or scene annotations. The new anchors carry the planned route paths, with a destination-specific preview notice on click until those pages are built. This does not represent completion of those routes. Checked all three notices, 1440/390/320 layouts, production build, lint and diff.

## Page typography continuity

The hero and following sections now share editorial type tokens: 500-weight soft first lines, 600-weight ink emphasis, -.045em display tracking (-.04em on phones), and a consistent neutral body palette. Section body text follows the hero’s more open tracking; the closing title is subordinate to the hero. Sage, sand and amber remain in the photography and ambient backgrounds. Platform UI and concept-brand typography are unchanged. The introduction stays left-aligned with supporting copy directly below its heading.

Verified production build, TypeScript lint and diff checks; visually reviewed desktop, 1024px, 390px and 320px layouts with no horizontal overflow. Keanu’s single closing contact card and team positioning remain intact.

## Contact-card clarification

Restore Keanu’s original portrait/name contact card only in “Good people. On your side.” The agency introduction stays free of the founder profile link; the senior-team paragraph and “Talk to the team” CTA remain. Remove the redundant founder credential beneath the CTA. This supersedes the closing-card removal below.

## Current correction — agency and team, not founder-led presentation

User clarified that Happy Mondays should read as a team/agency, with only a little emphasis on Keanu. Removed the introductory founder avatar/profile link and closing profile card. Introduction now describes one team across Google Ads and Shopify; the closing invitation is “Talk to the team”. Keanu appears once, in a small supporting credential beneath the CTA. No invented team portraits or team-member claims added.

Desktop (1440) and mobile (390) reviewed; no page overflow, zero founder photos, one Keanu mention. Team CTA retains the existing booking-preview notice. Production build, lint and diff checks pass. This correction supersedes the founder-emphasis decisions below.

## Current follow-up — page-level quality

The user still finds the overall page bare and below the reference standard. Re-reviewed the 18 September call decisions, dated Miro capture and supplied Synex recording contact sheet. The important gap is page hierarchy and variation, not more repetitive cards or arbitrary motion.

1. [x] Review the entire current page: hero, proof, two identical-scale split rows, third portrait split and minimal footer.
2. [x] Introduce the search-to-sale narrative on desktop, with an early link to the real founder. On stacked layouts retain only the founder link to avoid two text-heavy introductions before the first product scene.
3. [x] Carry restrained sage/sand light outside the scene boundaries, add ambient image shadows and coherent two-tone display typography. Preserve both approved native commerce scenes and their choreography.
4. [x] Replace the third split row with a panoramic photographic closing section, large centered typography and a frosted conversation panel using Keanu's original photograph. Responsive portrait, copy and CTA stay native; decorative terrace has subtle scroll depth and a still reduced-motion state.
5. [x] Complete responsive, motion and navigation checks; publish and inspect live.

Published application commit `e19bac4`; deployment `dpl_4uoJ8SFKWXCXZ64qVKJvhMmXPPKp`. Live review loads `index-ieiaytOc.js` and the 1942px terrace asset. Full-page and closing captures saved to parent workspace `output/happy-mondays-page-polish-2026-09-30/`.

Verification: production build, TypeScript lint and clean diff. Visual checks at 320, 390, 768, 1024 and 1440 widths, geometry at 1920; no horizontal overflow. Confirmed founder anchor and back-to-top navigation, unchanged booking-preview notice, both finite scenes reaching 7600ms, closing entrance reaching full opacity and bounded background motion. Reduced motion has static background, completed scenes and no replay controls. Live browser showed no console errors or warnings.

Built-in imagegen asset and exact prompt: `public/images/page-atmosphere/README.md`. The generated setting is decorative, not presented as a real agency location. No added testimonials, results or client claims.

## Current follow-up — category variety

User feedback: the layered result looks good, but repeating socks misses the request for different high-end products. Preserve the approved discovery scene and replace the purchase scene with a distinct home-fragrance concept.

1. [x] Create coherent Serein candle/diffuser/packaging photography and separate transparent foreground/catalogue assets.
2. [x] Build a distinct warm walnut/plaster/bronze composition, store behind the collection and basket at front-right. Keep Morrow Studio's discovery scene unchanged.
3. [x] Update native store, complementary product, $68 + $42 subtotal and illustrative-brand notice together.
4. [x] Review desktop, tablet and handheld composition; verify asset decoding, reduced motion and finite animation. Pause held 4194ms / $76.50 across separate checks; final subtotal is $110.
5. [x] Publish and inspect the live review revision.

Published application commit `3097304`, deployment `dpl_BCWcnud8ngzezjoRjAfDuZ35tF9J`. Canonical review serves `index-lhhUfuPn.js`; all Serein images load, final subtotal $110, no observed browser errors or page overflow. Desktop widths 1024/1440/1920 and stacked widths 320/390/768 visually reviewed. Build, lint and diff checks pass. Live capture: parent workspace `output/happy-mondays-serein-2026-09-30/live-serein.png`.

Asset provenance and exact built-in imagegen prompts: `public/images/serein/README.md` and `prompts.json`. Older same-product notes below describe the previous revision, superseded by this category-variety follow-up.

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


## 30 September — approved editorial integration

User approved the recent icon and foreground concepts and requested their implementation together. This supersedes the older restrictions above against concept brands: Morrow Studio and Serein are now the accepted illustrative product scenes.

- Retained the live layered shopping/store sequences, independent depth, finite timelines and reduced-motion states.
- Rebuilt the accompanying copy as large two-tone editorial headlines with transparent blue-glass cart and payment-card assets, subtle entrance and bounded scroll movement. Shorter copy and shared ocean-blue pill actions connect them to the hero.
- Removed the repeated search-to-sale introduction, so the client logos lead directly into the discovery scene. Planned service links retain their destination-specific preview notices.
- Replaced the cool white hero wall with warm travertine, restrained olive detail and the same coastal setting. Magnific Precision 2x master supplies responsive AVIF/WebP assets. Sea and foreground remain separate layers around the live dashboard.
- Integrated the approved restored Keanu portrait into the single closing contact card; team-first positioning remains. Concept B is unchanged.
- Asset sources and processing are recorded in public/images/editorial/PROVENANCE.txt and public/images/hero-a-terrace/PROVENANCE.txt.

Validation: client-review build and TypeScript lint pass; no horizontal overflow at 320, 390, 768, 1024, 1440, 1920 and 2560px. Visual checks covered the hero, both editorial sections and closing card; normal and reduced motion, scene completion, reverse scroll, foreground overlap and image loading were checked. No browser warnings/errors observed.

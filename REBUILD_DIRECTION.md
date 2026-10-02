# Concept A — corrected source review · 30 September 2026

**Status: layered replacement implemented, visually reviewed and published for review.** The previous continuation was rejected. The active rebuild below supersedes earlier interpretations, including the restrictions on concept brands and translucent platform UI. Visual acceptance belongs to the user/client; successful builds alone do not establish design quality.

## 2 October — partnership lighting, layered objects and contact placement

User clarified that the photographic colour must fill the entire side cards; the previous edge masks and fade into the white page were rejected. Both backgrounds now remain opaque to their rounded edges. The follow-up light pass adds warmer upper highlights, lighter sage and coastal blue midtones, and retained photographic variation.

Replaced the flattened artwork with two newly generated transparent source elements: one optical glass disc and one pearl calendar. Independent instances support a small separation of the platform discs and compression of the calendar stack as the centre expands. Original official platform marks remain separate SVGs. Ambient movement pauses when offscreen or hidden; reduced motion uses the complete still arrangement. The side cards now remain visible further into the expansion. Their text yields before the measured aperture crosses its inset, avoiding clipped letters while the objects remain visible. No additional scroll clock is introduced.

The final contact composition is a single right-aligned horizontal group, lifted above the terrace: Keanu's portrait/details sit on the quieter wall, then the button on the right. On mobile the button and contact details stack directly below the copy. Both use the existing booking preview behavior. The middle photographic crop and veil reveal more olive shadow without obscuring the text.

Verification: client-review build and five geometry tests pass. Tests now cover the moving button and visible contact staying within the aperture, the final right inset, and clearance above the lower edge. Visual checks cover 1280 and 1440px desktops, 1024px tablet, and 390px mobile/reduced motion. Proofs are in the parent output folder under `happy-mondays-partnership-refinement-2026-10-02`. Asset provenance is recorded beside the images. This is a refinement for review, not a claim of client design acceptance.

## 2 October — source-grounded blurred backdrops

Reopened the live Miro board and the actual 18 September transcript, specifically 38:10–41:05 and 48:01–51:54. The board explicitly requests an out-of-focus nature photograph behind sharp foreground elements, with warm neutrals, restrained accent colour and layered depth. Its Solidroad integration and blog captures show irregular, optically blurred colour rather than uniform radial glows. On the call, Dan describes the colours and feeling of an unrecognisably blurred background; Keanu prefers the softer gradients and rejects excessive colour. These are source observations; the olive/blue pairing below is our application to the existing page.

Sources: [Miro](https://miro.com/app/board/uXjVHmXBav0=/?share_link_id=173104433004), [18 September transcript](https://docs.google.com/document/d/1QZw3pYGizFvJs8p1F_FfgZgWTCP7Plpl8sHHL8ScW_A/edit).

Replaced the two pale radial halos with defocused crops of the existing olive-grove and coastal photographs. Uneven olive/sage and blue/stone fields now give the glass and pearl artwork tonal separation. A separate daylight veil keeps heading and paragraph areas quiet; intersecting edge masks blend to the page without another enclosing card. The background moves slightly with the existing scroll geometry and fades with its supporting column, while the foreground retains its independent movement. No new animation clock or asset dependency; reduced motion remains static. Centre artwork, copy, dimensions and scroll timing are unchanged. Browser review covered the 1280×720 opening, intermediate expansion, hidden-side endpoint and reversal, plus 390×844 stacked reduced-motion views. No horizontal overflow; reduced-motion backdrop transform is none. Build, diff checks and five existing journey geometry tests pass. Proofs are saved in the parent output folder under `happy-mondays-gradients-2026-10-02`.

## 2 October — liquid-glass buttons retained, material reworked

User clarified that glass itself is wanted; the flat-button correction misread the feedback. Replaced that correction with a continuous lens treatment: translucent fill and backdrop blur, broad white and blue internal reflections, and a single irregular 1.25px highlight at the perimeter. No inset ring. Clear service/navigation actions retain dark text; primary actions use tinted blue glass with white text. Surface light and perimeter highlights shift together on hover over 700ms. The existing commerce-frame treatment is unchanged.

Reviewed desktop service and hero actions plus 390px phone. Verified actual hover endpoints, original action click behavior, zero horizontal overflow in the phone view, non-interactive decorative layers and zero transition duration in reduced motion. Build/TypeScript and diff checks pass. Screenshot saved in the parent output folder as `liquid-lens-buttons.png`. Visual acceptance remains with the user.

## 2 October — button treatment corrected

The user rejected the heavy resting button treatment but explicitly liked the hover idea. Removed the thick masked rim and inner lip from controls. Secondary actions now have a translucent white fill, one fine border and a restrained shadow; primary actions use the existing solid blue with a softer shadow. Kept the travelling highlight as a 1px edge-only glint that appears on hover, rather than a permanent bevel. Graphic-plane rims stay intact. The client-story arrow returns to its simpler original border.

Reviewed the resting service action in the actual page and verified a 1px hover rim, 650ms edge movement, and zero resting glint opacity. Reduced motion removes the transition; decorative layers remain non-interactive. Build/TypeScript and diff checks pass. This supersedes the button portion of the earlier optical-edge treatment.

## 2 October — shared optical edge treatment

Extended the dashboard's glass-edge language to the two service buttons, the four commerce planes and the client-story arrow. A masked gradient rim preserves an empty centre, so the effect never washes over text or platform UI. Secondary actions use a 3px clear rim and inner lip; blue primary actions retain their fill with a quieter 2px highlight. Commerce rim thickness scales from 2px to 4px with its scene. Photographs and whole sections remain unframed.

Hover shifts the light along the rim over 550ms; press lowers the highlight. Pointer events pass through the decorative layer, existing keyboard focus remains visible, and both OS and page reduced-motion settings remove that transition. No new JavaScript loop or dependency was added. Browser review covers desktop discovery/hero, 390px phone, actual primary-action click, hover endpoint and keyboard focus; measured no horizontal overflow. Build/TypeScript and diff checks pass.

## 2 October — Diamond Store editorial redesign

Replaced the ruled, generic testimonial row with an open photographic composition: the actual client campaign image as a lightly angled print, a separately generated optical-glass prism, soft blue/champagne light and a narrower quotation measure. It sits between discovery and purchase as an unpinned, readable pause rather than another enclosing card or scroll takeover. The photo and prism follow the scroll spring at small opposing distances, with slight independent rotation. Text never fades or waits for the art.

The existing quote and client wordmark are unchanged. Gary's 56px portrait position is reserved beside his attribution; a neutral GI monogram remains until the user provides his photograph. `ClientStory` accepts `portraitSrc` for the real image. No synthetic likeness or new result claim was added. The generated object is decorative, not client merchandise. Prompt/provenance is in `public/images/client-stories/OPTICAL-PRISM.md`; the runtime transparent WebP is 73KB.

Browser review: 1280px and 1440px desktop, 820px tablet, 390px and 320px phone. Reviewed the adjacent discovery/purchase spacing, the full attribution and action, and normal-motion scroll/reversal with the text at full opacity. Reduced motion renders static artwork. No horizontal overflow in measured phone/desktop views or runtime errors in the normal-motion review. Production build, TypeScript lint and diff checks pass. Proofs and the original generated PNG are saved in the parent workspace under `output/happy-mondays-client-story-2026-10-02`. The case-study destination remains the existing concept-preview link, pending its route build.

## 2 October — actual-tab QA correction

The user's clipping screenshot was reproduced in their open Chrome preview at 1727×963. It still loaded `index-CfEzq_bT.js` / `index-CZLBb7UI.css`, with zero pin bottom padding: the 620px scene extended 55px past the story's clipping edge. Previous QA inspected a newer temporary tab and did not establish that the user's already-open preview had refreshed. This was a delivery/verification gap, not a user error.

Refreshing that exact tab verified the existing 110px pin clearance and restored the lower corners. The contact destination is now at 72% of the scene width, entirely on the plaster wall rather than over the sea/tree seam. The extra radial photographic wash is removed. Static layouts also reserve 32px of real bottom space for the edge/shadow; the previous collapsing margin alone was insufficient for hover tilt. Overall section spacing is retained.

QA must identify the loaded bundle in the actual review tab after rebuilding, and distinguish that from the deployed commit. Browser checks in this correction include the supplied 1727×963 context, 1080×700 expansion/release/reverse, 1024×680 static and 320×780 phone. Geometry samples record the clipping boundary, button inset, contact containment, visible copy overlap and page overflow. Hidden contact geometry is not treated as a visible overlap. A screenshot of an endpoint alone does not validate the journey.

## 2 October — supporting artwork motion

The supporting graphics previously only settled once, triggered by visibility of the entire stage. Each object now observes its own visibility and image readiness. Separate layers compose the entrance, damped scroll drift, and a restrained continuous perspective/vertical movement; a masked light sweep stays within the original transparent artwork. The platform marks move with their glass assembly. This animates the existing raster compositions, not separately modelled calendar pages or medallions.

Ambient playback pauses offscreen, when the supporting column fades away, and when the document is hidden. Reduced motion removes the ambient animations and scroll transforms. Browser checks observed changing transforms while stationary, paused playback after returning to the top, and identity transforms/no CSS animation under `motion=reduce`; no console errors. Build and TypeScript lint pass.

## 2 October — continuous partnership scroll scene

The user found the transition and final composition unrefined. This replaces the earlier narrowing-card/FLIP treatment below. The centre is now an aperture onto a fixed panoramic canvas: its frame opens horizontally and vertically while the photograph gently settles, rather than continuously re-cropping with the changing card width. Supporting artwork and copy retain their measures, retreat slightly and fade before the aperture cuts through their text.

One reversible spatial timeline positions the heading, paragraph and invitation continuously. There is no width-triggered layout switch. The final scene groups heading and paragraph at the upper left, with Keanu and the action at the lower right; a local light wash keeps that contact legible without another enclosing card. A damped scroll follower softens wheel input, with opening and ending holds. The pin still starts when the base frame is vertically centred. The expanded frame has real release clearance so its bottom corners and shadow are not clipped by the story container.

Verification: production build and TypeScript lint pass. Five timeline tests cover four desktop geometries, fixed text measure, centred frame, heading/copy clearance, contained CTA, end holds and deterministic reverse sampling. Browser review covers 1280×720 and 1080×700 normal motion (opening, intermediate, expanded, reverse and fast-scroll release), 390×844 phone, and the reduced-motion desktop composition. These are visual state and interaction checks, not an instrumented frame-rate benchmark. Small screens and reduced motion remain unpinned. No additional homepage section or outer footer row was introduced.

## 2 October — partnership composition follow-up (superseded motion)

After the outer footer rows were removed, the user still found the section visually weak. The revised composition makes the coastal team scene the focal point: a 40% centre with 30% supporting columns instead of three equal cards. The side backgrounds and perimeter shadows are removed; restrained sage and blue light sits around the larger physical artwork. Headings, artwork and copy now use a deliberate three-row grid. The desktop frame is 480–510px, with smaller supporting type and shorter fee copy. The middle invitation remains; its redundant dividing line is removed. Existing centred pin, gradual narrowing, spring following and full-width team/contact scene are preserved. No extra homepage module or footer row was added.

## 2 October — visual reset (implemented and published for review)

The user rejected the previous pass as visually unchanged. Technical verification is a delivery requirement, not the design roadmap. The following work supersedes the earlier “no visual defect” conclusions.

### Roadmap

1. **Partnership scene — implemented, browser-reviewed:** replace empty space with custom physical artwork, shorten the desktop row, preserve the centred scroll opening. Connected glass platform medallions for the business card; a pearl-white calendar sculpture for predictable monthly fees. Keep the coastal team scene and understated personal contact. Review opening, narrowing, expanded and mobile compositions.
2. **Commerce storytelling — implemented, browser-reviewed:** make the agency's intervention apparent in the discovery journey, rather than merely sliding a product carousel. Plan the before / intervention / after beats from the September call, with the actual ecommerce UI still recognisable. Keep copy available throughout; bound playback speed and motion distance.
3. **Whole-page art direction — implemented, browser-reviewed:** judge hero → credentials → discovery → open testimonial → purchase → partnership as a sequence. Preserve open sections; do not turn the whole page into cards. Improve visual transitions and differentiated depth rather than adding text-heavy modules. The removed audit/FAQ spread stays removed.
4. **Delivery review — completed:** compare real browser renders with the chosen references, including intermediate scroll positions and phone compositions. Publish cohesive visual increments. Do not equate passing tests with client approval.

### First visual increment: verification

The desktop stage is now 530–580px rather than 490–720px (558px rather than 652px at 1440×900). The supporting objects have their own gentle one-time settling motion and move with the scroll-driven contraction. Platform marks remain separate real assets; the enlarged Shopify mark is the official vector from Shopify's brand kit. Tested opening, 26% narrowing and expanded compositions at 1440×900, opening at 1080×700, and the static phone layout at 390×844. No horizontal page overflow or console errors were observed. The existing centred start, reverse-scroll behaviour, focus handoff and reduced-motion path are retained. Build, lint and ten playback/readiness tests pass. Local proof images are in `output/happy-mondays-visual-reset-2026-10-02` in the parent workspace. This is a visible design increment, not a claim of final client acceptance.

### Second visual increment: discovery with a visible intervention

The existing foreground product surface now becomes a restrained product-feed view. Its title changes from Everyday Grip Sock to Pilates Grip Socks, material and colour details resolve, and the Happy Mondays completion mark appears before the Shopping result advances. This is an illustrative concept journey, not a promised ranking or client result. No additional panel or homepage section was added.

Reviewed real production-bundle keyframes at 1512ms (original catalogue), 2518ms (refined fields, no carousel advance), and 3515ms (matching). A temporary local-only rAF harness paused those keyframes; that review establishes visual ordering, not real-time performance. The production clock remains bounded, scroll-responsive and finite. Checked completed compositions at 1440×900 and 390×844; the phone feed is slightly wider and omits the smallest field labels. No horizontal overflow. Build, lint and diff checks pass. Clean desktop/mobile proof images are saved beside the partnership proofs. The audit/FAQ spread stays removed.

### Third visual increment: a recognisable client story

Replaced the generic oversized quotation mark with an open editorial composition using The Diamond Store's actual jewellery photography and wordmark. The existing attributed quote remains unchanged; no new metric or outcome claim was added. The photograph introduces a human, close-up texture between the two constructed commerce scenes, without a surrounding card, shadow or new section. A spring-followed ±8px photo drift stays subordinate to the text; reduced motion is static. On phones the smaller image and wordmark sit together above the quote and attribution.

Reviewed desktop 1440×900 and phone 390×844 renders. Provenance is recorded with the source assets. Ellie’s exact linked draft was fetched directly: it is the 7 September content plan with unresolved questions, not later approved copy. Its useful direction is the Monday emotion, named client evidence, a warmer voice and concrete agency work. Its unverified metrics and proposed homepage pricing table are not reinstated. The 1 September transcript's branding and visual-reference discussion (15:21–20:56 and 25:47–35:12) was re-read directly, reinforcing recognisable Shopify/Shopping micro-UI, light material surfaces and a positive emotional response.

### Source findings rechecked this pass

- Live Figma frame 2721:296: deliberate graphic regions and soft material surfaces are useful; the old checklist / performance-number / capacity-card content is not the direction to copy.
- Live Miro board: Solidroad paired platform graphics (image 3458764683975495634) and the GoFlower product composition (3458764683972932707); the former puts recognisable logos inside the scene, rather than adding badges to an empty card. Synex reference video contact sheet re-viewed for layered reveals.
- 18 September design review, 17–41 minutes: premium photographic nature plus software familiarity, integrated depth, restrained soft gradients and frosted materials; not a new SaaS interface, not vector landscapes. 42–56 minutes: ecommerce interactions as a subtle nod, gentle scroll transitions and white/off-white contrast. The reference's literal rocks/branches are not requirements.
- Live client Slack, 24 September: Concept A preferred; gradients and animation still below the reference. Blue should be an accent with natural colours, rounded buttons and subtle shadows. The 30 September conversation requests progress/timing, not a change in visual direction.
- Archived introduction, August follow-up, kickoff agenda, answered content plan and Miro capture consulted. This is not an assertion that every historical comment has been re-read in full.

### Integrated delivery review

Published visual work: `b5c9385` (partnership artwork and proportions), `706487e` (visible product-feed intervention), `0dc6868` (editorial client story). Both Vercel projects report successful deployments for the final visual commit; the review site serves the new assets and bundle.

At 1440×900, the 558px partnership row remains unchanged until centred. Measured opening top 170.52px; at 27% progress the two supporting cards remain readable at approximately 344px wide. At 82% the team scene has expanded, with the paragraph and right-side invitation sharing the same vertical centre (650.59px). Reverse scrolling restores the original 426.66px side widths and full opacity. The release returns naturally to the footer. Screenshots record opening, compression and expanded states. Phone checks include 390px and 320px layouts; reduced motion presents static compositions without the desktop pin. The audit/FAQ spread remains absent. Build, lint and ten playback/readiness policy tests pass; browser review covers the visual states separately.

The meaningful reference takeaways carried into this delivery are recognisable platform objects, soft physical materials, photographic depth, visible ecommerce intervention and an open client-proof composition. The site retains its existing coastal hero, restrained blue/sage/sand palette and legible copy rather than adding more boxed modules. Concept destinations remain available for routes to be built later.

Source coverage is recorded honestly: live relevant Figma frames, live Miro references, client Slack direction, Ellie's exact rough draft, client call visual discussions and archived comments were reviewed. Relevant internal-call excerpts were cross-checked. The 21 September walkthrough has no exposed transcript and its audio was not reviewed; historical Figma comment coverage comes from the archive, not a fresh exhaustive comment export. This is a completed design/development refinement pass for review, not a statement of client approval or a completed full-site route build.

## 2 October — audit section removed at user request

Removed the homepage audit spread and its four FAQs from the rendered page. The team invitation now leads directly to the footer with existing section spacing. Keep the component available for reconsideration; do not reintroduce it during ongoing refinement without a new user request. Service and audit links elsewhere remain unchanged. Build, lint and browser verification pass.

## Detail pass — 1 October 2026

### Purchase-state continuity

- Found a causal mismatch in the Serein sequence: the candle appeared in the bag while its product button still said “Add to bag”; that label only updated when the complementary diffuser was added. The candle button now switches when the bag first becomes visible, independently of the later diffuser addition.
- Observed the actual built sequence through a temporary DOM recorder: at 0ms the bag is hidden and the button says Add to bag; at 1351ms the one-item bag appears with Added to bag; at 3151ms the bag changes to two items while the candle remains added. Saved `commerce-state-continuity.json` in the task output. The served recorder was removed after verification.
- At 390px with reduced motion, the completed scene reports Added to bag, two items and 5800ms, with zero page overflow. Build, lint and diff checks pass. Existing layout, photography, totals, scene duration and recommendation timing are unchanged.

### Idle scene behaviour

- Reviewed the clock, scroll springs and pointer-tilt lifecycle. Scene clocks stop when invisible, unloaded, paused, hidden, reduced or complete; the readiness hold also stops scheduling. Tilt measurement only schedules while a pointer needs measuring. No perpetual decorative CSS animation was found in Concept A.
- A temporary harness around the current production bundle observed the app root for five seconds after the hero, discovery and purchase compositions settled. All three samples recorded zero attribute, text or child-list mutations. Completed clocks stayed at 4800/5800ms; unvisited commerce clocks remained at 0. The document remained visible in every sample. Saved `idle-scene-review.json` in the task output.
- This verifies resting DOM behaviour, not zero JavaScript execution, GPU activity, energy usage or performance on another device. Lenis retains its expected animation-frame scheduler. No production optimisation was justified by these observations. The served harness was removed; its local snapshot remains excluded from Git.

### Readable service-copy entrances

- On direct entry to the approach section, measured the parent copy at 0.876 opacity while its inline cart was only 0.098. The icon's independent 1.2-second entrance plus 180ms delay left a visible hole in the heading after the words were already readable. Both offscreen copy blocks also began entirely transparent.
- Kept service copy at full opacity throughout, with a restrained 6px/450ms settling movement. Removed the icon's separate timed fade/rotation; the existing outer scroll movement (±4px and ±2°) remains. This makes sentence, illustration and action available together without changing type scale, layout, image loading or the product-scene narrative.
- On immediate desktop reload into `#the-approach`, both copy blocks and icon images report opacity 1 while the discovery copy is still at its initial 5.82px offset. After a quick 0.65-page scroll, the entering purchase copy and icon remain fully opaque. At 390px with reduced motion, both copy blocks and icon planes report no transform and no page overflow. Build, lint and diff checks pass.

### Independent commerce backdrops

- A local ten-second delay on catalogue thumbnails reproduced an unnecessarily empty state in both commerce scenes: the full photograph was decoded, but the shared camera opacity still hid everything until the smallest product assets arrived.
- Separated the photographic backdrop from the coordinated object plane while keeping their identical camera scale/origin. The setting now sharpens independently; Google/Shopify panels, photographed products and contact shadows retain their existing shared readiness gate and narrative timings. Added inline soft previews for the two background plates (3,022 and 1,482 bytes) so a delayed plate also retains its composition. Renamed the shared generation script to `gen-loading-previews.cjs`.
- Browser checks at 1440px confirmed each backdrop becomes visible while its object camera remains at opacity 0 and its narrative time remains 0 under delayed catalogue responses. Both eventually reach 5800ms with full photography and the original final composition. Corrected the purchase background shorthand during review so it preserves cover/no-repeat sizing rather than tiling the preview.
- At 390px with reduced motion, both photos report ready/opacity 1, zero-second transitions, completed scene clocks and zero page overflow. Text and service destinations remain outside the media gate. Build, lint and diff checks pass. This controlled delay test does not establish aggregate network throughput or real-device performance.

### Progressive hero scenery

- Reproduced a blank first impression with a local server delaying both coastal image requests by ten seconds: the headline and action appeared, but the entire scene remained absent until both photographs decoded. This is a controlled asset-delay test, not a measured mobile-network benchmark.
- Added two 192px soft previews derived from the approved photographs (860 and 1,202 bytes). Vite embeds them in the application bundle, so there is no additional image request. Each uses the same crop/container as its full image. The full layers sharpen together with the existing 1.4-second fade once both have settled; the dashboard still follows the existing readiness gate. Reduced motion switches immediately when ready. No finished-state photography, geometry or headline timing changed.
- Failed photographs remain transparent over their preview rather than revealing a broken image. A later successful responsive source clears that failure state. Verified both requests returning HTTP 503 on a 390px reduced-motion view: the scene retains its colour, the dashboard resolves to 4800ms and the page has no horizontal overflow. Verified successful phone images return to opacity 1, and delayed desktop images resolve to full quality and completed dashboard playback.
- Initial 96px/low-quality previews showed compression blocks at desktop scale; replaced them with softly filtered 192px derivatives. Generator is `scripts/gen-loading-previews.cjs`. Build, lint, diff checks and ten existing playback/readiness policy tests pass; actual media loading was verified in-browser. Temporary delay/failure servers and harness are local-only. Screenshot: `hero-delayed-preview.png` in the task output.

### Wide-screen composition review

- Reviewed the actual built page at 1920×1080 (opening and discovery) and 2560×1440 (team opening, compression, expansion, audit and footer). The 1440px content cap keeps readable line lengths rather than stretching copy across the whole display. No horizontal page overflow was observed.
- At 2560×1440, the team stage is 720px high with its top at 360.12px while pinned: vertically centred to rounding precision. At progress 0.323, both side cards remain 345px wide and 0.686 opacity, with readable paragraphs and separated footers. At progress 1, the supporting paragraph and invitation share the lower row and the audit remains below the stage with a 366px separation. That taller release gap preserves the requested frozen-frame illusion on a tall viewport; reducing it would reveal the following section during the pin.
- Retained the current proportions and type caps. This review found no concrete visual defect requiring a new CSS override. Saved `wide-screen-audit-review.png` in the task output. These are local browser observations, not client approval or a new deployment.

### More specific partnership copy

- Re-read the answered content plan (document `12DRCfA0w_32IYcG_u30bOXScNhf-dFMsEzeeFnwrmME`, opening questions 5–6 and homepage answers). The confirmed fee substance is a fixed monthly charge within a spend band, no percentage of ad spend, with predictable owner cash flow as a stated reason. Replaced the fee card's repeated “senior expertise” and general working-process sentence with that concrete explanation. Spend bands remain explicit; no numeric pricing table, forever-fixed-fee promise or unapproved exclusivity claim was added.
- Removed the reporting FAQ's closing generalisation about calls filling calendars. The answer retains the actual deliverables: live dashboards, Monday metrics, weekly recap, key numbers, work in progress and client inputs. Other partnership wording and the team emphasis remain intact.
- Reviewed the card at 1440px, the centred three-card opening at 1080×700, and the 390px static layout. Paragraphs retain their bottom alignment and footer separation; the expanded FAQ is readable without horizontal overflow. Build, lint and diff checks pass.

### Focus continuity through the expanding cards

- Reproduced a keyboard/pointer crossover defect: after focusing Explore pricing and scrolling to 76.3% of the team transition, focus remained inside the now-hidden fee card. Its `tabIndex=-1` prevented new tab entry but did not release existing focus.
- When a side card becomes hidden, move focus to the surviving team heading only if focus is currently inside either disappearing card. Use `preventScroll`, leave the heading outside sequential tab order, and give its compact text bounds the established blue focus outline. The next Tab reaches the visible team action; no different action is automatically activated.
- Browser verification: the same scroll sequence still ends at y=4247, now with focus on the visible heading and no hidden ancestor; Tab reaches the team action without moving the page. Ordinary scrolling from body focus retains body focus. Reverse scrolling restores the pricing link's tab stop. The 390px static layout retains its two-line heading, visible contact and zero horizontal overflow. Build, lint and diff checks pass.

### Live media completeness

- Visited the live hero, both product compositions, team invitation and footer at 1440×900. All 38 image elements report successful completion and nonzero intrinsic width after their sections were visited, including the AVIF scenery, eight client marks, platform icons, product layers, responsive editorial icons and portrait. The live stylesheet list includes the local font stylesheet and current application CSS.
- Saved the selected image URLs and decode states to the task output (`live-asset-inventory.json`). This checks the chosen live sources in this browser, not every unused format/density fallback or a cleared-cache network test. No missing media or new artwork change was justified by this pass.

### Production-build motion sampling

- Used a temporary local HTML harness around the actual built bundle to collect eight-second requestAnimationFrame intervals and Long Tasks API entries. The recorder only updates its visible result after recording. Reviewed the initial desktop opening, discovery entrance, purchase entrance, scroll through team expansion and a 390px phone-layout opening. The harness is excluded from Git and deployment; its served copy was removed after use.
- On this machine, desktop initial load recorded one 51ms long task and one 66.7ms callback interval. The four subsequent samples recorded no long tasks and no callback intervals over 33.5ms; their 95th percentile intervals were 9.8–9.9ms. Both commerce stories reached their final 5800ms state and the team journey reached progress 1. All samples remained document-visible. Ten existing playback/readiness policy tests also pass.
- These are callback cadence measurements in an unthrottled browser with its existing cache. They do not establish GPU presentation rate, cold-network loading, low-end phone behaviour or field performance. No timing or visual simplification was justified by this evidence. Raw samples are saved in the task output as `motion-rendering-samples.json`; a local-only harness snapshot remains in `.dev/motion-review.html`.

### Whole-page rhythm and closing-action hierarchy

- Reviewed the desktop journey by scrolling through the terrace/credentials hand-off, both commerce scenes, the testimonial, centred team cards, narrowing side cards, expanded team composition and the final audit. The existing open testimonial and audit sections provide useful contrast with the photographic scenes; retained their spacing and avoided adding further containers. At the observed release point, the team expansion had completed before the audit entered the viewport, with 130px between the card bottom and audit border.
- The final booking link used the pale glass treatment intended for service exploration, giving it the same emphasis as secondary destinations. Reused the existing blue primary button and aligned its label with the hero: “Start with an audit.” “Inside the audit” remains the quieter supporting link. No new button colour, component, imagery or promise was introduced.
- Reviewed the closing composition at 1440, 390 and 320px. The booking target is 52px high on desktop and 50px on phone, has a visible keyboard outline, retains its audit-booking destination and opens the existing booking-preview notice. The narrowest view has zero horizontal overflow. Build, lint and diff checks pass; the calendar remains an intentionally unconnected concept destination.

### Compact navigation continuity

- At 844×320, keyboard navigation correctly scrolls the menu panel to its last item, but closing and reopening preserved a 68px scroll offset, hiding the first link. Reset the panel to its top whenever the disclosure opens; the page itself is not scrolled by this reset.
- Verified with real Tab/Return/Escape input: the last item remains reachable, reopening restores a zero panel offset, and selecting Client stories closes the menu, moves focus to the section and aligns it within 0.06px of the viewport top. At 390×844 with reduced motion, all five links fit; tabbing past the last item closes the disclosure and focuses the hero action. Existing appearance, entrance timing and native disclosure semantics are retained. Build, lint and diff checks pass.

### Editorial icon and portrait delivery

- The cart/card header icons were each delivered at 600px despite their maximum CSS widths being approximately 76/104px; the 48px contact portrait always used its 480px source. Added responsive WebP encodes (quality 90, full alpha quality) and conservative size hints based on the existing heading caps. Original files remain available at the top of each source set, and the generator records the additional variants.
- At the tested 1× display, the browser selects 128px icon files and a 96px portrait: 12,946 combined bytes instead of 150,626 (91.4% less for these three assets, not the whole page). Higher-density variants remain available; this browser's viewport control does not emulate pixel density, so no claim is made of a device-matrix test.
- Visually reviewed the icons at 1440px and 390px, including transparent edges, alignment with the live heading text and the selected source URLs. All three loaded successfully. Heading CSS, icon placement, portrait treatment, lazy loading and motion are unchanged. Build, lint and diff checks pass.

### Live motion-preference regression review

- Tested the actual Concept A components in a temporary development harness that dispatches preference-change events through a controlled `matchMedia` implementation. This exercises live hook updates without changing the user's operating-system preference. The harness is local-only and is not part of the production build.
- After scrolling the hero, switching to reduced motion clears the scenery, dashboard, foreground and order transforms. Further scrolling leaves them at `none`; Lenis releases the page (its root class is removed). Both commerce depth planes reset to `none`, and both narrative clocks resolve to 5800ms. Re-enabling motion restores Lenis while keeping completed clocks at 5800ms.
- Switching the team scene to reduced motion restores its full 1320px static width, both side-card opacities and the contact detail. This verifies the previous geometry fix for preference changes as well as viewport changes. No additional production change was justified. This harness tests JavaScript preference handling and data-attribute styles; it is not a substitute for a native OS/browser accessibility audit.

### Team scene continuity on refresh and resize

- Reproduced two visible continuity defects: refreshing at 36.6% of the pinned transition briefly restored the closed three-card layout, and resizing an animated desktop page to 390px retained an obsolete animated card width (109px), padding and hidden contact opacity. The latter persisted after scrolling settled.
- Initialise the spring at the measured restored scroll position. Delay layout-position tracking until the first two animation frames have established the actual card width, preventing the CTA from animating upward through the clipped card edge on mount. Ordinary scroll and reverse-scroll retain the existing spring and timing.
- Move animated card geometry into scoped CSS custom properties, applied only by the animated layout. Static phone, short-window and reduced-motion layouts use their own CSS geometry without retaining Framer's previous inline widths, padding, photo scale or contact opacity. Hover transforms remain independent; hidden side cards remain excluded from pointer and keyboard interaction.
- Browser verification: refresh at 29.8% preserves the exact progress, 630.05px centre width and CTA position; refresh near 89.5% preserves the expanded row. Reverse scrolling restores side cards and their accessibility state. Desktop→390px now gives a 366px card, 38px/28px inner padding, visible contact and zero horizontal overflow. Returning to desktop restores the animated layout; 1440×650 releases to full-width static geometry with 62px padding, and a reduced-motion visit retains the static composition. Build and ten existing playback/readiness tests pass; the restoration/resize regression is verified in-browser rather than by those pure-policy tests.

### First-load typography delivery

- The initial document depended on a remote Google Fonts stylesheet, followed by cross-origin font requests. Vendored the same Manrope, Inter and DM Mono WOFF2 files, retaining the original weight declarations, unicode subsets and `font-display: swap`. The main Manrope Latin font (24,576 bytes) is preloaded directly from the document head; the two Google origin preconnects and remote stylesheet are removed.
- Kept all supplied language subsets available on demand so other prototype routes retain their coverage. Added the three SIL Open Font License notices and a source/hash manifest; no font was modified or renamed internally. The 15 distinct files total 308,116 bytes on disk; browsers still request only the relevant subsets. This is dependency removal, not a measured LCP or transfer-size improvement claim.
- Browser comparison before/after at 390×844 and 1440×900: all 12 measured heading, quote, intro, CTA and dashboard geometries match exactly, as does total document height. The page head now references only local font assets and the browser reports no warnings/errors. Build, lint, WOFF2/header/hash validation and diff checks pass.

### Intermediate-width and disclosure review

- Reviewed the hero-to-commerce transition at 1101px and 800px. The eight-column laptop logo row and four-column tablet layout retain clear spacing; the partner line and client marks remain visually separate without adding another container. No layout change was justified by these views.
- Opened the weekly-reporting answer at 390px and inspected its paragraph measure, disclosure spacing and page width (zero horizontal overflow). Real Tab input moved to the next question with a visible, unclipped focus treatment. Reviewed the expanded answer again at 1024px, where the two-column questions and footer remain coherent.
- This is a verification-only pass: existing page styling and copy are retained. No additional cards, animation or cosmetic override were introduced. These observations are limited to the inspected states and do not establish client acceptance.

### Team photograph delivery and crop resolution

- At 390px / 1×, the 366×540px team card selected a 960px-wide panorama based on the screen-width hint. `object-fit: cover` actually scales that panorama to 1296px wide, so the chosen source was being enlarged. Updated the shared picture sizing hint to account for the photograph’s ratio and the card heights, including tablet and expanded desktop views.
- Added AVIF delivery encodes of the existing approved photograph, with the existing WebP sources retained as fallback. Composition, crop position, lighting and colour treatment are unchanged. The 1942px AVIF is 112,135 bytes versus 240,414 for the same-size WebP (53% smaller). Compared with the previously undersized mobile 960px WebP, the sharper selected source costs 34,361 additional bytes; this is a deliberate quality tradeoff, not a mobile transfer reduction claim. The image remains lazy-loaded.
- Verified the 1942px AVIF selection and unchanged card geometry in phone and full-width views, including the stone, shadow and sea detail. Build, lint and diff checks pass. Delivery encodes are reproducible through `scripts/gen-scene-variants.cjs`; original assets are retained.

### Editorial proof in the page journey

- Reviewed the whole mobile reading sequence. The testimonial introduced its author and a separate large quote mark before the endorsement, splitting attention at the hand-off between the two product scenes.
- Made the endorsement the first item in its figure, with its attribution in a real figcaption. On mobile/tablet, the author and story link sit together below the quote; the redundant decorative mark is hidden. Desktop retains the open two-column treatment, grouping the story link with its source rather than separating it below the quote.
- The supplied quotation and attribution are unchanged. No new claims, imagery, cards or animation. Checked 320, 390, 900 and 1440px layouts, the caption’s 28px separation on tablet, 44px story-link target, and its existing preview behaviour. No horizontal overflow observed; build, lint and diff checks pass.

### Reachable scene entrances

- Reproduced a stalled discovery scene at 1920×300: the scene is 715.11px tall, so its fixed 42% visibility requirement exceeds the available viewport. Even while filling the view, its clock remained at 1000ms and never reached its meaningful story beats.
- Added a shared, once-only readiness hook for the dashboard and commerce scenes. The ordinary 42% threshold remains; oversized scenes cap the required visible area at 75% of what the viewport can show. Measurements update on resize and stop after the first reveal, with no per-frame layout reads or additional scroll listeners. Timing, speed limits and scene artwork are unchanged.
- Browser verification: the previously stalled scene reached its completed 5800ms frame without further scrolling. At 1440×900, about 20% visibility still holds at 1000ms; scrolling far enough into view allows completion. Added four geometry-policy tests alongside the existing six playback tests. Build, lint and all ten tests pass.

### Supporting controls and reading contrast

- Inspected editorial text and controls separately: direct button text beside a child span needs its own contrast check. The audit’s inactive labels measured 4.46:1 on the warm `#fafaf8` page; its small chapter numbers were lighter still. Both now use a restrained blue-grey at 4.96:1. Main editorial colours and the photographic scenes retain their established palette.
- The flat-fee card’s pricing link was the only visible mobile control below a 44px target height (28px). Increased its actual hit area to 44px, preserving the 370px mobile card and both 95px footer areas. A tap in the newly added area correctly opens the existing preview notice.
- Verified 390px mobile spacing and zero internal/card or page overflow; inspected the 1080×700 animated opening and the narrowing/fading side cards for text collisions. Reviewed the audit at 1440px. Build, TypeScript lint and diff checks pass. Contrast measurements cover plain editorial surfaces, not a blanket accessibility certification of every photographic pixel or decorative platform label.

### Short landscape opening

- At 844×320, the hero action ended at y=356.63, below the opening viewport. The existing landscape rule covered taller phones/tablets but did not sufficiently compress the shortest view.
- Added a bounded shared compression value across 320–360px heights inside the existing landscape rule. Navigation height, headline size and spacing interpolate gradually; the dashboard, notification and landscape move together. Standard portrait and taller landscape rules retain their existing values, and the button retains its 52px height.
- The action now ends at y=297.55 for a 320px viewport, y=327.09 at 340px and y=356.63 at 360px. Checked normal and reduced-motion rendering, completed dashboard composition, and real Tab navigation through the short menu: its final action remains visible, only the menu scrolls and Escape restores the summary. No horizontal overflow observed. Build and lint pass.

### Route delivery weight

- The initial Concept A stylesheet also contained Concept B and archived refinement CSS. Kept Concept A eager, made the alternative route load its own assets on demand, and placed internal lazy imports behind the client-review build flag. The client build now emits only the entry files and Concept B files; archived route assets are absent from that build.
- Initial CSS falls from 161,312 to 91,310 bytes (43% smaller). Using the same local gzip calculation, initial JS+CSS falls from 150,161 to 136,819 bytes (8.9% smaller). These are build-file comparisons, not measured connection speed, LCP or total-page transfer claims.
- Compared geometry, font family and colour for eight major Concept A sections at 1440px; values were identical before/after and after visiting B then returning to A. Verified B's own stylesheet loads on navigation, mobile A has no overflow and loads only the entry stylesheet, and all four archived routes still render in the internal build. Client-review archive paths retain the review-page fallback.
- Both client and internal builds and TypeScript lint pass. No new entrance delay was added to Concept A; the alternative route has a simple accessible loading fallback while its files arrive.

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
4. [x] Reassess homepage content against the four available call transcripts, rough draft and answered plan; findings and subsequent copy corrections are recorded below and in the detail pass above. This records source review, not acceptance.
5. [ ] Obtain user/client visual acceptance of the current whole-page narrative. Earlier rejection remains part of the record; browser checks cannot satisfy this gate.
6. [ ] Verify cold-network loading and representative lower-powered mobile hardware before launch; desktop callback samples and phone-width emulation do not establish these outcomes.
7. [ ] Complete deeper service, pricing, case-study and booking destinations in the full site build. Current links explicitly retain preview feedback.

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

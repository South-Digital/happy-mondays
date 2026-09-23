# Happy Mondays — design correction, 23 September 2026

Status: Zac rejected the refinement. It is not client-ready. The prior recommendation for A and the design-complete assessment are withdrawn. Engineering checks established working code, not successful art direction.

## Sources re-read directly after the rejection

- Entire 65:55 client-review transcript from 18 September, not just the Gemini summary: https://docs.google.com/document/d/1QZw3pYGizFvJs8p1F_FfgZgWTCP7Plpl8sHHL8ScW_A/edit . Local export: `/Users/zacsanter/HappyMondays/95-research/2026-09-23/doc-1QZw3pYGizFvJs8p1F_FfgZgWTCP7Plpl8sHHL8ScW_A.txt`. This is an automated transcript and may contain transcription errors.
- Entire internal Hero Routes brief: https://docs.google.com/document/d/1MZWV3fJM3rNQH5ILOwxcZ7fHinERu7_SDy3vtZT6504/edit . This is Zac's implementation brief, not a separate client approval of every token or detail.
- Actual live client Miro board: https://miro.com/app/board/uXjVHmXBav0=/?share_link_id=173104433004 . Read the accessible content inventory and written feedback; visually revisited the Synex dashboard/rocks reference, Greece photograph, layered feature-card references, Calendly blue blurred panel and human-proof reference. This corrective pass does not claim a fresh visual review of every object or every linked site, nor discovery of every possible Miro board.
- Browser comparison of Emmanuel's live A and B with rejected A and B, plus source comparison against commit `b8e6fa6`.

## What the work got wrong

| Evidence | Consequence for the design | Failure in the rejected pass |
| --- | --- | --- |
| Call 06:22–07:31, 13:08–14:50: align on the top section before rolling out the page. | Establish the visual language in a tightly scoped hero review. | Replaced and expanded two whole homepages before establishing a successful opening. |
| Call 14:50–17:22: soft Apple-like gradients, elegant premium UI; nature brings warmth. | Softness must be visible in surfaces, light and transitions, not merely rounded corners. | Flattened the interface and cards and treated minimalism as the main quality signal. |
| Call 19:06–20:05, 33:11–35:14: appeal to design-conscious ecommerce founders and their brand standards. | Photography and craft must communicate taste before visitors read the argument. | Generic coastal imagery and generic editorial composition diluted the ecommerce identity. More pixels did not solve the art direction. |
| Call 26:19–31:19: explore dashboard integration and real depth; avoid overwhelming layers. Miro text specifies background, glass panel, floating chips. | A needs an intentional relationship between environment and UI. Foreground overlap should feel physically credible and restrained. | Put an opaque dashboard on a separate rounded photo strip, with no convincing foreground integration. |
| Call 32:13–33:11: soften native Shopify UI while keeping recognition. | Keep the proportions and hierarchy that make the object recognisable. | A clean generic recreation was accepted too readily as equivalent to a well-crafted Shopify object. |
| Call 36:11–37:18: nature can own the first impression, with dashboard/Shopping immediately below. Internal brief makes B full bleed. | B is an immersive alternative within the same brand system. | Changed B into a split editorial hero, green palette and arched photo. Moved the commercial demonstration after logos and a substantial founder section. |
| Call 38:10–41:05, 48:01–51:54: gentle grey transitions, blurred gradients, white cards, subtle shadow; clean is not enough. | Preserve the delicate layered material language demonstrated by the references. | Removed much of that language and replaced it with flat pastel panels and hard separation. |
| Call 48:01–49:51; Miro mockup notes praise blue; internal brief specifies blue as the accent. | One restrained blue accent with neutral surfaces. | Introduced green as a second art direction without a source basis. |
| Call 52:49–54:53: standard navigation, monochrome logos, no review count; strong first nature impression. | Keep useful conventional structure and improve execution. | Rewrote navigation and content hierarchy while missing the more important scene quality. |
| Call 57:05–1:02:08: show the same brand moving from position five to one after a clearly marked intervention. | Below-fold Shopping should communicate cause and outcome, not just display products. | Added tabs and polished static product cards but omitted the requested narrative. |

The internal brief's instruction is explicit: “a sharpen, not a restart.” It is narrower and more faithful to the call than the later refinement roadmap.

## Immediate recovery

- `/concept-a` and `/concept-b` return to Emmanuel's original components from `b8e6fa6`; shared original design components and stylesheet are unchanged from that base.
- The rejected implementation remains accessible under `/rejected/concept-a` and `/rejected/concept-b` for comparison. It is not promoted as an alternative for the client.
- The entry page and handoff clearly state rejection and incomplete design status. Existing production and Emmanuel's branch remain untouched.
- Historical baseline copy and illustrative figures are preserved for comparison, not approved for publication. The previous verification concerns remain valid.

## Correction sequence and acceptance evidence

1. **Reference-led hero composition.** Keep the supplied headline and route definitions. Establish the relationship of type, image, UI and foreground before replacing assets or rebuilding lower sections. Compare with the actual Miro reference images at the same scale, not with a text summary alone.
2. **A: integrated landscape.** Maintain the immersive original composition. Refine its low-contrast/hazy photograph, oversized dashboard, heavy rim and lengthy fade. Develop a faithful native Shopify object with soft materials. Make the white foreground plane genuinely overlap it; keep one new-order card. Use neutral two-tone headline and blue CTA. No extra hero label or secondary CTA unless there is a clear reason.
3. **B: nature first.** Retain a full-bleed photographic opening. Improve its heavy dark scrim and the amount of empty scene before the message. Use white type, quiet frosted proof and restrained blue. Put the dashboard/Shopping band immediately after it. No green editorial redesign.
4. **Dedicated mobile compositions.** For A, deliberately crop the dashboard and place the CTA/order card with the photograph. For B, select a purposeful 4:5 crop and a single proof chip. Check visual hierarchy at 390 px, not merely overflow.
5. **Compare the two heroes with the brief before expanding.** Passing means a visible improvement over Emmanuel in the same client direction. A working build or my own recommendation cannot substitute for this. No design sign-off has been obtained.
6. **Then restore the commercial sequence.** Layered results/feature cards and an early human element; clear Shopping before/intervention/after story using illustrative labels and no invented performance claim. Avoid replacing this with generic agency content.
7. **Final asset production and implementation QA.** Only upscale an image after its composition works. Inspect actual details and mobile crops; export responsive formats. Then test semantics, interactions, reduced motion, performance and production build.

## Honest remaining gaps

This pass re-read the full client call transcript, not its recording. It re-opened the identified Miro board, not a verified universe of all possible boards. Emmanuel's Loom audio and every reference animation have not been newly reviewed here. The Shopping animation needs its own source/reference review and clear storyboard before implementation. Those gaps must remain visible rather than being folded into a claim that everything has been exhausted.

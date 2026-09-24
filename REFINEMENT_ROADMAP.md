# Happy Mondays — rejected refinement record

**Status: rejected by Zac on 23 September 2026. Not client-ready.** The checked items below record work performed, not accepted design outcomes. The earlier completion assessment is withdrawn. Follow [DESIGN_RESET.md](DESIGN_RESET.md) for the source-grounded correction sequence.

Started 23 September 2026. Owner: Zac / Codex. Working branch: `codex/concept-refinement`, based on Emmanuel's `b8e6fa6`. This roadmap implements Zac's request for a substantially higher design standard. It deliberately develops beyond the earlier Figma-copying specification. Final delivery platform remains Framer; these are review prototypes.

## Outcome

An established Shopify founder should understand what Happy Mondays does, feel the calm confidence of the brand, recognise the people and judgement behind the service, and have an obvious next step. The pages should reward close inspection as well as make a strong first impression.

## Principles

- Preserve the client-approved idea: Open Shopify. Smile.; Google Ads for Shopify brands; premium softness, natural photography, recognisable Shopify UI, clear navigation, restrained blue.
- A combines a landscape and a crisp, proportionate Shopify object. B leads with nature and introduces the interface below the hero. They must feel like considered alternatives.
- Show real people and properly attributed evidence early. Do not invent team photographs, client results, testimonials or credentials.
- Use glass only where it contributes material depth. Avoid thick rims, grey haze, endless white fades and repeated gradient tiles.
- Give every section a purpose and a clear visual hierarchy. Space supports the story rather than delaying it.
- Motion explains relationships or guides attention; it must remain quiet, controllable and optional.
- Keep changes isolated from Emmanuel's branch and the existing production deployment. Review previews are appropriate; sending to the client remains Zac's action.

## 1 — Baseline and art direction

- [x] Inspect current A and B on desktop and narrow layouts.
- [x] Recover latest working branch, including six commits beyond main.
- [x] Create isolated refinement checkout and this roadmap.
- [x] Establish the new palette, typography scale, spacing rhythm and material treatment in code.
- [x] Generate and inspect original high-resolution nature photography with usable composition.
- [x] Recover a real founder portrait and trace its source.

Gate: the selected images feel bright, photographic and premium, with a useful crop on desktop and mobile. No invented identity or generic video placeholder.

## 2 — Concept A hero

- [x] Recompose the opening around a clear headline, concise service statement and decisive CTA.
- [x] Reduce the dashboard to an intentional visual object; render its important UI sharply.
- [x] Integrate the object with scenery, light and controlled depth.
- [x] Replace the long fade with a purposeful transition into credentials/brands.
- [x] Inspect the whole first viewport and first scroll at desktop, tablet and phone sizes.

Gate: the hierarchy is obvious at a glance. The photo and interface form a composition; small UI text does not carry the sales argument. The first scroll reaches meaningful credibility without a long empty interval.

## 3 — Human proof and the commercial story

- [x] Add an early founder-led introduction using the supplied real portrait.
- [x] Introduce a short, faithfully attributed client quote, with provenance in the handoff.
- [x] Replace the three repetitive gradient cards with a more varied, purposeful layout.
- [x] Explain account expertise, post-click commercial thinking and direct partnership with concrete copy.
- [x] Remove unsupported 60–70%, account-capacity claims and weekly-Loom promises.

Gate: the site clearly represents a specialist service business. Ex-Google describes the founder. Historical evidence is not silently relabelled current or turned into a performance guarantee.

## 4 — Service demonstration and page resolution

- [x] Design a coherent Search/Shopping interaction with clear selected states and keyboard support.
- [x] Improve the product imagery, panel scale and relationship between copy and demonstration.
- [x] Give the prototype a deliberate closing CTA and useful footer/section navigation.
- [x] Make mock booking/data behaviour explicit on the review entry page and in the handoff.
- [x] Keep illustrative figures confined to labelled demonstrations.

Gate: interactions feel finished, important links have an intelligible destination, and there is no empty video player or fabricated case-study evidence.

## 5 — Concept B

- [x] Create a brighter nature-first opening with an intentional mobile crop.
- [x] Use an appropriate hero height and bring its service promise/CTA into view promptly.
- [x] Establish a different editorial composition, not simply A with its dashboard moved.
- [x] Carry shared typography, proof and interaction quality through the rest of B.

Gate: B is a credible alternative with a clear rationale. It feels like Happy Mondays rather than a travel/property site.

## 6 — Deliberate review and refinement

- [x] Review the full page section by section and inspect wide compositions at 1440 and 1920 widths.
- [x] Inspect 390 and 430 mobile, plus a 768 tablet layout; add boundary checks where layouts change.
- [x] Check image sharpness/crops, heading wraps, spacing, alignment, contrast and visual repetition.
- [x] Check scroll reveals, hover, tabs, navigation, focus and reduced-motion behaviour.
- [x] Revisit each weak section, not just the hero; record significant decisions and remaining limitations.

Gate: no known unfinished visual treatment, obvious overflow, weak crop, obscured text, inaccessible essential control or gratuitous motion remains.

## 7 — Verification and reviewable delivery

- [x] Install dependencies and pass the production build/type check.
- [x] Inspect browser console/network failures and image loading.
- [x] Check keyboard and mobile navigation and manually review reduced-motion output.
- [x] Review production payload, responsive asset selection and image loading; record the limits of performance validation.
- [x] Produce a reviewable preview, source/asset notes, changes summary and explicit mock/approval list.
- [x] Update the roadmap with what was actually verified; leave unsupported claims out of the completion report.

Completion is based on the gates above and a final critical visual review. “Wow” is subjective; a passing build alone cannot establish it. No additional feature scope or fabricated business claims should be added merely to make the prototype appear complete.

## Research authority

`/Users/zacsanter/HappyMondays/95-research/2026-09-23/PROJECT_UNDERSTANDING.md` and `SOURCE_COVERAGE.md`, especially the 18 September client review and Miro direction. The accepted scope and newer client decisions supersede historical playbook styling and prototype copy. Source and permission checks still precede eventual public launch.

## Review log

- Baseline: A has a dominant raster dashboard, low-contrast hazy scene and a long fade/credential interval. B uses a very tall dark scenic hero. Both repeat gradient/glass UI cards and have an empty video visual; human expertise is absent from the opening. Research identifies copy claims requiring correction.

- Iteration 1: established scoped typography, spacing and colour; rebuilt both routes with a real founder introduction, sourced quotation, three concrete approach examples and five service states.
- Imagery: generated two original landscapes and used Magnific 4× at Zac's request. Verified masters at 7,088 × 3,536 and 4,480 × 5,600. Inspected detail crops, kept originals locally, exported AVIF/WebP responsive sources. Recovered higher-resolution Lucky Honey photographs and corrected a repeated image.
- Desktop review: A/B heroes at 1,440 and 1,920; lower compositions reviewed at 1,440, B's commercial section at 1,920. Full-page capture in the browser produced stitching artifacts, so section-by-section viewport screenshots and DOM geometry were used as reliable evidence instead.
- Phone/tablet review: 390 and 430 px hero views, founder, approach cards, service states and closing at 390; A/B at 768. Geometry checks at 320, 390, 430, 701, 768, 1,150, 1,440 and 1,920 found no page/container overflow. Fixed A's order-card clipping at tablet sizes and hid the decorative note where it collided with the interface. Representative final tablet order-card inset: 31.5 px.
- Interaction: mobile menu, Escape/focus restoration, section anchors, service click/arrow/End navigation, B's 7/30-day data switch and booking feedback verified. Reduced-motion review routes render final states immediately; the OS preference uses the same code path. An actual OS setting was not changed. The booking message lasts six seconds and its animation respects reduced motion.
- Accessibility: one H1, no duplicate IDs, header/main/footer structure, skip link, tab/panel relationships, visible focus, button labels and minimum touch sizing reviewed. Core body/CTA/partner text contrast checked numerically; darkened inactive tabs and small labels that fell below 4.5:1. This is a targeted review, not a blanket WCAG certification.
- Production validation: build/type check passes. All three page routes and all 25 refinement image files return successful responses with the expected content type from the built preview. Fresh production review entry has no console warnings/errors. JS approximately 100 kB gzip; CSS approximately 17 kB gzip. A's 1,440-wide AVIF is 140 kB; 3,840-wide is 831 kB. B's 1,440-wide AVIF is 634 kB. Lazy loading keeps lower imagery out of the critical opening requests. No throttled Lighthouse or field Core Web Vitals result is claimed.
- Scope: existing production and Emmanuel's branch are untouched. Final booking selection, public proof permissions and the final Framer implementation remain the launch inputs documented in the handoff.

- Built review preview verified at `http://127.0.0.1:4178/`. Overview-to-reduced-motion navigation, booking feedback, high-priority hero attribute and image loading pass in the fresh production preview with no console warnings/errors. Remote preview subsequently deployed successfully from GitHub; see delivery record below.

## Delivery record

- Implementation commit: `36ef825`, branch `codex/concept-refinement`.
- Draft PR: https://github.com/South-Digital/happy-mondays/pull/3
- Vercel branch preview: https://happy-mondays-git-codex-concept-refinement-zac-santers-projects.vercel.app
- GitHub Vercel status: Success; authenticated Vercel CLI confirms target `preview`, status Ready. Existing production was not promoted or reconfigured.
- Remote browser rendering is protected by Vercel account access. The in-app browser's account did not have access; switching accounts reached sign-in. No access request was sent and deployment protection was not changed. The verified local production build is available at `http://127.0.0.1:4178/` for immediate review.
- The prior design-complete assessment was incorrect and has been withdrawn after Zac’s review. Design work remains incomplete; see DESIGN_RESET.md.

# Concept A — whole-page review

23 September 2026. Scope: the complete current `/concept-a` route, from navigation to client logos. This route remains a focused hero study, not the complete proposed homepage.

## Design assessment

The opening now has a clear order: two-tone headline, service statement, one principal action, the Shopify object in its coastal setting, then partner credentials and client logos. The foreground establishes depth without adding another card or competing message. The restored raised button, split panels, softened wall and restrained blue remain coherent with the recent review decisions.

The phone is deliberately recomposed: the action follows the copy, analytics retains its essential metrics, and the order card overlaps the lower chart. Partner text remains readable and the static logo grid gives each mark room. The small dashboard labels are part of an illustrative product object, rather than the page's service copy; their contrast nevertheless needed improvement.

The visible page ends after the logos. As a hero-direction review this is a coherent stopping point. As a complete homepage it lacks the requested Shopping improvement narrative, substantive results/service sections, human proof, and closing conversion journey. Those are documented follow-on work, not completed by this review. All booking/navigation destinations remain mocked, and dashboard data remains illustrative.

## Corrections made

- Fixed a white band below the off-white section on windows taller than the content. The study now fills at least the small viewport height, without adding scroll distance to otherwise short content.
- Darkened small analytics labels, chart labels and order metadata to a consistent slate, and strengthened positive-change text. This preserves hierarchy while improving readability on the translucent surfaces.

## Verification

Production build and `git diff --check` passed. The final browser console reported no captured warnings or errors.

Repeated the 20-size matrix from `RESPONSIVE_QA.md`, from 320×568 to 2560×1440, with entrances disabled for deterministic measurements. Every size passed horizontal-overflow, header-collision, visible-metric overflow, image-load, CTA-clearance and viewport-background checks. Date controls measure 46px tall. At rest, CTA/dashboard clearance is 32px on phones, 34px on tablets, 28px on ordinary desktop and 40px on larger desktop layouts.

Whole-composition visual checks included 1440×1300, 2560×1440, 701×900 and 390×844. The tall-window bottom edge now resolves to the same `rgb(250, 250, 248)` as the page. All eight client marks and the three partner credentials remain present.

Normal-motion checks at the settled scroll endpoint:

| Viewport | CTA/dashboard clearance | Order card over chart heading | Proof opacity |
| --- | ---: | --- | ---: |
| 320×568 | 26px | No | 1 |
| 768×900 | 24px | No | 1 |
| 1101×800 | 14px | No | 1 |
| 1440×900 | 14px | No | 1 |

The glass surface and its positioning wrapper both finish at opacity 1. No horizontal overflow was found at these endpoints. Final phone and desktop views retain the foreground seam and softened wall.

Keyboard Tab order reaches home, each desktop navigation item, the header booking control, the hero booking control and the date selector. Links expose the 2px focus treatment and the native selector uses its visible parent focus ring. At 568×320, the last mobile-menu action can be reached and activated; it closes the menu, restores summary focus and announces the prototype feedback.

Repeated rapid week → month → week → month changes finish on the correct figures and chart path without restarting the entrance draw. The reduced-motion review mode was checked in this and the preceding polish pass; native OS preference changes were not simulated.

## Limits and handoff

This is browser viewport and interaction QA in the available Chromium-based browser. It is not a physical iOS/Android, alternate-engine, frame-rate, screen-reader or blanket accessibility certification. Source claims, case-study permissions, functional destinations and the rest of the homepage still need completion before launch. The original concepts and production branch were not edited by this pass.

# Concept A responsive QA — 23 September 2026

Scope: current `/concept-a` hero, navigation, store preview, proof row and logo strip. Built Vite preview checked in the Codex browser. Original concepts and archived routes were not changed.

## Coverage

20 viewport sizes inspected for horizontal overflow, navigation collisions, metric clipping, date-control dimensions and navigation availability:

| Group | Viewports (CSS pixels) |
| --- | --- |
| Small phones | 320×568, 360×640, 375×667 |
| Modern phones | 390×844, 412×915, 430×932 |
| Phone landscape | 568×320, 667×375, 844×390 |
| Mobile breakpoint | 700×900, 701×900 |
| Tablets | 768×1024, 820×1180, 1024×768 |
| Desktop breakpoint | 1100×800, 1101×800 |
| Desktop / ultrawide | 1280×720, 1440×900, 1920×1080, 2560×1440 |

Visual checks focused on 320px phones (top, menu and bottom), 390px reduced motion, 701px breakpoint, 820px tablet, 844px landscape and 2560px ultrawide. Page scrolling allows access to the full hero on short screens. Follow-up: the phone CTA now sits directly below the copy and above the dashboard in normal flow. Rechecked at widths 320, 375, 390, 430, 470, 568, 700, 701 and 1440px: no horizontal overflow; mobile gaps are 24px after copy and 32px before the dashboard at rest. At full scroll on 320px, depth motion preserves over 26px clearance.

## Fixes

- Expanded the analytics date selector to a 44px native tap target covering the whole visual control. Its native font is 16px to avoid the small-input zoom trigger on iOS; the visible date label keeps its compact appearance. Actual iOS behavior still needs device testing.
- Gave the home/logo link a minimum 44px target height.
- Restored Blog in tablet navigation; all six navigation items fit without collision from 701px upward.
- Increased tablet scene height by 40px so the foreground no longer obscures most of the chart.
- Increased scene height progressively above 1920px to preserve chart visibility as the photograph grows.

## Verified

- All 20 widths: no horizontal page overflow, clipped metric values or header collisions; all navigation choices available. Date selector is now 46px tall with a computed 16px native font.
- Native date selection changes between 7-day and 30-day data, chart labels and the visible control label.
- Small-phone menu opens; Escape closes it and returns focus to the summary.
- At 568×320 landscape, the last menu item is reachable, clicking it closes the menu, restores summary focus and shows prototype feedback.
- Keyboard focus on Book a call shows the intended 2px focus outline. At 320×568 the CTA has a 50px target, remains clear of the foreground, and passes a DOM hit test after scrolling.
- `?motion=reduce`: headline fully visible, scenery transform absent, button transition disabled, all eight logos present with no CSS animation.
- No broken images in the viewport matrix; no captured browser warnings or errors in the final built preview.
- Production build and whitespace validation pass.

## Limits

This is browser viewport testing, not physical-device certification. Real iOS Safari, Android Chrome, alternate browser engines, hardware performance, device pixel ratios and the actual OS reduced-motion preference were not exercised. Reduced motion was tested through the page's explicit review override. Booking and navigation remain prototype feedback actions; this pass does not connect destinations.

The final whole-page review repeated the 20-size matrix after the typography, static mobile logo grid and contrast refinements. See [FINAL_HERO_REVIEW.md](FINAL_HERO_REVIEW.md) for the current findings, scroll endpoint measurements and remaining scope.

## Mobile dashboard refinement

At Zac's request, the phone dashboard now emphasises total sales with fluid 20–26px semibold type, larger metric/chart/date labels, and slightly more chart height. Orders and conversion remain secondary. The order notification is reduced from 232px to 210px wide, moved down to straddle the dashboard's lower edge, and limited to 8px of upward scroll travel. Desktop styling remains unchanged.

Checked widths 320, 360, 375, 390, 430, 568, 700 and the 701px desktop breakpoint. Initial 320/375px sales overflow was corrected with fluid sizing and adjusted metric columns; all five phone widths were rechecked with the longer monthly figures and no metric overflow. Date control retains its 46px target and both ranges work. Visual checks at 320×568 and 390×844 confirm a smaller notification footprint and more visible chart. Normal-motion endpoint at 390px leaves the notification about 12px below the dashboard edge with no horizontal overflow; reduced-motion composition also checked. Build and whitespace checks pass; browser console has no captured warnings/errors.

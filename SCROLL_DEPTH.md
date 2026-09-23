# Concept A — scroll depth

Implemented at Zac's request on 23 September 2026. Applies only to the current Concept A study.

## Direction

Scrolling gently moves the viewer into the coastal scene. The sea lags behind the page, the dashboard lifts and grows very slightly, and the order card moves faster where there is room. The foreground preserves the architectural overlap. The partner row settles into view over the bottom tenth of the viewport. Headline, navigation and CTA remain in the normal page flow with no added scroll transforms.

No pinned scene, scroll interception, added scroll distance, animated blur, new images or dependencies. Existing entry animations and scroll transforms use separate wrappers so they do not overwrite one another or the phone's centring transform.

## Limits at full progress

| Layer | Desktop | Phone (≤700px) |
| --- | --- | --- |
| Sea | +28px | +12.6px |
| Foreground | −10px | −4.5px |
| Dashboard | −10px; scale 1.01 | −4.5px; scale 1.0045 |
| Order card | −44px; scale 1.018 | −19.8px; scale 1.0081 |
| Partner row | 12px → 0; opacity 0.55 → 1 | Same reveal, once entering viewport |

701–1100px uses 70% of the scene movement. At 701–1200px the order card stays vertically anchored to preserve clearance around the chart heading. Its subtle scale follows the scene.

A damped MotionValue smooths native scroll input. Travel is mapped over the available document scroll, bounded between 160px and 480px. Tall screens that fit the whole study show the resting composition and fully visible credentials without artificial scroll space. ResizeObserver and window resize update geometry; there are no React state updates or layout reads per scroll frame. CSS transforms and opacity provide the added visual effects.

## Validation and refinements

- Built preview examined at start, middle and end of scroll on 1440×900; reverse scroll returns all four scene layers to `transform: none`.
- Initial dashboard travel was reduced after visual QA found that it approached the CTA. Final measured separation is approximately 14px at the tight desktop endpoint, 24px on the tested tablet and 27px on the large desktop.
- Initial medium-width order travel was removed after QA found the card brushing the chart heading. Rechecked at 1101×800: no card/heading intersection.
- 390×844 and 320×568: foreground seam intact, no horizontal overflow, unclipped metrics, CTA remains independently clickable, partner row fully opaque at the end. The native date selector still changes data inside the transformed dashboard.
- 768×900: layered tablet composition checked through maximum scroll. 820×1180: no available scrolling; layers correctly return to their resting state and credentials remain fully visible.
- 1920×1080: short available scroll still produces visible depth, with adequate CTA clearance and fully visible proof row.
- Reload partway down preserves a coherent composition. Resizing between phone/tablet/desktop recalculates strength and travel.
- `?motion=reduce`, scrolled at 390×844: sea, dashboard, foreground, order card and partner reveal all have no transform and opacity 1. Eight static logos remain present.
- Final browser console: no captured warnings/errors. TypeScript/Vite build and whitespace validation pass. Added JavaScript is approximately 0.7KB gzip compared with the previous build.

Browser-based verification; physical-device frame rates and real iOS/Android behavior were not profiled. The OS reduced-motion preference is wired through the existing shared hook; its explicit review override was exercised here.

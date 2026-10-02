# Concept A — reference-led motion pass

30 September 2026. User supplied `2a17daf0ef6857b08c856b9bbd7ec253.mp4` (37.14 seconds).

## Reference observations

Re-examined sampled frames through the whole video, then the 5–11 second card sequence at 250ms intervals. The visible sequence is background first, interface second, numbers/chart third. Cards travel farther than our prior 8–16px fades, settle independently, and stop moving. The footage does not establish whether the original uses scroll scrubbing or timed entrances; this implementation deliberately uses native scroll with viewport-triggered timelines.

The prior A implementation had mostly assembled graphics and long count-up sequences. Simply making the counters longer or adding repeated loops would miss the reference's composition and timing.

## Roadmap delivered

- [x] Separate background, foreground UI and data into distinct motion stages.
- [x] Give hero and product headings line masks with staggered easing; preserve readable final type and avoid blur on letters or interface details.
- [x] Increase the hero dashboard entrance to 58px/96.5% scale, with coastal, dashboard and foreground layers travelling at different rates on scroll.
- [x] Product photographs resolve through a short mask and settle before the foreground platform card. A bounded photographic scale change and separate interface travel continue through native scroll.
- [x] Compress product stories from 8.6 to 5.2 seconds, preserving search/feed, metrics/chart and order milestones.
- [x] Give the three approach scenes a 4.2-second sequence: background, lifted interface, listings/chart, then resolved data. Use a short 110ms stagger between adjacent desktop cards.
- [x] Keep replay from collapsing the settled image/interface; preserve pause/resume, offscreen suspension, gallery and disclosure controls.
- [x] Verify responsive layouts, reduced motion, intermediate frames and live deployment.

## Verification evidence

Local browser samples of the approach sequence: at 490ms the first backdrop is 83% opaque while its interface is 28%, still 46px below rest; at 1364ms interfaces are almost settled and Shopify starts counting ($62); at 2881ms the interface is at rest with $12,347; final $12,846 at 4200ms. No repeating animation.

Caught and fixed an IntersectionObserver/masked-heading issue: observe the heading container, not the translated text inside its clipping parent. All four product heading lines subsequently resolve to transform:none.

Mobile replay preserved image and interface opacity 1. Pause held the clock at 323ms across observations. Resume advanced; scrolling away held the product clock at 600ms. Product/detail control remains functional. No browser warning/error logs.

Geometry checks at 320, 390, 760, 761, 1000, 1100, 1440 and 1920px: no horizontal overflow or inner platform frame overflow. Reduced mode shows final 5200/4200ms states, no photographic transforms and no hidden headline lines. Desktop and 390px phone visually reviewed. These are browser-emulated widths, not physical-device performance tests.

No added dependencies or changes to B. Platform UI and asset provenance from the prior pass remain intact. Functional checks do not establish client approval.

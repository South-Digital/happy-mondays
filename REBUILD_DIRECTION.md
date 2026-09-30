# Concept A — product-led rebuild · 30 September 2026

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

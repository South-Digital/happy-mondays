# Happy Mondays — rejected pass / recovery handoff

**Status: rejected, not client-ready.** The previous recommendation is withdrawn. The original A/B components have been restored as the working baseline; the rejected pass is archived at `/rejected/concept-a` and `/rejected/concept-b`. Read [DESIGN_RESET.md](DESIGN_RESET.md) for the source review, diagnosis and correction sequence. The implementation and test history below describes the rejected pass, not an approved result.

## What changed

Two complete homepage review directions now develop Emmanuel's latest working branch (`b8e6fa6`). A uses a centred opening, clear blue and a high-resolution coastal scene with a sharply rendered Shopify-style interface. B uses an asymmetrical nature-first opening, restrained green and its store demonstration further down the page.

Both add the real founder early, explain account foundations and the post-click experience, replace the empty video treatment with a written Monday update, include a sourced client quote and finish with a deliberate booking invitation. Five service states are manually controlled and keyboard accessible. Booking remains explicitly mocked.

The earlier recommendation for A and assessment of B as a credible alternative have been withdrawn. Both departed materially from the brief.

## Review links

Local built review: http://127.0.0.1:4178/

Vercel preview: https://happy-mondays-git-codex-concept-refinement-zac-santers-projects.vercel.app (Ready; owning Vercel account required).

Draft PR: https://github.com/South-Digital/happy-mondays/pull/3

- `/`: recovery status and baseline comparison links.
- `/concept-a`: Emmanuel’s original Landscape with depth baseline.
- `/concept-b`: Emmanuel’s original Nature first baseline.
- `/rejected/concept-a` and `/rejected/concept-b`: rejected pass retained for comparison.
- Append `?motion=reduce` to render without entrance or transition motion. The system reduced-motion preference is also respected.

## Validation

Visual and geometry review covered phone, tablet and desktop, with boundary checks from 320 through 1,920 px. Reviewed page sections in the browser, not just the opening. Changes from that review include tablet order-card clipping, phone card spacing, faint client logos, duplicate product imagery, quote wrapping and the extra gap before B's store demonstration.

Interactive checks: mobile menu opens/closes, Escape restores focus, section links close the menu and move to the intended section; service buttons, arrow-key navigation and End selection; labelled reporting and video states; B's date range and data change; booking preview feedback; motion-reduced rendering. Remaining test results and deployment status are recorded in the roadmap.

Responsive images use AVIF/WebP and appropriate source widths. Full Magnific masters remain local and outside the deployable assets. A's largest served image is 3,840 px wide; B's is 2,400 px, appropriate for the capped image container. See `ASSET_SOURCES.md` for actual dimensions, provenance and generation briefs.

## Delivery boundaries

This is the Vercel review prototype. Final Framer implementation, the rest of the contracted page/template scope, live booking and client-approved public proof remain the launch work. Existing production configuration and Emmanuel's working branch are preserved.

The inherited dependency audit reports issues requiring major Vite/React Router upgrades. No unreviewed major framework migration was mixed into this visual refinement. The current deployment is a static Vite build; the development server stays bound to loopback. Plan a separate dependency maintenance pass before the final production implementation.

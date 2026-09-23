# Happy Mondays — review handoff

## What changed

Two complete homepage review directions now develop Emmanuel's latest working branch (`b8e6fa6`). A uses a centred opening, clear blue and a high-resolution coastal scene with a sharply rendered Shopify-style interface. B uses an asymmetrical nature-first opening, restrained green and its store demonstration further down the page.

Both add the real founder early, explain account foundations and the post-click experience, replace the empty video treatment with a written Monday update, include a sourced client quote and finish with a deliberate booking invitation. Five service states are manually controlled and keyboard accessible. Booking remains explicitly mocked.

My recommended direction is A: the emotional idea and commercial outcome are connected in the first composition. B is a credible, quieter alternative. Client taste and approval remain the next design decision; this handoff is not a claim that the final Framer delivery is complete.

## Review links

- `/`: overview and motion-reduced entry links.
- `/concept-a`: A clearer outlook.
- `/concept-b`: Room to grow.
- Append `?motion=reduce` to render without entrance or transition motion. The system reduced-motion preference is also respected.

## Validation

Visual and geometry review covered phone, tablet and desktop, with boundary checks from 320 through 1,920 px. Reviewed page sections in the browser, not just the opening. Changes from that review include tablet order-card clipping, phone card spacing, faint client logos, duplicate product imagery, quote wrapping and the extra gap before B's store demonstration.

Interactive checks: mobile menu opens/closes, Escape restores focus, section links close the menu and move to the intended section; service buttons, arrow-key navigation and End selection; labelled reporting and video states; B's date range and data change; booking preview feedback; motion-reduced rendering. Remaining test results and deployment status are recorded in the roadmap.

Responsive images use AVIF/WebP and appropriate source widths. Full Magnific masters remain local and outside the deployable assets. A's largest served image is 3,840 px wide; B's is 2,400 px, appropriate for the capped image container. See `ASSET_SOURCES.md` for actual dimensions, provenance and generation briefs.

## Delivery boundaries

This is the Vercel review prototype. Final Framer implementation, the rest of the contracted page/template scope, live booking and client-approved public proof remain the launch work. Existing production configuration and Emmanuel's working branch are preserved.

The inherited dependency audit reports issues requiring major Vite/React Router upgrades. No unreviewed major framework migration was mixed into this visual refinement. The current deployment is a static Vite build; the development server stays bound to loopback. Plan a separate dependency maintenance pass before the final production implementation.

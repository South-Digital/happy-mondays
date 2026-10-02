# Happy Mondays client review — 23 September 2026

## Links

- Review: https://happy-mondays-design-review.vercel.app/
- A — Landscape with depth: https://happy-mondays-design-review.vercel.app/concept-a
- B — Nature first: https://happy-mondays-design-review.vercel.app/concept-b
- Add `?motion=reduce` to either concept for the static motion alternative.

## Publishing

Vercel project `happy-mondays-design-review` (`prj_9w6mYiPSuX7yM9ga7AdkmRa2xX5W`) is connected to `South-Digital/happy-mondays`. Its production branch is `codex/concept-refinement`; pushes to that branch automatically rebuild the client review at the links above. Other branches produce preview deployments.

Vercel builds with `npm ci`, `npm run build`, output `dist`, and `VITE_CLIENT_REVIEW=true`. This flag switches the entry page to the client review, removes the baseline/rejected routes from the application bundle, and removes Markdown provenance notes from the generated public output. The internal build without the flag keeps the research and comparison experience.

The primary production domain is public. Deployment-specific URLs and other previews retain Vercel protection. All client routes retain `noindex, nofollow` in HTML and response headers; this is an indexing preference, not access control. Source files are not exposed through Vercel's public-source option.

The original `happy-mondays` Vercel project is separate and its settings were not changed by this delivery.

## Review scope

Concept A is now a full homepage concept: coastal hero and credentials, discovery and purchase scenes, client quote, expanding team cards, an interactive audit invitation, FAQs and footer. Concept B remains the alternative opening direction. Booking and unbuilt route links give preview feedback. Concept-brand store values are illustrative; the client quote is sourced from the supplied audit PDF. The flat-fee positioning and process copy follow the newer answered content plan. Detailed pricing has been removed from the homepage; the navigation and existing fee card link to the planned pricing route.

The 1 October content pass preserves the existing motion system and adds native FAQ and audit exploration controls. It has been reviewed on desktop and narrow mobile, with reduced-motion and normal-motion journeys. These additions are a content/design concept, not completion of the service, pricing, case-study or booking routes.

## Final local verification

- Both ordinary and client production builds pass TypeScript and Vite.
- Review page and both concepts checked at 320, 390, 600, 768, 900, 1024, 1440 and 1920 CSS pixels: one H1, no horizontal page overflow, no broken loaded images.
- Full 390px Concept B journey visually reviewed, including stacked store/search cards, explanation, logos, founder and footer; desktop story and close also reviewed.
- Concept A desktop and mobile analytics, CTA, foreground fade and credentials reviewed.
- Booking feedback, mobile menu and reduced-motion rendering checked. Browser console had no warnings or errors.
- Client output checked for absence of Markdown files and internal comparison/study labels.

These are browser viewport checks, not a claim of testing every physical device. Live deployment verification is recorded in the task delivery.

## Hero polish follow-up

Both hero directions retain their established compositions. The follow-up harmonises the blue control finish, uses collapsed navigation through 900px, adds outside-click dismissal and retains Escape focus return. A has a tighter mobile client-logo signature, a genuine return-to-top logo link and consistent booking feedback. Both adapt their opening spacing on short landscape screens; B also adjusts the local image shade to keep the raised headline legible.

Checked both routes at 320×568, 390×844, 600×740, 768×1024, 844×390, 900×800, 901×800, 1440×900 and 1920×1080. No page overflow, broken loaded images or desktop navigation collisions. Menu hit areas, reduced motion, Escape dismissal and booking feedback checked in-browser. Ordinary and client builds pass.

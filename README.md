# Happy Mondays — interactive prototypes

Two internal review prototypes of the new homepage. The original build spec is
`Happy Mondays Illustrations.md`; later source review and Zac’s feedback govern the
current refinements. Start with [REFINEMENT_REVIEW.md](REFINEMENT_REVIEW.md).

- `/` — index, links to both concepts
- `/concept-a` — **Landscape with depth** (preferred direction)
- `/concept-b` — **Nature first**

These are **not** production builds: no CMS, no backend, no form submission or data
capture. Links are mocked and all campaign/dashboard numbers are illustrative — see
§7 of the spec.

## Stack

Vite · React · TypeScript · Tailwind CSS · Framer Motion · React Router.

```bash
npm install
npm run dev      # dev server
npm run build    # typecheck + production build
npm run preview  # serve the build
```

## Search indexing

Kept out of search three ways: `<meta name="robots" content="noindex, nofollow">` in
`index.html`, an `X-Robots-Tag` header on `/(.*)` via `vercel.json` (mirrored on the
dev and preview servers in `vite.config.ts`), and `public/robots.txt`.

## Assets

Current routes use responsive photography plus HTML/SVG analytics. Asset provenance,
master dimensions and export details are in `public/images/hero-a-v2/README.md`
and `public/images/hero-b-v2/README.md`. Originals retain their supplied raster
exports at `/baseline/concept-a` and `/baseline/concept-b`.

## Motion

Both current routes respect `prefers-reduced-motion` and `?motion=reduce`.
A uses restrained, responsive scene depth; see `SCROLL_DEPTH.md`.
B uses photographic parallax and a finite Shopping sequence that advances only
while its intervention label is visible. All three explanatory stages remain
readable at rest. See `CONCEPT_B_REVIEW.md` for timing and QA.

## Deployment

Vercel project: [happy-mondays](https://vercel.com/zac-santers-projects/happy-mondays).

The repository is connected through Vercel's native GitHub integration:

- Pushes to `claude/dreamy-goodall-19ek6p` automatically build and deploy to Production.
- Pushes to other branches and pull requests receive Preview deployments.
- Installation uses `npm ci`; `npm run build` typechecks and builds Vite into `dist`.
- A failed build does not replace the current live deployment. Check the Vercel deployment logs or GitHub checks for failures.

Before pushing, run `npm ci && npm run build`. No GitHub Actions workflow or repository deployment secrets are required.

The app currently lives on the branch above; `main` contains only the initial documentation. When the app is merged into `main`, change **Settings → Environments → Production → Branch Tracking** in Vercel to `main`.

For a rollback, open the Vercel project's Deployments page and promote a previous successful deployment. Revert the offending commit in GitHub too, so subsequent deployments preserve the fix.

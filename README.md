# Happy Mondays — interactive prototypes

Two client-review prototypes of the new homepage, built to
`Happy Mondays Illustrations.md` (the build spec).

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

The Figma exports are not committed yet — see `public/images/README.md` for the
filenames and node IDs. The UI renders with CSS fallbacks until they are added.

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

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

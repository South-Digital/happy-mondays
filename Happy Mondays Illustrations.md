# Happy Mondays — interactive prototypes (Concept A + Concept B)

Build spec for `South-Digital/happy-mondays`. Two lightweight, client-review prototypes of the new homepage. **Concept A is the preferred direction — it gets the most polish.** Concept B must still be complete and working.

These are **not** production builds: no CMS, no backend, no real form submission or data capture. Mock anything interactive that would need data, and list what's mocked in the handoff.

---

## 0. Source of truth

- **Figma file:** `a9quRGsSDjopMOQAzJBIS0` — page **Iterations**, section **"for dev"** (`2171:763`)
  - **Concept A** = frame `2171:127` (Route A · "Landscape with depth") — **priority**
  - **Concept B** = frame `2166:4484` (Route B · "Nature first")
- Read exact spacing/values from these frames via the Figma MCP (`get_design_context` / `get_screenshot`) when in doubt. This doc wins on behaviour, motion, mobile and anything not drawn in Figma.
- Ignore hidden layers (e.g. the hidden "Sector bento" band in Concept B, hidden raster refs).

---

## 1. Stack & setup

- **Vite + React + TypeScript + Tailwind CSS**, **Framer Motion** for animation.
- Routes (single site, two clearly labelled pages):
  - `/` — minimal index: two cards linking to each concept, labelled "Concept A — Landscape with depth (preferred)" and "Concept B — Nature first".
  - `/concept-a`
  - `/concept-b`
- Deploy to **Vercel** preview. Do **not** touch the production site, domain or DNS.
- **Keep out of search indexing** (all three):
  - `<meta name="robots" content="noindex, nofollow">` on every page
  - `vercel.json` header: `X-Robots-Tag: noindex, nofollow` on `/(.*)`
  - `public/robots.txt`: `User-agent: *` / `Disallow: /`
- Fonts (Google Fonts): **Manrope** 400/500/600, **DM Mono** 500 (section taglines only), **Inter** 400/500/600 (only inside the Shopify dashboard UI, to keep it faithful to Shopify).
- Images: export at 2x, serve as **WebP**, `loading="lazy"` below the fold, explicit width/height to avoid layout shift.

---

## 2. Design tokens

### Colour
| Token | Value | Use |
|---|---|---|
| `ink` | `#22201C` | Body text, headings (B uses white on photo) |
| `ink-72` | `#22201C` @ 72% | Nav links |
| `ink-60` | `#22201C` @ 60–62% | Descriptions, sublines |
| `muted` | `#807B73` | Labels inside UI cards |
| `offwhite` | `#FAF9F6` | Page ground (Concept B bands) |
| `white` | `#FFFFFF` | Page ground (Concept A), cards |
| `cobalt` | `#2563EB` | The **only** accent: primary CTA (B), chart lines, links, active states |
| `tile` | `#F3F2EE` | Inner tiles, pills, search bars |
| `line` | `#ECEAE6` | Dividers |
| `soft-blue` | `#ECF2FE` | Icon tiles |
| `pos` / `pos-bg` / `pos-border` | `#288C48` / `#EAF6ED` / `#D0E8D6` | Up/down delta pills only |

### Type (Manrope unless stated)
| Style | Spec |
|---|---|
| Hero headline | 80/80, Medium, letter-spacing −4.4px. Two-tone: line 1 solid, "Smile." at 50% (A, black) / 76% white (B) |
| Hero subline | 18/28.8, Regular |
| Section heading | 56, Medium, tight tracking (−2%) |
| Section tagline | **DM Mono** 13, Medium, uppercase, +8% tracking, `ink` @ 55% |
| Card title | 22, Medium, −2% |
| Card description | 16/24, Regular, `ink-60` — **max 3 lines** |
| Nav link | 14/21, Regular, `ink-72` |
| Button | 13–15, SemiBold |
| UI-card labels | 9.5–13 (see graphics) |

### Radii
- Buttons: **full pill (999px)** everywhere — confirmed.
- Glass rim (graphic containers): 25px outer / 18px inner (small cards), 30 / 22 (large panels). Always concentric: inner = outer − padding.
- Chips: 16px (small), 18px (large). Tiles/pills inside cards: 8–12px. Image cards: 12–20px.

### Glass recipes
```css
/* Glass rim — wraps every product-shot card */
.glass-rim {
  padding: 7px;                                /* 8px on large panels */
  border-radius: 25px;
  background: rgba(255,255,255,.36);
  border: 1px solid rgba(255,255,255,.8);
  backdrop-filter: blur(24px);
  box-shadow: 0 16px 40px rgba(28,33,48,.12);  /* 0 24px 56px on large panels */
}
.glass-rim > .card { border-radius: 18px; background: #fff; }

/* Floating chip — overlaps a card edge */
.glass-chip {
  border-radius: 16px;
  background: rgba(255,255,255,.8);
  border: 1px solid rgba(255,255,255,.95);
  backdrop-filter: blur(20px);
  box-shadow: 0 12px 30px rgba(28,33,48,.12);
}

/* Liquid-glass pill button — Concept A (nav + hero CTA) */
.btn-liquid {
  border-radius: 999px;
  padding: 14px 24px;                          /* nav: 12px 18px */
  background: rgba(255,255,255,.37);
  backdrop-filter: blur(8px);
  border: 1px solid transparent;
  background-clip: padding-box;
  box-shadow:
    inset 0 0 33px rgba(242,242,242,.5),
    inset -3px -4.5px 1.5px -3px #B3B3B3,
    inset 3px 4.5px 1.5px -3px rgba(179,179,179,.2),
    inset 4.5px 4.5px 1.5px -5px rgba(255,255,255,.5),
    inset -4.5px -4.5px 1.5px -5px rgba(255,255,255,.5);
  color: #000; font: 600 15px Manrope;
}
/* + 1px gradient border (white → transparent) via a ::before mask */

/* Solid pill button — Concept B */
.btn-solid { border-radius: 999px; background: #2563EB; color: #fff; }
```

---

## 3. Concept A — "Landscape with depth" (frame `2171:127`) — PRIORITY

Page ground: white. Width 1440 desktop, content grid 1200 (120px side margins).

### A1. Hero (`2171:554`, 1440×1286)
- **Background photo:** Zac's generated image — node `2171:556` (`bg`). Full-bleed, covers the hero.
- **Nav** (`2171:568`): transparent, no container fill; logo left, links right (Reviews, Case Studies, Pricing, Blog, Contact), **liquid-glass** "Book a call" pill. Soft shadow only.
- **Headline block**, centred: "Open Shopify." / "Smile." (black + black 50%), subline "Google Ads for Shopify brands. / Senior expertise. A flat monthly fee." (18/28.8, ink), **liquid-glass** "Book a call ↗" pill.
- **Dashboard object** — a glass window **with no browser bar** (traffic lights/URL removed on purpose). Build in **HTML/CSS, not images**:
  - Sidebar (220 wide): Shopify bag + "Your store"; Home, Orders, Products, Customers, Marketing, **Analytics (active)**, Discounts.
  - Analytics panel: title, "Last 7 days" dropdown, 4 metrics (Total sales **$128,460** ↗24.8% · Orders **1,842** ↗18.6% · Conversion rate **3.4%** ↗0.6pt · ROAS **5.05**), "Total sales over time" line chart (This week = cobalt solid, Previous week = grey dashed, $0/$12K/$24K axis, Mon–Sun).
  - Font: Inter inside the dashboard. Exact values: vector reference on page 5 — sidebar `2103:129`, panel `2103:152`, New order card `2103:143`.
- **"New order" card** (`#1048 · $79.00 · Just now`) breaks the frame on the left edge of the dashboard.
- **Foreground rooftop:** Zac's cut-out — node `2171:561` (`fg`). Sits **above** the dashboard, overlapping its lower half, so the dashboard reads as *inside* the scene.
- **Fade** from the scene into white at the bottom of the hero.
- **Proof row:** "★ 5.0 on Clutch · [Shopify] Shopify Partner · [Google Ads] Google Ads Partner".
- **Logos strip:** 8 logos (`2171:660`–`2171:674`: At Present, JPHA, Reincoat, Plum, Lucky Honey, Go Flower, Nativemed, Our Pets Life) — **one grey**, ~50% opacity, no per-logo boxes.

### A2. Three pillars (`2171:281`)
- Tagline (DM Mono): `WHY HAPPY MONDAYS`
- Heading: **Three things most Google Ads agencies get wrong. We don't.**
- 3 cards (384 wide, image 384×336, 24px gaps). Backdrops = soft gradient images inside each `Image` frame (`2171:313`, `2171:374`, `2171:437`) — export the backdrop only; build the graphics in HTML.

| # | Title | Description (≤3 lines) | Graphic (HTML) |
|---|---|---|---|
| 1 | Ex-Google, not ex-agency | Four years inside Google, managing the UK's biggest retail accounts. We know what the algorithm actually rewards. | "What the algorithm rewards" card: ✓ Clean product feed data, ✓ Conversion value, not clicks, ✓ Margin-aware bidding, ✕ ~~Long keyword lists~~. Chip: "G · Ex-Google / 4 years inside retail" |
| 2 | Full-funnel, not ad account | 60–70% of wins sit outside the ad account: feed, AOV, checkout, post-click. We work every revenue lever, not just bidding. | "60–70% / of wins come from outside the ad account" + split bar (cobalt 2/3, grey 1/3) + ✓ Product feed, AOV strategy, Checkout, Post-click, Bidding. Chip beside Bidding: "Most agencies: bidding only" |
| 3 | Partner, not vendor | Fixed retainer, 4–6 accounts per strategist, and weekly Looms from the person actually running your account. | Video card: thumbnail w/ play button + "4:12", avatar "HM" + "Weekly update from your strategist / The person running your account". Chip: "4–6 accounts / per strategist" |

### A3. Search and shopping, managed properly (`2171:478`)
- Heading left: "Search and shopping, managed properly."
- **Left: tab list** — Search · **Shopping (default, expanded)** · Performance Max · YouTube · Reporting. Active tab shows its description + a progress/underline bar.
  - Shopping description (from Figma): "We sort out your product data, structure your campaigns and manage bids around your margins."
  - **Other four descriptions are not in Figma yet** — use these drafts, marked `TODO: confirm copy`:
    - Search: "Tight keyword structure and ad copy that matches how your customers actually search."
    - Performance Max: "Asset groups built around your best sellers, with feed and audience signals doing the heavy lifting."
    - YouTube: "Shoppable video that puts your products in front of new customers, not just retargeting."
    - Reporting: "A Monday report you'll actually read: spend, revenue and ROAS, in plain English."
- **Right: panel** (880×648, rounded 20, backdrop image `2171:513`). **Interactive** — clicking a tab crossfades the panel graphic. Build all five graphics in HTML from these Figma references (page 5, WIP section "HM · Product shot graphics"):
  - Search `2087:209` — sponsored text ad (Lucky Honey / luckyhoney.nyc / "Pilates Grip Socks | Honeycomb Grip Sole") + CTR chip 8.4% +2.1 pts
  - **Shopping** `2087:211` (and live in frame) — "grip socks" search, 3 Lucky Honey products (Juliet Grip Sock, Checkered Crew Grip Sock, Crew Stripe Grip Sock — $18.00), chip "Conversion value $21,614 · 5.05 ROAS". Product photos: `2171:531`, `2171:537`, `2171:543`
  - Performance Max `2087:213` — "$21,614" channel-mix bar (Shopping 48 / Search 22 / YouTube 14 / Display 9 / Gmail & Discover 7) + "Asset group · Grip socks" card
  - YouTube `2087:215` — video frame, "Sponsored · luckyhoney.nyc", shoppable "Juliet Grip Sock $18.00 · Shop now", view-rate chip 31% +6 pts
  - Reporting `2087:217` — "Monday report · Week 38" KPIs (Ad spend $4,280 · Conversion value $21,614 · ROAS 5.05) + trend line + "Your weekly report is in · Monday, 8:00 am" chip
- Optional nicety: auto-advance tabs every ~6s until the user interacts (pause on hover/focus).

### A4. Motion (Concept A)
- **On load — staggered fade-and-rise** (opacity 0→1, translateY 16→0, 600ms, ease-out, 80ms stagger): nav → headline line 1 → "Smile." → subline → CTA.
- **Dashboard settles last:** starts +32px lower and 96% scale, settles over ~900ms after the text; the New order card slides in 200ms after that.
- **Parallax on the photograph only:** background image translates at ~0.15× scroll. The dashboard and foreground stay locked together so the rooftop always overlaps the same way.
- Pillar cards: on hover, glass rim lifts 4px, chip drifts 2px; 200ms.
- Tabs: 250ms crossfade + 8px rise on panel change.
- Buttons: liquid-glass hover = slightly brighter fill + 1px lift; focus-visible ring in cobalt.

---

## 4. Concept B — "Nature first" (frame `2166:4484`)

Page ground: warm off-white `#FAF9F6`. 1440 desktop, content at a 120px left edge.

### B1. Hero (`2171:676`, 1440×1200)
- Full-bleed Santorini photo `2171:677`. Soft dark scrim behind the text block (left side) for legibility; fade to off-white at the bottom.
- Nav: white pill container (r20) with links + **solid cobalt pill** "Book a call".
- Text block **left-aligned at x=120**: "Open Shopify." (white) / "Smile." (white 76%), subline, solid cobalt pill "Book a call ↗".
- **No dashboard above the fold** (brief).
- Proof chips: the Figma frame currently has none. The brief calls for "two or three frosted-glass proof chips resting on the lightest part of the photo" — a ready component exists (`C2 / Hero proof chips`, `2107:215`, page 5): "★★★★★ 5.0 on Clutch", "Shopify & Google Ads Partner", "One flat monthly fee". **Build it, but behind a flag (`SHOW_HERO_CHIPS`) defaulting to OFF to match the approved frame** — easy to switch on if Zac wants it.

### B2. Band 1 — Dashboard + Search/Shopping (`2166:4571`)
- Heading: "Every sale, traced back to the search." Subline: "Your Shopify numbers and your Google Shopping results, managed as one." (`TODO: confirm copy` — drafted in design, not from Notion.)
- Shopify dashboard window (same HTML component as A, light-glass variant with ink-coloured URL/icons) with the **Google Shopping widget** layered over its lower-right corner (same Shopping component as A3). Soft blue blurred wash behind for the glass to catch.

### B3. Band 2 — Logos strip (`2166:4644`)
Label "Growing Shopify brands we work with" + same 8 grey logos.

### B4. Band 3 — Three pillars (`2175:344`)
Same section and component as A2, on off-white.

### B5. Motion (Concept B)
- Hero photo: **slow drift** (scale 1.06 → 1.0 over ~20s, ease-out, once) + light parallax.
- Headline block: same staggered fade-and-rise as A.
- Proof chips (if enabled): rise in sequence, 80ms stagger.
- **Band 1 reveals on scroll:** dashboard rises in, then the Shopping widget slides in 150ms later from +24px right.
- Pillars: same hover as A.

---

## 5. Mobile — designed in code (390px reference)

Breakpoints: `≥1280` desktop as drawn · `768–1279` scale proportionally, 2-column where 3 · `<768` mobile compositions below. Mobile is **its own composition, not a shrink**.

### Shared mobile rules
- Side padding 20px. Section spacing 72px.
- Nav: logo + **"Menu" pill** (A: liquid glass, B: in the white pill). Opens a full-screen sheet with the links + "Book a call" pill. Close on link tap/Esc.
- Hero headline 44/44 (−3%), subline 16/24, CTA full pill (auto width, not full-bleed).
- Section headings 32/36. Tagline stays 12px mono.
- Logos: single-row **auto-scrolling marquee** (pauses on reduced motion → static wrap 2 rows × 4).
- Pillars: 1 column, image card 350×300, text below; descriptions may run 3–4 lines.
- Dashboard on mobile: **analytics panel only** (hide sidebar), show metrics row + chart header + top of chart (≈"top third"), clipped with a bottom fade.
- Touch targets ≥ 44px.

### Concept A (mobile)
1. Nav → 2. Headline + subline + CTA → 3. Dashboard (analytics panel, top third) with the **New order card** overlapping its bottom-left → 4. Foreground rooftop strip overlapping the dashboard's bottom edge → 5. Proof row (wraps to 2 lines, centred) → logos marquee.
- Search & shopping: tabs become a **horizontally scrollable row of pills** above the panel; panel full-width, ~4:5, graphic scaled to fit; description sits under the tabs.

### Concept B (mobile)
1. Nav → 2. Photo cropped **4:5**, focused on the white terrace; headline + subline + CTA overlaid bottom-left with scrim; if chips are on, show **one** chip only ("5.0 on Clutch") → 3. Band 1 straight after the hero: heading, dashboard (analytics only), Shopping widget below it overlapping by ~40px → logos → pillars.

---

## 6. Accessibility & motion safety
- Respect `prefers-reduced-motion`: disable parallax, drift, marquee and entrance animations (render final state); keep instant tab switches.
- Semantic landmarks, one `h1` per page, alt text on photos (decorative backdrops `alt=""`), visible focus states, tab list uses proper `role="tablist"` / `aria-selected`.
- Colour contrast: white hero text on photos relies on the scrim — check it.

## 7. What's mocked (record in handoff)
- All "Book a call" / "See pricing" / nav links → no navigation; show a small toast "Prototype — links disabled" (or `#`).
- All dashboard, Shopping, PMax, YouTube, Reporting numbers are illustrative.
- Beauty/`[STAT]`-style placeholders: none on these two pages, but CTR 8.4%, view rate 31%, $21,614, 5.05 ROAS are illustrative.
- Tab descriptions for Search / PMax / YouTube / Reporting and the Concept B Band 1 heading are draft copy.
- No forms, no data capture, no analytics.

## 8. Asset export list (2x, WebP)
| Asset | Node | Notes |
|---|---|---|
| A hero background | `2171:556` | Zac's Magnific image |
| A foreground rooftop | `2171:561` | Transparent PNG → WebP with alpha |
| B hero photo | `2171:677` | |
| Logos ×8 (A set) | `2171:660` `662` `664` `666` `668` `670` `672` `674` | Or SVG if available; render grey via CSS filter |
| Shopify / Google Ads partner icons | inside proof row of `2171:554` | SVG |
| Pillar backdrops ×3 | `2171:313`, `2171:374`, `2171:437` | Backdrop layers only (hide graphics before export) |
| Search/shopping panel backdrop | `2171:513` | |
| Lucky Honey product photos ×3 | `2171:531`, `2171:537`, `2171:543` | Also used in B and in YouTube/PMax graphics |
| Happy Mondays logo | nav `2171:569` | SVG |

## 9. QA checklist (desktop 1440 + 1280 + iPhone 390 + Android 412)
- [ ] Both routes load from their labelled URLs; index links work
- [ ] `noindex` meta + `X-Robots-Tag` header + robots.txt all present (check response headers)
- [ ] No broken images, no 404s in the console, fonts load
- [ ] Hero load sequence plays once; dashboard settles last; New order card lands after
- [ ] Parallax affects the photo only (A); drift plays (B)
- [ ] Rooftop overlaps the dashboard cleanly at every desktop width (no gap, no hard edge)
- [ ] All 5 tabs switch correctly; keyboard (arrow keys) works; auto-advance pauses on interaction
- [ ] Pillar descriptions ≤3 lines on desktop
- [ ] Mobile menu opens/closes; no horizontal scroll at 390; tap targets ≥44px
- [ ] Mobile compositions match §5 (not a shrunk desktop)
- [ ] `prefers-reduced-motion` = no motion, everything visible
- [ ] Lighthouse: Performance ≥ 85 mobile, no CLS from images

## 10. Handoff (Asana task "Happy Mondays — build and deploy both approved interactive prototypes")
Record on the task: the two labelled preview URLs (+ index), a short coverage/check summary against §9, and the mocked/missing list from §7. Zac handles the client send.

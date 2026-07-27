@AGENTS.md

# Precious Jewels — Interactive Essay

An interactive scroll-essay that visualises how much of each precious material exists across the known universe, ranking them from most abundant to rarest.

## Project Configuration

**Project Name**: Precious Jewels

## How it's served

This project is served at `benmccarthy.com.au/p/precious-jewels` via Vercel rewrites from the shell site (`ben-mccarthy-com-au`). The shell site proxies all requests under `/p/precious-jewels` to this project's Vercel deployment.

- `basePath` is set to `/p/precious-jewels` in `next.config.ts`
- `NEXT_PUBLIC_BASE_PATH` is available as an env var for fetch calls, window.location, etc.
- Local dev runs at `localhost:3000/p/precious-jewels`
- See `REWRITE-SETUP.md` in the shell repo for the full pattern docs

## The plan

The full working brief is in `docs/plan.md`. Key points:

- **Step 1 (SEO)** — Done. Primary keyword cluster: "rarest gemstone / rarest thing in the universe"
- **Step 2 (Candidate list)** — Open. Draft the long list of jewellery materials (mineral + biological)
- **Step 3 (Run the numbers)** — THE crux. Estimate total mass per material across the universe. This determines the ending.
- **Step 4 (Suppliers)** — Deferred until Step 3 lands
- **Step 5 (Design)** — Direction drafted: dark cosmic descent, particle piles, act-based zoom resets
- **Step 6 (Build)** — Open. Prototype exists in session scratchpad from earlier work

## Design direction

- Dark "cosmic descent" theme
- Colour temperature encodes rarity (icy/mineral at top, warm at rare bottom)
- Each material = interactive particle pile you can click to scatter
- Act-based structure to handle the 30-40 order-of-magnitude range without raw log axes
- Shrinking-object ladder for intuitive scale comparison
- Counter that transitions from uncountable to countable as rarity increases

## Deployment checklist (not yet done)

1. Create a Vercel project for this repo (should auto-detect as Next.js)
2. Deploy it — verify it works at `precious-jewels.vercel.app/p/precious-jewels`
3. Then in the **shell site** repo (`/Users/ben/Developer/Next(dot)js/ben-mccarthy-com-au`), commit and deploy the `next.config.ts` change that adds the rewrite rules for `/p/precious-jewels`. The rewrite rules are already written — they just need committing and pushing.
4. Verify `benmccarthy.com.au/p/precious-jewels` loads correctly

## Reddit distribution constraints (MUST READ)

The full brief is in `docs/reddit-distribution-requirements.md`. These are the non-negotiable rules:

1. **No email/signup/login/account required** to fully experience the piece. An optional non-blocking footer is fine; a gate is an instant ban on r/InternetIsBeautiful.
2. **No AI-generated content or AI-as-feature.** The build method (Claude) is fine; the *content* must be human-researched. No "powered by AI" anywhere.
3. **No paywall or freemium gating.** Everything fully free. The ShopSection with affiliate links must not gate any content.
4. **No game-like mechanics** (scores, challenges, quizzes). Interactive essay = fine.
5. **Custom domain only** — `benmccarthy.com.au/p/precious-jewels`. vercel.app subdomains are blanket-banned on the primary target sub.
6. **Must survive a traffic spike** (50K+ sessions in hours). Static/CDN, no server bottleneck.

### Avoiding "AI feel" (the real gatekeeper)

Reddit communities are actively rejecting sites that look AI-generated. When writing or modifying copy, design, or interactions:

- **Kill generic wonder-language:** never write "Explore the wonders of...", "Discover the beauty of...", "Dive deep into...", "Journey through...", "An interactive experience that...". These are AI-prompt tells.
- **Keep Ben's voice:** short, specific, opinionated. The Finale copy ("Not diamond. Not ruby. A small, quiet sphere built by a living creature...") is the bar. Match it.
- **No default Tailwind/shadcn aesthetic:** the dark cosmic theme with Playfair serif is already distinctive — protect it. Don't regress toward rounded-corner gradient cards or pill buttons.
- **Restraint over features:** one thing done memorably beats ten things done adequately.
- **The one-line test:** for every piece of copy, ask "would a tired Redditor think a human wrote this or ChatGPT wrote this?" If there's any doubt, rewrite it.

## Tech notes

- Next.js with App Router, TypeScript, Tailwind
- Will likely need: Canvas/WebGL for particles, scroll-driven animation library
- No database needed — this is a static interactive essay
- No auth needed

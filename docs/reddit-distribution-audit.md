# Reddit Distribution Audit — Precious Jewels Build

> Audited 27 July 2026 against verified Reddit rules from `reddit-audit-results.md`.

---

## Rule-by-Rule Verdicts

### 1. Rule 6 — No Personal Info: PASS

Zero email capture, signup, login, newsletter, or any form on the site. The entire experience is a pure scroll-through essay with no gates. Grep for `email`, `signup`, `newsletter`, `login`, `subscribe`, `paywall`, `upgrade`, `premium` returned zero matches across all source files. Nothing blocks "fully experiencing the website."

### 2. Rule 10 — AI Content: PASS

No mention of AI, Claude, ChatGPT, or "generated" anywhere in the rendered UI or source code. The content — all 27 material descriptions, cosmic mass estimates, taglines — is human-researched and curated (sourced from `docs/ranking-research.md`). The build method (Claude + Next.js) is invisible to users. This is exactly the "vibe-coded site with human-curated content" pattern the audit says is compliant.

### 3. Rule 5 — No Stores/Demos: PASS (with one flag)

The site is fully free, no paywall, no "upgrade to see more", no gated content. Every material and the finale are accessible by scrolling.

**Flag:** The `ShopSection` and inline `AffiliateRow` components link to Etsy products with affiliate markup (`rel="nofollow sponsored"`). The ProductCard shows an "Available on Etsy" hover label. This is not a store — it's optional affiliate links after the content — but it's worth considering:

- The ShopSection is the **last snap page**, after the Finale. It doesn't gate any content.
- The inline product images on MaterialCards are labelled "What it looks like" — purely visual, not a CTA to buy.
- The disclosure text says "Affiliate links — we may earn a small commission."

**Verdict:** Technically compliant (the site doesn't "sell a product" or require payment for functionality). But if a mod is aggressive, the ShopSection could be read as the site "serving to sell." **Recommendation:** For the Reddit launch specifically, consider temporarily hiding the ShopSection or making the affiliate links even more subtle. The inline product images on material cards are fine — they look editorial.

### 4. Rule 3 — No Webgames: PASS

No scores, challenges, quizzes, puzzles, or game mechanics. It's a scroll-driven interactive essay with particle visualizations. The particles are decorative (not interactive game elements). Click-to-scatter is visual delight, not gameplay.

### 5. Rule 8 — Hug of Death: PASS

- Next.js static site deployed on Vercel
- No database, no server-side bottleneck, no API calls
- All content is baked into the JS bundle at build time (`materials.ts`, `products.ts` are static data)
- Vercel's edge CDN handles traffic spikes natively
- Product images are served from `/public/samples/` (static assets on CDN)

The only external dependency is the Etsy links (which are outbound, not inbound). The site itself is fully static/CDN.

---

## r/dataisbeautiful Qualification

**Does it qualify as a data visualization?** Yes — it visualizes comparative mass estimates across 27 materials spanning 44 orders of magnitude, with proportional particle piles, scale references, and act-based zoom resets.

**[OC] Comment Template:**

> Data sources: Solar elemental abundances (Lodders 2003), mineralogical partitioning models, USGS mineral commodity surveys, paleontological literature for fossil/biological mass estimates. Full methodology ranks 27 jewellery materials by estimated total mass across the known universe.
>
> Tools: Next.js, Canvas API (particle rendering), TypeScript. Made by me.

**Title format:** `[OC] How much of every precious gemstone exists in the entire universe — ranked from most to least abundant`

---

## r/vibecoding Blurb

> Built this interactive essay with Claude (Opus) + Cursor as the IDE, on Next.js with TypeScript and Tailwind. The hardest part wasn't the code — it was the research: estimating cosmic abundance for 27 different jewellery materials across ~44 orders of magnitude. Claude handled the scroll-snap architecture and particle pile rendering; I did all the data curation and design direction. The whole thing is a static site on Vercel — no backend, no database.

---

## Format Recommendations

| Subreddit | Format | Notes |
|---|---|---|
| **r/InternetIsBeautiful** | Direct link post | 98% external-link norm. Post the URL directly. |
| **r/dataisbeautiful** | Screenshot + link in first comment | 82% image norm. Capture the Act 3 "Life on One Planet" cliff moment. First comment must have [OC] source+tool. |
| **r/vibecoding** | Screen recording + educational blurb | 77% image. Show the scroll-through. Must explain the build process. |
| **r/Damnthatsinteresting / r/interestingasfuck** | Native video + link in comments | 61-62% video. YouTube is blacklisted on both — upload natively to Reddit. |
| **r/space** | Image/video + link in comments | The "diamond rains from ice giants" / cosmic mineral story is the hook. |
| **r/ClaudeAI** | Screen recording + showcase framing | Must be educational. 1.04M subs. |

---

## Screen Recording Recommendation

A 30-60s recording works well for video-native subs. Capture:

1. Hero page
2. Scroll through Act 1 (showing "diamond is common")
3. The Act 2 cliff interstitial
4. Act 3 biological materials
5. The pearl finale reveal

The "one planet" interstitial is the money shot for video. Record at 1080p, no cursor, smooth scroll speed. This becomes the native video for r/Damnthatsinteresting, r/interestingasfuck, r/space, r/threejs, r/creativecoding.

---

## Summary

| Rule | Verdict | Action Needed |
|---|---|---|
| Rule 6 (No personal info) | **PASS** | None |
| Rule 10 (AI content) | **PASS** | None |
| Rule 5 (No stores/demos) | **PASS** (minor flag) | Consider hiding ShopSection for Reddit launch |
| Rule 3 (No webgames) | **PASS** | None |
| Rule 8 (Hug of death) | **PASS** | None |

**One actionable change to consider:** The `ShopSection` at the bottom and the inline "Available on Etsy" labels on `ProductCard` are the only thing a hostile mod could flag. For a belt-and-suspenders approach to the r/InternetIsBeautiful post, you could toggle them off (the `ShopSection` already returns `null` if no products exist — you could just empty the `affiliateProducts` object temporarily). But strictly speaking, it passes as-is.

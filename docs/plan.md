---
type: article
title: "Precious Jewels"
created: 2026-07-26
brand_pillar: fabric-of-the-universe
section: "[[the-fabric-of-the-universe|The Fabric of the Universe]]"
collection: "Ben's Ideas"
category: "Cosmic Abundance"
published: false
best_of: false
description: "An interactive essay that ranks gems and jewellery materials by how much of each exists across the whole universe — flipping our idea of 'precious' on its head. Planning brief."
status: plan
---
> [!note] This is a plan, not the article yet.
> Working brief for the interactive essay. Nothing here is final. The one hard rule: **we don't pick an ending or chase suppliers until the numbers tell us what's actually rare** (Step 3).

## The concept

An interactive scroll-essay that visualises **how much of each precious material exists across the known universe** — not on Earth, across *everything* — and ranks them from most abundant to rarest.

The hook is a flip: we call gems "precious" because they feel rare, but rare *where?* Measured against the whole universe, the ranking inverts. The cosmos makes some famous gems by the planet-load, while the genuinely rarest things you could wear turn out to be humble and biological.

## The thesis (why the ranking flips)

One idea does all the work: **a material can be no more abundant than the number of places that make it.**

- **Minerals** form inside stars and on planets — and there are ~10²² stars and a comparable number of rocky worlds. Even a gem that forms on one planet in a million still forms on ~10¹⁶ of them.
- **Living / once-living materials** (wood, pearl, amber, ivory, fossils) get multiplied by the number of planets known to have life: **one.**

That single missing multiplier is the emotional payload. It's why the universe can be swimming in diamond yet a specific biological object could be one of the rarest things in existence. **Whether that turns out to be amber, wood, a particular fossil, or something else is exactly what Step 3 decides.** Amber was my placeholder example, not a conclusion.

## The design challenge (the log-scale problem)

The range from most- to least-abundant is likely enormous — plausibly 30–40+ orders of magnitude. Ben dislikes logarithmic axes (they hide the wonder behind abstraction). Proposed ways to convey the range **without a raw log axis**:

1. **Act-based "zoom resets."** Split the scroll into acts (e.g. abundant minerals → a threshold moment → rare/biological). Within each act, sizes are linear and legible; at each act boundary an interstitial names the multiplier just crossed.
2. **Shrinking-object ladder.** No exponents on screen — nest familiar objects instead: "if all the diamond were the Pacific Ocean, then all the [X] is a teaspoon… and the [rarest thing] is a molecule you can't see."
3. **A counter that runs out.** In the abundant section the number is uncountable ("trillions of Earth-masses"); past the threshold it becomes *countable* ("a few thousand exist"). The shift from incomprehensible to say-out-loud is itself the gut-punch.

**Visualisation:** each material is a glowing "pile" of particles; the pile's density shows relative abundance; **click it and the particles burst out** (per Ben's brief). A working prototype of this interaction exists (see Status) — but it should only be built for real once the item list and numbers are locked.

## The six steps

### Step 1 — SEO — ✅ done (Ahrefs, US)

The opportunity is unusually good: the "rarest gem" cluster is high-volume and near-zero difficulty.

| Keyword | Vol | KD | Traffic potential | Role |
|---|---|---|---|---|
| rarest gemstone | 3,000 | 0 | 7,400 | **Primary — H1/title** |
| rarest gem in the world | 1,400 | 2 | 7,500 | Primary cluster |
| rarest stone in the world | 800 | 4 | 7,300 | Primary cluster |
| what is the rarest thing in the world | 1,900 | 0 | 600 | Curiosity hook |
| rarest thing in the universe | 500 | 0 | 90 | Concept / brand angle |
| precious stones | 4,200 | 46 | 23,000 | Aspirational (hard) |
| how rare is wood | 40 | 0 | 80 | Angle validator — Ahrefs parent topic is literally *"are trees rarer than diamonds"* |

**Read:** title/H1 around **"rarest gemstone / rarest thing in the universe"**. `precious stones` (23k TP) is the big prize but KD 46 — a stretch goal, not the entry point. The wood-vs-diamond angle is already something people search, which validates the whole spine. *(Any commercial keyword research — e.g. for whatever material wins Step 3 — is deferred until we know the ending.)*

### Step 2 — Compile the candidate list — 🔲 open

Draft a **long list** of materials people make jewellery from, deliberately spanning both mineral and biological:
- Minerals/gems: diamond, peridot, quartz/amethyst, sapphire & ruby (corundum), garnet, zircon, opal, emerald/beryl, plus collector rarities (painite, red beryl, taaffeite, benitoite, jadeite, alexandrite).
- Biological / once-living: pearl, coral, jet, wood, petrified wood & other fossils (ammonite, ammolite), ivory/mammoth ivory, amber, amber-with-inclusions.
- Wildcards to check: tektites/moldavite, meteorite (mineral, likely abundant), shell/nacre.

Keep the "could plausibly be jewellery" filter Ben set. This is a *candidate* list — Step 3 reorders it and reveals the real ending.

### Step 3 — Run the numbers — 🔲 THE crux (do this before anything commercial)

For each candidate, estimate total mass/volume across the known universe as an order-of-magnitude figure (per-site abundance × number of sites, capped by the rarest ingredient element). **Output: the true ranking, and the identity of the actual rarest wearable material(s).**

> ⚠️ Preliminary research already run (treat as a *starting hypothesis*, to be verified/expanded in the real pass):
> - Diamond and olivine/peridot look cosmically enormous (~10⁴⁹ kg) — the "precious" gems are the *most* abundant. Corundum (ruby/sapphire) condenses in dying stars.
> - Emerald is the rarest *mineral* candidate, because beryllium is a cosmically starved element.
> - Everything biological drops off a cliff (the ÷ life-on-one-planet multiplier): wood ~10¹⁵ kg, amber ~10⁸–10⁹ kg, amber-with-a-whole-insect ~10⁴–10⁵ kg.
> - So amber-with-an-inclusion is *a* strong candidate for the rarest wearable thing — but this pass didn't rank ivory, ammolite, jet, or gem coral/pearl rigorously against it. **The real winner is still open.**

Decision that falls out of this step: is the ending amber, or something rarer we haven't weighed yet?

### Step 4 — Suppliers / commercial angle — 🔲 deferred until Step 3 lands

Only once we know the actual rarest material(s) do we decide whether there's a commercial/backlink play and who to link to.
- *Contingency note:* I did a preliminary amber-supplier + backlink scan (Baltic-amber specialists, one solid affiliate, museum shops, and a strong reciprocal-backlink angle in the amber niche). **It's parked and only relevant if amber survives Step 3.** Key ethics flag to carry regardless: recommend **Baltic** amber; avoid Burmese/Myanmar "blood amber" (conflict-linked, research boycott).

### Step 5 — Design decisions — 🔲 open (direction drafted)

Proposed direction: a dark "cosmic descent." Colour temperature encodes rarity (icy/mineral at the abundant top → warm at the rare bottom). Each material = an interactive particle pile you can scatter. The log-scale solution = the act-resets + shrinking-object ladder + counter-that-runs-out from above. Confirm once the item list is final.

### Step 6 — Build — 🔲 open (prototype exists)

Build the interactive HTML essay + the durable vault article. A validated interactive prototype (particle piles, click-to-burst, scroll rail, the act/cliff structure) is saved in the session scratchpad and can be pulled in once Steps 2–3 are locked — but it currently hard-codes amber as the ending, which we've agreed is unconfirmed.

## Structural decision — separate repo under benmccarthy.com.au

**Decided:** Option A — own repo, own Vercel deployment, served at `benmccarthy.com.au/p/precious-jewels` via the shell site's rewrite pattern.

**Why this over building inside the shell site:**
- The shell's writing system is static markdown rendered with remark. Adding interactive scroll-driven animations, particle systems, and act-based zoom resets would mean bolting MDX or a custom component pipeline onto a system designed for plain prose — just for one article.
- Heavy dependencies (Canvas/WebGL, scroll libraries, particle physics) would bloat the shell bundle even though only one page uses them.
- The `/p/[slug]` rewrite pattern already exists for exactly this kind of thing (Salt Safari, World Glass, etc.). Independent deploys, clean separation, full creative freedom.

**Repo:** `/Users/ben/Developer/benmccarthy/precious-jewels` — Next.js with `basePath: "/p/precious-jewels"`.
**Shell config:** two rewrite rules added to `next.config.ts` `beforeFiles`.

## Open questions for Ben

1. **Scope of "jewellery material"** — how loose? (Does mammoth ivory / ammolite / meteorite count? This changes the candidate list and possibly the ending.)
2. **One ending or a "top rarest" reveal?** — commit to a single rarest object, or reveal a small podium once Step 3 is in?
3. **Commercial intent** — is the affiliate/backlink angle a real goal for v1, or is this primarily a wonder/traffic piece with commerce as a maybe-later?

---

## Appendix — parked amber supplier scan (contingent on Step 3)

Only if amber wins: warm CTA/backlink leads were **Amber SOS** (certified inclusions), **Amber Bugs** (museum-grade, publishes linkable content), **Amber Pieces** (the one solid affiliate — ShareASale 10%, high AOV), plus museum-shop fallbacks (AMNH, Mini Museum). The amber retail niche actively courts educational backlinks (reciprocal-link potential is genuinely good). Full details available on request.

# Conversion Strategy: Reddit Traffic to Affiliate Clicks

## The funnel

1. Cold visitor from r/internetisbeautiful lands on the essay
2. Scrolls through — learns something surprising
3. "Wait, I could actually *own* this?" — desire
4. Clicks through to Etsy — buys

## What triggers the click

The gap between **perceived rarity** and **attainability**. We've spent an entire scroll telling them this material is cosmically rare, then there's a link to buy a piece for $100. That's the magic. It doesn't feel like shopping — it feels like acquiring a piece of the story they just read.

## Reddit demographics work in our favour

- 18–34, male-heavy, tech-literate, disposable income but price-conscious
- Skeptical of ads, responsive to "I discovered this cool thing"
- Love origin stories, science, TIL moments

The male skew actually helps. Men buying jewellery are usually buying **gifts**, and "I found this incredibly rare stone you've never heard of" is a better gift story than "I went to Kay Jewelers." The article gives them the narrative. Minimal settings help here too — they're not trying to judge jewellery design, they're buying the *stone's story*.

## Which stones will convert best

The highest-converting pieces won't be the prettiest — they'll be the most **surprising**:

| Material | Why it converts | Price sweet spot | The hook |
|---|---|---|---|
| **Moldavite** | Alien origin story, eerie green, #2 rarest | $50–200 | "This glass was made by a meteorite impact 15 million years ago" |
| **Alexandrite** | Colour-change is impossible to believe | $150–400 | Changes from teal to raspberry depending on light |
| **Amber with insect** | Jurassic Park in a necklace | $30–150 | A visible creature frozen 40 million years ago |
| **Ammolite** | Iridescent fossil, visually stunning | $100–400 | 70-million-year-old fossil you can wear |
| **Fire opal** | Play-of-colour, looks like it contains a sunset | $80–250 | People don't know opals can look like this |
| **Baltic amber** | Story + affordability | $30–100 | 44-million-year-old tree resin, warm and wearable |

### What won't convert

- **Diamond** — boring, everyone knows it, no surprise factor
- **Ruby/sapphire** — too familiar, no "TIL" moment
- Anything in a heavy/ornate setting — looks expensive, scares off impulse
- Anything over $500 — kills the impulse buy for this demographic

## Product image direction

**The stone is the hero.** Minimal bezel or prong setting. Thin chain or band. Dark background (matches our cosmic theme). The setting says "this is wearable and real" while staying out of the way.

The stone should be *doing something visually*:
- Changing colour (alexandrite)
- Flashing iridescence (ammolite, opal)
- Showing depth/inclusions (amber with insect)
- Glowing with alien translucency (moldavite)

## Price psychology

The $50–400 range is the sweet spot. Expensive enough to feel special, cheap enough for an impulse buy from someone who just learned something exists.

Best bet for single highest-converting piece: a **moldavite pendant**. Alien origin story + eerie translucent green + ~$100 price point + the article just told you it's the #2 rarest material on Earth.

---

## Copy audit: does the current essay support the "into gift" transition?

### What's working well

1. **The hero copy is strong.** "We call gems 'precious' because they feel rare. But rare *where?*" — this reframes the reader's mental model immediately. Good.

2. **The Finale nails it.** "Not diamond. Not ruby. A small, quiet sphere built by a living creature..." — this is the emotional peak. A reader who just felt something is primed to buy.

3. **Material descriptions are science-first, not sales-first.** This is correct for the Reddit audience. The selling happens through education, not persuasion.

4. **The act structure builds genuine surprise.** Diamond being "cosmically common" is a TIL moment that reframes every material that follows.

5. **The interstitial copy is excellent.** "If there were an intergalactic jewel trade, Earth would have an absolute monopoly on every one of them" — vivid, specific, human. This is the voice to protect.

### What needs work

1. **The shop section intro is too generic.** "Want to own a piece of the ranking?" is adequate but doesn't land. After the emotional peak of the Finale, the transition to shopping needs to feel like a natural continuation, not a gear-shift.

   **Current:** "Want to own a piece of the ranking? These are real examples of the materials above — from the cosmically common to the genuinely rare."

   **Problem:** This reads as a store section, which triggers ad-blindness. Reddit users will disengage.

   **Better direction:** Continue the essay's voice. Something like: "Every material above is real. Some of them are surprisingly easy to own." — understated, factual, lets curiosity do the work.

2. **"What it looks like" label on MaterialCard is neutral but passive.** It doesn't create desire. The label appears on every material with a product, including the common ones (peridot, garnet). It's fine as a label — but on the high-conversion materials (moldavite, alexandrite, amber-with-insect), this is the moment of maximum intent and the copy should work harder.

   **Consider:** No label at all. Just the image, glowing. The less it looks like a CTA, the more Reddit users will click it. The "Available on Etsy" hover pill is doing the right job already.

3. **We're missing products for the highest-converting materials.** Current products.ts only has: olivine, corundum, quartz, opal, jadeite, garnet. These are all Act 1 (cosmically common) materials. None of the materials people would actually impulse-buy have products:
   - No moldavite (the #1 conversion candidate)
   - No alexandrite (colour-change = irresistible)
   - No amber-with-insect (Jurassic Park hook)
   - No ammolite (iridescent fossil)
   - No pearl (the essay's emotional climax)

   **This is the single biggest gap.** The essay builds desire for rare materials, then only offers common ones. It's like a documentary about deep-sea creatures that ends with "buy goldfish here."

4. **The Finale has no product link for pearl.** After "the rarest wearable material in the known universe" and that beautiful reveal... nothing. A natural pearl pendant link here would be the highest-intent click on the entire page. It doesn't need a CTA — just a subtle image of a pearl pendant floating below the text, matching the glow aesthetic.

5. **No product for moldavite on the MaterialCard.** The description ends with "No more will ever form — unless another asteroid hits." That's a scarcity trigger. The reader is primed. There should be a pendant right there.

### Priority actions

1. **Source Etsy products for:** moldavite, alexandrite, amber-with-insect, ammolite, pearl (in that order of conversion priority)
2. ~~Rewrite the ShopSection intro~~ DONE — now reads "Every material above is real. Some of them are surprisingly easy to own."
3. ~~Remove the "What it looks like" label~~ DONE — product images float with no label, hover pill says "See on Etsy"
4. **Add a pearl product to the Finale** or immediately after it — this is the emotional peak
5. Act 1 products moved to ShopSection only — no inline products on common materials

---

## Product placement rules (implemented)

### Inline products (on MaterialCard)

Show a product image inline — no label, just the glowing image — only on these materials:

- **Alexandrite** (Act 2) — colour-change needs visual proof
- **Opal** (Act 1, exception) — play-of-colour sells visually
- **Ammolite** (Act 3) — iridescence needs to be seen
- **Amber with insect** (Act 3) — the image IS the story
- **Moldavite** (Act 3) — after "no more will ever form"

### Finale product

- **Pearl** — subtle image after the reveal, matching the glow aesthetic

### Shop section only (bottom of page)

All other materials with products go here. Currently: olivine, corundum, quartz, jadeite, garnet. These are proof that the materials are real and wearable, but they don't warrant inline placement.

### UX rules

- **No label** above inline product images. The image is part of the card, not an ad section.
- **Hover pill** says "See on Etsy" (not "Available on Etsy").
- **No prices shown** inline. Price discovery happens on Etsy.
- **Products appear sparse** — ~5 inline across 27 materials. Editorial, not commercial.

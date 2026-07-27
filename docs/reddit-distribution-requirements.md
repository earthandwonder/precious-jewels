# Reddit Distribution Requirements for Precious Jewels

> This document captures the verified constraints from a PRAW-based audit of 34+ subreddits
> (27 July 2026). Full results are in the Knowledge vault at `direction/reddit-audit-results.md`.
> This is the distilled checklist for the build.

## The primary target: r/InternetIsBeautiful (16.6M subscribers)

This is the single highest-leverage subreddit for a free interactive web piece. A front-page
hit here drives tens of thousands of sessions. But the sub has 13 rules and the mods are
actively hostile to AI slop. Here's what the build must satisfy:

### Hard rules (verified verbatim from Reddit API, 27 July 2026)

**Rule 6 — No personal information required:**
> "Websites that require an email address, name, or any other personal information to fully
> experience the website are not allowed. This includes Facebook, Google, or any other account.
> Also included are sites that simply serve as waitlists or newsletter sign ups."

- The entire interactive essay must be fully usable with ZERO signup, email, login, or account.
- An optional, non-blocking email footer is fine. A modal that asks for email is not.
- A newsletter CTA that gates content ("enter email to see the rarest gem") is an instant ban.

**Rule 5 — No stores or demos:**
> "Free demos or freemium tiered services where the full version or key functionality requires
> payment are also not allowed."

- Everything must be fully free. No "upgrade to unlock", no gated content.
- The ShopSection at the bottom with affiliate links is borderline. It's after the full essay
  and doesn't gate anything, so it should pass — but it must feel incidental, not commercial.
  Consider hiding it entirely for the Reddit launch URL, or making it truly minimal.

**Rule 10 — AI-Generated Content:**
> "To prioritize human ingenuity and effort, submissions are not allowed if their primary
> content is produced by AI, or if AI is used to drive functionality (especially for tasks
> that do not inherently require AI)."

- The BUILD METHOD (vibe-coded with Claude) is fine — the rule targets AI content, not AI tooling.
- The CONTENT (cosmic abundance data, gemstone facts, the ranking) must be human-researched.
  Every number needs a real source (stellar nucleosynthesis papers, mineral formation research).
- No visible AI features. Nothing that says "powered by AI" or uses AI as user-facing functionality.

**Rule 3 — No webgames:**
> "webgames are not allowed. This includes quizzes, puzzles, etc."

- The interactive particle piles and scroll experience are fine (interactive essay, not a game).
- Do NOT add scores, challenges, quizzes, or game-like mechanics.

**Rule 11 — 90/10 self-promotion:**
> "This sub follows the 90/10 rule for self-promotion. If almost all your recent activity on
> Reddit is advertising something you made, you will not be allowed to post here."

- This is an account constraint, not a build constraint. The account needs 3+ weeks of genuine
  participation before posting.

**Rule 8 — Hug of Death:**
> "Website is slow or unresponsive."

- The site MUST survive a Reddit front-page spike (potentially 50K+ sessions in hours).
- Vercel edge deployment + static/ISR is the right architecture. No server-side bottlenecks.
- Heavy assets (particle textures, fonts) should be CDN-cached.
- Test: can the page load and be fully interactive within 3 seconds on a slow connection?

### Domain ban (discovered 21 July 2026)

**vercel.app subdomains are BLANKET BANNED** on r/InternetIsBeautiful. Netlify subdomains
were already banned by Reddit itself. The mod post (1,038 upvotes): "If you can't be bothered
to pay for a proper domain and/or hosting we're no longer willing to sift through the slop."

- Precious Jewels serves at `benmccarthy.com.au/p/precious-jewels` — this is a custom domain,
  NOT a vercel.app subdomain. **Already safe.**
- But verify: make sure no redirect or canonical points to `*.vercel.app`.

---

## The "AI feel" problem — the real gatekeeper

The formal rules are necessary but not sufficient. r/InternetIsBeautiful's community (and
increasingly Reddit at large) is developing a visceral rejection of sites that "look AI-generated."
The vercel.app ban was explicitly an anti-slop measure. Posts that smell like AI slop get
reported, downvoted, and removed even if they technically comply with every rule.

### What triggers the "AI feel" rejection

1. **The default Tailwind/shadcn aesthetic.** Rounded corners, gradient cards with blur
   backgrounds, the same inter/geist font stack everyone uses, pill-shaped buttons, the
   specific shade of indigo-to-purple gradients. If your site looks like it was generated
   by v0.dev or Lovable, the community will pattern-match it as slop.

2. **Placeholder-quality copy.** Text that reads like a prompt response:
   - "Explore the wonders of..." / "Discover the beauty of..."
   - "An interactive experience that takes you on a journey..."
   - "Unlock the secrets of..." / "Dive deep into..."
   - Generic superlatives without specificity
   - Perfectly structured paragraphs with no personality

3. **No human voice.** The site could have been made by anyone or no one. No opinions, no
   quirks, no personality, no sense of a specific person behind it.

4. **Feature inflation.** Doing ten things adequately instead of one thing memorably.
   Multiple sections that each feel like a template.

5. **Over-polished emptiness.** Beautiful gradients and animations wrapping thin content.
   The visual sophistication exceeds the depth of what's actually being said.

6. **Generic landing-page structure.** Hero → features grid → testimonials → CTA.
   Even if the content is original, this structure screams "template."

### What passes the smell test (from top r/InternetIsBeautiful posts)

The posts that hit 1,000+ pts on r/InternetIsBeautiful share these qualities:

1. **A specific, surprising idea.** Not "explore gemstones" but "diamond is actually one
   of the most common gems in the universe." The concept does the work, not the polish.

2. **Human voice in the copy.** The Finale's "Not diamond. Not ruby. A small, quiet sphere
   built by a living creature" line is exactly right — it has rhythm, opinion, surprise.
   The rest of the copy needs to match this quality.

3. **Craft that serves the idea, not decorates it.** The particle piles that shrink from
   ocean-scale to thimble-scale? That's craft serving the idea. A generic parallax hero
   with a gradient? That's decoration.

4. **Restraint.** The best interactive essays do ONE thing and let you sit with it. No
   sidebar, no footer full of links, no "also check out" sections. The piece is the piece.

5. **An ending that lands.** The pearl reveal is strong. Protect it.

### Specific things to audit in the current Precious Jewels build

**GOOD (keep these — they beat the AI smell test):**
- Dark cosmic descent aesthetic — genuinely distinctive, not the Tailwind default
- Playfair serif editorial typography — not the Geist/Inter default
- Particle piles as data visualization — original interaction, not a template
- The Finale copy ("Not diamond. Not ruby...") — human voice, real rhythm
- Snap-scroll with acts — editorial structure, not landing-page structure
- Custom color temperature encoding rarity — a design decision, not a default

**AUDIT THESE (potential AI-feel risks):**
- The ShopSection — does it make the piece feel commercial? On r/InternetIsBeautiful,
  ANY commercial element can trigger Rule 5 reports even if technically compliant.
  Consider: should this section be hidden when `?ref=reddit` or similar? Or removed from v1?
- Copy in MaterialCard, EarthIntro, Interstitial — read every line aloud. Does it sound
  like a human wrote it, or like a prompt response? Kill any line that starts with "Explore",
  "Discover", "Dive into", "Journey through", or any generic wonder-language.
- The hero section — is there a subtitle or description that sounds template-y?
- ScrollProgress bar — fine, but does it add anything to the experience? If it's just
  chrome, remove it. Every element should earn its place.
- ProductCard component — is this used? If it's a product card template, remove it.
- AffiliateRow component — same question. Affiliate elements must be invisible to casual
  scrutiny for the Reddit launch.

**THE ONE-LINE TEST for every piece of copy:**
Would a tired, skeptical Redditor read this sentence and think "a human wrote this" or
"ChatGPT wrote this"? If there's any doubt, rewrite it in Ben's voice — shorter, more
specific, with an opinion or a surprise.

---

## Secondary targets and their format requirements

### r/dataisbeautiful (21.8M subs) — data visualization angle

- Submission type: **link only**
- Title format: `[OC] Plain factual description of the data`
- REQUIRED: first top-level comment must state data source(s) and tool(s)
- No clickbait titles (Rule 7)
- Personal data posts: Mondays ET only
- Top format: 82% image, 18% external link
- Link-in-comments rate: 30%
- Template: `[OC] Every precious material ranked by cosmic abundance — diamond is near the top`
- Comment: "Data source: stellar nucleosynthesis abundance tables [cite], mineral formation
  models [cite]. Tool: Next.js, Canvas. Made by me."

### r/space (27.9M subs) — cosmic angle

- Images allowed only on weekends
- No AI-generated content (explicit rule)
- No blogspam/self-promo
- Top format: 65% image, 28% external link
- Post a compelling screenshot of the cosmic abundance visualization on a weekend
- Link to the full piece in first comment

### r/Damnthatsinteresting (20.5M) + r/interestingasfuck (16.6M)

- Submission type: **link only** (but body text not allowed)
- YouTube is domain-blacklisted
- Top format: ~62% native video, ~30% image
- **Must post as native Reddit video** — screen-record a 30-60s scroll-through of the
  piece showing the scale flip from diamond to pearl
- Drop the URL in first comment
- Title: short, declarative, no "I made": "How much of each gemstone exists in the entire
  universe — the ranking completely flips"

### r/vibecoding (323K) + r/ClaudeAI (1.04M) — builder angle

- r/vibecoding requires educational content about the build (tools, prompts, challenges)
- r/ClaudeAI requires the project to be built with Claude
- Top format: image (screenshot) + build story in comments
- These are "how I built it" posts, not "look at this thing" posts

---

## Pre-launch checklist

- [ ] No email capture, signup, login, or account requirement anywhere in the experience
- [ ] No content gating (everything visible without interaction beyond scrolling)
- [ ] No "powered by AI" or AI-as-feature language
- [ ] All data sourced from real scientific papers (not AI-generated facts)
- [ ] ShopSection strategy decided (hide for Reddit traffic? remove from v1?)
- [ ] Every line of copy passes the "human or ChatGPT?" test
- [ ] No generic wonder-language ("Explore...", "Discover...", "Journey...")
- [ ] Custom domain confirmed (benmccarthy.com.au, not *.vercel.app)
- [ ] No vercel.app canonical or redirect
- [ ] Page loads fully in <3s on throttled connection (CDN, compressed assets)
- [ ] 30-60s screen recording ready for native-video posts on amplifier subs
- [ ] [OC] comment template ready for r/dataisbeautiful (sources + tools)

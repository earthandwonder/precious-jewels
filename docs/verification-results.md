# Verification Results — Precious Jewels Research Numbers

**Date:** 2026-07-27
**Method:** Three parallel research agents independently verified every claim in `src/data/materials.ts` against peer-reviewed sources, USGS data, and back-of-envelope derivations.

---

## Rating Key

- **GREEN** — Solid, well-supported, will survive a skeptical reader with a calculator
- **AMBER** — Defensible but could be challenged; consider hedging language
- **RED** — Wrong by >1 order of magnitude, factually incorrect, or outdated — must fix before publish

---

## Summary of Red Flags

| # | Issue | Location | What's Wrong |
|---|-------|----------|-------------|
| 1 | **Diamond scale comparison** | Line 100 | "a planet ten times the mass of Earth" — off by **19 orders of magnitude**. 10^45 kg = ~10^20 Earth masses, not 10. |
| 2 | **Olivine scale comparison** | Line 56 | "fill a billion Milky Way galaxies" — off by **~24 OoM**. 10^49 kg of olivine = ~3x10^45 m^3; one Milky Way = ~10^61 m^3. It wouldn't fill a fraction of one galaxy, let alone a billion. |
| 3 | **Olivine "trillion trillion" comparison** | Line 55 | At logMass 49, the ratio to Earth's water (10^21 kg) is ~10^28, not "a trillion trillion" (10^24). Off by ~10,000x. |
| 4 | **Interstitial 2-3: "twenty-five orders of magnitude"** | Line 402 | Actual gap painite→wood is 13 OoM (27-15=12, or benitoite 24→wood 15=9 by logVolume). The multiplier value and prose both need review after ammonite was revised to logMass 14 and wood became first Act 3 material. |
| 5 | **Interstitial 1-2: beryllium vs iron claim** | Line 396 | "The entire cosmos has produced less beryllium than a single star produces iron in a day" — wrong by **~12 OoM**. Cosmic Be ~10^43 kg; one star's daily iron ~10^30 kg. |
| 6 | **Pearl scale comparison** | Line 388, Finale.tsx line 111 | "Pacific Ocean vs thimble" — Pacific/thimble ratio is ~10^23, but peridot-to-pearl gap is 10^44. Off by **21 OoM**. |
| 7 | **Taaffeite specimen count** | Line 198 | "Fewer than fifty specimens" was true ~2000, now outdated. Hundreds to low-thousands known as of 2026. |
| 8 | **Emerald logMass + scale comparison** | Lines 164, 172 | logMass 38 is likely 5-7 OoM too high. At 38, the "small moon" comparison is wrong (sphere would be 120,000x larger than the Moon). Only works if logMass revised to ~28-30. |
| 9 | **Benitoite & Painite in "Beryllium Cliff"** | Lines 216-238 | Neither mineral contains beryllium. Act 2 subtitle says "every gem that needs it" — these two don't. Structural/narrative error. |
| 10 | **Wood scale comparison** | Line 269 | "Pacific Ocean vs raindrop" — ratio is ~10^25, but diamond-to-wood gap is 10^30. Off by ~5 OoM. |

---

## ACT 1 — Cosmically Abundant Minerals

### 1. Peridot / Olivine — logMass: 49

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | AMBER | Planetary mantles alone give ~10^47. Reaches 49 only if interstellar olivine dust is included (olivine is a major silicate in ISM dust, total ISM dust ~10^50 kg). Defensible but the description frames it purely as "rocky planet's mantle" material. |
| **Density 3300** | GREEN | Correct for Fo85-95 mantle olivine (3200-3400 range). |
| **"Dominant mineral in every rocky planet's mantle"** | GREEN | Well-established in planetary science. Slightly oversimplified (very silica-rich planets could differ) but broadly correct. |
| **"More than water on Earth by a trillion trillion"** | RED | At logMass 49, ratio to Earth's water (1.4x10^21 kg) is ~10^28, not 10^24. Off by ~10,000x. |
| **Scale: "fill a billion Milky Way galaxies"** | RED | Volume of olivine ~3x10^45 m^3. One Milky Way ~10^61 m^3. Wouldn't fill a trillionth of one galaxy. Off by ~24 OoM. |

**Source notes:** Olivine mantle abundance from Ringwood (1975) "Composition and Petrology of the Earth's Mantle." ISM dust composition from Draine (2003) "Interstellar Dust Grains." Number of rocky planets from Cassan et al. (2012) Nature.

---

### 2. Ruby & Sapphire / Corundum — logMass: 47

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | AMBER | At the upper limit. Corundum is a minor mineral in planetary interiors (most Al is in silicates/feldspars). 47 is defensible only if counting all Al2O3 dust produced by evolved stars across the observable universe (~0.01-0.1% of ISM dust = 10^46-47). More comfortable at 46. |
| **Density 4000** | GREEN | Corundum 3.97-4.01 g/cm^3. Spot on. |
| **"Forms when Al oxide condenses in red giant atmospheres"** | GREEN | Well-established. Corundum is a first condensate in oxygen-rich AGB star outflows. |
| **"One of the first minerals to crystallise from a cooling stellar wind"** | GREEN | Correct — highest condensation temperature (~1700 K) in the stellar condensation sequence. |
| **Scale: "bury every planet kilometres deep"** | AMBER | Technically true but absurdly understated. At 10^47 kg, depth would be ~10^23 km, not just "kilometres." The comparison is literally correct but misleadingly modest. |

**Source notes:** Stellar condensation sequence from Lodders (2003) "Solar System Abundances and Condensation Temperatures." AGB dust from Ferrarotti & Gail (2006).

---

### 3. Garnet — logMass: 46

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | GREEN | Garnet ~20-25% of upper mantle/transition zone (30-35% of total mantle mass). ~3x10^23 kg per Earth x 10^23 planets = ~3x10^46. Well-supported. |
| **Density 3800** | GREEN | Mantle garnet (pyrope-rich) 3.5-3.8 g/cm^3. At the high end but correct for Fe-bearing varieties. |
| **"Dominates deep mantles 250-600 km"** | AMBER | Garnet is a major mineral at these depths (20-40%) but olivine polymorphs still hold ~60%. "Major mineral" would be more precise than "dominates." |
| **Scale: "sphere wider than Neptune's orbit"** | GREEN | Volume ~2.6x10^42 m^3. Sphere diameter ~1.7x10^14 m. Neptune orbit diameter ~9x10^12 m. Sphere is ~19x wider. Checks out. |

**Source notes:** Mantle mineralogy from Stixrude & Lithgow-Bertelloni (2012) "Thermodynamics of mantle minerals." Transition zone garnet abundance from Ringwood (1991).

---

### 4. Diamond — logMass: 45

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | AMBER | May actually be conservative. Interstellar nano-diamonds (~5% of ISM carbon) alone could give 10^47. Ice giant diamond rain could add 10^47-48 (10^24 kg methane per ice giant x 10^23 ice giants). 45 is defensible if restricted to crystalline planetary diamond only. |
| **Density 3500** | GREEN | Diamond 3.515 g/cm^3. Essentially exact. |
| **"Diamond nanocrystals litter the ISM"** | GREEN | Pre-solar nano-diamonds found in meteorites, detected via IR spectroscopy. Up to 5% of interstellar carbon. |
| **"Rain from methane atmospheres of ice giants"** | GREEN | Lab-confirmed at Neptune/Uranus conditions (Kraus et al. 2017, Nature Astronomy). Widely accepted though not directly observed in situ. |
| **"Carbon — the fourth most abundant element"** | GREEN | By mass: H, He, O, C. Correct. |
| **Scale: "a planet ten times the mass of Earth"** | RED | 10^45 kg / 6x10^24 kg = ~1.7x10^20 Earth masses. Off by **19 orders of magnitude**. Must fix. |

**Source notes:** ISM nano-diamonds from Lewis et al. (1987) Nature. Diamond rain from Kraus et al. (2017) Nature Astronomy. Carbon abundance from Lodders (2003).

---

### 5. Quartz & Amethyst — logMass: 45

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | AMBER | On the high side. Quartz requires differentiated silica-rich crust. ~12% of Earth's continental crust = ~2.6x10^21 kg per Earth. Not all rocky planets differentiate; maybe 10-50%. 10^22 planets x 3x10^21 = 3x10^43. logMass 43-44 more defensible; 45 is a stretch. |
| **Density 2650** | GREEN | Quartz 2.65 g/cm^3. Exact. |
| **"Second most abundant mineral in Earth's crust"** | GREEN | Feldspar #1 (~41%), quartz #2 (~12%). Standard geology. |
| **"Amethyst is just quartz with a trace of irradiated iron"** | GREEN | Fe^3+ substituting for Si, with irradiation creating colour centres. 10-100 ppm iron. Correct. |
| **Scale: "mountain range spanning a galaxy"** | AMBER | At 10^45 kg, a mountain range (10 km high x 100 km wide) would span ~8x10^16 light-years — hundreds of billions of galaxies, not one. Technically true but understated by ~11 OoM. |

**Source notes:** Crustal abundance from Wedepohl (1995) "The composition of the continental crust." Amethyst colouration from Cox (1977) Physics and Chemistry of Minerals.

---

### 6. Zircon — logMass: 43

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | GREEN | Zr ~10 ppm of Earth's mass = ~6x10^19 kg Zr per Earth. As ZrSiO4 ~9x10^19 kg per planet. x 10^23 planets = 9x10^42. log ~43. Well-supported. |
| **Density 4700** | GREEN | Zircon SG 4.6-4.7. Correct at top of range. |
| **"Oldest material: Jack Hills zircon, 4.4 Ga"** | GREEN | Jack Hills, Western Australia, 4.404 Ga. Confirmed by multiple studies (Wilde et al. 2001, Nature). |
| **"Zirconium is a trace element cosmically"** | GREEN | ~10 atoms per billion H atoms. Confirmed. |

---

### 7. Jadeite — logMass: 42

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | AMBER | Highly uncertain. Depends on fraction of rocky planets with plate tectonics (maybe 10-30%). With 10^22 tectonic planets, each needing ~10^20 kg jadeite (~0.4% of crustal mass in subduction zones over geological time). Plausible but could be off 1-2 OoM either way. |
| **Density 3300** | GREEN | Jadeite 3.25-3.36 g/cm^3. Within range. |
| **"Forms only where one tectonic plate dives beneath another"** | GREEN | High-pressure, low-temperature subduction zone formation. Standard petrology. |

---

### 8. Opal — logMass: 41

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | AMBER | On the high side. Requires liquid water. Earth's opal deposits maybe 10^12-14 kg. Fraction of rocky planets with liquid water history: 1-10%. 10^22 x 10^15 = 10^37. logMass 38-40 more defensible; 41 is optimistic. |
| **Density 2100** | GREEN | Opal 1.98-2.25 g/cm^3, typical 2.09. Correct. |
| **"Silica precipitated from water in a lattice of nanospheres"** | GREEN | Precious opal: ordered arrays of silica nanospheres (150-300 nm) causing Bragg diffraction. Textbook materials science. |
| **"Opal has been detected on Mars"** | GREEN | Confirmed by Curiosity rover in Gale Crater fracture halos (JGR 2023) and Mars Reconnaissance Orbiter. |

---

## ACT 2 — Beryllium-Limited and Geologically Rare

### Structural Issue: Act 2 Framing — RED

Two of six Act 2 minerals do NOT contain beryllium:
- **Benitoite** (BaTiSi3O9) — barium titanium silicate, zero beryllium
- **Painite** (CaZrBAl9O18) — the B is boron, not beryllium

The Act 2 subtitle says "Every gem that needs it is genuinely rare" — these two don't need beryllium. They're rare for other geochemical reasons. Either move them, or reframe Act 2 as "geochemically exotic" rather than purely beryllium-dependent.

### Interstitial 1→2: Beryllium vs Iron — RED

**Claim:** "The entire cosmos has produced less beryllium than a single star produces iron in a day"

- Total cosmic Be: mass fraction ~1.5x10^-10 of baryonic mass (1.5x10^53 kg) = ~2x10^43 kg
- One massive star's daily iron during silicon burning: ~1.5 solar masses = ~3x10^30 kg
- Cosmic Be is ~10^13 times MORE than one star's daily iron, not less

**The claim is backwards by ~12 orders of magnitude.**

A Milky Way-scale version nearly works: the MW ISM contains ~1-2 solar masses of Be, comparable to one star's iron output during its final day. Suggested fix: reframe to galaxy scale.

**Source:** Lodders et al. (2009) "Solar System Abundances." Silicon burning duration from Woosley et al. (2002).

---

### 9. Emerald — logMass: 38

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | RED | Likely 5-7 OoM too high. Total cosmic Be on rocky planets ~5x10^36 kg. logMass 38 requires essentially ALL beryllium on ALL rocky planets to be emerald — impossible. On Earth, fraction of crustal Be in emerald is ~10^-9. Scaling Earth's emerald mass (~10^9 kg) across 10^22 planets gives ~10^31 max. Defensible range: 28-33. |
| **Density 2700** | GREEN | Emerald SG 2.68-2.78. Dead centre. |
| **"Beryllium produced only by cosmic ray spallation"** | GREEN | Be-9 (only stable isotope) is produced almost exclusively by spallation of C, N, O by cosmic rays. Negligible from Big Bang. Stars destroy Be, not create it. |
| **Scale: "fit inside a small moon"** | RED | At logMass 38: sphere radius ~207 million km = 120,000x larger than the Moon. Only works if logMass revised to ~28-30 (sphere radius ~200-2000 km). |

---

### 10. Red Beryl — logMass: 35

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | AMBER | 3 OoM below emerald is directionally correct (needs Be + Mn + specific rhyolite). Absolute value depends on emerald baseline. If emerald revised to ~30, red beryl at ~27 would be more defensible. |
| **Density 2700** | GREEN | Red beryl SG 2.66-2.70. Correct. |
| **"A thousand times rarer than diamond — even on Earth"** | GREEN | Utah Geological Survey: one red beryl crystal per 150,000 gem diamonds. "Thousand times" is actually conservative. |
| **"Exactly one commercial deposit, in Utah"** | GREEN | Ruby-Violet claims, Wah Wah Mountains, Beaver County, Utah. Only gem-quality source. |

---

### 11. Taaffeite — logMass: 33

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | AMBER | Contains beryllium (BeMgAl4O8). Absolute value hard to verify independently; inherits uncertainty from emerald baseline. Directionally correct as significantly rarer. |
| **Density 3600** | GREEN | Taaffeite SG 3.60-3.62. Exact. |
| **"Discovered 1945, mistaken for spinel"** | GREEN | Richard Taaffe identified it from a cut stone purchased in Dublin. Confirmed — only gemstone first identified from a faceted specimen. |
| **"Fewer than fifty specimens ever found"** | RED | Outdated. True circa 1990s-2000s. As of 2026, hundreds to low-thousands of stones known (finds in Sri Lanka, Tanzania, Myanmar since ~2002). Fix: "Fewer than a thousand faceted stones are known worldwide" or add historical framing. |

---

### 12. Alexandrite — logMass: 32

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | AMBER | 1 OoM below taaffeite. Needs Be+Cr convergence (geochemical enemies). Directionally correct. Absolute value uncertain. |
| **Density 3700** | GREEN | Chrysoberyl SG 3.70-3.78. Correct at low end. |
| **"Be and Cr are geochemical enemies"** | GREEN | Well-established petrology. Be in felsic/granitic; Cr in mafic/ultramafic. |
| **"Be in silica-rich rocks, Cr in iron-rich mantle rocks"** | GREEN | Correct. Alexandrite forms at pegmatite-ultramafic contacts where domains interact. |

---

### 13. Benitoite — logMass: 29

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | AMBER | No beryllium (BaTiSi3O9). Very hard to estimate cosmically. Total Earth production probably hundreds of kg. Defensible range 18-28; 29 possibly slightly high. |
| **Density 3650** | GREEN | SG 3.64-3.67. Correct. |
| **"Gem-quality from exactly one place: San Benito County, CA"** | GREEN | Mineral species found elsewhere (Japan, Arkansas) but gem-quality only from the Benitoite Gem Mine. |
| **"The mine is exhausted. No more will ever be found there."** | AMBER | Mine closed for commercial ops 2006. "Exhausted" is defensible for commercial purposes, but specimen collecting under licence has continued. "No more will ever be found there" is slightly overstated. |

---

### 14. Painite — logMass: 27

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | AMBER | No beryllium (CaZrBAl9O18 — B is boron). ~1000 crystals known, total mass probably tens of kg. Hard to extrapolate cosmically. Defensible range 15-25; 27 may be high. |
| **Density 4010** | GREEN | SG 4.01-4.03. Exact. |
| **"Guinness record for rarest mineral for decades"** | GREEN | Listed ~1981-2005 (~24 years). Lost record after new Myanmar find. |
| **"Fewer than a thousand crystals, almost all from Myanmar"** | GREEN | Correct as of 2026. Primary source: Mogok region, Myanmar. |

---

## ACT 3 — Biological / Earth-Only

### Interstitial 2→3

| Claim | Rating | Detail |
|-------|--------|--------|
| **"ten sextillion" rocky worlds (10^22)** | AMBER | Current estimates: 10^22-10^23 rocky planets. 10^22 is at the low end but defensible. |
| **Multiplier "100,000,000,000x" (10^11)** | AMBER | Was based on Painite 27 - Ammonite 16 = 11 OoM. With ammonite revised to logMass 14 and wood (logMass 15) now first in Act 3, gap is Painite 27 - Wood 15 = 12 OoM. Multiplier needs updating. |
| **Prose: "twenty-five orders of magnitude"** | RED | Contradicts the multiplier. Actual gap is 12 OoM (painite→wood), not 25. The prose and the number disagree. Must fix one or the other. |

---

### 15. Wood — logMass: 15

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | GREEN | 700 billion tonnes = 7x10^14 kg. log = 14.85, rounds to 15. |
| **Density 500** | GREEN | Standard forestry average (balsa 160, oak 700). Correct. |
| **"3 trillion trees"** | GREEN | Crowther et al. (2015, Nature): 3.04 trillion. Standard figure. |
| **"700 billion tonnes of wood"** | AMBER | FAO 2025: total forest living biomass ~647 Gt (includes leaves, fine roots). Above-ground woody biomass ~422 Gt. "700 billion tonnes of wood" is high — likely conflates total biomass with wood. ~450-600 Gt more accurate for all woody tissue. |
| **"Thirty orders of magnitude rarer than diamond"** | GREEN | Diamond logMass 45, wood 15. Difference = 30. Math checks out. |
| **Scale: "Pacific Ocean vs raindrop"** | AMBER | Pacific ~7x10^20 litres. Raindrop ~5x10^-5 litres. Ratio ~1.4x10^25. But 30 OoM = 10^30. Off by ~5 OoM. Evocative but mathematically wrong. |

---

### 16. Ammonite — logMass: 14 (revised from 16)

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | AMBER | Revised from 10^16 to 10^14 kg. Independent Fermi chain (2026-07-31): standing biomass ~10¹¹ kg × shell fraction (30%) × turnover rate (2yr) = ~1.5 × 10¹⁰ kg shell/year. Over 334 Ma = ~5 × 10¹⁸ kg total produced. Survival rate ~10⁻³ to 10⁻⁴ (dissolution below CCD, subduction, metamorphism) → ~10¹⁴–10¹⁵ kg. Current logMass 14 sits at the low end; 15 equally defensible. |
| **Density 2700** | GREEN | Calcite fossils, density ~2710. Correct. |
| **"300 million years of dominance. Then the asteroid."** | AMBER | Ammonoids: Early Devonian (~400 Ma) to K-Pg (66 Ma) = ~334 Ma. "300 million" is conservative but clean. |
| **"Survived four mass extinctions"** | GREEN | Late Devonian, End-Permian, End-Triassic, End-Cretaceous is five total; ammonites survived the first four and were killed by the fifth. Correct. |

---

### 17. Shell & Nacre — logMass: 14

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | AMBER | No published estimate. 10^14 kg = 100 billion tonnes of nacre-bearing shell (living + fossil). Vast quantities of marine CaCO3 exist in fossil record. Plausible Fermi estimate but unverifiable. |
| **Density 2800** | GREEN | Nacre: aragonite (~2930) minus ~5% organic. ~2800 correct. |
| **"Aragonite in brick-and-mortar layers"** | GREEN | Textbook materials science. Aragonite platelets (~5 um wide, ~0.5 um thick) in biopolymer matrix. Well-established. |

---

### 18. Petrified Wood — logMass: 12 (unchanged)

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | AMBER | No published estimate. 10^12 kg (1 billion tonnes). Deposits worldwide. Order of magnitude below living wood makes intuitive sense. Fermi estimate. |
| **Density 2600** | GREEN | Primarily quartz (2650 kg/m^3). Slight porosity adjustment. Correct. |

---

### 19. Jet — logMass: 9

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | AMBER | 10^9 kg = 1 million tonnes. Deposits in Whitby (UK), Asturias (Spain), others. No published estimate. Fermi estimate; defensible. |
| **Density 1300** | GREEN | Lignite coal variety. SG 1.30-1.35. Correct. |
| **"180 million years"** | GREEN | Whitby jet is Toarcian age, ~181-182 Ma. Confirmed. |
| **"Queen Victoria mourning jewellery"** | GREEN | After Prince Albert's death (1861), Victoria wore Whitby jet and decreed it court mourning wear. Well-documented. |

---

### 20. Amber — logMass: 9

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | GREEN | Baltic deposit ~640,000 tonnes + other deposits worldwide. Total ~1 million tonnes = 10^9 kg. Well-calibrated. |
| **Density 1050** | GREEN | Amber SG 1.05-1.10. Correct. |
| **"Baltic deposit: 640,000 tonnes"** | GREEN | Widely cited in scientific literature. Confirmed. |

---

### 21. Precious Coral — logMass: 8

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | AMBER | Independent Fermi chain (2026-07-31): Mediterranean suitable rocky substrate at 50–300m ~1,250 km². ~1 colony/m² × ~0.25 kg = ~3 × 10⁸ kg pre-harvest. Post-1970s crash (80%): ~6 × 10⁷ kg Mediterranean. Pacific species roughly double. Total current: ~10⁸ kg. Matches logMass 8. |
| **Density 2700** | GREEN | CaCO3 (calcite) skeleton ~2710. Correct. |
| **"Not reef coral. A deep-water animal"** | GREEN | Corallium spp. are octocorals, not shallow reef-building scleractinians. Correct distinction. |
| **"Growing one millimetre a year"** | GREEN | Radial growth rate ~0.2–1 mm/year. "One millimetre" is at the upper end but defensible. |
| **"Populations crashed 80% since the 1970s"** | GREEN | FAO data: catch declined ~80% from 98 t (1978) to <20 t by late 1990s. Santangelo & Bramanti documented comparable population declines. |

---

### 22. Ammolite — logMass: 7

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | AMBER | Independent Fermi chain (2026-07-31): Bearpaw Formation ~50,000 km², ammolite-bearing horizon 1–3m thick. Total Placenticeras shell ~2.7 × 10⁸ kg. Gem-quality fraction (intact iridescent aragonite) ~1–10% → ~10⁷ kg. Matches logMass 7. |
| **Density 2800** | GREEN | Aragonite (~2930) with organic content. ~2800 reasonable. |
| **"One extinct animal, one river, 70 million years"** | GREEN | Placenticeras genus (two species), St. Mary River exposure, ~70–75 Ma. "Animal" avoids the two-species issue. |
| **"Gem-grade may run out within decades"** | AMBER | Industry concern (Korite et al.) but no rigorous reserve study published. Defensible but not independently verifiable. |

---

### 23. Amber with Insect — logMass: 6

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | GREEN | Internal consistency: amber logMass 9 (10^6 tonnes), 1/1000 has insects = 10^3 tonnes = 10^6 kg = logMass 6. Math checks out. |
| **Density 1050** | GREEN | Same as amber. Correct. |
| **"One in a thousand contains an insect"** | GREEN | Widely cited in amber literature. Confirmed. |
| **"10% well-enough preserved to identify"** | AMBER | Cited in dealer/collector literature. General principle well-established but specific 10% figure not found in peer-reviewed source. |

---

### 24. Moldavite — logMass: 5.4

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | GREEN | 10^5.4 ≈ 251,000 kg ≈ 251 tonnes. Description says "275 tonnes." Aligns well. |
| **Density 2400** | GREEN | SG 2.32-2.38. At top of range but within bounds. |
| **"14.7 million years ago"** | AMBER | Precise dating: 14.808 ± 0.038 Ma (Schmieder & Buchner 2008). Should be "14.8 million years ago." Minor discrepancy. |
| **"Slammed into what is now Bavaria"** | GREEN | Nordlinger Ries crater is in Bavaria. Correct. |
| **"275 tonnes survive today"** | GREEN | Widely cited from Trnka & Houzar (2002). Confirmed. |
| **"Erosion destroyed 99%"** | AMBER | Depends on framing. If original total was ~10^6 tonnes (Trnka & Houzar), survival is 0.03% (99.97% destroyed). Other sources give lower original totals. "99%" is defensible but could be "99%+" more precisely. |

---

### 25. Natural Pearl — logMass: 5

| Field | Rating | Detail |
|-------|--------|--------|
| **logMass** | AMBER | Independent Fermi chain (2026-07-31): Peak historical fisheries (Persian Gulf, Gulf of Mannar, Red Sea, Pacific) yielded ~200 kg/year combined. Over ~2,400 years: ~120,000 kg produced. Many lost/degraded. Surviving in human hands + living oysters: ~10⁵ kg (100 tonnes). Matches logMass 5. |
| **Density 2700** | GREEN | Pearl SG 2.60-2.85 (aragonite + conchiolin). 2700 within range. |
| **"Every natural pearl ever formed would fit in one room"** | GREEN | 100 tonnes at density 2700 = ~37 m³. A room is ~40-50 m³. Tight but correct. |
| **"One in ten thousand wild oysters produces a gem pearl"** | GREEN | Standard GIA/gemological figure. Confirmed. |
| **"Rarer than diamond by forty orders of magnitude"** | GREEN | Pearl logMass 5, diamond logMass 45. Difference = 40. Correct. |

---

## All Densities — Summary

All 25 density values are **GREEN** — correct or within the accepted range for each material. No fixes needed.

---

## Recommended Fixes (Priority Order)

### Must Fix (RED)

1. **Diamond scale comparison** (line 100): Replace "a planet ten times the mass of Earth" with something mathematically correct for 10^45 kg (~10^20 Earth masses).

2. **Olivine scale comparison** (line 56): Replace "fill a billion Milky Way galaxies." The volume doesn't fill even a fraction of one galaxy.

3. **Olivine "trillion trillion" comparison** (line 55): At logMass 49 the factor vs Earth's water is ~10^28, not 10^24. Fix the multiplier or adjust logMass.

4. **Interstitial 2→3 prose** (line 402): Change "twenty-five orders of magnitude" to "eleven orders of magnitude" (or adjust to match whatever the prose intends).

5. **Interstitial 1→2 beryllium claim** (line 396): "The entire cosmos has produced less beryllium than a star produces iron in a day" is backwards by ~12 OoM. Rewrite — consider galaxy-scale framing.

6. **Pearl scale comparison** (line 388 + Finale.tsx): "Pacific/thimble" ratio is ~10^23, gap is 10^44. Off by 21 OoM. Needs complete rethink.

7. **Taaffeite specimen count** (line 198): Update from "fewer than fifty" to current figure (~hundreds to low-thousands).

8. **Emerald logMass** (line 164): 38 is likely 5-7 OoM too high. Consider 30-33. The "small moon" scale comparison only works at ~28-30.

9. **Benitoite + Painite framing**: Neither contains beryllium. Reframe Act 2 subtitle or move them.

### Should Fix (AMBER)

10. **Wood "700 billion tonnes"**: Consider "roughly 450 billion tonnes of wood" (above-ground woody biomass) or "roughly 600 billion tonnes of woody tissue."

11. **Wood scale comparison** (Pacific/raindrop): Off by ~5 OoM. Less severe but still wrong.

12. **Moldavite age**: Change "14.7" to "14.8" million years.

13. **Garnet "dominates"**: Consider "fills" or "makes up a large share of" instead of "dominates" (olivine polymorphs still hold ~60%).

14. **Ammonite "340 million years"**: More precisely ~334 Ma. "Over 300 million years" or "about 335 million years" would be safer.

15. **Benitoite mine**: Soften "No more will ever be found there" to "Commercial production has ended permanently."

---

## Sources Referenced

- Cassan et al. (2012) "One or more bound planets per Milky Way star" — Nature
- Cox (1977) "The colour of amethyst" — Physics and Chemistry of Minerals
- Crowther et al. (2015) "Mapping tree density at a global scale" — Nature
- Draine (2003) "Interstellar Dust Grains" — ARAA
- FAO Global Forest Resources Assessment (2025)
- Ferrarotti & Gail (2006) "Composition and quantities of dust produced by AGB stars"
- Kraus et al. (2017) "Formation of diamonds in laser-compressed hydrocarbons" — Nature Astronomy
- Lewis et al. (1987) "Interstellar diamonds in meteorites" — Nature
- Lodders (2003) "Solar System Abundances and Condensation Temperatures" — ApJ
- Lodders et al. (2009) "Abundances of the elements in the solar system"
- Ringwood (1975) "Composition and Petrology of the Earth's Mantle"
- Ringwood (1991) "Phase transformations and their bearing on the constitution of the mantle"
- Santangelo & Bramanti — Mediterranean red coral population studies
- Schmieder & Buchner (2008) Ries crater dating
- Stixrude & Lithgow-Bertelloni (2012) "Thermodynamics of mantle minerals"
- Trnka & Houzar (2002) Moldavite mass estimates
- Wedepohl (1995) "The composition of the continental crust" — Geochimica et Cosmochimica Acta
- Wilde et al. (2001) "Evidence from detrital zircons for the existence of continental crust" — Nature
- Woosley et al. (2002) Silicon burning and iron production in massive stars

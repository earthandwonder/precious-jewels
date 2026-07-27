# Scale Audit: Pile-to-Reference-Object Sizing

Generated 2026-07-27. Final agreed plan.

## Decisions

- **Drop peridot** (too large for any usable reference, not a seller)
- **Drop painite** (falls in Everest-to-Earth gap, not a seller)
- **25 materials** remain
- Reference object stays a fixed pixel size; pile scales relative to it
- When ratio is too extreme, bump material to the next reference up/down
- MassCounter stays as mass (more meaningful to readers than raw volume)

## Reference ladder (7 objects)

| Ref | Real size | Display px (fixed) |
|-----|-----------|-------------------|
| Heliosphere | 240 AU (3.59 x 10^13 m) | ~50 |
| Solar system (Neptune orbit) | 60 AU (8.97 x 10^12 m) | ~50 |
| Sun | 1.39 x 10^9 m | ~50 |
| Earth | 1.27 x 10^7 m | ~50 |
| Everest | 8,850 m | ~50 |
| Statue of Liberty | 93 m | ~40 |
| Human | 1.8 m | ~35 |

---

## Final assignments: all 25 materials

### Act 1 -- Cosmic minerals (7 materials, was 8)

Dropped: Peridot (7,250 AU -- no usable reference without a one-off object)

| Material | logVol | Pile height (AU) | Reference | Ratio | Notes |
|----------|--------|-----------------|-----------|-------|-------|
| Ruby/Sapphire | 43.4 | 1,450 | Heliosphere (240 AU) | 6.0x | |
| Garnet | 42.4 | 670 | Heliosphere | 2.8x | |
| Quartz | 41.6 | 364 | Solar system (60 AU) | 6.1x | |
| Diamond | 41.5 | 336 | Solar system | 5.6x | |
| Zircon | 39.3 | 62 | Solar system | 1.0x | |
| Jadeite | 38.5 | 34 | Solar system | 0.57x | |
| Opal | 35.7 | 3.9 | Solar system | 0.3x* | *Clamped. True ratio is 0.065x (pile would be ~3px dot at true scale). Clamped to 0.3x for readability. |

### Act 2 -- Beryllium cliff (5 materials, was 6)

Dropped: Painite (1.09 x 10^6 m -- 123x Everest but 0.085x Earth, falls in the gap, not a seller)

| Material | logVol | Pile height | Reference | Ratio | Notes |
|----------|--------|------------|-----------|-------|-------|
| Emerald | 29.6 | 5.87 x 10^9 m | Sun (1.39 x 10^9 m) | 4.2x | |
| Red Beryl | 26.6 | 5.87 x 10^8 m | Sun | 0.42x | |
| Taaffeite | 24.4 | 1.09 x 10^8 m | Earth (1.27 x 10^7 m) | 8.5x | Largest Earth ratio -- consider bumping to Sun (0.078x) if 8.5x feels too big visually |
| Alexandrite | 23.4 | 5.03 x 10^7 m | Earth | 3.95x | |
| Benitoite | 20.4 | 5.03 x 10^6 m | Earth | 0.40x | Pile smaller than Earth -- powerful visual moment |

### Act 3 -- Biological / Earth-only (13 materials, unchanged)

| Material | logVol | Pile height | Reference | Ratio | Notes |
|----------|--------|------------|-----------|-------|-------|
| Ammonite | 12.6 | 11,735 m | Everest (8,850 m) | 1.33x | |
| Wood | 12.0 | 7,400 m | Everest | 0.84x | |
| Shell | 10.6 | 2,523 m | Everest | 0.29x | Bumped up from Statue (was 27x Statue, clamped to 6x). 0.29x Everest is more honest. |
| Petrified Wood | 8.6 | 544 m | Statue (93 m) | 5.85x | |
| Amber | 6.0 | 73.5 m | Statue | 0.79x | |
| Jet | 5.9 | 68.4 m | Statue | 0.74x | |
| Coral | 4.6 | 25.2 m | Statue | 0.27x | Bumped up from Human (was 14x Human, clamped to 6x). 0.27x Statue is more honest. |
| Ammolite | 3.6 | 11.7 m | Human (1.8 m) | 6.5x | |
| Amber w/ Insect | 3.0 | 7.4 m | Human | 4.1x | |
| Moldavite | 2.0 | 3.43 m | Human | 1.9x | |
| Natural Pearl | 1.6 | 2.52 m | Human | 1.4x | |

---

## Ratio range summary

Target: 0.27x - 8.5x. One exception:

| Material | Ratio | Issue |
|----------|-------|-------|
| Opal | 0.3x (clamped from 0.065x) | True pile is a ~3px dot vs 50px solar system. Clamped to 0.3x for readability. |
| Taaffeite | 8.5x | At the high end but acceptable |

All other materials fall in 0.27x - 6.5x range.

---

## What needs building

1. Remove peridot and painite from `materials.ts`
2. Add 3 new reference SVGs to `ScaleReference.tsx`: Heliosphere, Solar System, Sun
3. Rewrite `getRefType()` to pick reference based on pile height thresholds (no more "Acts 1-2 always Earth")
4. Rewrite `getPileHeight()` to use real proportional sizing for ALL acts
5. Update reference threshold logic:
   - Shell bumped to Everest (was Statue)
   - Coral bumped to Statue (was Human)
   - Opal clamped at 0.3x solar system
6. Remove `abundanceToNormalized()` and `abundanceToHeight()` (no longer needed -- all acts use real physics)
7. New SVGs needed: heliosphere (concentric rings/boundary?), solar system (orbits + sun dot), sun (star with corona)

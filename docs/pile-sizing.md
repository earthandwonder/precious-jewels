# Pile & Reference Object Sizing System

How particle pile heights and reference object sizes are computed, and how to adjust them.

## How it works

### 1. Real-world proportional sizing (`getPileHeight`)

Each material's pile height is derived from its real cosmic volume:

```
realH = conePileHeight(material.logVolume)   // real cone height in metres
refRealSize = REFERENCES[refType].realSize   // e.g. Sun diameter in metres
realRatio = realH / refRealSize              // how tall the pile is vs the reference
clampedRatio = clamp(realRatio, 0.25, 9)     // keep readable
pileHeightPx = REF_DISPLAY_SIZES[refType] * clampedRatio
```

Then capped per platform:
- **Desktop**: `min(pileHeightPx, innerHeight * 0.22)` — the desktop cap
- **Mobile**: `min(pileHeightPx, 400)` — the mobile cap

### 2. Per-material shrink (`getPileShrink`)

Applied **after** the cap. The same factor scales both the pile height AND the reference object display size, so **their ratio is always preserved**.

```
pileShrink = getPileShrink(material.id, isMobile)
finalPileHeight = rawPileHeight * pileShrink
finalRefSize = baseRefSize * pileShrink      // via sizeFactor prop
```

**Math proof**: ratio = (pile × s) / (ref × s) = pile / ref. The factor cancels.

Currently only active on mobile:
- `0.35` — corundum (ruby), emerald, taaffeite, alexandrite, ammolite, amber-inclusion, moldavite
- `0.85` — diamond, quartz
- `1.0` — everything else (and all desktop)

### 3. Desktop width fix

The visual zone has `w-full` and `overflow-visible` so the cone can spread to its natural width (`pileHeight × 3`) without clipping. The card also uses `overflow-visible`.

## How to adjust

### "Pile is too big on mobile for material X"

Edit `getPileShrink()` in `MaterialCard.tsx`. Add the material ID to the mobile switch with a factor < 1. Lower = smaller. Both pile and reference shrink together.

### "All piles are too big/small on desktop"

Change the desktop cap multiplier in `useDesktopCap()`:
```ts
const update = () => setCap(Math.round(window.innerHeight * 0.22));
//                                                           ^^^^
```

### "All piles are too big/small on mobile"

Change `mobileCap` in `getPileHeight()`:
```ts
const mobileCap = 400;
```

### "Pile is clipped on the sides"

The cone base width is `pileHeight × 3`. Make sure these are all `overflow-visible`:
- `.material-card` (the outer card)
- `.snap-animate` zone (the visual row)

The visual zone needs `w-full` so the flex-1 pile container can grow to its `maxWidth`.

### "Reference object is the wrong size"

Base sizes are in `REF_DISPLAY_SIZES` (MaterialCard.tsx) and duplicated in `ScaleReference.tsx`. They must match:
```
heliosphere: 100, solar-system: 100, sun: 100,
earth: 100, everest: 100, statue: 80, human: 70
```

### "Pile-to-reference ratio looks wrong"

The ratio is governed by `clampedRatio` (0.25–9× range) in `getPileHeight`. The shrink factor **cannot** break the ratio — it's mathematically impossible. If the ratio looks off, check:
1. The viewport cap is distorting it (pile capped but ref at full size) — this is expected
2. `REF_DISPLAY_SIZES` mismatch between MaterialCard.tsx and ScaleReference.tsx

## Key files

- `src/components/MaterialCard.tsx` — `getPileShrink()`, `getPileHeight()`, `useDesktopCap()`, layout
- `src/components/ScaleReference.tsx` — `sizeFactor` prop, `REF_DISPLAY_SIZES`, reference SVGs
- `src/components/ParticlePile.tsx` — `pileScale` prop controls cone size within canvas

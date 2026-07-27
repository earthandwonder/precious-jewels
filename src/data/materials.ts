export type MaterialCategory = "mineral" | "biological" | "earth-impact";

export type Act = 1 | 2 | 3;

export interface Material {
  id: string;
  name: string;
  formula?: string;
  category: MaterialCategory;
  act: Act;
  logMass: number; // log10 of estimated cosmic mass in kg
  density: number; // kg/m³ — used to compute real pile volume
  color: string; // hex color for the particle pile
  glowColor: string; // hex color for glow effects
  tagline: string; // short hook shown on scroll
  description: string; // longer explanation
  scaleComparison?: string; // shrinking-object ladder text
}

export const ACT_TITLES = {
  1: {
    title: "The Cosmos Makes These by the Planet-Load",
    subtitle:
      "Every 'precious' gem you know is one of the most abundant materials in the universe.",
    logRange: [40, 50] as const,
  },
  2: {
    title: "The Beryllium Cliff",
    subtitle:
      "Beryllium isn't forged in stars — it's made when cosmic rays smash into heavier atoms. Every gem that needs it is genuinely rare.",
    logRange: [25, 39] as const,
  },
  3: {
    title: "Life on One Planet",
    subtitle:
      "Minerals form on trillions of worlds. Life — as far as we know — happened on one. Everything below this line exists only on Earth.",
    logRange: [0, 24] as const,
  },
} as const;

export const materials: Material[] = [
  // ═══════════════════════════════════════════
  // ACT I — Cosmically abundant minerals
  // ═══════════════════════════════════════════
  {
    id: "olivine",
    name: "Peridot",
    formula: "Mg₂SiO₄",
    category: "mineral",
    act: 1,
    logMass: 49,
    density: 3300,
    color: "#8DB600",
    glowColor: "#C5E17A",
    tagline: "The most abundant gemstone in the universe",
    description:
      "Olivine is the dominant mineral in every rocky planet's mantle, and it condenses directly from the cooling winds of dying stars. There is more peridot in the universe than there is water on Earth — by a factor of a trillion trillion.",
    scaleComparison: "If all the peridot were an ocean, it would fill a billion Milky Way galaxies.",
  },
  {
    id: "corundum",
    name: "Ruby & Sapphire",
    formula: "Al₂O₃",
    category: "mineral",
    act: 1,
    logMass: 47,
    density: 4000,
    color: "#E0115F",
    glowColor: "#FF6B8A",
    tagline: "Born in the atmospheres of dying stars",
    description:
      "Corundum — the mineral that gives us both rubies and sapphires — forms when aluminium oxide condenses in the searing atmospheres of red giant stars. It's one of the first minerals to crystallise from a cooling stellar wind.",
    scaleComparison:
      "Enough ruby and sapphire to bury every planet in the solar system kilometres deep.",
  },
  {
    id: "garnet",
    name: "Garnet",
    formula: "X₃Y₂(SiO₄)₃",
    category: "mineral",
    act: 1,
    logMass: 46,
    density: 3800,
    color: "#7B3F61",
    glowColor: "#B5658A",
    tagline: "Hidden deep inside every rocky world",
    description:
      "Garnet dominates the deep mantles of rocky planets — from 250 to 600 km down. Any world big enough to have pressure has garnet. The universe is full of rocky worlds.",
    scaleComparison: "A sphere of garnet wider than the orbit of Neptune.",
  },
  {
    id: "diamond",
    name: "Diamond",
    formula: "C",
    category: "mineral",
    act: 1,
    logMass: 45,
    density: 3500,
    color: "#B9F2FF",
    glowColor: "#E0F7FF",
    tagline: "The symbol of rarity is cosmically common",
    description:
      "Diamond nanocrystals litter the interstellar medium. They rain from the methane atmospheres of ice giants. Carbon — the fourth most abundant element — becomes diamond wherever pressure and temperature align, and the universe provides both generously.",
    scaleComparison:
      "All the diamond in the universe would make a planet ten times the mass of Earth.",
  },
  {
    id: "quartz",
    name: "Quartz & Amethyst",
    formula: "SiO₂",
    category: "mineral",
    act: 1,
    logMass: 45,
    density: 2650,
    color: "#9B59B6",
    glowColor: "#C39BD3",
    tagline: "The second most abundant mineral in Earth's crust",
    description:
      "Quartz needs silica-rich, differentiated crust — rarer than raw mantle minerals, but still staggeringly common across the trillions of rocky planets. Amethyst is just quartz with a trace of irradiated iron.",
    scaleComparison: "Enough amethyst to build a mountain range spanning a galaxy.",
  },
  {
    id: "zircon",
    name: "Zircon",
    formula: "ZrSiO₄",
    category: "mineral",
    act: 1,
    logMass: 43,
    density: 4700,
    color: "#E8B960",
    glowColor: "#F5D89A",
    tagline: "The oldest surviving mineral on Earth — 4.4 billion years",
    description:
      "Zircon crystals are the most durable timekeepers in geology. The oldest material ever found on Earth is a zircon grain from Western Australia, 4.4 billion years old. Zirconium is a trace element cosmically, but trillions of rocky worlds each contribute their share.",
  },
  {
    id: "jadeite",
    name: "Jadeite",
    formula: "NaAlSi₂O₆",
    category: "mineral",
    act: 1,
    logMass: 42,
    density: 3300,
    color: "#00A86B",
    glowColor: "#66CDAA",
    tagline: "Forged in the collision zones of tectonic plates",
    description:
      "Jadeite needs immense pressure — it forms only where one tectonic plate dives beneath another. Not every rocky world has plate tectonics, but enough do. Imperial jade, the vivid green variety, requires a chromium trace that makes it genuinely uncommon.",
  },
  {
    id: "opal",
    name: "Opal",
    formula: "SiO₂·nH₂O",
    category: "mineral",
    act: 1,
    logMass: 41,
    density: 2100,
    color: "#FF6F61",
    glowColor: "#FFA07A",
    tagline: "It needs liquid water — and most worlds don't have it",
    description:
      "Opal is silica that precipitated from water, trapping it in a lattice of nanospheres that diffract light into fire. It requires a world with liquid water — a far rarer condition than most people realise. Opal has been detected on Mars.",
  },

  // ═══════════════════════════════════════════
  // ACT II — Beryllium-limited and geologically rare
  // ═══════════════════════════════════════════
  {
    id: "emerald",
    name: "Emerald",
    formula: "Be₃Al₂Si₆O₁₈",
    category: "mineral",
    act: 2,
    logMass: 38,
    density: 2700,
    color: "#50C878",
    glowColor: "#7DCEA0",
    tagline: "The rarest element you've never heard of",
    description:
      "Emerald's secret is beryllium — an element so cosmically rare it isn't even made inside stars. Beryllium is produced only when high-energy cosmic rays slam into heavier atoms and shatter them. Every emerald in existence is built from the debris of these collisions.",
    scaleComparison:
      "All the emerald in the universe would fit inside a small moon.",
  },
  {
    id: "red-beryl",
    name: "Red Beryl",
    formula: "Be₃Al₂Si₆O₁₈ + Mn",
    category: "mineral",
    act: 2,
    logMass: 35,
    density: 2700,
    color: "#DC143C",
    glowColor: "#FF4444",
    tagline: "A thousand times rarer than diamond — even on Earth",
    description:
      "Red beryl has the same beryllium bottleneck as emerald, but demands an additional coincidence: manganese as a chromophore, inside a very specific type of rhyolitic lava flow. On Earth, there is exactly one commercial deposit, in Utah.",
  },
  {
    id: "taaffeite",
    name: "Taaffeite",
    formula: "BeMgAl₄O₈",
    category: "mineral",
    act: 2,
    logMass: 33,
    density: 3600,
    color: "#DDA0DD",
    glowColor: "#EE82EE",
    tagline: "So rare it was misidentified for years",
    description:
      "Taaffeite was first discovered in 1945 — already cut and polished, sitting in a jeweller's box, mistaken for spinel. Fewer than fifty specimens have ever been found. It needs beryllium, magnesium, and aluminium to meet in a specific crystal structure that almost never forms.",
  },
  {
    id: "alexandrite",
    name: "Alexandrite",
    formula: "BeAl₂O₄ + Cr",
    category: "mineral",
    act: 2,
    logMass: 32,
    density: 3700,
    color: "#4B0082",
    glowColor: "#8A2BE2",
    tagline: "Two enemies forced to cooperate",
    description:
      "Alexandrite needs beryllium and chromium — but these two elements are geochemical enemies. Beryllium concentrates in evolved, silica-rich rocks. Chromium concentrates in primitive, iron-rich mantle rocks. They almost never meet. When they do, you get a gem that changes colour from green to red depending on the light.",
  },
  {
    id: "benitoite",
    name: "Benitoite",
    formula: "BaTiSi₃O₉",
    category: "mineral",
    act: 2,
    logMass: 29,
    density: 3650,
    color: "#4169E1",
    glowColor: "#6495ED",
    tagline: "One deposit. One county. One state.",
    description:
      "Gem-quality benitoite comes from exactly one place on Earth: San Benito County, California. It forms when barium-rich hydrothermal fluids alter serpentinite under very specific pressure and temperature. The mine is exhausted. No more will ever be found there.",
  },
  {
    id: "painite",
    name: "Painite",
    formula: "CaZrBAl₉O₁₅(OH)",
    category: "mineral",
    act: 2,
    logMass: 27,
    density: 4010,
    color: "#8B4513",
    glowColor: "#CD853F",
    tagline: "Once the rarest mineral on Earth",
    description:
      "Painite held the Guinness record for rarest mineral for decades. It needs calcium, zirconium, boron, and aluminium to converge in one rock — elements with completely different geochemical affinities. Fewer than a thousand crystals have ever been found, almost all from a single region of Myanmar.",
  },

  // ═══════════════════════════════════════════
  // ACT III — Biological / Earth-only
  // ═══════════════════════════════════════════
  {
    id: "ammonite",
    name: "Ammonite",
    category: "biological",
    act: 3,
    logMass: 16,
    density: 2700,
    color: "#D4A574",
    glowColor: "#E8C9A0",
    tagline: "340 million years of ocean life, fossilised in stone",
    description:
      "Ammonites ruled Earth's oceans for 340 million years before the asteroid that killed the dinosaurs wiped them out too. Their spiralling shells are embedded in marine rock across every continent. But they only ever existed here.",
  },
  {
    id: "wood",
    name: "Wood",
    category: "biological",
    act: 3,
    logMass: 15,
    density: 500,
    color: "#6B4423",
    glowColor: "#8B6914",
    tagline: "Rarer than diamond",
    description:
      "There are about 3 trillion trees on Earth, holding roughly 700 billion tonnes of wood. That sounds like a lot — until you remember that diamond exists on trillions of worlds. Wood exists on one. By cosmic measure, a wooden ring is thirty orders of magnitude rarer than a diamond one.",
    scaleComparison:
      "If all the diamond in the universe were the Pacific Ocean, all the wood is a single raindrop.",
  },
  {
    id: "shell",
    name: "Shell & Nacre",
    category: "biological",
    act: 3,
    logMass: 14,
    density: 2800,
    color: "#FFF5EE",
    glowColor: "#FFEFD5",
    tagline: "Every iridescent shell — only here",
    description:
      "Mother-of-pearl — nacre — is aragonite crystals laid down in microscopic brick-and-mortar layers by living mollusks. The iridescence comes from the layers being thinner than a wavelength of light. No geological process produces it. Only life does.",
  },
  {
    id: "petrified-wood",
    name: "Petrified Wood",
    category: "biological",
    act: 3,
    logMass: 12,
    density: 2600,
    color: "#A0522D",
    glowColor: "#CD853F",
    tagline: "Trees turned to stone, cell by cell",
    description:
      "Petrified wood is what happens when silica-rich groundwater slowly replaces every cell of a buried tree with quartz, preserving the grain, the rings, even the bark. It requires trees — which require life — which, as far as we know, requires this one planet.",
  },
  {
    id: "jet",
    name: "Jet",
    category: "biological",
    act: 3,
    logMass: 9,
    density: 1300,
    color: "#1A1A1A",
    glowColor: "#404040",
    tagline: "Fossilised driftwood from the Jurassic",
    description:
      "Jet is ancient conifer wood, compressed under ocean sediments for 180 million years until it became a hard, lustrous black stone. Queen Victoria made it famous as mourning jewellery. It is fossilised biology — doubly rare.",
  },
  {
    id: "amber",
    name: "Amber",
    category: "biological",
    act: 3,
    logMass: 9,
    density: 1050,
    color: "#FFBF00",
    glowColor: "#FFD700",
    tagline: "Ancient tree blood, hardened by time",
    description:
      "Amber is fossilised tree resin — not sap, but the sticky defensive secretion trees produce when wounded. The Baltic deposit alone holds an estimated 640,000 tonnes, laid down 44 million years ago in a vast forest that no longer exists. All of it: one planet.",
  },
  {
    id: "coral",
    name: "Precious Coral",
    category: "biological",
    act: 3,
    logMass: 8,
    density: 2700,
    color: "#FF4040",
    glowColor: "#FF6B6B",
    tagline: "Built by tiny animals, colony by colony",
    description:
      "Precious coral — Corallium rubrum — is not reef coral. It's a slow-growing deep-water animal that builds a dense, polishable skeleton of calcium carbonate. Mediterranean fishers have harvested it for millennia. Populations have crashed 80% since the 1970s.",
  },
  {
    id: "ammolite",
    name: "Ammolite",
    category: "biological",
    act: 3,
    logMass: 7,
    density: 2800,
    color: "#FF1493",
    glowColor: "#FF69B4",
    tagline: "A gemstone from one place on Earth, and nowhere else",
    description:
      "Ammolite is the iridescent aragonite shell of Placenticeras ammonites, found almost exclusively in a narrow belt along the St. Mary River in southern Alberta, Canada. One species. One geological formation. One planet. Gem-grade material may run out within decades.",
  },
  {
    id: "amber-inclusion",
    name: "Amber with Insect",
    category: "biological",
    act: 3,
    logMass: 6,
    density: 1050,
    color: "#CC8400",
    glowColor: "#E6A800",
    tagline: "A whole creature, frozen in tree resin for 40 million years",
    description:
      "Only about one in a thousand pieces of amber contains an insect. Of those, only 10% are well-enough preserved to identify. Each one is a time capsule: a creature that landed on a sticky wound on a tree, 40 million years ago, on the only planet known to have trees, or insects, or resin.",
  },
  {
    id: "moldavite",
    name: "Moldavite",
    category: "earth-impact",
    act: 3,
    logMass: 5.4,
    density: 2400,
    color: "#556B2F",
    glowColor: "#6B8E23",
    tagline: "Earth's crust, turned to glass by a cosmic impact",
    description:
      "14.7 million years ago, an asteroid slammed into what is now Bavaria with enough force to vaporise the ground. The molten glass rained across central Europe and solidified mid-flight. About 275 tonnes survive today. Erosion has destroyed 99% of what was created. No more will ever form — unless another asteroid hits.",
  },
  {
    id: "pearl",
    name: "Natural Pearl",
    category: "biological",
    act: 3,
    logMass: 5,
    density: 2700,
    color: "#FDEBD0",
    glowColor: "#FFF8DC",
    tagline: "The rarest wearable material in the known universe",
    description:
      "A natural pearl forms when a living mollusk — an oyster, a mussel — wraps an irritant in layer after layer of nacre. One in ten thousand wild oysters produces a gem pearl. No other world is known to have oceans, or mollusks, or the patient biology that builds a pearl. Of everything you could wear, this is the rarest thing in all of existence.",
    scaleComparison:
      "If all the peridot in the universe were the Pacific Ocean, all the natural pearls on Earth wouldn't fill a thimble.",
  },
];

// Interstitial text between acts
export const interstitials = {
  "1-2": {
    heading: "Now things get genuinely rare.",
    body: "Everything above exists on trillions of worlds. But the minerals below depend on beryllium — an element so scarce the universe barely makes it. Beryllium isn't forged in stellar cores like carbon or iron. It's created only when cosmic rays slam into heavier atoms at near-light speed and shatter them. The entire cosmos has produced less beryllium than a single star produces iron in a day.",
    multiplierLabel: "The gap you just crossed",
    multiplierValue: "1,000\u00D7",
  },
  "2-3": {
    heading: "One planet.",
    body: "Every mineral above forms on rocky worlds, and there are an estimated ten sextillion of them. But everything below this line was made by life — and life, as far as we know, happened exactly once. You're about to cross the largest cliff on this page: a drop of twenty-five orders of magnitude. Not because these materials are chemically exotic. Because they're biological.",
    multiplierLabel: "The gap you just crossed",
    multiplierValue: "100,000,000,000\u00D7",
  },
};

// Counter display configuration
export const counterConfig = {
  uncountableThreshold: 20, // logMass above this shows "uncountable" style
  countableThreshold: 10, // logMass below this shows actual numbers
  units: [
    { max: 50, label: "trillion Earth-masses" },
    { max: 40, label: "Earth-masses" },
    { max: 30, label: "Moon-masses" },
    { max: 20, label: "Mount Everests" },
    { max: 15, label: "Great Pyramids" },
    { max: 10, label: "tonnes" },
    { max: 7, label: "kilograms" },
  ] as const,
};

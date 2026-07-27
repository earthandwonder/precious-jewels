export type MaterialCategory = "mineral" | "biological" | "earth-impact";

export type Act = 1 | 2 | 3;

export interface Material {
  id: string;
  name: string;
  category: MaterialCategory;
  act: Act;
  logVolume: number; // log10 of estimated total cosmic volume in m³
  density: number; // kg/m³ — used to compute real pile volume
  color: string; // hex color for the particle pile
  glowColor: string; // hex color for glow effects
  tagline: string; // short hook shown on scroll
  description: string; // longer explanation
  scaleComparison?: string; // shrinking-object ladder text
  derivation?: {
    steps: string[];
    sources: string[];
  };
}

export const ACT_TITLES = {
  1: {
    title: "The Cosmos Makes These by the Planet-Load",
    subtitle:
      "Every 'precious' gem you know is one of the most abundant materials in the universe.",
    logRange: [35, 44] as const,
  },
  2: {
    title: "The Beryllium Cliff",
    subtitle:
      "Beryllium isn't forged in stars — it's made when cosmic rays smash into heavier atoms. Most gems below need beryllium to form. The rest demand an equally improbable convergence of elements.",
    logRange: [20, 30] as const,
  },
  3: {
    title: "Life on One Planet",
    subtitle:
      "Minerals form on trillions of worlds. Life — as far as we know — happened on one. Everything below this line exists only on Earth.",
    logRange: [0, 13] as const,
  },
} as const;

export const materials: Material[] = [
  // ═══════════════════════════════════════════
  // ACT I — Cosmically abundant minerals
  // ═══════════════════════════════════════════
  {
    id: "corundum",
    name: "Ruby & Sapphire",
    category: "mineral",
    act: 1,
    logVolume: 43.4,
    density: 4000,
    color: "#E0115F",
    glowColor: "#FF6B8A",
    tagline: "Born in the atmospheres of dying stars",
    description:
      "Corundum — the mineral that gives us both rubies and sapphires — is one of the first minerals to crystallise from a cooling stellar wind. The same crystal, coloured red by chromium or blue by iron and titanium.",
    scaleComparison:
      "Enough ruby and sapphire to bury every planet in the solar system kilometres deep.",
    derivation: {
      steps: [
        "Al₂O₃ is ~0.01-0.1% of interstellar dust (~10⁵⁰ kg total) → ~10⁴⁶–10⁴⁷ kg of corundum.",
      ],
      sources: [
        "Lodders (2003) ApJ — condensation temperatures",
        "Ferrarotti & Gail (2006) — AGB star dust production",
        "Draine (2003) ARAA — interstellar dust grains",
      ],
    },
  },
  {
    id: "garnet",
    name: "Garnet",
    category: "mineral",
    act: 1,
    logVolume: 42.4,
    density: 3800,
    color: "#7B3F61",
    glowColor: "#B5658A",
    tagline: "Crushed into existence in the deep mantle of every rocky planet",
    description:
      "Any world big enough to have pressure has garnet — from 250 to 600 km down. The universe is full of rocky worlds.",
    scaleComparison: "A sphere of garnet wider than the orbit of Neptune.",
    derivation: {
      steps: [
        "~20-25% of upper mantle/transition zone. ~3 × 10²³ kg per Earth × ~10²³ rocky planets.",
      ],
      sources: [
        "Stixrude & Lithgow-Bertelloni (2012) — mantle mineralogy",
        "Cassan et al. (2012) Nature — rocky planet frequency",
      ],
    },
  },
  {
    id: "diamond",
    name: "Diamond",
    category: "mineral",
    act: 1,
    logVolume: 41.5,
    density: 3500,
    color: "#B9F2FF",
    glowColor: "#E0F7FF",
    tagline: "Rained from methane skies, scattered through interstellar dust",
    description:
      "Carbon — the fourth most abundant element — becomes diamond wherever pressure and temperature align. The universe provides both generously.",
    scaleComparison:
      "A sphere of diamond stretching far past the orbit of Pluto.",
    derivation: {
      steps: [
        "~5% of interstellar carbon is nano-diamond → ~10⁴⁷ kg. Ice giant diamond rain adds ~10⁴⁷ kg more.",
        "Conservative estimate (planetary diamond only): ~10⁴⁵ kg.",
      ],
      sources: [
        "Lewis et al. (1987) Nature — interstellar diamonds in meteorites",
        "Kraus et al. (2017) Nature Astronomy — diamond rain on ice giants",
      ],
    },
  },
  {
    id: "quartz",
    name: "Quartz & Amethyst",
    category: "mineral",
    act: 1,
    logVolume: 41.6,
    density: 2650,
    color: "#9B59B6",
    glowColor: "#C39BD3",
    tagline: "Crystallised wherever silica and water meet inside a cooling crust",
    description:
      "Rarer than raw mantle minerals, but still staggeringly common across trillions of rocky planets. Amethyst is just quartz with a trace of irradiated iron.",
    scaleComparison: "Enough amethyst to build a mountain range spanning a galaxy.",
    derivation: {
      steps: [
        "~12% of continental crust. ~2.6 × 10²¹ kg per Earth × ~10²² differentiated planets ≈ 10⁴³ kg.",
        "Upper range estimate — not all rocky planets form silica-rich crust.",
      ],
      sources: [
        "Wedepohl (1995) Geochimica — continental crust composition",
      ],
    },
  },
  {
    id: "zircon",
    name: "Zircon",
    category: "mineral",
    act: 1,
    logVolume: 39.3,
    density: 4700,
    color: "#E8B960",
    glowColor: "#F5D89A",
    tagline: "Crystallised 4.4 billion years ago — and survived everything since",
    description:
      "Zircon crystals are the most durable timekeepers in geology. The oldest material ever found on Earth is a zircon grain from Western Australia, 4.4 billion years old. Zirconium is a trace element cosmically, but trillions of rocky worlds each contribute their share.",
    derivation: {
      steps: [
        "Zr: ~10 ppm of Earth's mass → ~9 × 10¹⁹ kg of ZrSiO₄ per planet × 10²³ planets.",
      ],
      sources: [
        "Wilde et al. (2001) Nature — Jack Hills zircon (4.404 Ga)",
        "Lodders et al. (2009) — solar system abundances",
      ],
    },
  },
  {
    id: "jadeite",
    name: "Jadeite",
    category: "mineral",
    act: 1,
    logVolume: 38.5,
    density: 3300,
    color: "#00A86B",
    glowColor: "#66CDAA",
    tagline: "Forged in the collision zones of tectonic plates",
    description:
      "Not every rocky world has plate tectonics, but enough do. Imperial jade — the vivid green variety — requires a chromium trace that makes it genuinely uncommon.",
    derivation: {
      steps: [
        "~10-30% of rocky planets have plate tectonics. ~10²⁰ kg jadeite-facies material per tectonic world × ~10²² planets.",
      ],
      sources: [
        "Jadeite stability field in subduction zones — standard petrology",
      ],
    },
  },
  {
    id: "opal",
    name: "Opal",
    category: "mineral",
    act: 1,
    logVolume: 35.7,
    density: 2100,
    color: "#FF6F61",
    glowColor: "#FFA07A",
    tagline: "Silica dissolved in water, settled into a lattice that splits light into fire",
    description:
      "It requires a world with liquid water — a far rarer condition than most people realise. Opal has been detected on Mars.",
    derivation: {
      steps: [
        "Requires liquid water. ~1-10% of rocky planets have water history → ~10²¹ water-worlds × ~10¹⁵ kg opal each.",
      ],
      sources: [
        "Curiosity rover opal detection in Gale Crater — JGR (2023)",
        "Mars Reconnaissance Orbiter — hydrated silica",
      ],
    },
  },

  // ═══════════════════════════════════════════
  // ACT II — Beryllium-limited and geologically rare
  // ═══════════════════════════════════════════
  {
    id: "emerald",
    name: "Emerald",
    category: "mineral",
    act: 2,
    logVolume: 29.6,
    density: 2700,
    color: "#50C878",
    glowColor: "#7DCEA0",
    tagline: "Built from cosmic ray debris — beryllium, an element stars can't make",
    description:
      "Every emerald in existence started as atomic shrapnel. The beryllium bottleneck means emerald can never be cosmically common — no matter how many rocky worlds there are.",
    scaleComparison:
      "All the emerald in the universe would fit in a sphere about six times wider than the Sun.",
    derivation: {
      steps: [
        "Be abundance: ~1.5 × 10⁻¹⁰ by mass (spallation only). ~10⁻⁹ to 10⁻⁸ of crustal Be forms beryl on Earth.",
        "Earth's emerald: ~10⁹ kg. Scaled across ~10²² suitable planets → ~10³¹ kg. Upper bound ~10³³ kg.",
      ],
      sources: [
        "Lodders et al. (2009) — solar system abundances",
        "Reeves (1970) — cosmic ray spallation as sole Be-9 source",
      ],
    },
  },
  {
    id: "red-beryl",
    name: "Red Beryl",
    category: "mineral",
    act: 2,
    logVolume: 26.6,
    density: 2700,
    color: "#DC143C",
    glowColor: "#FF4444",
    tagline: "The same impossible element, plus one more coincidence",
    description:
      "Same beryllium bottleneck as emerald, plus manganese inside a very specific type of rhyolitic lava flow. On Earth, there's one commercial deposit — in Utah. But trillions of rocky worlds each roll those dice. One red beryl crystal for every 150,000 gem diamonds.",
    derivation: {
      steps: [
        "Same Be bottleneck as emerald, plus Mn in rhyolitic lava. ~1,000× rarer — one commercial deposit exists on Earth.",
        "Utah Geological Survey: 1 red beryl crystal per 150,000 gem diamonds.",
      ],
      sources: [
        "Utah Geological Survey — red beryl rarity",
      ],
    },
  },
  {
    id: "taaffeite",
    name: "Taaffeite",
    category: "mineral",
    act: 2,
    logVolume: 24.4,
    density: 3600,
    color: "#DDA0DD",
    glowColor: "#EE82EE",
    tagline: "Four reluctant elements, forced into a crystal that almost never forms",
    description:
      "First discovered in 1945 — already cut and polished, sitting in a jeweller's box, mistaken for spinel. Fewer than a thousand faceted stones are known on Earth. The crystal structure almost never nucleates — but across enough worlds, almost never still adds up.",
    derivation: {
      steps: [
        "BeMgAl₄O₈ — same Be scarcity, but the crystal structure almost never nucleates. <1,000 faceted stones known.",
      ],
      sources: [
        "GIA and gemological literature — specimen counts",
      ],
    },
  },
  {
    id: "alexandrite",
    name: "Alexandrite",
    category: "mineral",
    act: 2,
    logVolume: 23.4,
    density: 3700,
    color: "#4B0082",
    glowColor: "#8A2BE2",
    tagline: "Beryllium from the crust, chromium from the mantle — they almost never meet",
    description:
      "When they do meet, you get a gem that changes colour from green to red depending on the light. Geochemical enemies producing something beautiful.",
    derivation: {
      steps: [
        "BeAl₂O₄ + Cr³⁺. Be lives in felsic rocks, Cr in mafic — they converge only at pegmatite-ultramafic contacts.",
      ],
      sources: [
        "GeologyScience — alexandrite formation",
      ],
    },
  },
  {
    id: "benitoite",
    name: "Benitoite",
    category: "mineral",
    act: 2,
    logVolume: 20.4,
    density: 3650,
    color: "#4169E1",
    glowColor: "#6495ED",
    tagline: "Barium-rich fluids altering serpentinite under exact pressure and temperature",
    description:
      "On Earth, gem-quality benitoite comes from one county in California. The mine closed in 2006. But the geology that made it — serpentinite, barium, heat — isn't unique to Earth. Across trillions of worlds, similar accidents add up.",
    derivation: {
      steps: [
        "BaTiSi₃O₉ — not beryllium-limited but equally rare. One gem source on Earth (hundreds of kg total production).",
      ],
      sources: [
        "ResearchGate — '100-year history of the Benitoite Gem mine'",
      ],
    },
  },
  // ═══════════════════════════════════════════
  // ACT III — Biological / Earth-only
  // ═══════════════════════════════════════════
  {
    id: "wood",
    name: "Wood",
    category: "biological",
    act: 3,
    logVolume: 12.0,
    density: 500,
    color: "#6B4423",
    glowColor: "#8B6914",
    tagline: "Grown by living organisms, ring by ring, on only one planet",
    description:
      "There are about 3 trillion trees on Earth, holding roughly 450 billion tonnes of wood. That sounds like a lot — until you remember that diamond exists on trillions of worlds. Wood exists on one. By cosmic measure, a wooden ring is roughly thirty orders of magnitude rarer than a diamond one.",
    scaleComparison:
      "All the wood on Earth would not fill a single large asteroid. All the diamond in the universe would swallow the solar system.",
    derivation: {
      steps: [
        "3.04 trillion trees (Crowther 2015). FAO: ~422 Gt above-ground woody biomass + roots ≈ 450 Gt total.",
      ],
      sources: [
        "Crowther et al. (2015) Nature — global tree density",
        "FAO Global Forest Resources Assessment (2020)",
      ],
    },
  },
  {
    id: "ammonite",
    name: "Ammonite",
    category: "biological",
    act: 3,
    logVolume: 10.6,
    density: 2700,
    color: "#D4A574",
    glowColor: "#E8C9A0",
    tagline: "340 million years of ocean life, fossilised in stone",
    description:
      "Ammonites ruled Earth's oceans for over 300 million years before the asteroid that killed the dinosaurs wiped them out too. Their spiralling shells are embedded in marine rock across every continent. But they only ever existed here.",
    derivation: {
      steps: [
        "Fermi estimate — no published total exists. Most shells dissolved or were subducted; revised down from earlier estimate.",
      ],
      sources: [
        "Ammonoid range: ~400 Ma to 66 Ma (K-Pg extinction)",
      ],
    },
  },
  {
    id: "shell",
    name: "Shell & Nacre",
    category: "biological",
    act: 3,
    logVolume: 10.6,
    density: 2800,
    color: "#FFF5EE",
    glowColor: "#FFEFD5",
    tagline: "Aragonite bricks, mortared by a living animal, thinner than a wavelength of light",
    description:
      "Nacre is aragonite crystals laid down in microscopic brick-and-mortar layers by living mollusks. No geological process produces it. Only life does.",
    derivation: {
      steps: [
        "Fermi estimate — no published total. Marine molluscs produce vast CaCO₃; fossil shell beds are enormous.",
      ],
      sources: [
        "Nacre structure well-characterised in materials science literature",
      ],
    },
  },
  {
    id: "petrified-wood",
    name: "Petrified Wood",
    category: "biological",
    act: 3,
    logVolume: 8.6,
    density: 2600,
    color: "#A0522D",
    glowColor: "#CD853F",
    tagline: "Trees turned to stone, cell by cell",
    description:
      "Silica-rich groundwater slowly replaces every cell of a buried tree with quartz, preserving the grain, the rings, even the bark.",
    derivation: {
      steps: [
        "Fermi estimate. Deposits worldwide. ~3 OoM below living wood — only a tiny fraction gets silicified.",
      ],
      sources: [
        "Quartz replacement process well-documented in geology",
      ],
    },
  },
  {
    id: "jet",
    name: "Jet",
    category: "biological",
    act: 3,
    logVolume: 5.9,
    density: 1300,
    color: "#4A4A4A",
    glowColor: "#6B6B6B",
    tagline: "Fossilised driftwood from the Jurassic",
    description:
      "Jet is ancient conifer wood, compressed under ocean sediments for 180 million years until it became a hard, lustrous black stone. Queen Victoria made it famous as mourning jewellery. It is fossilised biology — doubly rare.",
    derivation: {
      steps: [
        "Fermi estimate. Major deposits: Whitby (UK, ~182 Ma), Asturias (Spain). No published global total.",
      ],
      sources: [
        "Whitby jet: Toarcian age, well-dated at ~181-182 Ma",
      ],
    },
  },
  {
    id: "amber",
    name: "Amber",
    category: "biological",
    act: 3,
    logVolume: 6.0,
    density: 1050,
    color: "#FFBF00",
    glowColor: "#FFD700",
    tagline: "Ancient tree blood, hardened by time",
    description:
      "Amber is fossilised tree resin — not sap, but the sticky defensive secretion trees produce when wounded. The Baltic deposit alone holds an estimated 640,000 tonnes, laid down 44 million years ago in a vast forest that no longer exists. All of it: one planet.",
    derivation: {
      steps: [
        "Baltic deposit: ~640,000 tonnes. Other deposits (Dominican Republic, Myanmar, etc.) add ~300,000+ tonnes.",
      ],
      sources: [
        "Baltic amber tonnage widely cited in geological literature",
      ],
    },
  },
  {
    id: "coral",
    name: "Precious Coral",
    category: "biological",
    act: 3,
    logVolume: 4.6,
    density: 2700,
    color: "#FF4040",
    glowColor: "#FF6B6B",
    tagline: "Built by tiny animals, colony by colony",
    description:
      "Precious coral — Corallium rubrum — is not reef coral. It's a slow-growing deep-water animal that builds a dense, polishable skeleton of calcium carbonate. Mediterranean fishers have harvested it for millennia. Populations have crashed 80% since the 1970s.",
    derivation: {
      steps: [
        "Fermi estimate — no published global biomass. Peak catches ~98 t/year (1978); millennia of deep-water growth.",
      ],
      sources: [
        "FAO data — red coral catch decline ~80% since 1978",
        "Santangelo & Bramanti — population studies",
      ],
    },
  },
  {
    id: "ammolite",
    name: "Ammolite",
    category: "biological",
    act: 3,
    logVolume: 3.6,
    density: 2800,
    color: "#FF1493",
    glowColor: "#FF69B4",
    tagline: "One extinct species, one river in Alberta, 70 million years underground",
    description:
      "The iridescent shell of one extinct ammonite species, found in a narrow belt along the St. Mary River. Gem-grade material may run out within decades.",
    derivation: {
      steps: [
        "Fermi estimate. Bearpaw Formation, Alberta — sole significant source. No published total tonnage.",
      ],
      sources: [
        "GIA and Alberta government geological surveys",
      ],
    },
  },
  {
    id: "amber-inclusion",
    name: "Amber with Insect",
    category: "biological",
    act: 3,
    logVolume: 3.0,
    density: 1050,
    color: "#CC8400",
    glowColor: "#E6A800",
    tagline: "A whole creature, frozen in tree resin for 40 million years",
    description:
      "Only about one in a thousand pieces of amber contains an insect. Of those, only 10% are well-enough preserved to identify. Each one is a time capsule: a creature that landed on a sticky wound on a tree and never left.",
    derivation: {
      steps: [
        "Total amber ≈ 10⁶ tonnes. ~1 in 1,000 pieces contains an insect → ~1,000 tonnes.",
      ],
      sources: [
        "1-in-1,000 ratio — amber and entomological literature",
      ],
    },
  },
  {
    id: "moldavite",
    name: "Moldavite",
    category: "earth-impact",
    act: 3,
    logVolume: 2.0,
    density: 2400,
    color: "#556B2F",
    glowColor: "#6B8E23",
    tagline: "Earth's crust, turned to glass by a cosmic impact",
    description:
      "14.8 million years ago, an asteroid slammed into what is now Bavaria with enough force to vaporise the ground. The molten glass rained across central Europe and solidified mid-flight. About 275 tonnes survive today. Erosion has destroyed 99% of what was created. No more will ever form — unless another asteroid hits.",
    derivation: {
      steps: [
        "~275 tonnes survive (Trnka & Houzar 2002). Ries impact dated to 14.808 ± 0.038 Ma.",
      ],
      sources: [
        "Trnka & Houzar (2002) — moldavite mass estimates",
        "Schmieder & Buchner (2008) — Ries crater dating",
      ],
    },
  },
  {
    id: "pearl",
    name: "Natural Pearl",
    category: "biological",
    act: 3,
    logVolume: 1.6,
    density: 2700,
    color: "#FDEBD0",
    glowColor: "#FFF8DC",
    tagline: "A mollusk's slow answer to a grain of sand",
    description:
      "One in ten thousand wild oysters produces a gem pearl. Every natural pearl that has ever existed would fit inside a single room. Of everything you could wear, this is the rarest thing in all of existence.",
    scaleComparison:
      "Every natural pearl that has ever existed would fit inside a single room.",
    derivation: {
      steps: [
        "1 in 10,000 wild oysters produces a gem pearl. Total surviving natural pearls: Fermi estimate ~100 tonnes.",
      ],
      sources: [
        "GIA — 1-in-10,000 gem pearl ratio",
      ],
    },
  },
];

// Interstitial text between acts
export const interstitials = {
  "1-2": {
    heading: "Now things get genuinely rare. These piles may look large — but this is all there is, everywhere.",
    body: "Everything below needs beryllium — an element stars can't make. It's created only when cosmic rays shatter heavier atoms at near-light speed.",
  },
  "2-3": {
    heading: "One planet.",
    body: "Everything below was made by life. You're surrounded by some of the rarest stuff in the universe.",
  },
};

// Counter display configuration
export const counterConfig = {
  uncountableThreshold: 20, // logVolume above this shows "uncountable" style
  countableThreshold: 10, // logVolume below this shows actual numbers
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

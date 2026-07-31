import type { Product } from "@/components/ProductCard";

/**
 * Inline products — shown on the MaterialCard itself.
 * Only high-conversion materials where the essay copy has done the selling.
 * Keys match material.id from materials.ts.
 *
 * Image requirements: stone is the hero, minimal setting, dark/transparent
 * background preferred. See docs/conversion-strategy.md for full brief.
 */
export const inlineProducts: Record<string, Product[]> = {
  opal: [
    {
      name: "Lightning Ridge Black Opal — 9.89ct Natural Solid",
      price: "$2,860",
      url: "https://www.etsy.com/au/listing/1275994599/169-x-13mm-989ct-australian-black-opal",
      imageUrl: "/p/rarest-gemstones/samples/opal3.png",
    },
  ],
  moldavite: [
    {
      name: "AAA Raw Moldavite — Museum Piece",
      price: "$89",
      url: "https://www.etsy.com/au/listing/1547899512/aaa-raw-moldavite-museum-piece",
      imageUrl: "/p/rarest-gemstones/samples/moldavite2.png",
    },
  ],
  alexandrite: [
    {
      name: "Fireworks Cut Color-Change Alexandrite Pendant — Sterling Silver",
      price: "$180",
      url: "https://www.etsy.com/au/listing/4411411619/fireworks-cut-color-change-alexandrite",
      imageUrl: "/p/rarest-gemstones/samples/alexandrite1.png",
    },
  ],
  ammolite: [
    {
      name: "Ammolite Shell Pendant — Sterling Silver",
      price: "$100",
      url: "https://www.etsy.com/au/listing/1508401721/ammolite-necklace-sterling-silver",
      imageUrl: "/p/rarest-gemstones/samples/ammolite1.png",
    },
  ],
  "amber-inclusion": [
    {
      name: "Baltic Amber with Insect Inclusion — Natural Fossil Specimen",
      price: "$45",
      url: "https://www.etsy.com/au/listing/4366141942/rare-caddisfly-inclusion-amber-cabochon",
      imageUrl: "/p/rarest-gemstones/samples/amber-inclusion3.png",
    },
  ],
  pearl: [
    {
      name: "14.8mm White Round Edison Pearl — Loose Freshwater",
      price: "$584",
      url: "https://www.etsy.com/au/listing/1816210836/148mm-white-round-edison-pearl-loose",
      imageUrl: "/p/rarest-gemstones/samples/pearl-edison-macro.png",
    },
  ],
  // Ready to re-enable — images already in public/samples/
  // "red-beryl": [
  //   {
  //     name: "Rare Bixbite Red Beryl Crystal From Utah — 0.24ct",
  //     price: "$55",
  //     url: "https://www.etsy.com/au/listing/4543519356/nice-rare-gem-bixbite-red-emerald-beryl",
  //     imageUrl: "/p/rarest-gemstones/samples/red-beryl1.png",
  //   },
  // ],
  // taaffeite: [
  //   {
  //     name: "Rare Gem Taaffeite Cut Stone From Mogok — 0.63ct",
  //     price: "$235",
  //     url: "https://www.etsy.com/au/listing/4469694679/063-carat-rare-gem-taaffeite-cut-stone",
  //     imageUrl: "/p/rarest-gemstones/samples/taaffeite4.png",
  //   },
  // ],
};

/**
 * Shop-section-only products — shown in the bottom ShopSection.
 * These are Act 1 (cosmically common) materials. They prove the materials
 * are real and wearable, but don't warrant inline placement.
 */
export const shopProducts: Record<string, Product[]> = {
  corundum: [
    {
      name: "Teal Sapphire Stud Earrings — Sterling Silver",
      price: "$195",
      url: "https://www.etsy.com/au/listing/4351859922/teal-sapphire-stud-earrings-sterling",
      imageUrl: "/p/rarest-gemstones/samples/RubySapphire2.png",
    },
  ],
  quartz: [
    {
      name: "Amethyst Purple CZ Marquise Cluster Stud Earrings",
      price: "$48",
      url: "https://www.etsy.com/au/listing/1491023644/amethyst-purple-cz-marquise-cluster-stud",
      imageUrl: "/p/rarest-gemstones/samples/Amethyst.png",
    },
  ],
  jadeite: [
    {
      name: "Natural Certificated Type A Jadeite Bangle",
      price: "$165",
      url: "https://www.etsy.com/au/listing/4390574011/natural-certificated-type-a-54-63mm-blue",
      imageUrl: "/p/rarest-gemstones/samples/jade.png",
    },
  ],
};

/**
 * All products combined — used by ShopSection to show everything.
 */
export const affiliateProducts: Record<string, Product[]> = {
  ...shopProducts,
  ...inlineProducts,
};

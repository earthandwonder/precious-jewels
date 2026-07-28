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
      name: "Black Fire Opal Pendant — Gold Vermeil",
      price: "$60",
      url: "https://www.etsy.com/au/listing/4445734533/large-black-opal-pendant-gold-vermeil",
      imageUrl: "/p/abundant-gems/samples/opal2.png",
    },
  ],
  moldavite: [
    {
      name: "Raw Moldavite Pendant — 925 Sterling Silver",
      price: "$37",
      url: "https://www.etsy.com/au/listing/4395103239/raw-moldavite-pendant-925-sterling",
      imageUrl: "/p/abundant-gems/samples/moldavite.png",
    },
  ],
  alexandrite: [
    {
      name: "Fireworks Cut Color-Change Alexandrite Pendant — Sterling Silver",
      price: "$180",
      url: "https://www.etsy.com/au/listing/4411411619/fireworks-cut-color-change-alexandrite",
      imageUrl: "/p/abundant-gems/samples/alexandrite1.png",
    },
  ],
  ammolite: [
    {
      name: "Ammolite Shell Pendant — Sterling Silver",
      price: "$100",
      url: "https://www.etsy.com/au/listing/1508401721/ammolite-necklace-sterling-silver",
      imageUrl: "/p/abundant-gems/samples/ammolite1.png",
    },
  ],
  "amber-inclusion": [
    {
      name: "Baltic Amber Pendant with Insect Inclusions — Sterling Silver",
      price: "$60",
      url: "https://www.etsy.com/au/listing/4464038627/baltic-amber-with-insect-inclusions-925",
      imageUrl: "/p/abundant-gems/samples/amber-inclusion1.png",
    },
  ],
  pearl: [
    {
      name: "Freshwater Pearl Pendant — Sterling Silver Chain",
      price: "$57",
      url: "https://www.etsy.com/au/listing/1280195347/18-925-sterling-silver-necklace-with-a",
      imageUrl: "/p/abundant-gems/samples/pearl1.png",
    },
  ],
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
      imageUrl: "/p/abundant-gems/samples/RubySapphire2.png",
    },
  ],
  quartz: [
    {
      name: "Amethyst Purple CZ Marquise Cluster Stud Earrings",
      price: "$48",
      url: "https://www.etsy.com/au/listing/1491023644/amethyst-purple-cz-marquise-cluster-stud",
      imageUrl: "/p/abundant-gems/samples/Amethyst.png",
    },
  ],
  jadeite: [
    {
      name: "Natural Certificated Type A Jadeite Bangle",
      price: "$165",
      url: "https://www.etsy.com/au/listing/4390574011/natural-certificated-type-a-54-63mm-blue",
      imageUrl: "/p/abundant-gems/samples/jade.png",
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

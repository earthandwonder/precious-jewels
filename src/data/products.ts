import type { Product } from "@/components/ProductCard";

/**
 * Inline products — shown on the MaterialCard itself.
 * Only high-conversion materials where the essay copy has done the selling.
 * Keys match material.id from materials.ts.
 *
 * TODO (Ben): Source Etsy products for these materials. Priority order:
 *   1. moldavite — alien origin story, #2 rarest, ~$50-200 pendant
 *   2. alexandrite — colour-change stone, ~$150-400, minimal setting
 *   3. amber-inclusion — visible insect, ~$30-150, pendant or necklace
 *   4. ammolite — iridescent fossil, ~$100-400, cabochon pendant
 *   5. pearl — natural pearl pendant for the Finale, ~$80-300
 *
 * Image requirements: stone is the hero, minimal setting, dark/transparent
 * background preferred. See docs/conversion-strategy.md for full brief.
 */
export const inlineProducts: Record<string, Product[]> = {
  // opal keeps inline placement — play-of-colour sells visually
  opal: [
    {
      name: "Minimalist Opal Stud Earrings",
      price: "$95",
      url: "https://www.etsy.com/au/listing/857888625/minimalist-opal-stud-earrings-in",
      imageUrl: "/p/precious-jewels/samples/opal1.png",
    },
  ],
  // TODO: alexandrite
  // TODO: ammolite
  // TODO: amber-inclusion
  // TODO: moldavite
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
      imageUrl: "/p/precious-jewels/samples/RubySapphire2.png",
    },
  ],
  quartz: [
    {
      name: "Amethyst Purple CZ Marquise Cluster Stud Earrings",
      price: "$48",
      url: "https://www.etsy.com/au/listing/1491023644/amethyst-purple-cz-marquise-cluster-stud",
      imageUrl: "/p/precious-jewels/samples/Amethyst.png",
    },
  ],
  jadeite: [
    {
      name: "Natural Certificated Type A Jadeite Bangle",
      price: "$165",
      url: "https://www.etsy.com/au/listing/4390574011/natural-certificated-type-a-54-63mm-blue",
      imageUrl: "/p/precious-jewels/samples/jade.png",
    },
  ],
  garnet: [
    {
      name: "Sterling Silver Natural Garnet Stud Earrings",
      price: "$110",
      url: "https://www.etsy.com/au/listing/1641858407/sterling-silver-natural-garnet-stud",
      imageUrl: "/p/precious-jewels/samples/garnet1.png",
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

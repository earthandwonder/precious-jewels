import type { Product } from "@/components/ProductCard";

/**
 * One affiliate product per material.
 * Keys match material.id from materials.ts.
 * Only materials with real images and links are included.
 */
export const affiliateProducts: Record<string, Product[]> = {
  olivine: [
    {
      name: "Tulip Studs Genuine Natural Peridot 4mm",
      price: "$65",
      url: "https://www.etsy.com/au/listing/386056580/tulip-studs-genuine-natural-peridot-4mm",
      imageUrl: "/p/precious-jewels/samples/peridot2.png",
    },
  ],
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
  opal: [
    {
      name: "Minimalist Opal Stud Earrings",
      price: "$95",
      url: "https://www.etsy.com/au/listing/857888625/minimalist-opal-stud-earrings-in",
      imageUrl: "/p/precious-jewels/samples/opal1.png",
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

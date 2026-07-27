import type { Product } from "@/components/ProductCard";

/**
 * Sample affiliate products per material.
 * Keys match material.id from materials.ts.
 * Products without images yet use placeholder rendering.
 */
export const affiliateProducts: Record<string, Product[]> = {
  olivine: [
    {
      name: "Natural Peridot Oval Stud Earrings 925",
      price: "$78",
      url: "https://www.etsy.com/au/listing/4501440302/natural-peridot-oval-stud-earrings-925",
      imageUrl: "/p/precious-jewels/samples/Peridot1.png",
    },
    {
      name: "Tulip Studs Genuine Natural Peridot 4mm",
      price: "$65",
      url: "https://www.etsy.com/au/listing/386056580/tulip-studs-genuine-natural-peridot-4mm",
      imageUrl: "/p/precious-jewels/samples/peridot2.png",
    },
  ],
  corundum: [
    {
      name: "10k Bezel Ruby Wedding Band",
      price: "$340",
      url: "https://www.etsy.com/au/listing/4529039267/10k-bezel-ruby-wedding-band-ruby",
      imageUrl: "/p/precious-jewels/samples/RubySapphire1.png",
    },
    {
      name: "Teal Sapphire Stud Earrings — Sterling Silver",
      price: "$195",
      url: "https://www.etsy.com/au/listing/4351859922/teal-sapphire-stud-earrings-sterling",
      imageUrl: "/p/precious-jewels/samples/RubySapphire2.png",
    },
  ],
  diamond: [
    {
      name: "Lab Diamond Solitaire Studs — 14k White Gold",
      price: "$310",
      url: "#",
    },
    {
      name: "Raw Diamond Crystal Pendant — Rough Uncut Stone",
      price: "$42",
      url: "#",
    },
  ],
  quartz: [
    {
      name: "Herkimer Smoky Quartz Earrings",
      price: "$65",
      url: "https://www.etsy.com/au/listing/1654199742/herkimer-smoky-quartz-earrings-by",
      imageUrl: "/p/precious-jewels/samples/quartz.png",
    },
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
  emerald: [
    {
      name: "Colombian Emerald Solitaire Ring — 14k Gold",
      price: "$420",
      url: "#",
    },
    {
      name: "Raw Emerald Crystal Pendant — Sterling Silver",
      price: "$85",
      url: "#",
    },
  ],
  alexandrite: [
    {
      name: "Lab Alexandrite Color-Change Ring — Sterling Silver",
      price: "$155",
      url: "#",
    },
  ],
  amber: [
    {
      name: "Baltic Amber Cabochon Pendant — Sterling Silver",
      price: "$89",
      url: "#",
    },
    {
      name: "Baltic Amber Bead Bracelet — Cognac",
      price: "$58",
      url: "#",
    },
  ],
  "amber-inclusion": [
    {
      name: "Baltic Amber with Insect Inclusion — Pendant",
      price: "$145",
      url: "#",
    },
  ],
  ammolite: [
    {
      name: "Ammolite Freeform Pendant — Sterling Silver",
      price: "$220",
      url: "#",
    },
  ],
  moldavite: [
    {
      name: "Raw Moldavite Pendant — Wire Wrapped Sterling",
      price: "$230",
      url: "#",
    },
  ],
  pearl: [
    {
      name: "Natural Baroque Pearl Pendant — 18k Gold Chain",
      price: "$189",
      url: "#",
    },
    {
      name: "Freshwater Pearl Drop Earrings — Sterling Silver",
      price: "$67",
      url: "#",
    },
  ],
  wood: [
    {
      name: "Bentwood Ring — Walnut & Titanium",
      price: "$85",
      url: "#",
    },
  ],
  shell: [
    {
      name: "Mother of Pearl Drop Earrings — 14k Gold",
      price: "$72",
      url: "#",
    },
  ],
  coral: [
    {
      name: "Vintage Red Coral Stud Earrings — Sterling Silver",
      price: "$95",
      url: "#",
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
    {
      name: "Garnet Heart Drop Studs by Caitlyn",
      price: "$85",
      url: "https://www.etsy.com/au/listing/1459803344/garnet-heart-drop-studs-by-caitlyn",
      imageUrl: "/p/precious-jewels/samples/garnet2.png",
    },
  ],
};

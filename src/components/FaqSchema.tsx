/**
 * Structured data (JSON-LD) for search engines.
 * - Article: editorial content signals, author, date
 * - ItemList: ranked list of materials (rich snippet potential)
 * - FAQPage: targets "rarest gemstone" question variants
 */

const materials = [
  "Ruby & Sapphire (corundum)",
  "Quartz & Amethyst",
  "Diamond",
  "Jadeite",
  "Opal",
  "Emerald",
  "Red Beryl",
  "Taaffeite",
  "Alexandrite",
  "Wood",
  "Ammonite",
  "Amber",
  "Precious Coral",
  "Ammolite",
  "Amber with Insect Inclusions",
  "Moldavite",
  "Natural Pearl",
];

export default function FaqSchema() {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Rarest Gemstones (in the Universe)",
    description:
      "27 precious materials ranked by how much exists across the entire universe. The rarest isn't diamond. It's not ruby either.",
    author: {
      "@type": "Person",
      name: "Ben McCarthy",
      url: "https://benmccarthy.com.au",
    },
    publisher: {
      "@type": "Person",
      name: "Ben McCarthy",
      url: "https://benmccarthy.com.au",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://benmccarthy.com.au/p/rarest-gemstones",
    },
    image: "https://benmccarthy.com.au/p/rarest-gemstones/og-emerald.png",
    datePublished: "2026-07-31",
    dateModified: "2026-07-31",
  };

  const itemListData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Gemstones ranked by cosmic rarity",
    description:
      "17 precious materials ranked from most abundant to rarest by total mass across the known universe.",
    numberOfItems: materials.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: materials.map((name, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
    })),
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the rarest gemstone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "When measured by total mass across the entire known universe, the rarest gemstone you could wear is a natural pearl. Every natural pearl that has ever existed would fit inside a single room. Diamond, by contrast, is one of the most abundant gemstones in the cosmos — it rains from the skies of ice giant planets.",
        },
      },
      {
        "@type": "Question",
        name: "What is the rarest gemstone in the world?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "On Earth, the rarest gemstone materials include natural pearl, moldavite (275 tonnes from a single asteroid impact 14.8 million years ago), ammolite (from one extinct species in one river in Alberta), and amber with insect inclusions. Taaffeite and red beryl are among the rarest mineral gems, with fewer than a thousand faceted taaffeite stones known to exist.",
        },
      },
      {
        "@type": "Question",
        name: "What is the rarest mineral on Earth?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The rarest single mineral specimen is kyawthuite — only one crystal has ever been found. Among gem-quality minerals, taaffeite and red beryl are exceptionally rare. Red beryl has one commercial deposit (in Utah), and there is roughly one red beryl crystal for every 150,000 gem diamonds.",
        },
      },
      {
        "@type": "Question",
        name: "Is diamond actually rare?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Diamond is one of the most common gemstone materials in the universe. Carbon is the fourth most abundant element, and diamond forms wherever pressure and temperature align. Scientists believe it rains diamonds inside Uranus and Neptune. On a cosmic scale, ruby, sapphire, and quartz are all more abundant, but diamond is far from rare.",
        },
      },
      {
        "@type": "Question",
        name: "What gemstone is rarer than diamond?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Almost every other gemstone is rarer than diamond when measured by total cosmic abundance. Emerald, alexandrite, taaffeite, and red beryl are all limited by the scarcity of beryllium — an element that can't be forged in stars. Biological gems like natural pearl, amber, and ammolite exist only on Earth, making them billions of times rarer than diamond.",
        },
      },
      {
        "@type": "Question",
        name: "Why is beryllium important for rare gemstones?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Beryllium can't be made inside stars — it's destroyed almost instantly by nuclear fusion. The only way to make it is through cosmic ray spallation: high-energy particles smashing into heavier atoms in interstellar space. This bottleneck limits the total amount of emerald, red beryl, alexandrite, and taaffeite that can ever exist in the universe.",
        },
      },
      {
        "@type": "Question",
        name: "What is the rarest thing you could wear?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A natural pearl. It requires a living mollusk, in an ocean, on a planet with liquid water — and as far as we know, that has only happened on Earth. One in ten thousand wild oysters produces a gem-quality pearl. The total mass of all natural pearls ever formed is estimated at around 100 tonnes.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}

/**
 * Structured data (JSON-LD) for search engines.
 * - Article: editorial content signals, author, date
 * - ItemList: ranked list of materials (rich snippet potential)
 * - FAQPage: targets "rarest gemstone" question variants
 */

import { CONTENT } from "@/data/content";

export default function FaqSchema() {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: CONTENT.schema_headline,
    description: CONTENT.schema_description,
    author: {
      "@type": "Person",
      name: CONTENT.schema_author,
      url: "https://benmccarthy.com.au",
    },
    publisher: {
      "@type": "Person",
      name: CONTENT.schema_author,
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
    name: CONTENT.schema_list_name,
    description: CONTENT.schema_list_description,
    numberOfItems: CONTENT.article_ranking.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: CONTENT.article_ranking.map((name, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
    })),
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CONTENT.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
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

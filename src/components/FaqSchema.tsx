"use client";

/**
 * Structured data (JSON-LD) for search engines.
 * - Article: editorial content signals, author, date
 * - ItemList: ranked list of materials (rich snippet potential)
 * - FAQPage: targets "rarest gemstone" question variants
 */

import { useT } from "./LocaleProvider";

export default function FaqSchema() {
  const t = useT();
  const ranking = t("article_ranking") as string[];
  const faq = t("faq") as { q: string; a: string }[];

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("schema_headline"),
    description: t("schema_description"),
    author: {
      "@type": "Person",
      name: t("schema_author"),
      url: "https://benmccarthy.com.au",
    },
    publisher: {
      "@type": "Person",
      name: t("schema_author"),
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
    name: t("schema_list_name"),
    description: t("schema_list_description"),
    numberOfItems: ranking.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: ranking.map((name: string, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
    })),
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item: { q: string; a: string }) => ({
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

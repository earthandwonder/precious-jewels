"use client";

import ProductCard from "./ProductCard";
import type { Product } from "./ProductCard";

/**
 * Inline product illustrations — just floating images with glows.
 * No labels, no prices, no CTAs. Purely visual.
 */
export default function AffiliateRow({
  products,
  glowColor,
  materialColor,
}: {
  products: Product[];
  glowColor: string;
  materialColor: string;
}) {
  if (products.length === 0) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-5">
      {products.slice(0, 1).map((product, i) => (
        <ProductCard
          key={i}
          product={product}
          glowColor={glowColor}
          materialColor={materialColor}
        />
      ))}
    </div>
  );
}

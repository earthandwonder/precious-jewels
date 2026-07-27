"use client";

import { materials } from "@/data/materials";
import { affiliateProducts } from "@/data/products";

/**
 * Bottom-of-page shop section. Outline-only buttons linking to affiliate products.
 * Casual, non-intrusive. Grouped by material.
 */
export default function ShopSection() {
  const materialsWithProducts = materials.filter(
    (m) => affiliateProducts[m.id]?.length
  );

  if (materialsWithProducts.length === 0) return null;

  return (
    <section className="relative z-10 py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div
          className="w-px h-16 mx-auto mb-10"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(255,236,210,0.15), transparent)",
          }}
        />

        <p className="text-center text-sm text-muted leading-relaxed mb-10 max-w-md mx-auto">
          Every material above is real. Some of them are surprisingly easy to own.
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {materialsWithProducts.map((m) => {
            const products = affiliateProducts[m.id];
            // Link to the first product
            const primary = products[0];
            return (
              <a
                key={m.id}
                href={primary.url}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 text-xs transition-all duration-300 hover:scale-105"
                style={{
                  border: `1px solid ${m.color}30`,
                  color: `${m.color}99`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${m.color}60`;
                  e.currentTarget.style.color = m.color;
                  e.currentTarget.style.background = `${m.color}08`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${m.color}30`;
                  e.currentTarget.style.color = `${m.color}99`;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {m.name}
              </a>
            );
          })}
        </div>

        <p className="text-center text-[10px] text-muted mt-6 opacity-40">
          Affiliate links — we may earn a small commission at no cost to you.
        </p>
      </div>
    </section>
  );
}

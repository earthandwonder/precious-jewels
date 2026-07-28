"use client";

export interface Product {
  name: string;
  price: string;
  url: string;
  imageUrl?: string;
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return `${parseInt(h.substring(0, 2), 16)},${parseInt(h.substring(2, 4), 16)},${parseInt(h.substring(4, 6), 16)}`;
}

export default function ProductCard({
  product,
  glowColor,
  materialColor,
}: {
  product: Product;
  glowColor: string;
  materialColor: string;
}) {
  const rgb = hexToRgb(glowColor);

  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      className="group relative flex items-center gap-3 md:gap-4 max-w-full"
    >
      {/* Image */}
      <div className="relative shrink w-32 h-32 min-w-[8rem] md:w-48 md:h-48 flex items-center justify-center overflow-hidden">
        {product.imageUrl ? (
          <>
            {/* Glow — a blurred copy of the image itself */}
            <img
              src={product.imageUrl}
              alt=""
              aria-hidden
              className="absolute z-0 max-h-32 md:max-h-48 object-contain transition-opacity duration-500 opacity-70 group-hover:opacity-85"
              style={{
                filter: `blur(22px) brightness(1.6) saturate(1.8)`,
              }}
            />
            {/* Actual product image */}
            <img
              src={product.imageUrl}
              alt=""
              className="relative z-10 max-h-32 md:max-h-48 object-contain transition-transform duration-300 group-hover:scale-105"
              style={{
                filter: `brightness(1.12) drop-shadow(0 0 8px rgba(${rgb},0.4))`,
              }}
              loading="lazy"
            />
          </>
        ) : (
          <svg
            width="40"
            height="40"
            viewBox="0 0 64 64"
            fill="none"
            className="relative z-10 opacity-40"
          >
            <path
              d="M32 4L56 24L32 60L8 24L32 4Z"
              stroke={materialColor}
              strokeWidth="1.5"
              fill={`${materialColor}10`}
            />
            <path d="M8 24H56" stroke={materialColor} strokeWidth="1" opacity="0.5" />
            <path
              d="M20 4L16 24L32 60L48 24L44 4"
              stroke={materialColor}
              strokeWidth="1"
              opacity="0.3"
            />
          </svg>
        )}
      </div>

      {/* Button to the right */}
      <span
        className="z-20 inline-flex items-center gap-1.5 px-4 py-2 text-xs md:text-sm tracking-wider uppercase transition-all duration-300 group-hover:brightness-125 whitespace-nowrap"
        style={{
          color: materialColor,
          border: `1px solid ${materialColor}40`,
          background: "rgba(3, 3, 8, 0.4)",
        }}
      >
        See on Etsy
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17l9.2-9.2M17 17V7H7" />
        </svg>
      </span>
    </a>
  );
}

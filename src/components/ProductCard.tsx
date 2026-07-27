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
      className="group relative w-36 h-36 md:w-48 md:h-48 flex items-center justify-center overflow-visible"
    >
      {product.imageUrl ? (
        <>
          {/* Glow — a blurred copy of the image itself */}
          <img
            src={product.imageUrl}
            alt=""
            aria-hidden
            className="absolute z-0 max-h-32 max-w-32 md:max-h-40 md:max-w-40 object-contain transition-opacity duration-500 opacity-30 group-hover:opacity-50"
            style={{
              filter: `blur(10px) brightness(1.2) saturate(1.4)`,
            }}
          />
          {/* Actual product image */}
          <img
            src={product.imageUrl}
            alt=""
            className="relative z-10 max-h-32 max-w-32 md:max-h-40 md:max-w-40 object-contain transition-transform duration-300 group-hover:scale-105"
            style={{
              filter: `drop-shadow(0 0 4px rgba(${rgb},0.2))`,
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
          className="relative z-10 opacity-25"
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

      {/* Overlay pill */}
      <span
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-20 inline-flex items-center px-2 py-0.5 text-[10px] md:text-xs tracking-wider uppercase transition-all duration-300 opacity-40 md:opacity-0 group-hover:opacity-80 backdrop-blur-sm whitespace-nowrap"
        style={{
          border: `1px solid ${materialColor}40`,
          color: `${materialColor}CC`,
          background: `rgba(3, 3, 8, 0.5)`,
        }}
      >
        See on Etsy
      </span>
    </a>
  );
}

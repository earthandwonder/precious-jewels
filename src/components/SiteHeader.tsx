"use client";

import { useState } from "react";
import Image from "next/image";
import AuthorPopup from "./AuthorPopup";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function SiteHeader() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setPopupOpen(true)}
        className="fixed top-4 left-4 z-40 group cursor-pointer flex items-center gap-2.5"
        aria-label="About Ben McCarthy"
      >
        <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 group-hover:border-white/25 transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(253,235,208,0.06)]">
          <Image
            src={`${basePath}/ben.jpeg`}
            alt="Ben McCarthy"
            width={72}
            height={72}
            className="w-full h-full object-cover object-[center_70%]"
          />
        </div>
        <span
          className="text-[0.7rem] tracking-[0.04em] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: "rgba(155, 155, 170, 0.6)" }}
        >
          Ben McCarthy
        </span>
      </button>

      <AuthorPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}

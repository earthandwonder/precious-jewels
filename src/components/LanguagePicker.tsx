"use client";

import { useState } from "react";
import { useLocale } from "./LocaleProvider";
import { LOCALES, LANG_FLAGS, LANG_LABELS, localeUrl, type Locale } from "@/lib/i18n";

export default function LanguagePicker() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: 12,
        right: 16,
        zIndex: 50,
        fontFamily: "var(--font-jakarta-sans)",
      }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 4,
          padding: "4px 8px",
          cursor: "pointer",
          fontSize: 16,
          lineHeight: 1,
        }}
        aria-label="Change language"
      >
        {LANG_FLAGS[locale]}
      </button>

      {open && (
        <>
          {/* Backdrop to close */}
          <div
            style={{ position: "fixed", inset: 0, zIndex: -1 }}
            onClick={() => setOpen(false)}
          />
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: 4,
              background: "rgba(10, 10, 20, 0.95)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 6,
              padding: "4px 0",
              minWidth: 140,
              backdropFilter: "blur(12px)",
            }}
          >
            {LOCALES.map((l) => (
              <a
                key={l}
                href={localeUrl(l)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 12px",
                  fontSize: 13,
                  color: l === locale ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  background: l === locale ? "rgba(255,255,255,0.08)" : "transparent",
                }}
              >
                <span>{LANG_FLAGS[l]}</span>
                <span>{LANG_LABELS[l]}</span>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

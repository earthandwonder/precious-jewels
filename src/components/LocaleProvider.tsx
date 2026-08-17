"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { t as tFn, tm as tmFn } from "@/lib/i18n";
import { CONTENT } from "@/data/content";

const LocaleContext = createContext<Locale>("en");

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function useT() {
  const locale = useContext(LocaleContext);
  return (key: keyof typeof CONTENT) => tFn(locale, key);
}

export function useTm() {
  const locale = useContext(LocaleContext);
  return (materialId: string, field: "name" | "tagline" | "description" | "scaleComparison") =>
    tmFn(locale, materialId, field);
}

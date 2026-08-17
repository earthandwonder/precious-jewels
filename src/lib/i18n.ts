/**
 * i18n module — locale detection, t() helper, translation loading.
 *
 * URL structure (with basePath /p/rarest-gemstones):
 *   /p/rarest-gemstones      → English (default, no prefix)
 *   /p/rarest-gemstones/es   → Spanish
 *   /p/rarest-gemstones/ja   → Japanese
 *   etc.
 */

import { CONTENT } from "@/data/content";

export const LOCALES = ["en", "es", "pt", "fr", "de", "ja", "hi", "zh", "ko"] as const;
export type Locale = (typeof LOCALES)[number];

export const LANG_FLAGS: Record<Locale, string> = {
  en: "\uD83C\uDDEC\uD83C\uDDE7",
  es: "\uD83C\uDDEA\uD83C\uDDF8",
  pt: "\uD83C\uDDE7\uD83C\uDDF7",
  fr: "\uD83C\uDDEB\uD83C\uDDF7",
  de: "\uD83C\uDDE9\uD83C\uDDEA",
  ja: "\uD83C\uDDEF\uD83C\uDDF5",
  hi: "\uD83C\uDDEE\uD83C\uDDF3",
  zh: "\uD83C\uDDE8\uD83C\uDDF3",
  ko: "\uD83C\uDDF0\uD83C\uDDF7",
};

export const LANG_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Espa\u00F1ol",
  pt: "Portugu\u00EAs",
  fr: "Fran\u00E7ais",
  de: "Deutsch",
  ja: "\u65E5\u672C\u8A9E",
  hi: "\u0939\u093F\u0928\u094D\u0926\u0940",
  zh: "\u4E2D\u6587",
  ko: "\uD55C\uAD6D\uC5B4",
};

export const OG_LOCALES: Record<Locale, string> = {
  en: "en_AU",
  es: "es_ES",
  pt: "pt_BR",
  fr: "fr_FR",
  de: "de_DE",
  ja: "ja_JP",
  hi: "hi_IN",
  zh: "zh_CN",
  ko: "ko_KR",
};

// Translation type — partial override of CONTENT keys + material keys
// Widen literal types to their base types so translated values aren't
// constrained to the exact English strings from CONTENT.
type Widen<T> = T extends readonly (infer U)[]
  ? U extends { q: string; a: string }
    ? { q: string; a: string }[]
    : string[]
  : T extends string
    ? string
    : T;

export type TranslationStrings = {
  [K in keyof typeof CONTENT]?: Widen<(typeof CONTENT)[K]>;
} & {
  [key: `material_${string}_${"name" | "tagline" | "description" | "scaleComparison"}`]: string;
};

// Lazy-loaded translations
const translationCache: Partial<Record<Locale, TranslationStrings>> = {};

async function loadTranslation(locale: Locale): Promise<TranslationStrings> {
  if (locale === "en") return CONTENT as unknown as TranslationStrings;
  if (translationCache[locale]) return translationCache[locale]!;

  const mod = await import(`@/data/translations/${locale}`);
  translationCache[locale] = mod.default;
  return mod.default;
}

// Synchronous translations registry — populated at build time via static imports
import es from "@/data/translations/es";
import pt from "@/data/translations/pt";
import fr from "@/data/translations/fr";
import de from "@/data/translations/de";
import ja from "@/data/translations/ja";
import hi from "@/data/translations/hi";
import zh from "@/data/translations/zh";
import ko from "@/data/translations/ko";

const translations: Record<Locale, TranslationStrings> = {
  en: CONTENT as unknown as TranslationStrings,
  es, pt, fr, de, ja, hi, zh, ko,
};

/**
 * Get a translated string. Falls back to English if the key is missing.
 */
export function t(locale: Locale, key: keyof typeof CONTENT): any {
  const val = (translations[locale] as any)?.[key];
  if (val !== undefined) return val;
  return (CONTENT as any)[key];
}

/**
 * Get translated material text. Falls back to the material's built-in English text.
 */
export function tm(
  locale: Locale,
  materialId: string,
  field: "name" | "tagline" | "description" | "scaleComparison"
): string | undefined {
  if (locale === "en") return undefined; // use material's own field
  const key = `material_${materialId}_${field}` as keyof TranslationStrings;
  return (translations[locale] as any)?.[key] as string | undefined;
}

export function isValidLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function localeUrl(locale: Locale, slug = "rarest-gemstones"): string {
  const base = `/p/${slug}`;
  return locale === "en" ? base : `${base}/${locale}`;
}

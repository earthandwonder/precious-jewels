import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "../globals.css";
import PageviewTracker from "@/components/PageviewTracker";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import { LocaleProvider } from "@/components/LocaleProvider";
import LanguagePicker from "@/components/LanguagePicker";
import { LOCALES, OG_LOCALES, isValidLocale, localeUrl, t, type Locale } from "@/lib/i18n";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : "en";
  const url = localeUrl(locale);

  const alternates: Record<string, string> = {};
  for (const l of LOCALES) {
    alternates[l] = localeUrl(l);
  }

  return {
    metadataBase: new URL("https://benmccarthy.com.au"),
    alternates: {
      canonical: url,
      languages: alternates,
    },
    title: t(locale, "meta_title") as string,
    description: t(locale, "meta_description") as string,
    keywords: [...(t(locale, "meta_keywords") as readonly string[])],
    openGraph: {
      title: t(locale, "meta_title") as string,
      description: t(locale, "meta_description") as string,
      type: "article",
      locale: OG_LOCALES[locale],
      images: [{ url: "/p/rarest-gemstones/og-emerald.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t(locale, "meta_title") as string,
      description: t(locale, "meta_description") as string,
      images: ["/p/rarest-gemstones/og-emerald.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : "en";

  return (
    <html
      lang={locale}
      className={`${jakartaSans.variable} ${jetbrainsMono.variable} ${playfair.variable} antialiased`}
    >
      <body>
        <LocaleProvider locale={locale}>
          <PageviewTracker />
          <ScrollDepthTracker />
          {children}
          <LanguagePicker />
          <footer style={{ position: "fixed", bottom: 12, right: 16, zIndex: 10, fontFamily: "var(--font-jakarta-sans)", fontSize: 11, letterSpacing: "0.03em" }}>
            <a href="https://benmccarthy.com.au" style={{ color: "rgba(255,255,255,0.2)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 1 }}>{t(locale, "footer_author")}</a>
          </footer>
          {/* @ts-expect-error web component */}
          <bm-capture
            mode="relationship"
            source="rarest-gemstones"
            variant="invite-a"
            reveal-at="captureReveal"
            expand-at="captureExpand"
            theme="dark"
            genesis={t(locale, "capture_genesis")}
          />
          <script src="https://benmccarthy.com.au/shared/capture.js" defer />
        </LocaleProvider>
      </body>
    </html>
  );
}

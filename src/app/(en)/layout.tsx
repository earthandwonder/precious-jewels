import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "../globals.css";
import AppShell from "@/components/AppShell";
import { LOCALES, localeUrl } from "@/lib/i18n";
import { CONTENT } from "@/data/content";

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

const alternates: Record<string, string> = {};
for (const l of LOCALES) {
  alternates[l] = localeUrl(l);
}

export const metadata: Metadata = {
  metadataBase: new URL("https://benmccarthy.com.au"),
  alternates: {
    canonical: "/p/rarest-gemstones",
    languages: alternates,
  },
  title: CONTENT.meta_title,
  description: CONTENT.meta_description,
  keywords: [...CONTENT.meta_keywords],
  openGraph: {
    title: CONTENT.meta_title,
    description: CONTENT.meta_description,
    type: "article",
    locale: "en_AU",
    images: [{ url: "/p/rarest-gemstones/og-emerald.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: CONTENT.meta_title,
    description: CONTENT.meta_description,
    images: ["/p/rarest-gemstones/og-emerald.png"],
  },
};

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${jetbrainsMono.variable} ${playfair.variable} antialiased`}
    >
      <body>
        <AppShell locale="en">{children}</AppShell>
      </body>
    </html>
  );
}

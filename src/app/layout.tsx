import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import PageviewTracker from "@/components/PageviewTracker";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://benmccarthy.com.au"),
  alternates: {
    canonical: "/p/rarest-gemstones",
  },
  title: "The Rarest Gemstones (in the Universe)",
  description:
    "17 precious materials ranked by how much exists across the entire universe. The rarest isn't diamond. It's not ruby either.",
  keywords: [
    "rarest gemstone",
    "rarest gem in the world",
    "what is the rarest gemstone",
    "rarest gemstone in the world",
    "rarest mineral on earth",
    "most rare gemstone",
    "rarest precious stone",
    "rarest mineral in the world",
    "gemstone rarity ranking",
  ],
  openGraph: {
    title: "The Rarest Gemstones (in the Universe)",
    description:
      "17 precious materials ranked by how much exists across the entire universe. The rarest isn't diamond. It's not ruby either.",
    type: "article",
    locale: "en_AU",
    images: [{ url: "/p/rarest-gemstones/og-emerald.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Rarest Gemstones (in the Universe)",
    description:
      "17 precious materials ranked by how much exists across the entire universe. The rarest isn't diamond. It's not ruby either.",
    images: ["/p/rarest-gemstones/og-emerald.png"],
  },
};

export default function RootLayout({
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
        <PageviewTracker />
        <ScrollDepthTracker />
        {children}
        <footer style={{ position: "fixed", bottom: 12, right: 16, zIndex: 10, fontFamily: "var(--font-jakarta-sans)", fontSize: 11, letterSpacing: "0.03em" }}>
          <a href="https://benmccarthy.com.au" style={{ color: "rgba(255,255,255,0.2)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 1 }}>Ben McCarthy</a>
        </footer>
        {/* @ts-expect-error web component */}
        <bm-capture
          mode="relationship"
          source="rarest-gemstones"
          variant="invite-a"
          reveal-at="captureReveal"
          expand-at="captureExpand"
          theme="dark"
          genesis="This post started when I saw a Reddit post I had to visualise: 'Throughout the entire galaxy, wood is probably more rare than diamonds.'"
        />
        <script src="https://benmccarthy.com.au/shared/capture.js" defer />
      </body>
    </html>
  );
}

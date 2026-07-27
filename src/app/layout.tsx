import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Precious Jewels — What's Actually the Rarest Gemstone in the Universe?",
  description:
    "An interactive essay ranking every gemstone and jewellery material by how much exists across the entire universe. The answer flips everything you thought you knew about rarity.",
  keywords: [
    "rarest gemstone",
    "rarest gem in the world",
    "rarest stone in the world",
    "rarest thing in the universe",
    "precious stones",
    "how rare is wood",
    "are trees rarer than diamonds",
    "cosmic abundance of gems",
  ],
  openGraph: {
    title: "Precious Jewels — The Rarest Gemstone in the Universe",
    description:
      "Diamond is cosmically common. The rarest thing you could wear is something no one expects.",
    type: "article",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Precious Jewels — The Rarest Gemstone in the Universe",
    description:
      "Diamond is cosmically common. The rarest thing you could wear is something no one expects.",
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

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
  title: "The Cosmic Abundance of Gemstones — Every Gemstone Ranked by Total Mass in the Universe",
  description:
    "Every gemstone ranked by total mass in the known universe. Diamond is one of the most common. The rarest thing you could wear is something no one expects.",
  keywords: [
    "rarest gemstone",
    "rarest gem in the world",
    "rarest stone in the world",
    "rarest thing in the universe",
    "precious stones",
    "cosmic abundance of gems",
    "gemstone rarity ranking",
    "diamond common universe",
  ],
  openGraph: {
    title: "The Cosmic Abundance of Gemstones",
    description:
      "Every gemstone ranked by total mass in the known universe. Diamond is one of the most common.",
    type: "article",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Cosmic Abundance of Gemstones",
    description:
      "Every gemstone ranked by total mass in the known universe. Diamond is one of the most common.",
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
      <body>{children}</body>
    </html>
  );
}

import { type ReactNode } from "react";

export interface Piece {
  title: string;
  desc: string;
  slug: string;
  href: string;
  bg: string;
  border?: string;
  icon: ReactNode;
  /** If true, orbiting icon uses this piece's icon around the face */
  orbit?: boolean;
}

/** SVG icon helpers — small inline icons for the orbit and panel */
export const icons = {
  eye: (size = 14, stroke = "rgba(255,255,255,0.85)") => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={size <= 10 ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12c2-4 6-8 10-8s8 4 10 8c-2 4-6 8-10 8s-8-4-10-8Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  pen: (size = 14, stroke = "rgba(255,255,255,0.85)") => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={size <= 10 ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  ),
  gem: (size = 14, stroke = "rgba(255,236,210,0.85)") => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={size <= 10 ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 7-10 12L2 10l4-7z" />
      <path d="M2 10h20" />
      {size > 10 && <path d="M12 22L9 10l3-7 3 7-3 12z" />}
    </svg>
  ),
  star: (size = 14) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)" stroke="none">
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
      <circle cx="18" cy="16" r="1.2" />
      <circle cx="7" cy="18" r="0.8" />
    </svg>
  ),
};

/**
 * The master list of pieces shown in the identity panel.
 * Order matters — this is the display order in the sidebar.
 * Set `orbit: true` on up to 3 pieces to show their icons orbiting the face.
 */
export const pieces: Piece[] = [
  {
    title: "Salt Safari",
    desc: "Citizen-science species guide for ocean swimmers",
    slug: "salt-safari",
    href: "https://benmccarthy.com.au/p/salt-safari",
    bg: "#2A7AB5",
    icon: icons.eye(14),
    orbit: true,
  },
  {
    title: "Executive Toupees",
    desc: "A sci-fi short story",
    slug: "executive-toupees",
    href: "https://benmccarthy.com.au/writing/executive-toupees-and-other-galactic-threats",
    bg: "#B8902E",
    icon: icons.pen(14),
    orbit: true,
  },
  {
    title: "Where Our Atoms Came From",
    desc: "Your atoms are 13.7 billion years old",
    slug: "atoms",
    href: "https://benmccarthy.com.au/writing/where-our-atoms-came-from-part-i",
    bg: "#B8902E",
    icon: icons.pen(14),
  },
  {
    title: "Intergalactic Gem Hunter",
    desc: "Which gemstones are common across the universe?",
    slug: "abundant-gems",
    href: "https://benmccarthy.com.au/p/abundant-gems",
    bg: "#1a0a2e",
    border: "rgba(255,236,210,0.3)",
    icon: icons.gem(14),
    orbit: true,
  },
  {
    title: "The Home Planetarium",
    desc: "How to put the night sky back on your ceiling",
    slug: "home-planetarium",
    href: "https://benmccarthy.com.au/cabinet/home-planetarium",
    bg: "#1a1a2e",
    icon: icons.star(14),
  },
];

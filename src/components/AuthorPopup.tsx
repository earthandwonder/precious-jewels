"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const pieces = [
  {
    title: "Salt Safari",
    desc: "Species guide for ocean swimmers",
    href: "https://benmccarthy.com.au/p/salt-safari",
    bg: "#2A7AB5",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12c2-4 6-8 10-8s8 4 10 8c-2 4-6 8-10 8s-8-4-10-8Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Executive Toupees",
    desc: "A sci-fi short story",
    href: "https://benmccarthy.com.au/writing/executive-toupees-and-other-galactic-threats",
    bg: "#B8902E",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      </svg>
    ),
  },
  {
    title: "Where Our Atoms Came From",
    desc: "Your atoms are 13.7 billion years old",
    href: "https://benmccarthy.com.au/writing/where-our-atoms-came-from-part-i",
    bg: "#B8902E",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      </svg>
    ),
  },
  {
    title: "Intergalactic Gem Hunter",
    desc: "You are here",
    href: `${basePath || "/p/abundant-gems"}`,
    bg: "#1a0a2e",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,236,210,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 7-10 12L2 10l4-7z" />
        <path d="M2 10h20" />
        <path d="M12 22L9 10l3-7 3 7-3 12z" />
      </svg>
    ),
    current: true,
  },
];

export function AuthorTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-3 cursor-pointer"
    >
      <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 group-hover:border-white/25 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(253,235,208,0.08)]">
        <Image
          src={`${basePath}/ben.jpeg`}
          alt="Ben McCarthy"
          width={80}
          height={80}
          className="w-full h-full object-cover object-[center_70%]"
        />
      </div>
      <span
        className="text-xs transition-colors"
        style={{ color: "rgba(155, 155, 170, 0.5)" }}
      >
        <span className="group-hover:text-foreground/70 transition-colors underline decoration-white/15 underline-offset-2">
          Ben McCarthy
        </span>
      </span>
    </button>
  );
}

export default function AuthorPopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [subState, setSubState] = useState<"idle" | "input" | "loading" | "done" | "error">("idle");

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "abundant-gems" }),
      });
      if (!res.ok) throw new Error();
      setSubState("done");
      trackEvent("email_capture");
    } catch {
      setSubState("error");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]" onClick={close}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ background: "rgba(3, 3, 8, 0.8)", backdropFilter: "blur(4px)" }}
      />

      {/* Panel — right-edge blade with angled top */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[min(380px,85vw)] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(195deg, rgba(15, 12, 30, 0.97) 0%, rgba(8, 8, 18, 0.99) 100%)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.06)",
          clipPath: "polygon(40px 0, 100% 0, 100% 100%, 0 100%, 0 60px)",
          animation: "slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Close */}
        <button
          onClick={close}
          className="absolute top-5 right-5 z-10 text-muted hover:text-foreground transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="pt-16 pb-10 px-7">
          {/* Face — tall crop */}
          <div
            className="w-20 h-28 rounded-[20px] overflow-hidden mb-5 border border-white/8"
            style={{
              boxShadow: "0 0 40px rgba(253, 235, 208, 0.04)",
            }}
          >
            <Image
              src={`${basePath}/ben.jpeg`}
              alt="Ben McCarthy"
              width={160}
              height={224}
              className="w-full h-full object-cover object-[center_70%]"
            />
          </div>

          {/* Name + bio */}
          <h2
            className="font-editorial text-xl mb-1"
            style={{ color: "rgba(232, 230, 227, 0.95)" }}
          >
            Ben McCarthy
          </h2>
          <p
            className="text-[0.8rem] leading-relaxed mb-8"
            style={{ color: "rgba(200, 198, 195, 0.7)" }}
          >
            I write about how strange and vast the universe really is.
          </p>

          {/* Divider — angled line matching clip */}
          <div
            className="h-px mb-8"
            style={{
              background: "linear-gradient(90deg, rgba(253, 235, 208, 0.12), transparent)",
            }}
          />

          {/* Project links with icons */}
          <p
            className="text-[0.65rem] tracking-[0.18em] uppercase mb-4"
            style={{ color: "rgba(155, 155, 170, 0.4)" }}
          >
            More pieces
          </p>

          <div className="space-y-1 mb-8">
            {pieces.map((p) => (
              <a
                key={p.title}
                href={p.current ? undefined : p.href}
                target={p.current ? undefined : "_blank"}
                rel={p.current ? undefined : "noopener noreferrer"}
                className={`flex items-center gap-3 py-2.5 px-2 -mx-2 rounded-lg transition-colors group/row ${
                  p.current ? "pointer-events-none" : ""
                }`}
                style={{
                  opacity: p.current ? 0.4 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!p.current) e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: p.bg }}
                >
                  {p.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[0.82rem] leading-tight"
                    style={{ color: p.current ? "rgba(253, 235, 208, 0.5)" : "rgba(253, 235, 208, 0.8)" }}
                  >
                    {p.title}
                  </p>
                  <p
                    className="text-[0.7rem]"
                    style={{ color: p.current ? "rgba(155, 155, 170, 0.3)" : "rgba(155, 155, 170, 0.5)" }}
                  >
                    {p.desc}
                  </p>
                </div>
                {!p.current && (
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    className="shrink-0 opacity-0 group-hover/row:opacity-40 transition-opacity"
                    style={{ color: "rgba(253, 235, 208, 0.6)" }}
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                )}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div
            className="h-px mb-8"
            style={{
              background: "linear-gradient(90deg, rgba(253, 235, 208, 0.08), transparent)",
            }}
          />

          {/* Subscribe button / expanding input */}
          <div>
            {subState === "done" ? (
              <p
                className="text-[0.8rem]"
                style={{ color: "rgba(253, 235, 208, 0.7)" }}
              >
                You&rsquo;re on the list.
              </p>
            ) : subState === "idle" ? (
              <button
                onClick={() => setSubState("input")}
                className="flex items-center gap-2 px-4 py-2.5 text-[0.78rem] tracking-wide cursor-pointer transition-all duration-300"
                style={{
                  border: "1px solid rgba(253, 235, 208, 0.2)",
                  color: "rgba(253, 235, 208, 0.7)",
                  background: "rgba(253, 235, 208, 0.03)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(253, 235, 208, 0.35)";
                  e.currentTarget.style.color = "rgba(253, 235, 208, 0.9)";
                  e.currentTarget.style.background = "rgba(253, 235, 208, 0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(253, 235, 208, 0.2)";
                  e.currentTarget.style.color = "rgba(253, 235, 208, 0.7)";
                  e.currentTarget.style.background = "rgba(253, 235, 208, 0.03)";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13 2 4" />
                </svg>
                Subscribe
              </button>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex gap-2"
                style={{
                  animation: "fadeExpand 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                }}
              >
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 min-w-0 px-3 py-2 text-[0.78rem] outline-none transition-colors"
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "rgba(232, 230, 227, 0.9)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(253, 235, 208, 0.3)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  }}
                />
                <button
                  type="submit"
                  disabled={subState === "loading"}
                  className="px-4 py-2 text-[0.78rem] tracking-wide cursor-pointer disabled:opacity-50 transition-colors shrink-0"
                  style={{
                    background: "rgba(253, 235, 208, 0.1)",
                    border: "1px solid rgba(253, 235, 208, 0.2)",
                    color: "rgba(253, 235, 208, 0.9)",
                  }}
                  onMouseEnter={(e) => {
                    if (subState !== "loading") {
                      e.currentTarget.style.background = "rgba(253, 235, 208, 0.15)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(253, 235, 208, 0.1)";
                  }}
                >
                  {subState === "loading" ? "..." : "Go"}
                </button>
              </form>
            )}
            {subState === "error" && (
              <p className="text-xs mt-2" style={{ color: "#e57373" }}>
                Something went wrong. Try again.
              </p>
            )}
          </div>

          {/* Bottom link */}
          <a
            href="https://benmccarthy.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-10 text-[0.7rem] transition-colors"
            style={{ color: "rgba(155, 155, 170, 0.35)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(253, 235, 208, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(155, 155, 170, 0.35)";
            }}
          >
            benmccarthy.com.au &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

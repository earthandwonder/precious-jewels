"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { pieces } from "./identity-config";

export function IdentityPanel({
  open,
  onClose,
  currentSlug,
  basePath = "",
  subscribeEndpoint = "/api/subscribe",
}: {
  open: boolean;
  onClose: () => void;
  currentSlug?: string;
  basePath?: string;
  subscribeEndpoint?: string;
}) {
  const [email, setEmail] = useState("");
  const [subState, setSubState] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle");

  const close = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubState("loading");
    try {
      const res = await fetch(subscribeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: currentSlug || "identity-widget",
        }),
      });
      if (!res.ok) throw new Error();
      setSubState("done");
    } catch {
      setSubState("error");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]" onClick={close}>
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(3, 3, 8, 0.8)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Panel */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[min(380px,88vw)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{
          background:
            "linear-gradient(165deg, rgba(15, 12, 30, 0.97) 0%, rgba(8, 8, 18, 0.99) 100%)",
          borderRight: "1px solid rgba(255, 255, 255, 0.06)",
          clipPath:
            "polygon(0 0, 100% 0, 100% calc(100% - 60px), calc(100% - 40px) 100%, 0 100%)",
          animation:
            "identity-slideInLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Top bar — close button only */}
        <div className="flex items-center justify-end px-6 pt-5 pb-3 shrink-0">
          <button
            onClick={close}
            className="text-[rgba(232,230,227,0.5)] hover:text-[rgba(232,230,227,0.9)] transition-colors cursor-pointer p-1"
            aria-label="Close"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between px-6 pb-8 min-h-0">
          {/* Top: face + bio + links */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-14 h-14 rounded-full overflow-hidden border border-white/15 shrink-0"
                style={{
                  boxShadow: "0 0 24px rgba(253, 235, 208, 0.06)",
                }}
              >
                <Image
                  src={`${basePath}/ben.jpeg`}
                  alt="Ben McCarthy"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover object-[center_70%]"
                />
              </div>
              <div>
                <h2
                  className="text-lg"
                  style={{
                    color: "rgba(255, 255, 255, 0.95)",
                    fontFamily:
                      "var(--font-display), var(--font-editorial), serif",
                  }}
                >
                  Ben McCarthy
                </h2>
                <p
                  className="text-[0.75rem] leading-snug mt-0.5"
                  style={{ color: "rgba(232, 230, 227, 0.75)" }}
                >
                  I make interactive essays about
                  <br />
                  the wonder of the universe.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div
              className="h-px my-5"
              style={{
                background:
                  "linear-gradient(90deg, rgba(253, 235, 208, 0.2), transparent)",
              }}
            />

            {/* Project links */}
            <p
              className="text-[0.65rem] tracking-[0.18em] uppercase mb-3"
              style={{ color: "rgba(232, 230, 227, 0.55)" }}
            >
              More pieces
            </p>

            <div className="space-y-0.5">
              {pieces.map((p) => {
                const isCurrent = p.slug === currentSlug;
                return (
                  <a
                    key={p.slug}
                    href={isCurrent ? undefined : p.href}
                    target={isCurrent ? undefined : "_blank"}
                    rel={isCurrent ? undefined : "noopener noreferrer"}
                    className={`flex items-center gap-3 py-2 px-2 -mx-2 rounded-lg transition-colors group/row ${
                      isCurrent ? "pointer-events-none" : ""
                    }`}
                    style={{ opacity: isCurrent ? 0.5 : 1 }}
                    onMouseEnter={(e) => {
                      if (!isCurrent)
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.05)";
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
                        style={{
                          color: isCurrent
                            ? "rgba(255, 255, 255, 0.45)"
                            : "rgba(255, 255, 255, 0.92)",
                        }}
                      >
                        {p.title}
                      </p>
                      <p
                        className="text-[0.7rem]"
                        style={{
                          color: isCurrent
                            ? "rgba(232, 230, 227, 0.35)"
                            : "rgba(232, 230, 227, 0.65)",
                        }}
                      >
                        {isCurrent ? "You are here" : p.desc}
                      </p>
                    </div>
                    {!isCurrent && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0 opacity-0 group-hover/row:opacity-60 transition-opacity"
                        style={{ color: "rgba(255, 255, 255, 0.7)" }}
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    )}
                  </a>
                );
              })}
            </div>

            {/* View all link */}
            <a
              href="https://benmccarthy.com.au"
              className="inline-block mt-3 ml-10 text-[0.72rem] tracking-[0.02em] transition-colors"
              style={{ color: "rgba(232, 230, 227, 0.5)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(232, 230, 227, 0.5)";
              }}
            >
              View all &rarr;
            </a>
          </div>

          {/* Bottom: subscribe */}
          <div>
            <div
              className="h-px mb-5"
              style={{
                background:
                  "linear-gradient(90deg, rgba(253, 235, 208, 0.15), transparent)",
              }}
            />

            {subState === "done" ? (
              <p
                className="text-[0.82rem]"
                style={{ color: "rgba(255, 255, 255, 0.9)" }}
              >
                You&rsquo;re on the list.
              </p>
            ) : (
              <>
                <p
                  className="text-[0.78rem] leading-relaxed mb-3"
                  style={{ color: "rgba(232, 230, 227, 0.7)" }}
                >
                  The world is full of wonder and mystery.
                  <br />
                  Get the next piece by email.
                </p>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="flex-1 min-w-0 px-3 py-2.5 text-[0.8rem] outline-none transition-colors"
                    style={{
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "rgba(255, 255, 255, 0.95)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(253, 235, 208, 0.4)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(255, 255, 255, 0.15)";
                    }}
                  />
                  <button
                    type="submit"
                    disabled={subState === "loading"}
                    className="px-4 py-2.5 text-[0.8rem] tracking-wide cursor-pointer disabled:opacity-50 transition-colors shrink-0"
                    style={{
                      background: "rgba(253, 235, 208, 0.14)",
                      border: "1px solid rgba(253, 235, 208, 0.3)",
                      color: "rgba(253, 235, 208, 0.95)",
                    }}
                    onMouseEnter={(e) => {
                      if (subState !== "loading") {
                        e.currentTarget.style.background =
                          "rgba(253, 235, 208, 0.22)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(253, 235, 208, 0.14)";
                    }}
                  >
                    {subState === "loading" ? "..." : "Go"}
                  </button>
                </form>
                {subState === "error" && (
                  <p className="text-xs mt-2" style={{ color: "#e57373" }}>
                    Something went wrong. Try again.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

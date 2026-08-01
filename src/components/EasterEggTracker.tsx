"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

type EggId = "dragon" | "noface" | "gauntlet" | "ufo" | "dino" | "diver";

interface EasterEggContextValue {
  found: Set<EggId>;
  markFound: (id: EggId) => void;
}

const EasterEggContext = createContext<EasterEggContextValue>({
  found: new Set(),
  markFound: () => {},
});

export function useEasterEggs() {
  return useContext(EasterEggContext);
}

export function EasterEggProvider({ children }: { children: ReactNode }) {
  const [found, setFound] = useState<Set<EggId>>(new Set());

  const markFound = useCallback((id: EggId) => {
    setFound((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  return (
    <EasterEggContext.Provider value={{ found, markFound }}>
      {children}
    </EasterEggContext.Provider>
  );
}

const TOTAL_EGGS = 6;
const CONFETTI_COLORS = ["#FFD700", "#FF6B6B", "#4ECDC4", "#A78BFA", "#F97316", "#34D399"];

interface Confetto {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  color: string;
  life: number;
  width: number;
  height: number;
}

export function EasterEggCounter() {
  const { found } = useEasterEggs();
  const count = found.size;
  const [, forceRender] = useState(0);
  const confettiRef = useRef<Confetto[]>([]);
  const confettiIdRef = useRef(0);
  const rafRef = useRef<number>(0);
  const prevCountRef = useRef(0);

  const kickAnimation = useCallback(() => {
    if (rafRef.current) return; // already running
    const animate = () => {
      const next = confettiRef.current
        .map(c => ({
          ...c,
          x: c.x + c.vx,
          y: c.y + c.vy,
          vy: c.vy + 0.08,
          vx: c.vx * 0.99,
          rotation: c.rotation + c.rotSpeed,
          life: c.life - 0.006,
        }))
        .filter(c => c.life > 0);
      confettiRef.current = next;
      forceRender(n => n + 1);
      if (next.length > 0) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rafRef.current = 0;
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const spawnConfetti = useCallback(() => {
    const pieces: Confetto[] = [];
    for (let i = 0; i < 40; i++) {
      // Bias upward-right from bottom-left corner
      const angle = -(Math.PI * 0.1) - Math.random() * Math.PI * 0.7; // -18° to -144°
      const speed = 3 + Math.random() * 5;
      pieces.push({
        id: confettiIdRef.current++,
        x: 0,
        y: 0,
        vx: Math.abs(Math.cos(angle)) * speed + Math.random() * 2,
        vy: Math.sin(angle) * speed,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        life: 1,
        width: 8 + Math.random() * 8,
        height: 6 + Math.random() * 12,
      });
    }
    confettiRef.current = [...confettiRef.current, ...pieces];
    kickAnimation();
  }, [kickAnimation]);

  const spawnConfettiBurst = useCallback(() => {
    spawnConfetti();
    setTimeout(() => spawnConfetti(), 700);
    setTimeout(() => spawnConfetti(), 1400);
  }, [spawnConfetti]);

  // Detect when we hit 6/6
  useEffect(() => {
    if (count === TOTAL_EGGS && prevCountRef.current < TOTAL_EGGS) {
      spawnConfettiBurst();
    }
    prevCountRef.current = count;
  }, [count, spawnConfettiBurst]);

  const isComplete = count === TOTAL_EGGS;

  return (
    <>
      {/* Confetti layer — portalled to body to escape all stacking contexts */}
      {confettiRef.current.length > 0 && typeof document !== "undefined" && createPortal(
        <div style={{ position: "fixed", inset: 0, zIndex: 99999, pointerEvents: "none" }}>
          {confettiRef.current.map(c => (
            <div
              key={c.id}
              style={{
                position: "absolute",
                left: 16 + c.x,
                bottom: 16 - c.y,
                width: c.width,
                height: c.height,
                background: c.color,
                opacity: c.life,
                transform: `rotate(${c.rotation}deg)`,
                borderRadius: 1,
              }}
            />
          ))}
        </div>,
        document.body
      )}
      {/* Counter */}
      <div
        className={`fixed bottom-4 left-4 z-50 text-sm font-mono select-none ${isComplete ? "cursor-pointer" : "pointer-events-none"}`}
        style={{
          color: isComplete ? "rgba(255, 215, 0, 0.8)" : "rgba(255, 255, 255, 0.4)",
          transition: "color 0.5s ease",
        }}
        onClick={isComplete ? spawnConfettiBurst : undefined}
      >
        {count}/6 Easter eggs
      </div>
    </>
  );
}

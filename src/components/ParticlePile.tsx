"use client";

import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  settled: boolean;
  // Fun extras
  rotation: number;
  rotationSpeed: number;
  sparkleTimer: number;
  idleOffset: number; // phase offset for idle shimmer
}

interface SparkleTrail {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

interface BlastFlash {
  x: number;
  y: number;
  radius: number;
  opacity: number;
}

export type MaterialFeel = "heavy" | "sparkly" | "organic" | "glassy";

interface ParticlePileProps {
  color: string;
  glowColor: string;
  /** 0-1: how abundant (1 = huge pile, 0 = a few specks) */
  abundance: number;
  /** Canvas height in px */
  height: number;
  isVisible: boolean;
  /** Controls scatter/regroup physics personality */
  feel?: MaterialFeel;
  /** Material density kg/m3 — affects scatter weight */
  density?: number;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 255, g: 255, b: 255 };
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

const FEEL_PHYSICS: Record<
  MaterialFeel,
  {
    scatterForce: number;
    gravity: number;
    damping: number;
    sparkleChance: number;
    regroupSpeed: number;
  }
> = {
  heavy: {
    scatterForce: 0.8,
    gravity: 0.12,
    damping: 0.92,
    sparkleChance: 0.02,
    regroupSpeed: 0.03,
  },
  sparkly: {
    scatterForce: 2.0,
    gravity: 0.03,
    damping: 0.98,
    sparkleChance: 0.15,
    regroupSpeed: 0.06,
  },
  organic: {
    scatterForce: 1.2,
    gravity: 0.06,
    damping: 0.95,
    sparkleChance: 0.04,
    regroupSpeed: 0.05,
  },
  glassy: {
    scatterForce: 1.8,
    gravity: 0.05,
    damping: 0.97,
    sparkleChance: 0.1,
    regroupSpeed: 0.07,
  },
};

export default function ParticlePile({
  color,
  glowColor,
  abundance,
  height,
  isVisible,
  feel = "sparkly",
  density = 3000,
}: ParticlePileProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sparklesRef = useRef<SparkleTrail[]>([]);
  const flashRef = useRef<BlastFlash | null>(null);
  const animFrameRef = useRef<number>(0);
  const drawRef = useRef<(() => void) | null>(null);
  const initializedRef = useRef(false);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const timeRef = useRef(0);

  const physics = FEEL_PHYSICS[feel];

  // Heavier materials get a weight multiplier that slows them down
  const weightFactor = Math.max(0.5, Math.min(1.5, density / 3000));

  // Reduce particles on mobile, cap total
  const mobile = typeof window !== "undefined" && isMobile();
  const areaFactor = Math.min(2, Math.max(1, height / 100));
  const baseMobile = mobile ? 0.5 : 1;
  const particleCount = Math.min(
    mobile ? 300 : 600,
    Math.max(80, Math.floor((150 + abundance * 400) * areaFactor * baseMobile))
  );

  const initParticles = useCallback(
    (width: number, h: number) => {
      const particles: Particle[] = [];
      const pileWidth = width * (0.3 + abundance * 0.5);
      const pileHeight = h * (0.35 + abundance * 0.3);
      const centerX = width / 2;
      const groundY = h * 0.88;

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI;
        const dist = Math.random();
        const xSpread = (Math.random() - 0.5) * pileWidth * dist;
        const x = centerX + xSpread;
        const xNorm = Math.abs(xSpread) / (pileWidth * 0.5 + 0.01);
        const y =
          groundY -
          Math.sin(angle) * pileHeight * dist * Math.max(0, 1 - xNorm);

        particles.push({
          x,
          y: Math.min(y, groundY),
          vx: 0,
          vy: 0,
          radius: 1.5 + Math.random() * 1.2 + abundance * 1.0,
          opacity: 0.7 + Math.random() * 0.3,
          settled: true,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.3,
          sparkleTimer: 0,
          idleOffset: Math.random() * Math.PI * 2,
        });
      }
      return particles;
    },
    [particleCount, abundance]
  );

  // Scatter from a specific point
  const scatter = useCallback(
    (blastX?: number, blastY?: number) => {
      const particles = particlesRef.current;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = blastX ?? w / 2;
      const cy = blastY ?? h * 0.7;

      const blastRadius = 30;

      // Blast flash
      flashRef.current = { x: cx, y: cy, radius: blastRadius * 0.4, opacity: 0.6 };

      for (const p of particles) {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const proximity = Math.max(0, 1 - dist / blastRadius);
        const force =
          proximity *
          proximity *
          (physics.scatterForce + Math.random() * physics.scatterForce) /
          weightFactor;
        if (force < 0.05) continue;

        // += so repeated clicks add momentum instead of replacing
        p.vx +=
          (dx / dist) * force + (Math.random() - 0.5) * force * 0.5;
        p.vy +=
          (dy / dist) * force +
          (Math.random() - 0.5) * force * 0.5 -
          force * 0.4;
        p.settled = false;
        p.rotationSpeed = (Math.random() - 0.5) * 0.4 * force;

        // Spawn sparkle trails for sparkly/glassy materials
        if (Math.random() < physics.sparkleChance * 3 && sparklesRef.current.length < 80) {
          sparklesRef.current.push({
            x: p.x,
            y: p.y,
            vx: p.vx * 0.5 + (Math.random() - 0.5),
            vy: p.vy * 0.5 - Math.random(),
            life: 1,
            maxLife: 0.4 + Math.random() * 0.6,
            size: 1 + Math.random() * 2,
          });
        }
      }

      // Collapse: unsettle particles above the blast in a vertical column
      // Cheap O(n) pass — no collision detection needed
      const collapseWidth = blastRadius * 0.8;
      for (const p of particles) {
        if (!p.settled) continue;
        // Must be above the blast center and within horizontal band
        if (p.y >= cy) continue;
        if (Math.abs(p.x - cx) > collapseWidth) continue;
        // Small downward nudge + slight horizontal jitter
        p.vy = 0.3 + Math.random() * 0.5;
        p.vx = (Math.random() - 0.5) * 0.4;
        p.settled = false;
      }

      // Haptic on mobile
      if (navigator.vibrate) {
        navigator.vibrate(12);
      }

    },
    [physics, weightFactor]
  );

  // Pointer interaction: repel nearby particles
  const applyPointerRepulsion = useCallback(() => {
    const ptr = pointerRef.current;
    if (!ptr.active) return;
    const particles = particlesRef.current;
    const repelRadius = 40;
    const repelForce = 1.5 / weightFactor;

    for (const p of particles) {
      const dx = p.x - ptr.x;
      const dy = p.y - ptr.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > repelRadius || dist < 0.1) continue;
      const proximity = 1 - dist / repelRadius;
      const force = proximity * proximity * repelForce;
      p.vx += (dx / dist) * force;
      p.vy += (dy / dist) * force - force * 0.2;
      p.settled = false;
    }
  }, [weightFactor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    if (!initializedRef.current) {
      particlesRef.current = initParticles(rect.width, rect.height);
      initializedRef.current = true;
    }

    const rgb = hexToRgb(color);
    const glowRgb = hexToRgb(glowColor);

    const draw = () => {
      timeRef.current += 0.016; // ~60fps increment
      const t = timeRef.current;

      ctx.clearRect(0, 0, rect.width, rect.height);

      const groundY = rect.height * 0.88;

      // Apply pointer repulsion
      applyPointerRepulsion();

      const particles = particlesRef.current;
      let hasMotion = false;

      for (const p of particles) {
        // Settled particles: draw statically (no animation cost)
        if (p.settled) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.opacity})`;
          ctx.fill();

          if (p.radius > 0.8) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.4})`;
            ctx.fill();
          }
          continue;
        }

        // Physics update for unsettled particles
        p.vy += physics.gravity * weightFactor;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= physics.damping;
        p.vy *= physics.damping;
        p.rotation += p.rotationSpeed;
        p.rotationSpeed *= 0.98;

        // Floor collision
        if (p.y >= groundY - p.radius) {
          p.y = groundY - p.radius;
          p.vy *= -0.3; // small bounce
          p.vx *= 0.8; // friction
          if (Math.abs(p.vy) < 0.15) {
            p.vy = 0;
          }
        }

        if (Math.abs(p.vx) < 0.01 && Math.abs(p.vy) < 0.01) {
          p.settled = true;
          p.rotationSpeed = 0;
        }

        // Fade if off-screen
        if (
          p.y > rect.height + 20 ||
          p.x < -20 ||
          p.x > rect.width + 20
        ) {
          p.opacity = Math.max(0, p.opacity - 0.02);
        }

        hasMotion = true;

        if (p.opacity <= 0) continue;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.opacity})`;
        ctx.fill();

        // Inner sparkle — brighter when moving fast
        if (p.radius > 0.8) {
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          const movingSparkle = Math.min(0.6, speed * 0.1);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * (0.4 + movingSparkle)})`;
          ctx.fill();
        }

        // Spawn sparkle trails while moving fast
        if (
          Math.random() < physics.sparkleChance &&
          Math.sqrt(p.vx * p.vx + p.vy * p.vy) > 0.5 &&
          sparklesRef.current.length < 60
        ) {
          sparklesRef.current.push({
            x: p.x,
            y: p.y,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            life: 1,
            maxLife: 0.3 + Math.random() * 0.4,
            size: 0.5 + Math.random() * 1.5,
          });
        }
      }

      // Draw sparkle trails
      const sparkles = sparklesRef.current;
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.016 / s.maxLife;
        if (s.life <= 0) {
          sparkles.splice(i, 1);
          continue;
        }
        const alpha = s.life * 0.8;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }
      if (sparkles.length > 0) hasMotion = true;

      // Draw blast flash
      const flash = flashRef.current;
      if (flash && flash.opacity > 0) {
        const flashGrad = ctx.createRadialGradient(
          flash.x,
          flash.y,
          0,
          flash.x,
          flash.y,
          flash.radius
        );
        flashGrad.addColorStop(
          0,
          `rgba(255, 255, 255, ${flash.opacity * 0.6})`
        );
        flashGrad.addColorStop(
          0.4,
          `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${flash.opacity * 0.3})`
        );
        flashGrad.addColorStop(1, "transparent");
        ctx.fillStyle = flashGrad;
        ctx.beginPath();
        ctx.arc(flash.x, flash.y, flash.radius, 0, Math.PI * 2);
        ctx.fill();
        flash.opacity -= 0.04;
        flash.radius += 2;
        if (flash.opacity <= 0) flashRef.current = null;
        hasMotion = true;
      }

      if (hasMotion) {
        animFrameRef.current = requestAnimationFrame(draw);
      }
    };

    drawRef.current = draw;
    draw();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible, color, glowColor, abundance, initParticles, physics, weightFactor, applyPointerRepulsion]);

  // Pointer event handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getCanvasPos = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const onPointerDown = (e: PointerEvent) => {
      const pos = getCanvasPos(e.clientX, e.clientY);
      pointerRef.current = { ...pos, active: true };
      // Kick the animation loop if it stopped
      kickAnimation();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!pointerRef.current.active) return;
      const pos = getCanvasPos(e.clientX, e.clientY);
      pointerRef.current.x = pos.x;
      pointerRef.current.y = pos.y;
    };

    const onPointerUp = () => {
      pointerRef.current.active = false;
    };

    const onPointerLeave = () => {
      pointerRef.current.active = false;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);

    // Prevent scroll while dragging on canvas (mobile)
    const preventScroll = (e: TouchEvent) => {
      if (pointerRef.current.active) {
        e.preventDefault();
      }
    };
    canvas.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  // Restart the animation loop (reuses the draw function from the effect)
  const kickAnimation = useCallback(() => {
    if (!drawRef.current) return;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(drawRef.current);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    scatter(e.clientX - rect.left, e.clientY - rect.top);
    kickAnimation();
  };

  const glowRgb = hexToRgb(glowColor);
  const glowOpacity = 0.06 + abundance * 0.12;

  return (
    <div className="relative overflow-visible" style={{ height }}>
      {/* CSS glow — separate layer so it bleeds past canvas bounds */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "-30%",
          right: "-30%",
          top: "-20%",
          bottom: "-40%",
          background: `radial-gradient(ellipse 40% 40% at 50% 55%, rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${glowOpacity}) 0%, transparent 70%)`,
        }}
      />
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        className="particle-canvas w-full cursor-pointer touch-none relative z-10"
        style={{ height }}
        aria-label="Click to scatter particles"
      />
    </div>
  );
}

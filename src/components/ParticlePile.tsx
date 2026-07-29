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
  rotation: number;
  rotationSpeed: number;
  sparkleTimer: number;
  idleOffset: number;
  // Per-particle visuals
  cr: number;
  cg: number;
  cb: number;
  aspect: number;
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
export type ParticleShape = "circle" | "chunk" | "shard" | "log";

interface ParticlePileProps {
  color: string;
  glowColor: string;
  /** Canvas height in px */
  height: number;
  isVisible: boolean;
  /** Controls scatter/regroup physics personality */
  feel?: MaterialFeel;
  /** Material density kg/m3 */
  density?: number;
  /** Particle rendering shape */
  particleShape?: ParticleShape;
  /** 0-1: how much colour varies between particles */
  colorJitter?: number;
  /** [min, max] size multiplier range */
  sizeRange?: [number, number];
  /** Multiplier for particle count (default 1) */
  countMultiplier?: number;
  /** 0-1: how much of the canvas the pile fills (default 1). Keeps pile accurately small in a larger canvas. */
  pileScale?: number;
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

function clamp(v: number, min = 0, max = 255) {
  return Math.max(min, Math.min(max, v));
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
    gravity: 0.35,
    damping: 0.92,
    sparkleChance: 0.02,
    regroupSpeed: 0.03,
  },
  sparkly: {
    scatterForce: 2.0,
    gravity: 0.12,
    damping: 0.98,
    sparkleChance: 0.15,
    regroupSpeed: 0.06,
  },
  organic: {
    scatterForce: 1.2,
    gravity: 0.18,
    damping: 0.95,
    sparkleChance: 0.04,
    regroupSpeed: 0.05,
  },
  glassy: {
    scatterForce: 1.8,
    gravity: 0.15,
    damping: 0.97,
    sparkleChance: 0.1,
    regroupSpeed: 0.07,
  },
};

// Shape-based physics modifiers
const SHAPE_DAMPING: Record<ParticleShape, number> = {
  circle: 1.0,
  chunk: 0.97,
  shard: 0.94,
  log: 0.91,
};

const SHAPE_BOUNCE: Record<ParticleShape, number> = {
  circle: -0.4,
  chunk: -0.25,
  shard: -0.15,
  log: -0.12,
};

// --- Drawing helpers ---

function drawShape(
  ctx: CanvasRenderingContext2D,
  p: Particle,
  shape: ParticleShape,
  fillStyle: string,
) {
  ctx.fillStyle = fillStyle;

  if (shape === "circle") {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);

  if (shape === "chunk") {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const r = p.radius * (i % 2 === 0 ? 1 : 0.78);
      ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    ctx.closePath();
    ctx.fill();
  } else if (shape === "shard") {
    ctx.beginPath();
    ctx.ellipse(0, 0, p.radius * p.aspect * 0.5, p.radius * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (shape === "log") {
    const w = p.radius * p.aspect;
    const h = p.radius * 0.7;
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2, w, h, h * 0.3);
    ctx.fill();
  }

  ctx.restore();
}

function drawHighlight(
  ctx: CanvasRenderingContext2D,
  p: Particle,
  shape: ParticleShape,
  alpha: number,
) {
  ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;

  if (shape === "circle") {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius * 0.4, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);

  if (shape === "chunk") {
    ctx.beginPath();
    ctx.arc(0, -p.radius * 0.2, p.radius * 0.3, 0, Math.PI * 2);
    ctx.fill();
  } else if (shape === "shard") {
    ctx.beginPath();
    ctx.ellipse(0, -p.radius * 0.08, p.radius * p.aspect * 0.3, p.radius * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (shape === "log") {
    ctx.beginPath();
    ctx.ellipse(0, -p.radius * 0.12, p.radius * p.aspect * 0.3, p.radius * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

export default function ParticlePile({
  color,
  glowColor,
  height,
  isVisible,
  feel = "sparkly",
  density = 3000,
  particleShape = "circle",
  colorJitter = 0.1,
  sizeRange = [0.7, 1.3],
  countMultiplier = 1,
  pileScale = 1,
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
  const disturbedRef = useRef(false);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const physics = FEEL_PHYSICS[feel];

  const weightFactor = Math.max(0.5, Math.min(1.5, density / 3000));

  const mobile = typeof window !== "undefined" && isMobile();
  // Target a consistent particle density within the pile.
  // Triangle area = 0.5 × base × height = 1.5 × pileH².
  // We want enough particles to fill it densely.
  const pileH = pileScale * height;
  const pileTriArea = 1.5 * pileH * pileH;
  const densityFactor = mobile ? 0.008 : 0.012;
  const particleCount = Math.max(30, Math.min(
    mobile ? 600 : 1200,
    Math.floor(pileTriArea * densityFactor * countMultiplier)
  ));

  const rgb = hexToRgb(color);

  const initParticles = useCallback(
    (width: number, h: number) => {
      const particles: Particle[] = [];
      // Physics-consistent cone: angle of repose ~33° → base diameter ≈ 3× height.
      // pileScale encodes the ratio of pile height to canvas height.
      const pileH = h * pileScale;
      const pileW = pileH * 3;
      const centerX = width / 2;
      const groundY = h * 0.96;

      for (let i = 0; i < particleCount; i++) {
        // Place particles uniformly inside a triangular pile shape.
        // Pick a random height fraction (0 = ground, 1 = apex), then
        // allow x-spread proportional to how close to the ground we are.
        const hFrac = 1 - Math.sqrt(Math.random()); // area-uniform: more near base
        const widthAtH = 1 - hFrac;           // triangle: wider at bottom
        const xSpread = (Math.random() - 0.5) * pileW * widthAtH;
        const x = centerX + xSpread;
        const y = groundY - hFrac * pileH;

        // Size variance — particle radius scales with pile size
        const sizeMult = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
        // Inverse scale: smaller piles get larger particles to stay dense
        const scaleFactor = 0.6 + 0.4 / Math.max(0.2, pileScale);
        const rawRadius = (4.0 + Math.random() * 3.0) * scaleFactor;
        const baseRadius = Math.max(3, rawRadius);

        // Colour jitter: shift lightness uniformly + tiny per-channel noise
        const lightnessShift = (Math.random() - 0.5) * 2 * colorJitter * 60;
        const channelNoise = colorJitter * 15;

        // Aspect ratio for non-circle shapes
        let aspect = 1;
        if (particleShape === "log") aspect = 2.0 + Math.random() * 1.5;
        else if (particleShape === "shard") aspect = 1.8 + Math.random() * 1.2;

        particles.push({
          x,
          y: Math.min(y, groundY),
          vx: 0,
          vy: 0,
          radius: baseRadius * sizeMult,
          opacity: 0.7 + Math.random() * 0.3,
          settled: true,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.3,
          sparkleTimer: 0,
          idleOffset: Math.random() * Math.PI * 2,
          cr: clamp(rgb.r + lightnessShift + (Math.random() - 0.5) * channelNoise),
          cg: clamp(rgb.g + lightnessShift + (Math.random() - 0.5) * channelNoise),
          cb: clamp(rgb.b + lightnessShift + (Math.random() - 0.5) * channelNoise),
          aspect,
        });
      }
      return particles;
    },
    [particleCount, rgb.r, rgb.g, rgb.b, colorJitter, sizeRange, particleShape, pileScale]
  );

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
      const groundY = h * 0.96;

      const blastRadius = 30;

      // Blast flash
      flashRef.current = { x: cx, y: cy, radius: blastRadius * 0.4, opacity: 0.6 };
      disturbedRef.current = true;

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

        p.vx +=
          (dx / dist) * force + (Math.random() - 0.5) * force * 0.5;
        p.vy +=
          (dy / dist) * force +
          (Math.random() - 0.5) * force * 0.5 -
          force * 0.4;
        p.settled = false;
        p.rotationSpeed = (Math.random() - 0.5) * 0.4 * force;

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
      const collapseWidth = blastRadius * 0.8;
      for (const p of particles) {
        if (!p.settled) continue;
        if (p.y >= cy) continue;
        if (Math.abs(p.x - cx) > collapseWidth) continue;
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
      disturbedRef.current = true;
    }
  }, [weightFactor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    // Use clientWidth/Height (CSS layout size) instead of getBoundingClientRect()
    // which returns dimensions affected by ancestor CSS transforms (e.g. mobile scale).
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    ctx.scale(dpr, dpr);

    if (!initializedRef.current || sizeRef.current.w !== cssW || sizeRef.current.h !== cssH) {
      particlesRef.current = initParticles(cssW, cssH);
      initializedRef.current = true;
      sizeRef.current = { w: cssW, h: cssH };
    }

    const glowRgb = hexToRgb(glowColor);
    const shape = particleShape;
    const shapeDamp = SHAPE_DAMPING[shape];
    const shapeBounce = SHAPE_BOUNCE[shape];

    const draw = () => {
      timeRef.current += 0.016;

      ctx.clearRect(0, 0, cssW, cssH);

      const groundY = cssH * 0.96;

      applyPointerRepulsion();

      const particles = particlesRef.current;
      let hasMotion = false;

      // Continuous settling: only runs after a disturbance (click/drag).
      // Each frame, sample ~10% of settled particles. If one is floating
      // (not on ground, few settled neighbours below), wake it gently.
      // Spreads the cascade naturally across frames.
      const sampleRate = 0.1;
      const disturbed = disturbedRef.current;
      for (const p of particles) {
        if (!disturbed) break;
        if (!p.settled) continue;
        if (Math.random() > sampleRate) continue;
        // Already on the ground — stable
        if (p.y >= groundY - p.radius * 3) continue;

        // Quick check: count settled particles in a small zone below
        let below = 0;
        for (const other of particles) {
          if (other === p || !other.settled) continue;
          // Must be below this particle
          if (other.y <= p.y) continue;
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          // Within a close neighbourhood
          if (dx * dx + dy * dy < 25 * 25) {
            below++;
            if (below >= 2) break;
          }
        }

        if (below < 2) {
          // No support — gentle wake-up
          p.vy = 0.1 + Math.random() * 0.2;
          p.vx = (Math.random() - 0.5) * 0.15;
          p.settled = false;
          hasMotion = true;
        }
      }

      for (const p of particles) {
        if (p.opacity <= 0) continue;

        // Settled particles: draw statically
        if (p.settled) {
          const fill = `rgba(${p.cr}, ${p.cg}, ${p.cb}, ${p.opacity})`;
          drawShape(ctx, p, shape, fill);
          if (p.radius > 0.8) {
            drawHighlight(ctx, p, shape, p.opacity * 0.4);
          }
          continue;
        }

        // Physics update for unsettled particles
        p.vy += physics.gravity * weightFactor;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= physics.damping * shapeDamp;
        p.vy *= physics.damping * shapeDamp;
        p.rotation += p.rotationSpeed;
        p.rotationSpeed *= 0.98;

        // Floor collision
        if (p.y >= groundY - p.radius) {
          p.y = groundY - p.radius;
          p.vy *= shapeBounce;
          p.vx *= 0.8;
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
          p.y > cssH + 20 ||
          p.x < -20 ||
          p.x > cssW + 20
        ) {
          p.opacity = Math.max(0, p.opacity - 0.02);
        }

        hasMotion = true;

        // Draw particle
        const fill = `rgba(${p.cr}, ${p.cg}, ${p.cb}, ${p.opacity})`;
        drawShape(ctx, p, shape, fill);

        // Inner sparkle -- brighter when moving fast
        if (p.radius > 0.8) {
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          const movingSparkle = Math.min(0.6, speed * 0.1);
          drawHighlight(ctx, p, shape, p.opacity * (0.4 + movingSparkle));
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
        const glR = glowRgb.r, glG = glowRgb.g, glB = glowRgb.b;
        flashGrad.addColorStop(
          0,
          `rgba(255, 255, 255, ${flash.opacity * 0.6})`
        );
        flashGrad.addColorStop(
          0.4,
          `rgba(${glR}, ${glG}, ${glB}, ${flash.opacity * 0.3})`
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
      } else {
        disturbedRef.current = false;
      }
    };

    drawRef.current = draw;
    draw();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible, color, glowColor, initParticles, physics, weightFactor, applyPointerRepulsion, particleShape]);

  // Pointer event handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getCanvasPos = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      // Scale pointer coords to canvas CSS space (accounts for ancestor transforms)
      const scaleX = canvas.clientWidth / rect.width;
      const scaleY = canvas.clientHeight / rect.height;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
    };

    const onPointerDown = (e: PointerEvent) => {
      const pos = getCanvasPos(e.clientX, e.clientY);
      pointerRef.current = { ...pos, active: true };
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

  const kickAnimation = useCallback(() => {
    if (!drawRef.current) return;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(drawRef.current);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.clientWidth / rect.width;
    const scaleY = canvas.clientHeight / rect.height;
    scatter(
      (e.clientX - rect.left) * scaleX,
      (e.clientY - rect.top) * scaleY,
    );
    kickAnimation();
  };

  const glowRgb = hexToRgb(glowColor);
  const glowOpacity = 0.06 + pileScale * 0.12;

  return (
    <div className="relative overflow-visible" style={{ height }}>
      {/* CSS glow */}
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

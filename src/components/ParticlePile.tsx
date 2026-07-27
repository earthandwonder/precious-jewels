"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  settled: boolean;
}

interface ParticlePileProps {
  color: string;
  glowColor: string;
  /** 0-1: how abundant (1 = huge pile, 0 = a few specks) */
  abundance: number;
  /** Canvas height in px */
  height: number;
  isVisible: boolean;
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

export default function ParticlePile({
  color,
  glowColor,
  abundance,
  height,
  isVisible,
}: ParticlePileProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const initializedRef = useRef(false);
  const [scattered, setScattered] = useState(false);

  // Scale particle count with both abundance AND canvas area
  // Even rare materials need enough particles to form a visible mound
  const areaFactor = Math.max(1, height / 100);
  const particleCount = Math.max(
    250,
    Math.floor((200 + abundance * 500) * areaFactor)
  );

  const initParticles = useCallback(
    (width: number, h: number) => {
      const particles: Particle[] = [];
      // Pile shape: wider and taller for abundant materials
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
        });
      }
      return particles;
    },
    [particleCount, abundance]
  );

  const scatter = useCallback(() => {
    const particles = particlesRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const centerX = w / 2;
    const centerY = h * 0.7;

    const blastRadius = Math.min(w, h) * 0.3;
    for (const p of particles) {
      const dx = p.x - centerX;
      const dy = p.y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const proximity = Math.max(0, 1 - dist / blastRadius);
      const force = proximity * proximity * (1.5 + Math.random() * 2.5);
      if (force < 0.05) continue;
      p.vx = (dx / dist) * force + (Math.random() - 0.5) * force * 0.5;
      p.vy = (dy / dist) * force + (Math.random() - 0.5) * force * 0.5 - force * 0.3;
      p.settled = false;
    }
    setScattered(true);
  }, []);

  const regroup = useCallback(
    (width: number, h: number) => {
      const targets = initParticles(width, h);
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const target = targets[i % targets.length];
        const p = particles[i];
        p.vx = (target.x - p.x) * 0.05;
        p.vy = (target.y - p.y) * 0.05;
        p.settled = false;
      }
      setScattered(false);
    },
    [initParticles]
  );

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
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Glow behind the pile
      const centerX = rect.width / 2;
      const groundY = rect.height * 0.88;
      const glowRadius = rect.width * (0.15 + abundance * 0.35);
      const grad = ctx.createRadialGradient(
        centerX,
        groundY - rect.height * 0.15,
        0,
        centerX,
        groundY - rect.height * 0.15,
        glowRadius
      );
      grad.addColorStop(0, `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${0.1 + abundance * 0.2})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, rect.width, rect.height);

      const particles = particlesRef.current;
      let allSettled = true;

      for (const p of particles) {
        if (!p.settled) {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.vy += 0.05;

          if (Math.abs(p.vx) < 0.01 && Math.abs(p.vy) < 0.01) {
            p.settled = true;
          } else {
            allSettled = false;
          }

          if (p.y > rect.height + 20 || p.x < -20 || p.x > rect.width + 20) {
            p.opacity = Math.max(0, p.opacity - 0.02);
          }
        }

        if (p.opacity <= 0) continue;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.opacity})`;
        ctx.fill();

        // Inner sparkle
        if (p.radius > 0.8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.4})`;
          ctx.fill();
        }
      }

      if (!allSettled) {
        animFrameRef.current = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible, color, glowColor, abundance, initParticles]);

  const handleClick = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    if (scattered) {
      regroup(w, h);
    } else {
      scatter();
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rgb = hexToRgb(color);
    const glowRgb = hexToRgb(glowColor);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const centerX = w / 2;
      const groundY = h * 0.88;
      const glowRadius = w * (0.15 + abundance * 0.35);
      const grad = ctx.createRadialGradient(
        centerX, groundY - h * 0.15, 0,
        centerX, groundY - h * 0.15, glowRadius
      );
      grad.addColorStop(0, `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${0.1 + abundance * 0.2})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      const particles = particlesRef.current;
      let allSettled = true;

      for (const p of particles) {
        if (!p.settled) {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.vy += 0.05;

          if (Math.abs(p.vx) < 0.01 && Math.abs(p.vy) < 0.01) {
            p.settled = true;
          } else {
            allSettled = false;
          }

          if (p.y > h + 20 || p.x < -20 || p.x > w + 20) {
            p.opacity = Math.max(0, p.opacity - 0.02);
          }
        }

        if (p.opacity <= 0) continue;

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
      }

      if (!allSettled) {
        animFrameRef.current = requestAnimationFrame(draw);
      }
    };

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(draw);
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      className="particle-canvas w-full cursor-pointer"
      style={{ height }}
      aria-label="Click to scatter particles"
    />
  );
}

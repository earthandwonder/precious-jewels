"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import type { Material } from "@/data/materials";
import { inlineProducts } from "@/data/products";
import ParticlePile from "./ParticlePile";
import type { MaterialFeel, ParticleShape, ParticlePileHandle } from "./ParticlePile";
import MassCounter from "./MassCounter";
import ScaleReference, { getRefType, REFERENCES } from "./ScaleReference";
import AffiliateRow from "./AffiliateRow";
import { useEasterEggs } from "./EasterEggTracker";


interface ParticleStyle {
  particleShape: ParticleShape;
  colorJitter: number;
  sizeRange: [number, number];
  countMultiplier?: number;
}

interface FireParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: number;
}

interface GoldParticle {
  id: number;
  x: number;
  y: number;
  vy: number;
  life: number;
  size: number;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  vy: number;
  vx: number;
  life: number;
  size: number;
}

function EasterEggOverlay({ materialId, pileRef }: { materialId: string; pileRef?: React.RefObject<ParticlePileHandle | null> }) {
  const { markFound } = useEasterEggs();
  const [fireParticles, setFireParticles] = useState<FireParticle[]>([]);
  const [goldParticles, setGoldParticles] = useState<GoldParticle[]>([]);
  const [gauntletPulse, setGauntletPulse] = useState(false);
  const fireIdRef = useRef(0);
  const goldIdRef = useRef(0);
  const fireRafRef = useRef<number>(0);
  const goldRafRef = useRef<number>(0);
  const dragonRef = useRef<SVGSVGElement>(null);
  const noFaceRef = useRef<SVGSVGElement>(null);
  const [ufoPulse, setUfoPulse] = useState(false);
  const [dinoPulse, setDinoPulse] = useState(false);
  const ufoRef = useRef<SVGSVGElement>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const bubbleIdRef = useRef(0);
  const bubbleRafRef = useRef<number>(0);
  const diverContainerRef = useRef<HTMLDivElement>(null);

  // Animate fire particles
  useEffect(() => {
    if (fireParticles.length === 0) return;
    const animate = () => {
      setFireParticles(prev => {
        const next = prev
          .map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, vy: p.vy - 0.1, life: p.life - 0.02 }))
          .filter(p => p.life > 0);
        if (next.length > 0) fireRafRef.current = requestAnimationFrame(animate);
        return next;
      });
    };
    fireRafRef.current = requestAnimationFrame(animate);
    return () => { if (fireRafRef.current) cancelAnimationFrame(fireRafRef.current); };
  }, [fireParticles.length > 0]); // eslint-disable-line react-hooks/exhaustive-deps

  // Animate gold particles
  useEffect(() => {
    if (goldParticles.length === 0) return;
    const animate = () => {
      setGoldParticles(prev => {
        const next = prev
          .map(p => ({ ...p, y: p.y + p.vy, vy: p.vy + 0.3, life: p.life - 0.015 }))
          .filter(p => p.life > 0);
        if (next.length > 0) goldRafRef.current = requestAnimationFrame(animate);
        return next;
      });
    };
    goldRafRef.current = requestAnimationFrame(animate);
    return () => { if (goldRafRef.current) cancelAnimationFrame(goldRafRef.current); };
  }, [goldParticles.length > 0]); // eslint-disable-line react-hooks/exhaustive-deps

  // Animate bubbles
  useEffect(() => {
    if (bubbles.length === 0) return;
    const animate = () => {
      setBubbles(prev => {
        const next = prev
          .map(b => ({ ...b, x: b.x + b.vx, y: b.y + b.vy, life: b.life - 0.000063 }))
          .filter(b => b.life > 0);
        if (next.length > 0) bubbleRafRef.current = requestAnimationFrame(animate);
        return next;
      });
    };
    bubbleRafRef.current = requestAnimationFrame(animate);
    return () => { if (bubbleRafRef.current) cancelAnimationFrame(bubbleRafRef.current); };
  }, [bubbles.length > 0]); // eslint-disable-line react-hooks/exhaustive-deps

  const fireContainerRef = useRef<HTMLDivElement>(null);
  const goldContainerRef = useRef<HTMLDivElement>(null);

  const spawnFire = useCallback(() => {
    const svgEl = dragonRef.current;
    const container = fireContainerRef.current;
    if (!svgEl || !container) return;
    const rect = svgEl.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    // Dragon is flipped — mouth on the left
    const relX = (rect.left + rect.width * 0.08) - containerRect.left;
    const relY = (rect.top + rect.height * 0.2) - containerRect.top;

    markFound("dragon");
    const particles: FireParticle[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        id: fireIdRef.current++,
        x: relX,
        y: relY,
        vx: -(3 + Math.random() * 6),
        vy: (Math.random() - 0.5) * 4,
        life: 0.8 + Math.random() * 0.4,
        size: 5 + Math.random() * 8,
        hue: Math.random() * 40,
      });
    }
    setFireParticles(prev => [...prev, ...particles]);
  }, [markFound]);

  const spawnGold = useCallback(() => {
    const svgEl = noFaceRef.current;
    if (!svgEl || !pileRef?.current) return;
    markFound("noface");
    const rect = svgEl.getBoundingClientRect();
    // Mouth position in client coords
    const mouthX = rect.left + rect.width * 0.5;
    const mouthY = rect.top + rect.height * 0.29;
    pileRef.current.spawnAt(mouthX, mouthY, 12);
  }, [pileRef, markFound]);

  const handleGauntletClick = useCallback(() => {
    pileRef?.current?.snap();
    markFound("gauntlet");
    setGauntletPulse(true);
    setTimeout(() => setGauntletPulse(false), 400);
  }, [pileRef, markFound]);

  const handleUfoClick = useCallback(() => {
    const svgEl = ufoRef.current;
    if (!svgEl || !pileRef?.current) return;
    const rect = svgEl.getBoundingClientRect();
    const centerX = rect.left + rect.width * 0.5;
    const bottomY = rect.top + rect.height;
    pileRef.current.abduct(centerX, bottomY, rect.width * 0.8);
    markFound("ufo");
    setUfoPulse(true);
    setTimeout(() => setUfoPulse(false), 800);
  }, [pileRef, markFound]);

  const handleDinoClick = useCallback(() => {
    pileRef?.current?.quake();
    markFound("dino");
    setDinoPulse(true);
    setTimeout(() => setDinoPulse(false), 400);
  }, [pileRef, markFound]);

  const handleDiverClick = useCallback(() => {
    markFound("diver");
    const container = diverContainerRef.current;
    if (!container) return;
    const newBubbles: Bubble[] = [];
    for (let i = 0; i < 24; i++) {
      newBubbles.push({
        id: bubbleIdRef.current++,
        x: 0,
        y: 0,
        vy: -(0.003 + Math.random() * 0.006),
        vx: (Math.random() - 0.5) * 0.004,
        size: 4 + Math.random() * 6,
        life: 1.0 + Math.random() * 0.5,
      });
    }
    setBubbles(prev => [...prev, ...newBubbles]);
  }, [markFound]);

  if (materialId === "diamond") {
    const dragonColor = "#90CCD8";
    const dragonSvg = (
      <svg
        ref={dragonRef}
        className="absolute"
        style={{ width: "50%", maxWidth: 80, bottom: "2%", right: "8%", opacity: 1, transform: "scaleX(-1)", pointerEvents: "none" }}
        viewBox="0 0 160 120"
      >
        <path d="M30,90 C40,88 60,82 80,75 C100,68 110,60 115,55" stroke={dragonColor} strokeWidth="16" fill="none" strokeLinecap="round"/>
        <path d="M115,55 C120,45 125,35 128,28" stroke={dragonColor} strokeWidth="12" fill="none" strokeLinecap="round"/>
        <polygon points="124,24 148,18 150,26 142,32 124,32" fill={dragonColor}/>
        <polygon points="126,23 128,8 133,21" fill={dragonColor}/>
        <polygon points="134,20 138,5 141,19" fill={dragonColor}/>
        <circle cx="136" cy="24" r="2" fill="#0a0a12"/>
        <circle cx="146" cy="22" r="1" fill="#0a0a12" opacity="0.6"/>
        <polygon points="75,75 50,20 65,40 80,10 85,38 100,18 95,45 110,30 100,55" fill={dragonColor} opacity="0.7" transform="rotate(-30, 92, 65)"/>
        <path d="M30,90 C20,92 12,88 10,80 C8,72 14,68 20,72" stroke={dragonColor} strokeWidth="8" fill="none" strokeLinecap="round"/>
        <polygon points="10,80 2,72 12,78 6,66 14,76" fill={dragonColor}/>
        <path d="M110,58 L107,72" stroke={dragonColor} strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M107,72 L100,82 M107,72 L105,83 M107,72 L113,82" stroke={dragonColor} strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M50,86 L47,98" stroke={dragonColor} strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M47,98 L40,108 M47,98 L45,109 M47,98 L53,108" stroke={dragonColor} strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>
    );
    return (
      <>
        {/* Dragon visual — behind the pile (z-0) */}
        <div className="absolute inset-0 z-0 overflow-visible">{dragonSvg}</div>
        {/* Click target + fire particles — in front (z-20) */}
        <div ref={fireContainerRef} className="absolute inset-0 z-20 overflow-visible" style={{ pointerEvents: "none" }}>
          <div
            className="absolute cursor-pointer"
            style={{ width: "50%", maxWidth: 80, bottom: "2%", right: "8%", height: "60%", pointerEvents: "auto" }}
            onClick={spawnFire}
          />
          {fireParticles.map(p => (
            <div
              key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: p.x,
                top: p.y,
                width: p.size * p.life,
                height: p.size * p.life,
                background: `hsl(${p.hue}, 100%, ${50 + p.life * 30}%)`,
                opacity: p.life,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
      </>
    );
  }
  if (materialId === "quartz") {
    return (
      <svg
        className="absolute cursor-pointer z-20 transition-transform"
        style={{
          width: "16%", maxWidth: 25, bottom: "-8%", right: "15%", opacity: 1,
          transform: `rotate(-70deg) scale(${gauntletPulse ? 1.3 : 1})`,
          filter: gauntletPulse ? "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))" : "none",
          transition: "transform 0.3s ease-out, filter 0.3s ease-out",
        }}
        viewBox="0 0 120 160"
        onClick={handleGauntletClick}
      >
        <rect x="30" y="110" width="60" height="40" rx="8" fill="#C0A040" opacity="0.9"/>
        <rect x="25" y="55" width="70" height="58" rx="10" fill="#C0A040"/>
        <rect x="25" y="50" width="70" height="14" rx="6" fill="#D4B050"/>
        <rect x="26" y="15" width="14" height="40" rx="6" fill="#C0A040"/>
        <rect x="43" y="8" width="14" height="47" rx="6" fill="#C0A040"/>
        <rect x="60" y="12" width="14" height="43" rx="6" fill="#C0A040"/>
        <rect x="77" y="22" width="13" height="33" rx="6" fill="#C0A040"/>
        <path d="M25,100 C20,98 12,92 10,82 C8,74 12,68 18,70 C22,72 24,78 25,85" fill="#C0A040"/>
        <circle cx="33" cy="58" r="6" fill="#4169E1"/>
        <circle cx="50" cy="58" r="6" fill="#FFD700"/>
        <circle cx="67" cy="58" r="6" fill="#DC143C"/>
        <circle cx="83" cy="58" r="6" fill="#FF8C00"/>
        <circle cx="60" cy="80" r="7.2" fill="#9B59B6"/>
        <circle cx="18" cy="86" r="6" fill="#50C878"/>
      </svg>
    );
  }
  if (materialId === "amber") {
    const noFaceSvg = (
      <svg
        ref={noFaceRef}
        className="absolute"
        style={{ width: "22%", maxWidth: 32, bottom: "8%", right: "22%", opacity: 1, pointerEvents: "none" }}
        viewBox="0 0 60 100"
      >
        <path d="M30,28 C18,28 10,45 8,70 C6,85 12,100 30,100 C48,100 54,85 52,70 C50,45 42,28 30,28Z" fill="#2a2a3e"/>
        <ellipse cx="30" cy="22" rx="14" ry="16" fill="#2a2a3e"/>
        <ellipse cx="30" cy="20" rx="10" ry="12" fill="#e8e0d0" opacity="0.9"/>
        <ellipse cx="25.5" cy="17.5" rx="2.5" ry="3.2" fill="#1a1a2e"/>
        <ellipse cx="34.5" cy="17.5" rx="2.5" ry="3.2" fill="#1a1a2e"/>
        <rect x="23.5" y="10" width="4" height="5" rx="1.5" fill="#7B3F7B"/>
        <rect x="32.5" y="10" width="4" height="5" rx="1.5" fill="#7B3F7B"/>
        <rect x="23.5" y="22" width="4" height="5" rx="1.5" fill="#7B3F7B"/>
        <rect x="32.5" y="22" width="4" height="5" rx="1.5" fill="#7B3F7B"/>
        <ellipse cx="30" cy="29" rx="1.8" ry="1.2" fill="#1a1a2e" opacity="0.5"/>
      </svg>
    );
    return (
      <>
        {/* No-Face visual — behind pile (z-0) */}
        <div className="absolute inset-0 z-0 overflow-visible">{noFaceSvg}</div>
        {/* Click target — in front (z-20) */}
        <div className="absolute inset-0 z-20" style={{ pointerEvents: "none" }}>
          <div
            className="absolute cursor-pointer"
            style={{ width: "22%", maxWidth: 32, bottom: "8%", right: "22%", height: "40%", pointerEvents: "auto" }}
            onClick={spawnGold}
          />
        </div>
      </>
    );
  }
  if (materialId === "moldavite") {
    const ufoColor = "#7ec87e";
    return (
      <>
        {/* UFO + beam — behind pile (z-0) */}
        <div className="absolute inset-0 z-0 overflow-visible">
          {/* Beam — visible on click, extends from UFO down */}
          {ufoPulse && (
            <div
              className="absolute"
              style={{
                width: "28%", maxWidth: 44, top: "10%", right: "12%", height: "85%",
                background: "linear-gradient(to bottom, rgba(126, 200, 126, 0.3), rgba(126, 200, 126, 0))",
                clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                pointerEvents: "none",
              }}
            />
          )}
          <svg
            ref={ufoRef}
            className="absolute transition-transform"
            style={{
              width: "28%", maxWidth: 44, top: "2%", right: "12%", pointerEvents: "none",
              transform: `scale(${ufoPulse ? 1.15 : 1})`,
              filter: ufoPulse ? "drop-shadow(0 0 8px rgba(126, 200, 126, 0.8))" : "none",
              transition: "transform 0.3s ease-out, filter 0.3s ease-out",
            }}
            viewBox="0 0 80 50"
          >
            {/* Dome */}
            <ellipse cx="40" cy="28" rx="12" ry="10" fill="#556b55" opacity="0.7" />
            {/* Body disc */}
            <ellipse cx="40" cy="34" rx="28" ry="8" fill={ufoColor} />
            {/* Lights */}
            <circle cx="24" cy="34" r="2.5" fill="#ffe066" opacity="0.9">
              <animate attributeName="opacity" values="0.9;0.3;0.9" dur="0.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="40" cy="37" r="2.5" fill="#ffe066" opacity="0.9">
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur="0.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="56" cy="34" r="2.5" fill="#ffe066" opacity="0.9">
              <animate attributeName="opacity" values="0.9;0.3;0.9" dur="0.8s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        {/* Click target — in front (z-20) */}
        <div className="absolute inset-0 z-20" style={{ pointerEvents: "none" }}>
          <div
            className="absolute cursor-pointer"
            style={{ width: "28%", maxWidth: 44, top: "2%", right: "12%", height: "25%", pointerEvents: "auto" }}
            onClick={handleUfoClick}
          />
        </div>
      </>
    );
  }
  if (materialId === "amber-inclusion") {
    const dinoColor = "#8B7355";
    return (
      <>
        {/* Brontosaurus — behind pile (z-0) */}
        <div className="absolute inset-0 z-0 overflow-visible">
          <svg
            className="absolute"
            style={{
              width: "60%", maxWidth: 90, bottom: "0%", left: "6%", pointerEvents: "none",
              transform: `scale(${dinoPulse ? 1.15 : 1})`,
              filter: dinoPulse ? "drop-shadow(0 0 8px rgba(139, 115, 85, 0.8))" : "none",
              transition: "transform 0.3s ease-out, filter 0.3s ease-out",
            }}
            viewBox="0 0 100 80"
          >
            {/* Body */}
            <ellipse cx="50" cy="50" rx="22" ry="14" fill={dinoColor} />
            {/* Neck */}
            <path d="M68,46 C75,40 80,30 78,20" stroke={dinoColor} strokeWidth="10" fill="none" strokeLinecap="round" />
            {/* Head */}
            <ellipse cx="80" cy="16" rx="8" ry="5" fill={dinoColor} />
            <circle cx="84" cy="14" r="1.5" fill="#1a1a2e" />
            {/* Tail */}
            <path d="M30,50 C20,48 10,42 4,36" stroke={dinoColor} strokeWidth="8" fill="none" strokeLinecap="round" />
            {/* Legs */}
            <rect x="38" y="60" width="6" height="16" rx="2" fill={dinoColor} />
            <rect x="56" y="60" width="6" height="16" rx="2" fill={dinoColor} />
          </svg>
        </div>
        {/* Click target — in front (z-20) */}
        <div className="absolute inset-0 z-20" style={{ pointerEvents: "none" }}>
          <div
            className="absolute cursor-pointer"
            style={{ width: "60%", maxWidth: 90, bottom: "0%", left: "6%", height: "45%", pointerEvents: "auto" }}
            onClick={handleDinoClick}
          />
        </div>
      </>
    );
  }
  if (materialId === "pearl") {
    const diverColor = "#8B7D6B";
    const helmetColor = "#C8A86E";
    return (
      <>
        {/* Diver visual — behind pile (z-0) */}
        <div className="absolute inset-0 z-0 overflow-visible">
          <svg
            className="absolute"
            style={{ width: "15%", maxWidth: 22, bottom: "2%", left: "50%", transform: "translateX(-50%)", pointerEvents: "none", opacity: 0.8 }}
            viewBox="0 0 50 90"
          >
            {/* Air hose */}
            <path d="M25,8 C30,2 40,0 45,5" stroke={helmetColor} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
            {/* Helmet dome */}
            <rect x="10" y="12" width="30" height="28" rx="10" fill={helmetColor} />
            {/* Porthole */}
            <circle cx="25" cy="24" r="8" fill="#1a2a3a" />
            <circle cx="25" cy="24" r="7" fill="none" stroke="#A08050" strokeWidth="1.5" />
            {/* Porthole glint */}
            <circle cx="22" cy="21" r="2" fill="rgba(180, 220, 255, 0.3)" />
            {/* Body / suit */}
            <rect x="13" y="38" width="24" height="28" rx="4" fill={diverColor} />
            {/* Arms */}
            <rect x="3" y="40" width="12" height="7" rx="3" fill={diverColor} />
            <rect x="35" y="40" width="12" height="7" rx="3" fill={diverColor} />
            {/* Belt */}
            <rect x="13" y="52" width="24" height="4" rx="1" fill="#5A4A3A" />
            {/* Legs */}
            <rect x="14" y="64" width="9" height="14" rx="3" fill={diverColor} />
            <rect x="27" y="64" width="9" height="14" rx="3" fill={diverColor} />
            {/* Boots */}
            <rect x="12" y="75" width="13" height="6" rx="2" fill="#3A3A3A" />
            <rect x="25" y="75" width="13" height="6" rx="2" fill="#3A3A3A" />
          </svg>
        </div>
        {/* Click target + bubbles — in front (z-20) */}
        <div ref={diverContainerRef} className="absolute inset-0 z-20 overflow-visible" style={{ pointerEvents: "none" }}>
          <div
            className="absolute cursor-pointer"
            style={{ width: "15%", maxWidth: 22, bottom: "2%", left: "50%", transform: "translateX(-50%)", height: "50%", pointerEvents: "auto" }}
            onClick={handleDiverClick}
          />
          {bubbles.map(b => (
            <div
              key={b.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: "50%",
                bottom: "20%",
                marginLeft: b.x,
                marginBottom: -b.y,
                width: b.size,
                height: b.size,
                border: "1px solid rgba(180, 220, 255, 0.5)",
                background: "radial-gradient(circle at 30% 30%, rgba(200, 230, 255, 0.3), transparent)",
                opacity: b.life,
                transform: "translate(50%, 50%)",
              }}
            />
          ))}
        </div>
      </>
    );
  }
  return null;
}

function getParticleStyle(material: Material): ParticleStyle {
  switch (material.id) {
    case "corundum":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [1.0, 2.2], countMultiplier: 3.0 };
    case "diamond":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.9, 2.0], countMultiplier: 3.5 };
    case "quartz":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [1.1, 2.2], countMultiplier: 2.0 };
    case "emerald":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [1.3, 2.6], countMultiplier: 5.0 };
    case "red-beryl":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.9, 2.0], countMultiplier: 5.0 };
    case "alexandrite":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [1.5, 3.0], countMultiplier: 4.0 };
    case "painite":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [1.0, 2.2], countMultiplier: 5.0 };
    case "taaffeite":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [1.5, 3.0], countMultiplier: 4.0 };
    case "jadeite":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.8, 1.8], countMultiplier: 5.0 };
    case "moldavite":
      return { particleShape: "chunk", colorJitter: 0.15, sizeRange: [0.7, 1.8], countMultiplier: 4.0 };
    case "opal":
      return { particleShape: "chunk", colorJitter: 0.35, sizeRange: [0.9, 1.8], countMultiplier: 7.0 };
    case "wood":
      return { particleShape: "log", colorJitter: 0.25, sizeRange: [0.8, 1.6], countMultiplier: 5.0 };
    case "ammolite":
      return { particleShape: "shard", colorJitter: 0.2, sizeRange: [1.5, 3.0], countMultiplier: 12 };
    case "coral":
      return { particleShape: "log", colorJitter: 0.15, sizeRange: [0.5, 1.1], countMultiplier: 9.0 };
    case "amber":
      return { particleShape: "circle", colorJitter: 0.2, sizeRange: [0.3, 0.8], countMultiplier: 8.0 };
    case "amber-inclusion":
      return { particleShape: "circle", colorJitter: 0.2, sizeRange: [0.8, 1.8], countMultiplier: 8 };
    case "ammonite":
      return { particleShape: "circle", colorJitter: 0.2, sizeRange: [0.4, 0.9], countMultiplier: 7.0 };
    case "pearl":
      return { particleShape: "circle", colorJitter: 0.08, sizeRange: [0.3, 0.6], countMultiplier: 8.0 };
    default:
      return { particleShape: "circle", colorJitter: 0.1, sizeRange: [0.7, 1.3] };
  }
}

/**
 * Per-material shrink factor: scales both pile AND reference object
 * proportionally so their ratio stays locked. 1 = no change.
 */
function getPileShrink(id: string, mobile: boolean): number {
  if (mobile) {
    switch (id) {
      case "corundum": // ruby & sapphire
      case "emerald":
      case "painite":
      case "taaffeite":
      case "alexandrite":
      case "ammolite":
      case "amber-inclusion":
      case "moldavite":
        return 0.35;
      case "diamond":
      case "quartz":
        return 0.85;
      default:
        return 1;
    }
  }
  // Desktop: no per-material shrink, rely on viewport cap + overflow-visible
  return 1;
}

function getMaterialFeel(material: Material): MaterialFeel {
  if (material.density >= 3800) return "heavy";
  if (material.category === "biological") return "organic";
  if (material.category === "earth-impact") return "glassy";
  if (
    [
      "diamond",
      "opal",
      "emerald",
      "alexandrite",
      "taaffeite",
      "red-beryl",
    ].includes(material.id)
  )
    return "sparkly";
  return "sparkly";
}

/** Cone pile height in metres (angle of repose ~33deg). */
function conePileHeight(logVolume: number): number {
  const logR = (logVolume - Math.log10(0.68)) / 3;
  const logH = logR + Math.log10(0.65);
  return Math.pow(10, logH);
}

const REF_DISPLAY_SIZES: Record<string, number> = {
  heliosphere: 100, "solar-system": 100, sun: 100,
  earth: 100, everest: 100, statue: 80, human: 70,
};

/**
 * All acts now use real proportional sizing.
 * Pile height in px = reference px size * (real pile height / real reference size).
 * Clamped to 0.25x-9x to stay readable. Opal is special-cased (true ratio 0.065x,
 * clamped to 0.3x for readability).
 */
function getPileHeight(material: Material, isMobile: boolean, desktopCap: number): number {
  const mobileCap = 400;

  const realH = conePileHeight(material.logVolume);
  const refType = getRefType(material.logVolume, material.act);
  const refRealSize = REFERENCES[refType].realSize;
  const realRatio = realH / refRealSize;

  // Opal: true ratio is 0.065x solar system, clamp to 0.3x for readability
  const minRatio = material.id === "opal" ? 0.3 : 0.25;
  const clampedRatio = Math.max(minRatio, Math.min(9, realRatio));
  const refPx = REF_DISPLAY_SIZES[refType];
  const h = Math.round(refPx * clampedRatio);
  return isMobile ? Math.min(h, mobileCap) : Math.min(h, desktopCap);
}

/** Returns a disclaimer string if the pile is visually enlarged beyond its true ratio. */
function getScaleNote(material: Material): string | undefined {
  const realH = conePileHeight(material.logVolume);
  const refType = getRefType(material.logVolume, material.act);
  const ref = REFERENCES[refType];
  const realRatio = realH / ref.realSize;
  const minRatio = material.id === "opal" ? 0.3 : 0.25;
  // Only show note if the ratio was clamped upward (pile shown bigger than reality)
  if (realRatio >= minRatio) return undefined;
  const pct = (realRatio * 100).toFixed(realRatio < 0.1 ? 1 : 0);
  return `Pile enlarged for visibility — true size is ${pct}% of the ${ref.label.toLowerCase()}.`;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return mobile;
}

// Cap desktop piles so the card (pile + text) fits the viewport.
// ~45% of viewport leaves room for title, description, and affiliate row.
// Starts at 400 (matches server render) then updates after hydration.
function useDesktopCap() {
  const [cap, setCap] = useState(400);
  useEffect(() => {
    const update = () => setCap(Math.round(window.innerHeight * 0.22));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cap;
}

export default function MaterialCard({
  material,
  isActive,
}: {
  material: Material;
  isActive: boolean;
}) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const pileRef = useRef<ParticlePileHandle>(null);
  const isMobile = useIsMobile();
  const desktopCap = useDesktopCap();

  useEffect(() => {
    if (isActive && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isActive, hasAnimated]);

  const active = hasAnimated;

  const pileShrink = getPileShrink(material.id, isMobile);
  const rawPileHeight = getPileHeight(material, isMobile, desktopCap);
  const pileHeight = Math.round(rawPileHeight * pileShrink);
  const minCanvasHeight = Math.round(160 * pileShrink);
  const canvasHeight = Math.max(minCanvasHeight, pileHeight);
  const pileScale = pileHeight / canvasHeight;

  // Two-colour system: accent + tint
  // Accent = material.color (title + counter value)
  // Tint = warm or cool neutral (tagline, description — varied by opacity)
  const isWarm = material.act === 3;
  const tintBase = isWarm ? "245, 238, 225" : "230, 238, 248";

  const hasProducts = !!inlineProducts[material.id];

  return (
    <div
      className="material-card relative w-full max-w-[100vw] h-full flex flex-col items-center justify-center gap-6 md:gap-10 px-4 md:px-6 pt-10 pb-4 md:py-0 overflow-hidden"
      role="region"
      aria-label={`${material.name} — ${material.tagline}`}
    >
      {/* Zone 1: Visual — pile + reference, scaled to fit on mobile */}
      <div
        className={`snap-animate snap-animate-delay-1 w-full flex items-end justify-center gap-2 md:gap-3 overflow-visible ${active ? "is-active" : ""}`}
        style={isMobile && canvasHeight > 200 ? {
          height: 200,
          transform: `scale(${200 / canvasHeight})`,
          transformOrigin: 'center bottom',
        } : undefined}
      >
        <div className="flex-shrink-0">
          <ScaleReference
            logVolume={material.logVolume}
            act={material.act}
            pileHeight={pileHeight}
            sizeFactor={pileShrink}
          />
        </div>

        <div
          className="flex-1 relative"
          style={{
            maxWidth: Math.max(240, pileHeight * 3),
          }}
        >
          <ParticlePile
            ref={pileRef}
            color={material.color}
            glowColor={material.glowColor}
            height={canvasHeight}
            isVisible={active}
            feel={getMaterialFeel(material)}
            density={material.density}
            pileScale={pileScale}
            {...getParticleStyle(material)}
          />
          <EasterEggOverlay materialId={material.id} pileRef={pileRef} />
        </div>
      </div>

      {/* Zone 2: Identity — title, counter, tagline */}
      <div className="text-center max-w-lg mx-auto">
        <h2
          className={`snap-animate snap-animate-delay-2 font-editorial text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] ${active ? "is-active" : ""}`}
          style={{ color: material.color }}
        >
          {material.name}
        </h2>

        <div className={`snap-animate snap-animate-delay-3 mt-3 md:mt-4 ${active ? "is-active" : ""}`}>
          <MassCounter logVolume={material.logVolume} density={material.density} color={material.color} act={material.act} derivation={material.derivation} scaleNote={getScaleNote(material)} />
        </div>

        <p
          className={`snap-animate snap-animate-delay-4 font-editorial text-base md:text-xl italic mt-1 md:mt-3 leading-relaxed ${active ? "is-active" : ""}`}
          style={{ color: `rgba(${tintBase}, 1)` }}
        >
          {material.tagline}
        </p>
      </div>

      {/* Zone 3: Description + product — separated from identity */}
      <div className="text-center max-w-lg mx-auto">
        <p
          className={`snap-animate snap-animate-delay-5 text-sm md:text-lg leading-[1.6] md:leading-[1.8] max-w-md mx-auto ${active ? "is-active" : ""}`}
          style={{ color: `rgba(${tintBase}, 1)` }}
        >
          {material.description}
        </p>

        {hasProducts && (
          <div className={`snap-animate snap-animate-delay-6 mt-3 md:mt-8 hover:opacity-100 transition-opacity ${active ? "is-active" : ""}`}>
            <AffiliateRow
              products={inlineProducts[material.id]}
              glowColor={material.glowColor}
              materialColor={material.color}
            />
          </div>
        )}
      </div>

    </div>
  );
}

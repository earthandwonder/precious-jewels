"use client";

import { materials, interstitials, ACT_TITLES } from "@/data/materials";
import type { Act, Material } from "@/data/materials";
import MaterialCard from "./MaterialCard";
import Interstitial from "./Interstitial";
import ScrollProgress from "./ScrollProgress";
import ScaleTransition from "./ScaleTransition";
import { getRefType } from "./ScaleReference";

function ActHeader({ act }: { act: Act }) {
  const info = ACT_TITLES[act];
  const isWarm = act === 3;

  return (
    <div className="py-16 md:py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p
          className="act-number mb-4 tracking-widest"
          style={{
            color: isWarm
              ? "rgba(255, 200, 150, 0.5)"
              : "rgba(150, 180, 220, 0.5)",
          }}
        >
          Act {act}
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{
            color: isWarm ? "#ffecd2" : "#c8d6e6",
          }}
        >
          {info.title}
        </h2>
        <p className="text-base text-muted leading-relaxed max-w-lg mx-auto">
          {info.subtitle}
        </p>
      </div>
    </div>
  );
}

/**
 * Renders a list of MaterialCards with ScaleTransitions inserted
 * between cards where the reference object type changes.
 */
function MaterialsWithTransitions({ items, prevMaterial }: { items: Material[]; prevMaterial?: Material }) {
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < items.length; i++) {
    const m = items[i];
    const prev = i === 0 ? prevMaterial : items[i - 1];
    const currentRef = getRefType(m.logMass, m.density, m.act);
    const prevRef = prev ? getRefType(prev.logMass, prev.density, prev.act) : null;

    // Insert zoom transition if reference type changed
    if (prevRef && prevRef !== currentRef) {
      elements.push(
        <ScaleTransition
          key={`transition-${prev!.id}-${m.id}`}
          fromRef={prevRef}
          toRef={currentRef}
        />
      );
    }

    elements.push(
      <MaterialCard key={m.id} material={m} />
    );
  }

  return <>{elements}</>;
}

export default function Essay() {
  const act1 = materials.filter((m) => m.act === 1);
  const act2 = materials.filter((m) => m.act === 2);
  const act3 = materials.filter((m) => m.act === 3);

  const act1LastColor = act1[act1.length - 1]?.color ?? "#ffecd2";
  const act2LastColor = act2[act2.length - 1]?.color ?? "#ffecd2";
  const act2Last = act2[act2.length - 1];

  return (
    <>
      <ScrollProgress />
      <div className="starfield" />

      {/* Hero */}
      <header className="hero-gradient relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="act-number text-muted mb-6 tracking-widest">
          An interactive essay
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-foreground">
          Precious Jewels
        </h1>
        <p className="text-lg md:text-xl text-muted max-w-lg leading-relaxed mb-4">
          We call gems &ldquo;precious&rdquo; because they feel rare.
          <br />
          But rare <em>where?</em>
        </p>
        <p className="text-sm text-muted max-w-md leading-relaxed mb-12">
          Measured against the whole universe, the ranking of rarity inverts
          completely. The most famous gems are the most common. And the rarest
          thing you could wear turns out to be something no one expects.
        </p>
        <div className="animate-bounce text-muted">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </header>

      {/* Act I */}
      <section className="relative z-10">
        <ActHeader act={1} />
        <div className="max-w-3xl mx-auto px-6 space-y-24 pb-12">
          <MaterialsWithTransitions items={act1} />
        </div>
      </section>

      {/* Interstitial 1->2 */}
      <Interstitial {...interstitials["1-2"]} />

      {/* Act II */}
      <section className="relative z-10">
        <ActHeader act={2} />
        <div className="max-w-3xl mx-auto px-6 space-y-24 pb-12">
          <MaterialsWithTransitions items={act2} />
        </div>
      </section>

      {/* Interstitial 2->3 */}
      <Interstitial {...interstitials["2-3"]} />

      {/* Act III */}
      <section className="relative z-10">
        <ActHeader act={3} />
        <div className="max-w-3xl mx-auto px-6 space-y-24 pb-12">
          <MaterialsWithTransitions items={act3} prevMaterial={act2Last} />
        </div>
      </section>

      {/* Finale */}
      <footer className="relative z-10 py-32 md:py-48 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <p className="act-number text-muted mb-8 tracking-widest">
            The rarest wearable material in the known universe
          </p>
          <p
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ color: "#FDEBD0" }}
          >
            A natural pearl.
          </p>
          <p className="text-base md:text-lg text-muted leading-relaxed mb-8 max-w-md mx-auto">
            Not diamond. Not ruby. A small, quiet sphere built by a living
            creature, on the only planet known to have oceans, wrapped around an
            irritant grain by grain over years.
          </p>
          <p className="text-sm text-muted leading-relaxed max-w-md mx-auto mb-12">
            If all the peridot in the universe were the Pacific Ocean, all the
            natural pearls ever formed on Earth wouldn&apos;t fill a thimble.
          </p>
          <div
            className="w-px h-24 mx-auto mb-8"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,236,210,0.3), transparent)",
            }}
          />
          <p className="text-xs text-muted">
            Click any particle pile to scatter it.
          </p>
        </div>
      </footer>
    </>
  );
}

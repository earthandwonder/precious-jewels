/**
 * Crawlable text summary below the interactive essay, split across
 * snap pages so it flows naturally within the scroll experience.
 * Contains the H1 for Google and keyword-rich content.
 */

const tint = "rgba(230, 238, 248, 0.85)";
const tintSoft = "rgba(230, 238, 248, 0.55)";

function ArticlePage({ children }: { children: React.ReactNode }) {
  return (
    <div className="snap-page">
      <div className="relative z-10 w-full h-full flex items-center justify-center px-6">
        <div className="max-w-xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ArticleSummary() {
  return (
    <article>
      {/* Page 1: Intro + H1 */}
      <ArticlePage>
        <h1
          className="font-editorial text-3xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-8"
          style={{ color: tint }}
        >
          The rarest gemstones in the universe, ranked
        </h1>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: tintSoft }}>
          We ranked 17 precious materials — every mineral, fossil, and biological gem
          used in jewellery — by how much of each one exists across the entire known universe.
          The result spans 44 orders of magnitude, from planet-swallowing
          quantities of corundum down to a single room of natural pearls.
        </p>
      </ArticlePage>

      {/* Page 2: Cosmically abundant */}
      <ArticlePage>
        <h2
          className="font-editorial text-2xl md:text-4xl font-medium tracking-tight leading-[1.1] mb-6"
          style={{ color: tint }}
        >
          The most common gemstones are cosmically abundant
        </h2>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: tintSoft }}>
          Ruby and sapphire — both forms of corundum — are among the first minerals
          to crystallise from a cooling stellar wind. Diamond is even more
          common: carbon is the fourth most abundant element, and diamond forms
          wherever pressure and temperature align. It rains diamonds inside Uranus
          and Neptune. Quartz, amethyst, jadeite, and opal follow — all abundant
          wherever rocky planets exist with the right conditions.
        </p>
      </ArticlePage>

      {/* Page 3: Beryllium cliff */}
      <ArticlePage>
        <h2
          className="font-editorial text-2xl md:text-4xl font-medium tracking-tight leading-[1.1] mb-6"
          style={{ color: tint }}
        >
          The beryllium cliff
        </h2>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: tintSoft }}>
          Emerald, red beryl, taaffeite, and alexandrite all require beryllium — an
          element that can&apos;t be forged inside stars. Beryllium is created only when
          cosmic rays smash into heavier atoms at near-light speed. This bottleneck
          means these gems can never be cosmically common, no matter how many
          rocky worlds there are. Red beryl has one commercial deposit on Earth,
          and there is roughly one red beryl crystal for every 150,000 gem diamonds.
          Taaffeite was first discovered already cut and polished in a jeweller&apos;s box,
          mistaken for spinel. Fewer than a thousand faceted stones are known.
        </p>
      </ArticlePage>

      {/* Page 4: Earth-only + pearl */}
      <ArticlePage>
        <h2
          className="font-editorial text-2xl md:text-4xl font-medium tracking-tight leading-[1.1] mb-6"
          style={{ color: tint }}
        >
          The rarest gemstones exist on only one planet
        </h2>
        <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: tintSoft }}>
          Minerals can form on trillions of worlds. Life — as far as we know — happened
          on one. Every biological gem exists only on Earth: wood, ammonite
          fossils, amber, precious coral, ammolite, and natural pearl. Moldavite
          is glass formed by a single asteroid impact 14.8 million years ago.
          Only 275 tonnes survive.
        </p>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: tintSoft }}>
          The rarest of all? Not diamond. Not ruby. A natural pearl — built grain
          by grain by a living creature, on the only planet known to have oceans.
          Every natural pearl that has ever existed would fit inside a single room.
        </p>
      </ArticlePage>

      {/* Page 5: Full ranking */}
      <ArticlePage>
        <h2
          className="font-editorial text-2xl md:text-3xl font-medium tracking-tight leading-[1.1] mb-6"
          style={{ color: tint }}
        >
          The full ranking
        </h2>
        <p className="text-sm mb-4" style={{ color: tintSoft }}>
          Most abundant gemstone to rarest, by total mass across the known universe:
        </p>
        <ol className="text-sm md:text-base leading-relaxed space-y-0.5 list-decimal list-inside" style={{ color: tintSoft }}>
          <li>Ruby &amp; Sapphire (corundum)</li>
          <li>Quartz &amp; Amethyst</li>
          <li>Diamond</li>
          <li>Jadeite</li>
          <li>Opal</li>
          <li>Emerald</li>
          <li>Red Beryl</li>
          <li>Taaffeite</li>
          <li>Alexandrite</li>
          <li>Wood</li>
          <li>Ammonite</li>
          <li>Amber</li>
          <li>Precious Coral</li>
          <li>Ammolite</li>
          <li>Amber with Insect Inclusions</li>
          <li>Moldavite</li>
          <li>Natural Pearl</li>
        </ol>
      </ArticlePage>
    </article>
  );
}

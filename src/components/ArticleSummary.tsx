/**
 * Crawlable text summary below the interactive essay, split across
 * snap pages so it flows naturally within the scroll experience.
 * Contains the H1 for Google and keyword-rich content.
 */

import { CONTENT } from "@/data/content";

const tint = "rgba(230, 238, 248, 0.85)";
const tintSoft = "rgba(230, 238, 248, 0.7)";

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
          {CONTENT.article_h1}
        </h1>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: tintSoft }}>
          {CONTENT.article_intro}
        </p>
      </ArticlePage>

      {/* Page 2: Cosmically abundant */}
      <ArticlePage>
        <h2
          className="font-editorial text-2xl md:text-4xl font-medium tracking-tight leading-[1.1] mb-6"
          style={{ color: tint }}
        >
          {CONTENT.article_h2_abundant}
        </h2>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: tintSoft }}>
          {CONTENT.article_p_abundant}
        </p>
      </ArticlePage>

      {/* Page 3: Beryllium cliff */}
      <ArticlePage>
        <h2
          className="font-editorial text-2xl md:text-4xl font-medium tracking-tight leading-[1.1] mb-6"
          style={{ color: tint }}
        >
          {CONTENT.article_h2_beryllium}
        </h2>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: tintSoft }}>
          {CONTENT.article_p_beryllium}
        </p>
      </ArticlePage>

      {/* Page 4: Earth-only + pearl */}
      <ArticlePage>
        <h2
          className="font-editorial text-2xl md:text-4xl font-medium tracking-tight leading-[1.1] mb-6"
          style={{ color: tint }}
        >
          {CONTENT.article_h2_earth_only}
        </h2>
        <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: tintSoft }}>
          {CONTENT.article_p_earth_only_1}
        </p>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: tintSoft }}>
          {CONTENT.article_p_earth_only_2}
        </p>
      </ArticlePage>

      {/* Page 5: Full ranking */}
      <ArticlePage>
        <h2
          className="font-editorial text-2xl md:text-3xl font-medium tracking-tight leading-[1.1] mb-6"
          style={{ color: tint }}
        >
          {CONTENT.article_h2_ranking}
        </h2>
        <p className="text-sm mb-4" style={{ color: tintSoft }}>
          {CONTENT.article_ranking_intro}
        </p>
        <ol className="text-sm md:text-base leading-relaxed space-y-0.5 list-decimal list-inside" style={{ color: tintSoft }}>
          {CONTENT.article_ranking.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      </ArticlePage>
    </article>
  );
}

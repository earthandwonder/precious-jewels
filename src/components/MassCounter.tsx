"use client";

interface MassCounterProps {
  logMass: number;
  color: string;
}

function formatMass(logMass: number): { value: string; unit: string } {
  if (logMass >= 45) {
    const exp = Math.round(logMass - 24.8);
    return { value: `10${superscript(exp)}`, unit: "Earth-masses" };
  }
  if (logMass >= 30) {
    return { value: `10${superscript(logMass)}`, unit: "kg" };
  }
  if (logMass >= 18) {
    const tonnes = logMass - 3;
    return { value: `10${superscript(Math.round(tonnes - 12))}`, unit: "trillion tonnes" };
  }
  if (logMass >= 15) {
    const tonnes = logMass - 3;
    const val = Math.round(10 ** (tonnes - 9));
    return { value: val.toLocaleString(), unit: "billion tonnes" };
  }
  if (logMass >= 12) {
    const tonnes = logMass - 3;
    const val = Math.round(10 ** (tonnes - 6));
    return { value: val.toLocaleString(), unit: "million tonnes" };
  }
  if (logMass >= 9) {
    const val = Math.round(10 ** (logMass - 3) / 1e6);
    return { value: val.toLocaleString(), unit: "million tonnes" };
  }
  if (logMass >= 6) {
    const val = Math.round(10 ** (logMass - 3));
    return { value: val.toLocaleString(), unit: "tonnes" };
  }
  if (logMass >= 3) {
    const val = Math.round(10 ** logMass / 1000);
    return { value: val.toLocaleString(), unit: "tonnes" };
  }
  const val = Math.round(10 ** logMass);
  return { value: val.toLocaleString(), unit: "kg" };
}

function superscript(n: number): string {
  const map: Record<string, string> = {
    "0": "\u2070", "1": "\u00B9", "2": "\u00B2", "3": "\u00B3",
    "4": "\u2074", "5": "\u2075", "6": "\u2076", "7": "\u2077",
    "8": "\u2078", "9": "\u2079",
  };
  return String(n).split("").map(c => map[c] ?? c).join("");
}

export default function MassCounter({ logMass, color }: MassCounterProps) {
  const { value, unit } = formatMass(logMass);

  // Uncountable: logMass >= 25 — large, pulsing, overwhelming
  // Transitional: 10-25 — medium
  // Countable: < 10 — sharp, precise, small
  const isUncountable = logMass >= 25;
  const isTransitional = logMass >= 10 && logMass < 25;

  const fontSize = isUncountable
    ? "text-xl md:text-2xl"
    : isTransitional
      ? "text-lg md:text-xl"
      : "text-base md:text-lg";

  return (
    <div className="my-3 flex items-baseline justify-center gap-2">
      <span
        className={`font-mono font-bold tracking-wider ${fontSize} ${isUncountable ? "count-pulse" : ""}`}
        style={{
          color,
          opacity: isUncountable ? 0.8 : 0.6,
        }}
      >
        ~{value}
      </span>
      <span className="text-xs text-muted">
        {unit} across the known universe
      </span>
    </div>
  );
}

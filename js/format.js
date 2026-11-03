const COMPACT_FROM = 10000;
const full = new Intl.NumberFormat("en-US");
const short = new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short", maximumFractionDigits: 1 });
const spoken = new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "long", maximumFractionDigits: 1 });

export function formatCount(n) {
  if (n < COMPACT_FROM) {
    const text = full.format(n);
    return { text, spoken: text };
  }
  return { text: short.format(n), spoken: spoken.format(n) };
}

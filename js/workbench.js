import { includePartials } from "./include.js";
import { filters, SCENARIO } from "./scenario.js";
import { renderCategoryBar } from "./category-bar.js";
import { esc } from "./escape.js";
import { heroCopy } from "./hero-copy.js";
import { formatCount } from "./format.js";
import { offersByService, byClosestToUnlock } from "./offers.js";
import { photoCard } from "./photo-card.js";
import { starterPillsBlock } from "./starters.js";
import { inviteNudge } from "./invite.js";
import { startSuggestions } from "./suggestions.js";

const COLORS = {
  Brand: ["--brand-logo", "--brand", "--brand-strong", "--brand-tint"],
  Neutrals: ["--ink", "--ink-2", "--ink-3", "--line", "--line-2", "--surface", "--surface-2", "--surface-3"],
  "Status (never brand)": ["--success", "--success-tint", "--warning", "--warning-tint", "--danger", "--danger-tint"]
};
const TYPE = ["--t-xs", "--t-sm", "--t-base", "--t-lg", "--t-xl", "--t-2xl", "--t-3xl"];
const SPACE = ["--s-1", "--s-2", "--s-3", "--s-4", "--s-5", "--s-6", "--s-8", "--s-10", "--s-12"];

const token = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

function renderTokens() {
  document.querySelector("[data-swatches]").innerHTML = Object.entries(COLORS).map(([group, names]) => `
    <div class="swatch-group">${esc(group)}</div>
    <div class="swatches">${names.map((n) => `
      <div class="swatch"><div class="swatch__chip" style="background: var(${n})"></div>
      <div class="swatch__meta"><strong>${esc(n)}</strong><code>${esc(token(n))}</code></div></div>`).join("")}
    </div>`).join("");

  document.querySelector("[data-type-scale]").innerHTML = `<div class="swatch-group">Type</div>` + TYPE.map((n) => `
    <div class="scale-row"><code>${esc(n)} · ${esc(token(n))}</code><span style="font-size: var(${n}); font-weight: 700">Your neighborhood is teaming up</span></div>`).join("");

  document.querySelector("[data-space-scale]").innerHTML = `<div class="swatch-group">Spacing (8-pt)</div>` + SPACE.map((n) => `
    <div class="scale-row"><code>${esc(n)} · ${esc(token(n))}</code><span class="space-bar" style="width: var(${n})"></span></div>`).join("");
}

const HERO_STATES = [
  { label: "Many campaigns", count: 5 },
  { label: "One campaign", count: 1 },
  { label: "Nothing open (prompt to start)", count: 0 }
];

const TITLE_WEIGHTS = [
  { label: "700 bold", weight: 700 },
  { label: "600 semibold (current)", weight: 600 },
  { label: "500 medium", weight: 500 }
];

function heroMarkup(count, style = "") {
  const copy = heroCopy(count, SCENARIO.place);
  return `
    <div class="container hero">
      <div class="hero__text">
        <span class="hero__eyebrow">Hi Jamie</span>
        <h1 class="hero__title" style="${style}">${copy.titleHtml}</h1>
        ${copy.lead ? `<p class="hero__lead">${esc(copy.lead)}</p>` : ""}
      </div>
      ${copy.cta ? `<a class="btn btn--primary btn--lg hero__cta" href="#">Start the first campaign</a>` : ""}
    </div>`;
}

function renderHero() {
  const states = HERO_STATES.map((s) => `
    <div class="stage stage--phone"><span class="stage__label">${esc(s.label)}</span>${heroMarkup(s.count)}</div>`).join("");
  const weights = TITLE_WEIGHTS.map((w) => `
    <div class="stage stage--phone"><span class="stage__label">Title weight ${esc(w.label)}</span>${heroMarkup(5, `font-weight: ${w.weight}`)}</div>`).join("");
  document.querySelector("[data-hero-variants]").innerHTML = states + weights;
}

function renderNumbers() {
  document.querySelector("[data-wb-numbers]").innerHTML = [7, 18, 1240, 9999, 12400, 1250000].map((n) => {
    const f = formatCount(n);
    return `<div class="scale-row"><code>${esc(String(n))}</code><strong>${esc(f.text)}</strong><span style="color: var(--ink-2)">${esc(f.spoken)}</span></div>`;
  }).join("");
}

function renderPhotoCards() {
  const grouped = offersByService();
  document.querySelectorAll("[data-wb-photo]").forEach((el) => {
    el.innerHTML = photoCard(grouped.find((s) => s.id === el.dataset.wbPhoto));
  });
  document.querySelector("[data-wb-photo-grid]").innerHTML = [...grouped].sort(byClosestToUnlock).map(photoCard).join("");
  document.querySelector("[data-wb-credits]").textContent =
    "Photos from Unsplash by " + grouped.map((s) => s.photoBy).join(", ") + ". Placeholders until providers upload their own work.";
}

function setupFocus() {
  const sections = [...document.querySelectorAll(".wb-section")];
  const only = new URLSearchParams(location.search).get("only");
  document.querySelector("[data-wb-links]").innerHTML = sections
    .map((s) => `<a href="?only=${esc(s.id)}" aria-current="${s.id === only}">${esc(s.dataset.title)}</a>`)
    .join("");
  if (only) sections.forEach((s) => { s.hidden = s.id !== only; });
}

setupFocus();
renderTokens();
renderHero();
await includePartials();
document.querySelectorAll("[data-wb-bar]").forEach((el) => renderCategoryBar(el, filters, () => {}));
renderPhotoCards();
renderNumbers();
document.querySelectorAll("[data-wb-invite]").forEach((el) => { el.innerHTML = inviteNudge([...offersByService()].sort(byClosestToUnlock)[0]); });
document.querySelectorAll("[data-wb-starters]").forEach((el) => { el.innerHTML = starterPillsBlock(startSuggestions, SCENARIO.place); });

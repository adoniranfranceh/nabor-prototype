import { includePartials } from "./include.js";
import { filters, SCENARIO, MIN_SERVICES_FOR_FILTERS } from "./scenario.js";
import { offersByService, byClosestToUnlock } from "./offers.js";
import { photoCard } from "./photo-card.js";
import { renderCategoryBar } from "./category-bar.js";
import { heroCopy } from "./hero-copy.js";
import { starterPillsBlock } from "./starters.js";
import { startSuggestions } from "./suggestions.js";
import { inviteNudge } from "./invite.js";

const list = document.querySelector("[data-services]");
const bar = document.querySelector("[data-filters]");
const sample = Number.parseInt(new URLSearchParams(location.search).get("services") ?? "", 10);
const all = offersByService().sort(byClosestToUnlock);
const open = Number.isNaN(sample) ? all : all.slice(0, sample);
const available = filters.filter((f) => f.id === "all" || open.some((s) => s.filter === f.id));

function renderHero() {
  const copy = heroCopy(open.length, SCENARIO.place);
  document.querySelector("[data-hero-title]").innerHTML = copy.titleHtml;
  const lead = document.querySelector("[data-hero-lead]");
  lead.textContent = copy.lead;
  lead.hidden = !copy.lead;
  document.querySelector("[data-hero-cta]").hidden = !copy.cta;
  document.querySelector("[data-list-section]").hidden = open.length === 0;
}

function render(filterId) {
  const visible = open.filter((s) => filterId === "all" || s.filter === filterId);
  list.innerHTML = visible.map(photoCard).join("");
}

await includePartials();
renderHero();
bar.hidden = open.length < MIN_SERVICES_FOR_FILTERS || available.length < 3;
bar.style.setProperty("--count", available.length);
renderCategoryBar(bar, available, render);
render("all");
document.querySelector("[data-starters]").innerHTML = starterPillsBlock(startSuggestions, SCENARIO.place);
const invite = document.querySelector("[data-invite]");
invite.hidden = open.length === 0;
if (open.length > 0) invite.innerHTML = inviteNudge(open[0]);

import { includePartials } from "./include.js";
import { SCENARIO, daysUntil } from "./scenario.js";
import { offersByService, priceForHome, offerSlug } from "./offers.js";
import { offerCard } from "./offer-card.js";
import { esc } from "./escape.js";
import { wireBackLink } from "./back-link.js";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const PHOTO_PARAMS = "?auto=format&fit=crop&w=1200&h=600&q=70";
const id = new URLSearchParams(location.search).get("service") ?? "gutter";
const service = offersByService().find((s) => s.id === id) ?? offersByService()[0];
const home = SCENARIO.home;

function render() {
  document.title = `Nabor · ${service.title}`;
  document.querySelector("[data-photo]").src = service.photo + PHOTO_PARAMS;
  document.querySelector("[data-title]").textContent = service.title;
  document.querySelector("[data-crumb]").textContent = service.title;
  document.querySelector("[data-place]").textContent = `in ${SCENARIO.place}`;
  const count = service.offers.length;
  document.querySelector("[data-offers-title]").textContent = count === 1 ? "The offer for your home" : "Pick a pro for your home";
  const ordered = [...service.offers].sort((a, b) => (a.goal - a.joined) - (b.goal - b.joined) || daysUntil(a.endsOn) - daysUntil(b.endsOn));
  const list = document.querySelector("[data-offers]");
  list.innerHTML = ordered.map((o, i) => offerCard(o, home, { index: i, checked: i === 0 })).join("");
  list.addEventListener("change", (event) => updateChoice(ordered[Number(event.target.value)]));
  updateChoice(ordered[0]);
}

function updateChoice(offer) {
  const price = priceForHome(offer, home);
  const priceText = price === null ? "Quote needed" : `${money.format(price)} ${offer.unit}`;
  document.querySelector("[data-choice-provider]").textContent = offer.provider;
  document.querySelector("[data-choice-price]").innerHTML = price === null
    ? "<strong>Quote needed</strong>"
    : `<strong>${money.format(price)}</strong> ${esc(offer.unit)}`;
  const cta = document.querySelector("[data-choice-cta]");
  cta.textContent = price === null ? "Request a quote" : "Join this offer";
  cta.setAttribute("aria-label", `${cta.textContent}: ${offer.provider}, ${priceText}`);
  cta.href = price === null ? "#" : `joined.html?service=${encodeURIComponent(service.id)}&pro=${encodeURIComponent(offerSlug(offer))}`;
}

const SPINNER = '<span class="btn__spinner" aria-hidden="true"></span>';
const CHECK = '<svg class="btn__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7"/></svg>';

function joinWithFeedback(event) {
  const cta = event.currentTarget;
  if (!cta.href.includes("joined.html")) return;
  event.preventDefault();
  if (cta.classList.contains("is-busy")) return;
  cta.style.minWidth = `${cta.offsetWidth}px`;
  cta.classList.add("is-busy");
  cta.setAttribute("aria-busy", "true");
  cta.innerHTML = `${SPINNER}Joining…`;
  setTimeout(() => {
    cta.classList.add("is-done");
    cta.innerHTML = `${CHECK}You're in`;
    setTimeout(() => { location.href = cta.href; }, 350);
  }, 750);
}

await includePartials();
render();
document.querySelector("[data-choice-cta]").addEventListener("click", joinWithFeedback);
window.addEventListener("pageshow", (event) => {
  if (!event.persisted) return;
  const cta = document.querySelector("[data-choice-cta]");
  cta.classList.remove("is-busy", "is-done");
  cta.removeAttribute("aria-busy");
  cta.style.minWidth = "";
  render();
});
const detailBar = document.querySelector("[data-detail-bar]");
const markScrolled = () => detailBar.classList.toggle("is-scrolled", window.scrollY > 4);
window.addEventListener("scroll", markScrolled, { passive: true });
markScrolled();

wireBackLink(document.querySelector("[data-back]"));

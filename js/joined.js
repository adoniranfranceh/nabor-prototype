import { includePartials } from "./include.js";
import { SCENARIO } from "./scenario.js";
import { offersByService, priceForHome, offerSlug } from "./offers.js";
import { claimHome } from "./claim-home.js";
import { wireBackLink } from "./back-link.js";

const exact = new Intl.NumberFormat("en-US");
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const params = new URLSearchParams(location.search);
const services = offersByService();
const service = services.find((s) => s.id === params.get("service")) ?? services[0];
const offer = service.offers.find((o) => offerSlug(o) === params.get("pro")) ?? service.offers[0];
const priceText = money.format(priceForHome(offer, SCENARIO.home));
const joined = { ...offer, joined: offer.joined + 1 };
const left = Math.max(0, joined.goal - joined.joined);

function homesText(n) {
  return `${exact.format(n)} more ${n === 1 ? "home" : "homes"}`;
}

function render() {
  document.title = `Nabor · You're in · ${service.title}`;
  document.querySelector("[data-joined-text]").textContent = `You joined ${offer.provider} for ${service.title.toLowerCase()} at ${priceText}.`;
  document.querySelector("[data-invite-title]").textContent = left === 0
    ? `${priceText} is unlocked. Tell your neighbors.`
    : `${homesText(left)} to unlock ${priceText}`;
}

await includePartials();
render();
claimHome(document.querySelector("[data-joined-meter]"), offer, joined, { startAt: 1000 });

const serviceUrl = `service.html?service=${encodeURIComponent(service.id)}`;
const crumbService = document.querySelector("[data-crumb-service]");
crumbService.textContent = service.title;
crumbService.href = serviceUrl;
const back = document.querySelector("[data-back]");
back.href = serviceUrl;
wireBackLink(back);
document.querySelector("[data-leave]").href = serviceUrl;
document.querySelector(".joined__title").focus({ preventScroll: true });

const detailBar = document.querySelector("[data-detail-bar]");
const markScrolled = () => detailBar.classList.toggle("is-scrolled", window.scrollY > 4);
window.addEventListener("scroll", markScrolled, { passive: true });
markScrolled();

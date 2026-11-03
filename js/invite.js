import { esc } from "./escape.js";
import { closestToStart } from "./offers.js";
import { homesMeter } from "./photo-card.js";

const exact = new Intl.NumberFormat("en-US");
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const THUMB_PARAMS = "?auto=format&fit=crop&crop=entropy&w=120&h=120&q=70";

const SHARE = [
  { id: "text", label: "Text", icon: '<path d="M4 5h16v11H9l-5 4Z"/>' },
  { id: "email", label: "Email", icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>' },
  { id: "link", label: "Copy link", icon: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7L11.5 6.8"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5"/>' }
];

function shareButton(s) {
  return `<a class="invite-nudge__share" href="#">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${s.icon}</svg>
    ${esc(s.label)}
  </a>`;
}

export function inviteNudge(service) {
  const lead = closestToStart(service.offers);
  const left = lead.goal - lead.joined;
  const homes = left === 1 ? "home" : "homes";
  return `
    <section class="invite-nudge" aria-labelledby="invite-title">
      <div class="invite-nudge__top">
        <img class="invite-nudge__thumb" src="${esc(service.photo + THUMB_PARAMS)}" alt="" width="56" height="56" loading="lazy">
        <div class="invite-nudge__copy">
          <h2 class="invite-nudge__title" id="invite-title">${esc(service.title)} is ${exact.format(left)} ${homes} away from ${money.format(lead.amount)}</h2>
          <p class="invite-nudge__text">Know a neighbor who'd want in? Send them the link.</p>
        </div>
      </div>
      ${homesMeter(lead)}
      <div class="invite-nudge__actions">${SHARE.map(shareButton).join("")}</div>
    </section>`;
}

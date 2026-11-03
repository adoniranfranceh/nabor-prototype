import { esc } from "./escape.js";
import { daysUntil } from "./scenario.js";
import { closestToStart } from "./offers.js";

const ENDING_DAYS = 3;
const exact = new Intl.NumberFormat("en-US");
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" fill="currentColor"/></svg>';
const PHOTO_PARAMS = "?auto=format&fit=crop&w=720&h=450&q=70";
export const GLANCE_LIMIT = 4;
const HOUSE = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 7.2 8 1.8l6.5 5.4V14a.8.8 0 0 1-.8.8H2.3a.8.8 0 0 1-.8-.8Z"/></svg>';

function subLine(offers) {
  if (offers.length === 1) return `Offer from ${esc(offers[0].provider)}`;
  const cheapest = Math.min(...offers.map((o) => o.amount));
  return `${exact.format(offers.length)} offers, from ${money.format(cheapest)}`;
}

function unlockLine(lead) {
  const left = lead.goal - lead.joined;
  if (left <= 0) return `<strong>${money.format(lead.amount)} unlocked</strong>, still open to join`;
  return `<strong>${exact.format(left)} more</strong> to unlock ${money.format(lead.amount)}`;
}

export function homesMeter(lead) {
  const left = Math.max(0, lead.goal - lead.joined);
  const missing = left <= GLANCE_LIMIT
    ? Array.from({ length: left }, () => `<span class="houses__home">${HOUSE}</span>`).join("")
    : `<span class="houses__missing">${HOUSE}${exact.format(left)}</span>`;
  return `
    <div class="houses" role="img" aria-label="${exact.format(lead.joined)} of ${exact.format(lead.goal)} homes joined">
      <span class="houses__joined">${HOUSE}${exact.format(lead.joined)}</span>
      ${missing}
    </div>`;
}

export function photoCard(service) {
  const { offers } = service;
  const lead = closestToStart(offers);
  const days = daysUntil(lead.endsOn);
  const ending = days <= ENDING_DAYS;
  const providerOnly = offers.length === 1 && lead.origin === "provider";
  const action = offers.length > 1 ? `compare ${offers.length} offers` : "see your price";

  return `
    <article class="photo-card${ending ? " is-ending" : ""}">
      <div class="photo-card__media">
        <img src="${esc(service.photo + PHOTO_PARAMS)}" alt="" loading="lazy" width="720" height="450">
        <span class="photo-card__pill photo-card__pill--days">${days} ${days === 1 ? "day" : "days"} left</span>
        ${providerOnly ? '<span class="photo-card__pill photo-card__pill--tag">Provider offer</span>' : ""}
      </div>
      <div class="photo-card__body">
        <div class="photo-card__row">
          <h3 class="photo-card__title">
            <a class="photo-card__link" href="service.html?service=${esc(service.id)}" aria-label="${esc(service.title)}, ${esc(action)}">${esc(service.title)}</a>
          </h3>
          <span class="photo-card__rating">${STAR}${lead.rating.toFixed(1)}</span>
        </div>
        <p class="photo-card__sub">${subLine(offers)}</p>
        <p class="photo-card__price">${lead.priceFrom ? "From " : ""}<strong>${money.format(lead.amount)}</strong> ${esc(lead.unit)}</p>
        <div class="photo-card__progress">
          ${homesMeter(lead)}
          <p class="photo-card__unlock">${unlockLine(lead)}</p>
        </div>
      </div>
    </article>`;
}

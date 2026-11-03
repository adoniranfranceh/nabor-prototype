import { esc } from "./escape.js";
import { daysUntil } from "./scenario.js";
import { priceForHome } from "./offers.js";
import { homesMeter } from "./photo-card.js";

const exact = new Intl.NumberFormat("en-US");
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" fill="currentColor"/></svg>';
const WORK_PARAMS = "?auto=format&fit=crop&crop=entropy&w=160&h=160&q=65";
const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7"/></svg>';

export function offerCard(offer, home, { index = 0, checked = false } = {}) {
  const price = priceForHome(offer, home);
  const days = daysUntil(offer.endsOn);
  const includes = (offer.includes ?? []).map((i) => `<li>${CHECK}${esc(i)}</li>`).join("");
  const work = (offer.work ?? []).map((id) =>
    `<img class="offer-card__work-img" src="https://images.unsplash.com/${esc(id)}${WORK_PARAMS}" alt="" width="80" height="80" loading="lazy">`).join("");
  const priceHtml = price === null
    ? `<span class="offer-card__price-value is-quote">Quote</span><span class="offer-card__price-note">needed</span>`
    : `<span class="offer-card__price-value">${money.format(price)}</span><span class="offer-card__price-note">${esc(offer.unit)}</span>`;

  return `
    <label class="offer-card${days <= 3 ? " is-ending" : ""}">
      <input class="visually-hidden" type="radio" name="offer" value="${index}"${checked ? " checked" : ""}>
      <div class="offer-card__head">
        <span class="offer-card__radio" aria-hidden="true"></span>
        <span class="offer-card__who">
          <span class="offer-card__name">${esc(offer.provider)}</span>
          <span class="offer-card__meta">
            <span class="offer-card__rating">${STAR}${offer.rating.toFixed(1)} <span>(${exact.format(offer.reviews)})</span></span>
            ${offer.origin === "provider" ? '<span class="offer-card__origin">Provider offer</span>' : ""}
          </span>
        </span>
        <span class="offer-card__price">${priceHtml}</span>
      </div>
      <div class="offer-card__meter">
        ${homesMeter(offer)}
        <span class="offer-card__days">${days} ${days === 1 ? "day" : "days"} left</span>
      </div>
      <div class="offer-card__details">
        ${includes ? `<ul class="offer-card__includes">${includes}</ul>` : ""}
        ${work ? `<div class="offer-card__work"><span class="offer-card__work-label">Recent work</span><div class="offer-card__work-row">${work}</div></div>` : ""}
      </div>
    </label>`;
}

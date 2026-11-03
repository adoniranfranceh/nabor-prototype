import { esc } from "./escape.js";

const PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
const THUMB_PARAMS = "?auto=format&fit=crop&crop=entropy&w=96&h=96&q=70";

export function starterPillsBlock(suggestions, place) {
  const pills = suggestions.map((s) => {
    const thumb = s.photo
      ? `<img class="starter__thumb" src="${esc(s.photo + THUMB_PARAMS)}" alt="" width="40" height="40" loading="lazy">`
      : `<span class="starter__thumb starter__thumb--plus">${PLUS}</span>`;
    const label = s.photo ? `Start a ${s.label.toLowerCase()} campaign` : "Start a campaign for something else";
    return `<a class="starter" href="#" aria-label="${esc(label)}">${thumb}<span>${esc(s.label)}</span></a>`;
  }).join("");

  return `
    <section class="starters" aria-labelledby="starters-title">
      <div class="starters__head">
        <h2 class="starters__title" id="starters-title">Not open yet in ${esc(place)}</h2>
        <p class="starters__text">Start one and local pros send you offers.</p>
      </div>
      <div class="starters__list">${pills}</div>
    </section>`;
}

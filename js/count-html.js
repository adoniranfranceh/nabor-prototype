import { esc } from "./escape.js";
import { formatCount } from "./format.js";

export function countHtml(n) {
  const { text, spoken } = formatCount(n);
  if (text === spoken) return esc(text);
  return `<span aria-hidden="true">${esc(text)}</span><span class="visually-hidden">${esc(spoken)}</span>`;
}

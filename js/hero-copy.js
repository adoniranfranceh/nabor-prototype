import { countHtml } from "./count-html.js";
import { esc } from "./escape.js";

export function heroCopy(count, place) {
  if (count === 0) {
    return {
      titleHtml: `Nothing open in ${esc(place)} yet`,
      lead: "Start the first campaign and invite your neighbors.",
      cta: true
    };
  }
  const noun = count === 1 ? "service" : "services";
  return { titleHtml: `${countHtml(count)} ${noun} open in ${esc(place)}`, lead: "", cta: false };
}

export const SCENARIO = {
  today: "2026-11-03",
  place: "Prides Crossing",
  home: { stories: 2 }
};

export const MIN_SERVICES_FOR_FILTERS = 6;

export const filters = [
  { id: "all", label: "All" },
  { id: "yard", label: "Yard" },
  { id: "snow", label: "Snow" },
  { id: "home", label: "House" },
  { id: "products", label: "Products" }
];

const DAY_MS = 24 * 60 * 60 * 1000;

export function daysUntil(isoDate, from = SCENARIO.today) {
  return Math.round((Date.parse(isoDate) - Date.parse(from)) / DAY_MS);
}

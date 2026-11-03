import { daysUntil } from "./scenario.js";

export const services = [
  { id: "leaf", photo: "https://images.unsplash.com/photo-1790707520484-000ca92c7f92", photoBy: "Belov Sergey", title: "Fall leaf cleanup", filter: "yard" },
  { id: "snow", photo: "https://images.unsplash.com/photo-1674049406206-83d38bd15c8a", photoBy: "Bermix Studio", title: "Driveway snow plowing", filter: "snow" },
  { id: "sprinkler", photo: "https://images.unsplash.com/photo-1770664945615-52203ab54c88", photoBy: "Alef Morais", title: "Sprinkler winterizing", filter: "yard" },
  { id: "gutter", photo: "https://images.unsplash.com/photo-1744044155829-610dded4cead", photoBy: "Aleksi Partanen", title: "Gutter cleaning", filter: "home" },
  { id: "firewood", photo: "https://images.unsplash.com/photo-1571040195944-85a412548a43", photoBy: "Andreas Pajuvirta", title: "Seasoned firewood", filter: "products" },
  { id: "lights", photo: "https://images.unsplash.com/photo-1642184665676-636ffd0c3afe", photoBy: "Peter Chapin", title: "Holiday lights", filter: "home" },
  { id: "heating", photo: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3", photoBy: "Dan LeFebvre", title: "Heating tune-up", filter: "home" }
];

export const offers = [
  { service: "leaf", origin: "neighbors", provider: "Greenway Yard Care", rating: 4.9, reviews: 212, amount: 380, unit: "one time", joined: 14, goal: 20, endsOn: "2026-11-09", includes: ["Lawn, beds and driveway cleared", "Leaves hauled away"], work: ["photo-1742093798423-d001d215e59f", "photo-1742093798422-9a1098c884f5", "photo-1790707520484-000ca92c7f92"] },
  { service: "leaf", origin: "neighbors", provider: "Oak & Ash Landscaping", rating: 4.7, reviews: 88, amount: 420, unit: "one time", joined: 9, goal: 15, endsOn: "2026-11-09", includes: ["Lawn and beds cleared", "Leaves mulched into the lawn", "Gutters checked"], work: ["photo-1783753445341-6e8571478579", "photo-1636750121381-9245cd137f32", "photo-1761678483926-0e34fdce6399"] },
  { service: "leaf", origin: "neighbors", provider: "Hillside Lawn", rating: 4.6, reviews: 41, amount: 360, unit: "one time", joined: 6, goal: 12, endsOn: "2026-11-09", includes: ["Lawn cleared", "Leaves left at the curb"], work: ["photo-1774423066277-01742038ea5b"] },
  { service: "snow", origin: "neighbors", provider: "Northfield Plowing", rating: 4.7, reviews: 154, amount: 890, unit: "for the season", joined: 22, goal: 25, endsOn: "2026-11-15", includes: ["Driveway plowed after 2 inches", "Walkway shoveled"], work: ["photo-1676903826883-cbbd7703f2f4", "photo-1623265296891-8d9cd8856839", "photo-1642586078463-a2582692fcc6"] },
  { service: "snow", origin: "neighbors", provider: "Coastline Snow Services", rating: 4.5, reviews: 67, amount: 940, unit: "for the season", joined: 15, goal: 20, endsOn: "2026-11-15", includes: ["Driveway plowed after 2 inches", "Walkway shoveled and salted"], work: ["photo-1723986004478-2e74e755a3b0", "photo-1595050188008-890673ff9bd6"] },
  { service: "sprinkler", origin: "provider", provider: "Harborline Irrigation", rating: 4.8, reviews: 64, amount: 95, unit: "one time", joined: 17, goal: 20, endsOn: "2026-11-06", includes: ["All zones blown out", "Backflow valve drained"], work: ["photo-1541955193702-9ca03b1bb11a", "photo-1453539263483-01e088416133", "photo-1616168558572-69aed7a96677"] },
  { service: "gutter", origin: "provider", provider: "Brightwater Gutter Co.", rating: 4.9, reviews: 126, amount: 185, unit: "one time", joined: 9, goal: 15, endsOn: "2026-11-12", byStories: { 1: 145, 2: 185, 3: null }, includes: ["Gutters and downspouts cleared", "Debris bagged and hauled away", "Before and after photos"], work: ["photo-1744044155829-610dded4cead", "photo-1786295866836-2949bbd847cd", "photo-1776197154628-41669e0c38e6"] },
  { service: "gutter", origin: "neighbors", provider: "Cape Gutter Guys", rating: 4.6, reviews: 73, amount: 165, unit: "one time", joined: 12, goal: 15, endsOn: "2026-11-14", byStories: { 1: 135, 2: 165, 3: 215 }, includes: ["Gutters and downspouts cleared", "Downspouts flushed with water"], work: ["photo-1779755376652-22ca6eba86b8", "photo-1635359800970-90b35af94a4a", "photo-1766187797272-637f702fbc5d"] },
  { service: "gutter", origin: "neighbors", provider: "Seaside Roof & Gutter", rating: 4.4, reviews: 29, amount: 195, unit: "one time", joined: 5, goal: 10, endsOn: "2026-11-14", byStories: { 1: 165, 2: 195, 3: 245 }, includes: ["Gutters and downspouts cleared", "Quick roof check", "Small repairs included"], work: ["photo-1786295866816-89841e942221", "photo-1643649819759-179a52cf819d", "photo-1786588134856-0b5ce404708a"] },
  { service: "firewood", origin: "neighbors", provider: "Essex County Firewood", rating: 4.6, reviews: 95, amount: 425, unit: "per cord", joined: 11, goal: 15, endsOn: "2026-11-08", includes: ["Seasoned oak and maple", "Delivered and stacked"], work: ["photo-1761655622268-3707c5467749", "photo-1475500958746-c4562f6f40f0", "photo-1483217067170-e62094708cd8"] },
  { service: "firewood", origin: "neighbors", provider: "Topsfield Timber", rating: 4.3, reviews: 22, amount: 399, unit: "per cord", joined: 4, goal: 12, endsOn: "2026-11-08", includes: ["Seasoned mixed hardwood", "Delivered to your driveway"], work: ["photo-1531338926683-57dd1ba40966", "photo-1629570584961-6d1ac3ded3d8"] },
  { service: "lights", origin: "provider", provider: "Lanternlight Holiday Co.", rating: 4.7, reviews: 38, amount: 640, unit: "for the season", priceFrom: true, joined: 6, goal: 12, endsOn: "2026-11-20", includes: ["Lights installed in early December", "Taken down in January", "Timer included"], work: ["photo-1576692155415-95f820a2c4c1", "photo-1664289342468-fa99588e60b8", "photo-1470938017644-581bd9737a31"] },
  { service: "heating", origin: "neighbors", provider: "Beverly Heating & Air", rating: 4.8, reviews: 140, amount: 165, unit: "one time", joined: 1, goal: 10, endsOn: "2026-11-22", includes: ["Burner cleaned and tested", "Safety check and report"], work: ["photo-1594233078955-e1f73a02ebb2", "photo-1618840626133-54463084a141"] }
];

export function closestToStart(offers) {
  return [...offers].sort((a, b) =>
    (a.goal - a.joined) - (b.goal - b.joined) || daysUntil(a.endsOn) - daysUntil(b.endsOn))[0];
}

export function byClosestToUnlock(a, b) {
  const la = closestToStart(a.offers);
  const lb = closestToStart(b.offers);
  return (la.goal - la.joined) - (lb.goal - lb.joined) || daysUntil(la.endsOn) - daysUntil(lb.endsOn);
}

export function offerSlug(offer) {
  return offer.provider.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function priceForHome(offer, home) {
  if (!offer.byStories) return offer.amount;
  return offer.byStories[home.stories] ?? null;
}

export function offersByService() {
  return services
    .map((service) => ({ ...service, offers: offers.filter((o) => o.service === service.id) }))
    .filter((service) => service.offers.length > 0);
}

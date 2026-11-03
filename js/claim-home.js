import { homesMeter, GLANCE_LIMIT } from "./photo-card.js";

const exact = new Intl.NumberFormat("en-US");
const EASE_OUT = "cubic-bezier(.22, 1, .36, 1)";
const EASE_IN_OUT = "cubic-bezier(.65, 0, .35, 1)";
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function finish(animation) {
  return animation.finished.catch(() => {});
}

function fillHouse(house) {
  const fill = house.querySelector("svg").cloneNode(true);
  fill.classList.add("houses__fill");
  house.append(fill);
  return Promise.all([
    finish(fill.animate([{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)" }], { duration: 420, easing: EASE_OUT, fill: "forwards" })),
    finish(house.animate([{ transform: "scale(1)" }, { transform: "scale(1.22)", offset: 0.6 }, { transform: "scale(1.12)" }], { duration: 420, easing: EASE_OUT, fill: "forwards" })),
  ]);
}

function finalTarget(row, house, pill) {
  const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
  house.style.width = "0px";
  house.style.marginRight = `${-gap}px`;
  const rowBox = row.getBoundingClientRect();
  const icon = pill.querySelector("svg").getBoundingClientRect();
  const borderLeft = row.clientLeft;
  house.style.width = "";
  house.style.marginRight = "";
  return { x: icon.left + icon.width / 2 - rowBox.left - borderLeft, y: icon.top + icon.height / 2 - rowBox.top, gap };
}

function flight(ghost, box, target) {
  const dx = target.x - (box.left + box.width / 2);
  const dy = target.y - (box.top + box.height / 2);
  return finish(ghost.animate([
    { transform: "translate(0, 0) scale(1.12)", opacity: 1 },
    { transform: `translate(${dx * 0.8}px, ${dy - 5}px) scale(.85)`, opacity: 1, offset: 0.7 },
    { transform: `translate(${dx}px, ${dy}px) scale(.55)`, opacity: 0 },
  ], { duration: 420, easing: EASE_IN_OUT, fill: "forwards" })).then(() => ghost.remove());
}

function flyIntoPill(house, pill) {
  const row = house.parentElement;
  const target = finalTarget(row, house, pill);
  const box = { left: house.offsetLeft, top: house.offsetTop, width: house.offsetWidth, height: house.offsetHeight };
  const ghost = house.cloneNode(true);
  ghost.classList.add("houses__ghost");
  Object.assign(ghost.style, { left: `${box.left}px`, top: `${box.top}px` });
  row.append(ghost);
  house.style.visibility = "hidden";
  house.getAnimations().forEach((a) => a.cancel());
  house.animate([{ width: `${box.width}px`, marginRight: "0px" }, { width: "0px", marginRight: `${-target.gap}px` }], { duration: 420, easing: EASE_IN_OUT, fill: "forwards" });
  return flight(ghost, box, target);
}

function ghostFromCount(missing) {
  const row = missing.parentElement;
  const rowBox = row.getBoundingClientRect();
  const icon = missing.querySelector("svg").getBoundingClientRect();
  const box = { left: icon.left - rowBox.left - row.clientLeft, top: icon.top - rowBox.top, width: icon.width, height: icon.height };
  const ghost = document.createElement("span");
  ghost.className = "houses__home houses__ghost";
  ghost.innerHTML = missing.querySelector("svg").outerHTML;
  Object.assign(ghost.style, { left: `${box.left}px`, top: `${box.top}px`, width: `${box.width}px`, height: `${box.height}px` });
  row.append(ghost);
  return { ghost, box };
}

function iconCenter(row, pill) {
  const rowBox = row.getBoundingClientRect();
  const icon = pill.querySelector("svg").getBoundingClientRect();
  return { x: icon.left + icon.width / 2 - rowBox.left - row.clientLeft, y: icon.top + icon.height / 2 - rowBox.top };
}

function rollCount(pill, next, direction = 1) {
  const text = [...pill.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
  const box = document.createElement("span");
  box.className = "houses__count";
  box.innerHTML = `<span>${text.textContent.trim()}</span><span>${exact.format(next)}</span>`;
  text.replaceWith(box);
  const [oldNum, newNum] = box.children;
  oldNum.animate([{ transform: "none" }, { transform: `translateY(${-110 * direction}%)` }], { duration: 320, easing: EASE_IN_OUT, fill: "forwards" });
  newNum.animate([{ transform: `translateY(${110 * direction}%)` }, { transform: "none" }], { duration: 320, easing: EASE_IN_OUT, fill: "forwards" });
  const bump = pill.animate([{ transform: "scale(1)" }, { transform: "scale(1.14)", offset: 0.4 }, { transform: "scale(1)" }], { duration: 460, easing: EASE_OUT });
  return finish(bump).then(() => box.replaceWith(exact.format(next)));
}

async function claimFromHouses(pill, house, after) {
  await fillHouse(house);
  const flown = flyIntoPill(house, pill);
  await wait(300);
  await Promise.all([flown, rollCount(pill, after.joined)]);
}

async function claimFromCount(pill, missing, after) {
  const { ghost, box } = ghostFromCount(missing);
  await Promise.all([fillHouse(ghost), rollCount(missing, after.goal - after.joined, -1)]);
  const flown = flight(ghost, box, iconCenter(missing.parentElement, pill));
  await wait(300);
  await Promise.all([flown, rollCount(pill, after.joined)]);
}

export async function claimHome(meter, before, after, { startAt = 0 } = {}) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    meter.classList.add("is-settled");
    meter.innerHTML = homesMeter(after);
    return;
  }
  meter.innerHTML = homesMeter(before);
  await wait(startAt);
  const pill = meter.querySelector(".houses__joined");
  const house = meter.querySelector(".houses__home");
  const missing = meter.querySelector(".houses__missing");
  if (house) await claimFromHouses(pill, house, after);
  else if (missing) await claimFromCount(pill, missing, after);
  else await rollCount(pill, after.joined);
  const revealing = !house && after.goal - after.joined > 0 && after.goal - after.joined <= GLANCE_LIMIT;
  meter.classList.toggle("is-revealing", revealing);
  meter.classList.add("is-settled");
  meter.innerHTML = homesMeter(after);
}

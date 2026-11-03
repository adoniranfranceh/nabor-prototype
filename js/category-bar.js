import { esc } from "./escape.js";
import { filterIcon } from "./filter-icons.js";

export function renderCategoryBar(container, filters, onChange, selected = "all") {
  container.innerHTML = filters
    .map((f) => `
      <button type="button" class="category-bar__item" data-filter="${esc(f.id)}" aria-pressed="${f.id === selected}">
        ${filterIcon(f.id)}
        <span>${esc(f.label)}</span>
      </button>`)
    .join("");

  container.addEventListener("click", (event) => {
    const item = event.target.closest(".category-bar__item");
    if (!item) return;
    container.querySelectorAll(".category-bar__item").forEach((el) => el.setAttribute("aria-pressed", String(el === item)));
    onChange(item.dataset.filter);
  });
}

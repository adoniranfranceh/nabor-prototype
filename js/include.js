export async function includePartials(root = document) {
  const slots = [...root.querySelectorAll("[data-include]")];
  await Promise.all(slots.map(async (slot) => {
    const response = await fetch(slot.dataset.include);
    const template = document.createElement("template");
    template.innerHTML = await response.text();
    slot.replaceWith(template.content);
  }));
}

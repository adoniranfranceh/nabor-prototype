function cameFrom(href) {
  if (!document.referrer) return false;
  const previous = new URL(document.referrer);
  const target = new URL(href, location.href);
  return previous.origin === target.origin && previous.pathname === target.pathname;
}

export function wireBackLink(link, { allowHistory = () => true } = {}) {
  link.addEventListener("click", (event) => {
    if (allowHistory() && cameFrom(link.href)) {
      event.preventDefault();
      history.back();
    }
  });
}

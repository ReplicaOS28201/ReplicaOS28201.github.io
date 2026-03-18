function openWindow(id) {
  const el = document.getElementById(id);
  if (!el) return;

  el.classList.remove("hidden");
}

function closeWindow(id) {
  const el = document.getElementById(id);
  if (!el) return;

  el.classList.add("hidden");
}

// Event Delegation (better than inline onclick)
document.addEventListener("click", (e) => {
  const openTarget = e.target.closest("[data-open]");
  const closeTarget = e.target.closest("[data-close]");

  if (openTarget) {
    openWindow(openTarget.dataset.open);
  }

  if (closeTarget) {
    closeWindow(closeTarget.dataset.close);
  }
});

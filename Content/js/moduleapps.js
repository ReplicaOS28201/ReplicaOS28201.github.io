function openWindow(id) {
  const el = document.getElementById(id);

  // Check if element exists
  if (!el) {
    console.warn("openWindow: Element not found ->", id);
    return;
  }

  // Only remove if needed
  if (el.classList.contains("hidden")) {
    el.classList.remove("hidden");
  }
}

function closeWindow(id) {
  const el = document.getElementById(id);

  // Check if element exists
  if (!el) {
    console.warn("closeWindow: Element not found ->", id);
    return;
  }

  // Only add if needed
  if (!el.classList.contains("hidden")) {
    el.classList.add("hidden");
  }
}

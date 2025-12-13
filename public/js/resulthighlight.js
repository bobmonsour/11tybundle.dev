document.addEventListener("DOMContentLoaded", () => {
  const url = new URL(window.location.href);
  const params = url.searchParams;

  // Check if bundleitem_highlight parameter exists (even without value)
  const shouldHighlight = params.has("bundleitem_highlight");

  if (shouldHighlight && url.hash) {
    // Extract the ID from the hash (remove the # character)
    const highlightId = url.hash.slice(1);

    const targetElement = document.getElementById(highlightId);

    if (targetElement) {
      targetElement.classList.add("bundleitem-highlight");
    }

    // Remove the bundleitem_highlight parameter
    params.delete("bundleitem_highlight");

    // Reconstruct the clean URL (keeping highlight param and hash)
    url.search = params.toString();

    // Update browser URL
    window.history.replaceState({}, "", url.toString());
  }
});

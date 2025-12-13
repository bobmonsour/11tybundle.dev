document.addEventListener("DOMContentLoaded", () => {
  // 1. Parse the current URL
  const url = new URL(window.location.href);
  const params = url.searchParams;

  // 2. Check for your specific custom parameter
  const highlightId = params.get("bundleitem_highlight");

  if (highlightId) {
    // --- A. Apply the Styling ---
    // We use the ID passed in your parameter to find the element
    const targetElement = document.getElementById(highlightId);

    if (targetElement) {
      targetElement.classList.add("bundleitem-highlight");
    }

    // --- B. Clean the URL ---

    // 3. Remove ONLY your parameter.
    // The Pagefind parameter (e.g., ?pagefind_highlight=...) stays in the object.
    params.delete("bundleitem_highlight");

    // 4. Reconstruct the clean URL.
    // url.search will now contain only the remaining parameters.
    url.search = params.toString();

    // 5. Update the history.
    // This replaces the URL in the browser bar with the version that still
    // has the Pagefind param and hash, but lacks your custom trigger.
    window.history.replaceState({}, "", url.toString());
  }
});

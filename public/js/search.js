document.addEventListener("DOMContentLoaded", () => {
  new PagefindUI({
    element: "#search",
    translations: {
      placeholder: "Type / to search",
      zero_results: "Count not find [SEARCH_TERM]",
    },
    excerptLength: 100,
    highlightParam: "highlight",
    resetStyles: true,
    pageSize: 5,
    showImages: false,
    showEmptyFilters: false,
    showSubResults: true,
  });

  new PagefindHighlight({ highlightParam: "highlight" });

  let focusTriggeredBySlash = false;
  // Flag to track focus triggered by '/'

  // Add event listener for the '/' key
  document.addEventListener("keydown", (e) => {
    // Check if the '/' key was pressed and no input or textarea is focused
    if (e.key === "/" && !e.target.matches("input, textarea")) {
      e.preventDefault();
      // Prevent the default browser behavior
      const searchInput = document.querySelector(
        "input.pagefind-ui__search-input"
      );
      if (searchInput) {
        focusTriggeredBySlash = true;
        // Set the flag
        searchInput.focus();
        // Move focus to the search box
      }
    }
  });

  // Add event listener for the focus event on the input element
  const searchInput = document.querySelector("input.pagefind-ui__search-input");
  if (searchInput) {
    searchInput.addEventListener("focus", () => {
      if (focusTriggeredBySlash) {
        fathom.trackEvent("search with keyboard shortcut");
        focusTriggeredBySlash = false;
        // Reset the flag
      } else {
        fathom.trackEvent("search without keyboard shortcut");
      }
    });
  }
});

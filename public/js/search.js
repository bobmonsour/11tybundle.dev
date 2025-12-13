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
    processResult: function (result) {
      // Check if there are sub-results to process
      if (result.sub_results && Array.isArray(result.sub_results)) {
        result.sub_results.forEach((subResult) => {
          // --- PART 1: Remove Title from Excerpt ---
          const title = subResult.title;
          let excerpt = subResult.excerpt;

          if (excerpt.startsWith(title)) {
            // Remove the title from the start of the excerpt
            let newExcerpt = excerpt.substring(title.length).trim();

            if (newExcerpt.length > 0) {
              // Optional: Capitalize the first letter of the new excerpt
              newExcerpt =
                newExcerpt.charAt(0).toUpperCase() + newExcerpt.slice(1);
              subResult.excerpt = newExcerpt;
            }
          }

          // --- PART 2: Add Custom Highlight Parameter ---
          // Parse the URL safely using the current origin as a base
          const urlObj = new URL(subResult.url, window.location.origin);
          console.log("\nOriginal Sub-Result URL:", subResult.url);
          console.log("Parsed URL Object:", urlObj);

          // Get the anchor ID (without the '#')
          const anchorId = urlObj.hash.slice(1);
          console.log("Anchor ID:", anchorId);

          if (anchorId) {
            // Add your custom parameter 'bundleitem_highlight'
            urlObj.searchParams.set("bundleitem_highlight", anchorId);
            console.log(
              "urlObj.searchParams after set:",
              urlObj.searchParams.toString()
            );

            // Update the sub-result URL with the new parameter included
            subResult.url = urlObj.pathname + urlObj.search + urlObj.hash;
            console.log("urlObj.pathname:", urlObj.pathname);
            console.log("urlObj.search:", urlObj.search);
            console.log("urlObj.hash:", urlObj.hash);
            console.log("Updated Sub-Result URL:", subResult.url);
          }
        });
      }

      // Return the fully modified result object
      return result;
    },
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

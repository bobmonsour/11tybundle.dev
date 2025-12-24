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
    sort: { date: "desc", weight: "desc" },
    processResult: function (result) {
      // console.log("processResult called with:", result);

      // Special handling for blog posts
      const isBlogPost = result.url && result.url.includes("/blog/");
      if (isBlogPost) {
        // Use full title as excerpt (untrimmed)
        if (result.meta && result.meta.title) {
          result.excerpt = result.meta.title;
        }
        // Remove all sub-results for blog posts
        result.sub_results = [];
        return result;
      }

      // do not show an excerpt for the main result if it is a category page
      if (
        result.meta &&
        result.meta.title &&
        result.meta.title.startsWith("Category: ")
      ) {
        result.excerpt = "";
      }
      // use the meta description for the excerpt for the main result if it is an author page
      if (
        result.meta &&
        result.meta.title &&
        result.meta.description &&
        result.meta.title.startsWith("Author: ")
      ) {
        result.excerpt = result.meta.description;
        delete result.meta.description;
      }

      // --- Remove Title from Main Result Excerpt ---
      if (result.meta && result.meta.title && result.excerpt) {
        const title = result.meta.title;
        let excerpt = result.excerpt;

        // Remove all <mark> and </mark> tags from excerpt for comparison
        const cleanExcerpt = excerpt.replace(/<\/?mark>/g, "");

        // Check if cleaned excerpt starts with title
        if (cleanExcerpt.startsWith(title)) {
          // Find the position in the original excerpt where the title ends
          let charCount = 0;
          let position = 0;

          while (charCount < title.length && position < excerpt.length) {
            if (excerpt.substring(position).startsWith("<mark>")) {
              position += 6; // Skip "<mark>"
            } else if (excerpt.substring(position).startsWith("</mark>")) {
              position += 7; // Skip "</mark>"
            } else {
              charCount++;
              position++;
            }
          }

          // Remove the title portion and trim
          let newExcerpt = excerpt.substring(position).trim();

          // Remove any leading <mark> or </mark> tags
          newExcerpt = newExcerpt.replace(/^(<\/?mark>)+/, "");

          // Remove leading punctuation and whitespace
          newExcerpt = newExcerpt.replace(/^[.,;:!?\s]+/, "");

          if (newExcerpt.length > 0) {
            // Capitalize first letter (skip over any leading <mark> tag)
            const markMatch = newExcerpt.match(/^(<mark>)?(.)/);
            if (markMatch) {
              const prefix = markMatch[1] || "";
              const firstChar = markMatch[2].toUpperCase();
              newExcerpt =
                prefix + firstChar + newExcerpt.slice(prefix.length + 1);
            }
            result.excerpt = newExcerpt;
          }
        }
      }

      // Check if there are sub-results to process
      if (result.sub_results && Array.isArray(result.sub_results)) {
        // console.log("Processing sub_results:", result.sub_results.length);
        result.sub_results.forEach((subResult) => {
          // --- PART 1: Remove Title from Excerpt ---
          const title = subResult.title;
          let excerpt = subResult.excerpt;
          // console.log("subresultTitle:", title);
          // console.log("subresultExcerpt:", excerpt);

          // Remove all <mark> and </mark> tags from excerpt for comparison
          const cleanExcerpt = excerpt.replace(/<\/?mark>/g, "");

          // Check if cleaned excerpt starts with title
          if (cleanExcerpt.startsWith(title)) {
            // Find the position in the original excerpt where the title ends
            let charCount = 0;
            let position = 0;

            while (charCount < title.length && position < excerpt.length) {
              if (excerpt.substring(position).startsWith("<mark>")) {
                position += 6; // Skip "<mark>"
              } else if (excerpt.substring(position).startsWith("</mark>")) {
                position += 7; // Skip "</mark>"
              } else {
                charCount++;
                position++;
              }
            }

            // Remove the title portion and trim
            let newExcerpt = excerpt.substring(position).trim();

            // Remove any leading <mark> or </mark> tags
            newExcerpt = newExcerpt.replace(/^(<\/?mark>)+/, "");

            // Remove leading punctuation and whitespace
            newExcerpt = newExcerpt.replace(/^[.,;:!?\s]+/, "");

            if (newExcerpt.length > 0) {
              // Capitalize first letter (skip over any leading <mark> tag)
              const markMatch = newExcerpt.match(/^(<mark>)?(.)/);
              if (markMatch) {
                const prefix = markMatch[1] || "";
                const firstChar = markMatch[2].toUpperCase();
                newExcerpt =
                  prefix + firstChar + newExcerpt.slice(prefix.length + 1);
              }
              subResult.excerpt = newExcerpt;
            }
          }

          // --- PART 2: Add Custom Highlight Parameter ---
          // Insert &bundleitem_highlight before hash
          if (subResult.url.includes("#")) {
            subResult.url = subResult.url.replace(
              "#",
              "&bundleitem_highlight#"
            );
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

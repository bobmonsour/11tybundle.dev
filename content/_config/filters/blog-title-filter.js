/**
 * Eleventy filter to convert blog titles into HTML unordered lists
 * Processes titles that contain multiple article titles separated by commas
 * and other punctuation marks
 */

/**
 * Convert a blog title string into an HTML unordered list
 * @param {string} title - The full blog post title from front matter
 * @returns {string} HTML string containing <ul> with <li> items
 */
export function blogTitleToList(title) {
  if (!title || typeof title !== "string") {
    return "<ul></ul>";
  }

  // Step 1: Remove the "Issue X - " prefix (handles both {{ bundleIssue }} template and actual numbers)
  let processedTitle = title.replace(
    /^Issue\s+(\{\{\s*bundleIssue\s*\}\}|\d+)\s*-\s*/,
    ""
  );

  // Step 2: Trim trailing ellipsis
  processedTitle = processedTitle.replace(/\.{3,}$/, "").trim();

  // Step 3: Split on separators
  // Separators: comma, ellipsis (...), period followed by space, ? or ! when followed by space + capital letter
  const items = [];
  let currentItem = "";

  for (let i = 0; i < processedTitle.length; i++) {
    const char = processedTitle[i];
    const nextChar = processedTitle[i + 1];
    const charAfterNext = processedTitle[i + 2];
    const charAfterThat = processedTitle[i + 3];

    // Check for ellipsis separator (...)
    const isEllipsis =
      char === "." && nextChar === "." && charAfterNext === ".";

    if (isEllipsis) {
      // Add current item without the ellipsis
      const itemToAdd = currentItem.trim();
      if (itemToAdd) {
        items.push(itemToAdd);
      }
      currentItem = "";
      i += 2; // Skip the next two dots
      continue;
    }

    currentItem += char;

    // Check if this is a separator point
    const isComma = char === "," && nextChar === " ";
    const isPeriodWithSpace = char === "." && nextChar === " ";
    const isQuestionOrExclamation =
      (char === "?" || char === "!") &&
      nextChar === " " &&
      charAfterNext &&
      charAfterNext.match(/[A-Z]/);

    if (isComma || isPeriodWithSpace || isQuestionOrExclamation) {
      // Add the current item (without the comma or period, but with ? or !)
      let itemToAdd = currentItem;

      if (isComma || isPeriodWithSpace) {
        // Remove the comma or period
        itemToAdd = currentItem.slice(0, -1);
      }

      itemToAdd = itemToAdd.trim();

      if (itemToAdd) {
        items.push(itemToAdd);
      }

      currentItem = "";

      // Skip the space after ? or ! (we already added the punctuation)
      if ((isQuestionOrExclamation || isPeriodWithSpace) && nextChar === " ") {
        i++; // Skip the space
      }
    }
  }

  // Add any remaining content as the last item
  if (currentItem.trim()) {
    items.push(currentItem.trim());
  }

  // Step 4: Generate HTML
  if (items.length === 0) {
    return "<ul></ul>";
  }

  const listItems = items.map((item) => `  <li>${item}</li>`).join("\n");

  return `<ul>\n${listItems}\n</ul>`;
}

// For CommonJS compatibility (if needed in Eleventy config)
export default blogTitleToList;

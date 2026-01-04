// Generate favicon HTML - either SVG or IMG tag based on input
// Adds loading="lazy" when loop count exceeds 10

export function genFaviconHtml(faviconRef, loopCount) {
  const shouldLazyLoad = loopCount > 10;
  const lazyAttr = shouldLazyLoad ? ' loading="lazy"' : "";

  // use the globe icon if no faviconRef is provided
  if (!faviconRef) {
    return `<svg viewBox="0 0 24 24" class="favicon" aria-hidden="true" eleventy:ignore><use xlink:href="#icon-globe"></use></svg>`;
  }
  // SVG element (starts with #)
  if (faviconRef.startsWith("#")) {
    // console.log("Generating SVG favicon for ref: ", faviconRef);
    return `<svg viewBox="0 0 24 24" class="favicon" aria-hidden="true" eleventy:ignore${lazyAttr}><use xlink:href="${faviconRef}"></use></svg>`;
  } else {
    // IMG element (pathname)
    return `<img src="${faviconRef}" class="favicon" eleventy:ignore alt="favicon for site or author"${lazyAttr} />`;
  }
}

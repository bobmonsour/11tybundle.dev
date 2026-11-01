// Renders the Atom feed as a readable page without XSLT, see #264.
// Layout mirrors the old public/css/feed.xsl.
const HTML = "http://www.w3.org/1999/xhtml";
const ATOM = "http://www.w3.org/2005/Atom";

// Styles are inlined (not a linked stylesheet) so the page is styled as soon
// as it's built, with no extra request and no flash of unstyled content.
const FEED_CSS = `
:root {
  /* Type scale from https://www.fluid-type-scale.com/, smallest to largest */
  --font-size-sm: clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem);
  --font-size-base: clamp(1rem, 0.34vw + 0.91rem, 1.19rem);
  --font-size-md: clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem);
  --font-size-lg: clamp(1.56rem, 1vw + 1.31rem, 2.11rem);
  --font-size-xl: clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem);
  --font-size-xxl: clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem);
  --font-size-xxxl: clamp(3.05rem, 3.54vw + 2.17rem, 5rem);
  --body-background: #fff1e5;
  --brand-font: Optima, Candara, "Noto Sans", source-sans-pro, sans-serif;
  --brand-color: black;
  --link-hover-color: yellow;
  --dark-accent-color: #005bbb;
}

::selection {
  background-color: var(--link-hover-color);
  color: var(--brand-color);
}

html,
body {
  margin: auto;
  padding: 20px;
  max-width: 90ch;
  background-color: var(--body-background);
  word-wrap: break-word;
  overflow-wrap: break-word;
  color: var(--brand-color);
  line-height: 1.6;
}

html,
body,
button,
code,
input {
  font-family: var(--brand-font);
}

h2,
h3,
h4,
h5,
h6 {
  color: var(--brand-color);
}

h2 {
  font-size: var(--font-size-md);
  margin-block-end: 0;
}

a {
  color: var(--brand-color);
  text-decoration: none;
  border-bottom: 1px solid var(--dark-accent-color);
}

a:hover {
  background-color: var(--link-hover-color);
}

p {
  font-size: var(--font-size-md);
}
`;

// RSS icon from https://commons.wikimedia.org/wiki/File:Feed-icon.svg
const RSS_ICON = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="vertical-align: text-bottom; width: 1.2em; height: 1.2em;" class="pr-1" id="RSSicon" viewBox="0 0 256 256" aria-hidden="true">
  <defs>
    <linearGradient x1="0.085" y1="0.085" x2="0.915" y2="0.915" id="RSSg">
      <stop offset="0.0" stop-color="#E3702D"/><stop offset="0.1071" stop-color="#EA7D31"/>
      <stop offset="0.3503" stop-color="#F69537"/><stop offset="0.5" stop-color="#FB9E3A"/>
      <stop offset="0.7016" stop-color="#EA7C31"/><stop offset="0.8866" stop-color="#DE642B"/>
      <stop offset="1.0" stop-color="#D95B29"/>
    </linearGradient>
  </defs>
  <rect width="256" height="256" rx="55" ry="55" x="0" y="0" fill="#CC5D15"/>
  <rect width="246" height="246" rx="50" ry="50" x="5" y="5" fill="#F49C52"/>
  <rect width="236" height="236" rx="47" ry="47" x="10" y="10" fill="url(#RSSg)"/>
  <circle cx="68" cy="189" r="24" fill="#FFF"/>
  <path d="M160 213h-34a82 82 0 0 0 -82 -82v-34a116 116 0 0 1 116 116z" fill="#FFF"/>
  <path d="M184 213A140 140 0 0 0 44 73 V 38a175 175 0 0 1 175 175z" fill="#FFF"/>
</svg>`;

function h(name, attrs = {}, ...children) {
  let el = document.createElementNS(HTML, name);
  for (let [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  el.append(...children);
  return el;
}

function child(parent, name) {
  return [...parent.children].find(
    (el) => el.namespaceURI === ATOM && el.localName === name,
  );
}

function rssIcon() {
  let svg = new DOMParser().parseFromString(RSS_ICON, "image/svg+xml");
  return document.importNode(svg.documentElement, true);
}

// The script runs before the entries are parsed.
document.addEventListener("DOMContentLoaded", () => {
  let feed = document.documentElement;
  let subtitle = child(feed, "subtitle")?.textContent || "";
  let siteUrl = feed.getAttribute("xml:base");

  let entries = [...feed.children]
    .filter((el) => el.localName === "entry")
    .map((entry) => {
      let updated = child(entry, "updated")?.textContent;
      return h(
        "div",
        {},
        h(
          "h2",
          {},
          h(
            "a",
            {
              href: child(entry, "link")?.getAttribute("href") || "",
              target: "_blank",
            },
            child(entry, "title")?.textContent || "",
          ),
        ),
        updated ? h("small", {}, `Published: ${updated.slice(0, 10)}`) : "",
      );
    });

  let html = h(
    "html",
    { lang: feed.getAttribute("xml:lang") || "en" },
    h(
      "head",
      {},
      h("title", {}, "The 11ty Bundle Blog RSS feed"),
      h("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      }),
      h("style", {}, FEED_CSS),
    ),
    h(
      "body",
      {},
      h(
        "p",
        {},
        h("strong", {}, "This is an RSS feed"),
        ". Subscribe by copying the URL from the address bar into your newsreader. Visit ",
        h("a", { href: "https://aboutfeeds.com" }, "About Feeds"),
        " to learn more and get started. It’s free!",
      ),
      h("hr"),
      h(
        "div",
        {},
        h(
          "header",
          {},
          h("h1", {}, rssIcon(), " RSS Feed Preview"),
          subtitle ? h("p", {}, subtitle) : "",
          siteUrl
            ? h(
                "a",
                { class: "head_link", href: siteUrl, target: "_blank" },
                "← Go back to 11tyBundle.dev",
              )
            : "",
        ),
        ...entries,
      ),
    ),
  );

  document.replaceChild(html, feed);
});

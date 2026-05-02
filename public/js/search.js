const PAGEFIND_PATH       = "/pagefind/pagefind.js";
const PAGEFIND_HIGHLIGHT  = "/pagefind/pagefind-highlight.js";
const HIGHLIGHT_PARAM     = "highlight";
const DEBOUNCE_MS         = 200;
const MOBILE_QUERY        = "(max-width: 699px)";
const MAX_POSTS           = 20;
const MAX_PAGES           = 5;
const MAX_BUNDLES         = 5;
const POST_ID_RE          = /#post-(\d{4}-\d{2}-\d{2})-(.+)$/;

// On every page load, if the URL was arrived at from a search result (?highlight=…),
// (1) tag the targeted post anchor with the .bundleitem-highlight class so the surrounding
//     card gets the dotted outline (CSS in public/css/channels.css via :has selector),
// (2) load Pagefind's highlight plugin to visibly mark matched terms in the body, and
// (3) re-scroll the anchor into view after marks land — mark injection grows content
//     above the anchor, so the browser's initial scroll otherwise stops short.
if (typeof window !== "undefined" && new URLSearchParams(window.location.search).has(HIGHLIGHT_PARAM)) {
  const hash = window.location.hash;
  const target = hash && hash.length > 1 ? document.getElementById(hash.slice(1)) : null;
  if (target) target.classList.add("bundleitem-highlight");

  import(PAGEFIND_HIGHLIGHT)
    .then((mod) => {
      const Highlighter = mod.default || mod.PagefindHighlight;
      if (Highlighter) new Highlighter({ highlightParam: HIGHLIGHT_PARAM });
      if (!target) return;

      // Mark injection may run across several microtasks/frames, shifting layout above
      // the anchor. Watch for DOM mutations to settle, then re-scroll the target into
      // view. Belt-and-suspenders: also scroll once after a hard timeout cap.
      let settleTimer = null;
      const rescroll = () => target.scrollIntoView({ block: "start" });
      const observer = new MutationObserver(() => {
        if (settleTimer) clearTimeout(settleTimer);
        settleTimer = setTimeout(() => { observer.disconnect(); rescroll(); }, 80);
      });
      observer.observe(document.body, { childList: true, subtree: true });
      // Cap: if no mutations arrive at all (sync mark.js path), still scroll.
      setTimeout(() => { observer.disconnect(); rescroll(); }, 600);
    })
    .catch(() => {});
}

const navInput   = document.getElementById("site-search");
const toggleBtn  = document.querySelector(".search-toggle");
const panel      = document.getElementById("search-results");
const panelInput = panel ? panel.querySelector(".search-results-panel__input") : null;
const panelInner = panel ? panel.querySelector(".search-results-panel__inner") : null;
const announce   = panel ? panel.querySelector(".search-results-panel__announce") : null;
const closeBtn   = panel ? panel.querySelector(".search-results-panel__close") : null;

let pagefind            = null;
let pagefindLoadPromise = null;
let lastQueryToken      = 0;
let debounceHandle      = null;

if (navInput && toggleBtn && panel && panelInput && panelInner && announce && closeBtn) {
  bind();
}

function bind() {
  navInput.addEventListener("input", onInput);
  panelInput.addEventListener("input", onInput);

  toggleBtn.addEventListener("click", () => {
    if (panel.hidden) { openPanel(); panelInput.focus(); }
    else closePanel();
  });

  closeBtn.addEventListener("click", () => {
    closePanel();
    toggleBtn.focus();
  });

  document.addEventListener("keydown", onKeydown);
  document.addEventListener("click", onDocClick);
  window.addEventListener("resize", positionPanel);
  window.addEventListener("scroll", positionPanel, { passive: true });
}

function onInput(e) {
  const value = e.target.value;
  const q = value.trim();
  if (e.target === navInput) panelInput.value = value;
  else navInput.value = value;
  if (debounceHandle) clearTimeout(debounceHandle);
  if (q === "") { closePanel(); return; }
  debounceHandle = setTimeout(() => runQuery(q), DEBOUNCE_MS);
}

function onKeydown(e) {
  if (e.key === "/") {
    const t = e.target;
    if (t && t.matches && t.matches("input, textarea, [contenteditable=true]")) return;
    e.preventDefault();
    if (window.matchMedia(MOBILE_QUERY).matches) {
      openPanel();
      panelInput.focus();
    } else {
      navInput.focus();
    }
    return;
  }
  if (e.key === "Escape" && !panel.hidden) {
    closePanel();
    if (window.matchMedia(MOBILE_QUERY).matches) toggleBtn.focus();
    else navInput.focus();
    return;
  }
  if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !panel.hidden) {
    handleArrow(e);
  }
}

function onDocClick(e) {
  if (panel.hidden) return;
  if (window.matchMedia(MOBILE_QUERY).matches) return;
  if (panel.contains(e.target)) return;
  if (navInput.contains(e.target)) return;
  if (toggleBtn.contains(e.target)) return;
  closePanel();
}

async function loadPagefind() {
  if (pagefind) return pagefind;
  if (!pagefindLoadPromise) {
    pagefindLoadPromise = import(PAGEFIND_PATH).then(async (mod) => {
      // Long enough that sub-result excerpts cover the entire post description (titles +
      // descriptions are typically <60 words combined; the title prefix is stripped at
      // render time, leaving the full description as the excerpt body).
      await mod.options({ excerptLength: 60 });
      pagefind = mod;
      return mod;
    });
  }
  return pagefindLoadPromise;
}

async function runQuery(q) {
  const token = ++lastQueryToken;

  let lib;
  try { lib = await loadPagefind(); }
  catch (err) { console.error("Pagefind failed to load", err); return showUnavailable(); }

  let pageRes, bundleRes;
  try {
    [pageRes, bundleRes] = await Promise.all([
      lib.search(q, { filters: { type: "page" } }),
      lib.search(q, { filters: { type: "blog" }, sort: { date: "desc" } }),
    ]);
  } catch (err) { console.error("Pagefind search failed", err); return showUnavailable(); }

  if (token !== lastQueryToken) return;

  // Pull data for ALL page results (not just MAX_PAGES) so we can mine post sub-results
  // from across categories and authors. The page-bucket display is still capped to MAX_PAGES.
  const [allPages, bundles] = await Promise.all([
    Promise.all(pageRes.results.map((r) => r.data())),
    Promise.all(bundleRes.results.slice(0, MAX_BUNDLES).map((r) => r.data())),
  ]);

  if (token !== lastQueryToken) return;

  const posts  = derivePosts(allPages).slice(0, MAX_POSTS);
  const pages  = allPages.slice(0, MAX_PAGES);

  render(q, posts, pages, bundles);
  openPanel();
}

// Aggregate post sub-results across all type=page results.
// - Build an authorByPostId map from author-page sub-results (pages whose meta.title is "Author: …")
// - Prefer category-page sub-results for the link target (so the user lands on a topic-related context)
// - Dedupe by post id; sort by date desc
function derivePosts(pageResults) {
  const authorByPostId = new Map();
  for (const page of pageResults) {
    const parentTitle = (page.meta && page.meta.title) || "";
    if (!parentTitle.startsWith("Author: ")) continue;
    const authorName = parentTitle.replace(/^Author:\s*/, "");
    const authorUrl  = (page.meta && page.meta.url) || page.url || null;
    for (const sub of (page.sub_results || [])) {
      const m = (sub.url || "").match(POST_ID_RE);
      if (!m) continue;
      authorByPostId.set(`${m[1]}-${m[2]}`, { name: authorName, url: authorUrl });
    }
  }

  const seen = new Map();
  const harvest = (page) => {
    for (const sub of (page.sub_results || [])) {
      const m = (sub.url || "").match(POST_ID_RE);
      if (!m) continue;
      const id = `${m[1]}-${m[2]}`;
      if (seen.has(id)) continue;
      seen.set(id, { idDate: m[1], sub, author: authorByPostId.get(id) || null });
    }
  };
  // Pass 1: category pages (preferred link target — surrounding posts share topic)
  for (const page of pageResults) {
    if (((page.meta && page.meta.title) || "").startsWith("Category: ")) harvest(page);
  }
  // Pass 2: anything else (e.g., a post seen only via its author page)
  for (const page of pageResults) {
    if (!((page.meta && page.meta.title) || "").startsWith("Category: ")) harvest(page);
  }
  return [...seen.values()].sort((a, b) => b.idDate.localeCompare(a.idDate));
}

function render(q, posts, pages, bundles) {
  const sortedPages = [...pages].sort(byPagesGroupAndTitle);

  const sections = [];
  if (posts.length)        sections.push(renderSection("Blog posts",   posts,       (p) => renderPostCard(p, q)));
  if (sortedPages.length)  sections.push(renderSection("Pages",        sortedPages, (r) => renderPageCard(r, q)));
  if (bundles.length)      sections.push(renderSection("Bundle issues", bundles,    (r) => renderBundleCard(r, q)));

  if (sections.length === 0) {
    panelInner.innerHTML = `<p class="search-empty">No results found for <em>${escapeHtml(q)}</em>.</p>`;
  } else {
    panelInner.innerHTML = sections.join("");
  }

  announce.textContent =
    `${posts.length} ${plural(posts.length, "blog post", "blog posts")}, ` +
    `${sortedPages.length} ${plural(sortedPages.length, "page", "pages")}, and ` +
    `${bundles.length} ${plural(bundles.length, "bundle issue", "bundle issues")} found.`;
}

function renderSection(heading, results, cardFn) {
  const cards = results.map(cardFn).join("");
  return `<section class="search-section">
    <h3 class="search-section__heading">${escapeHtml(heading)}</h3>
    <ul class="search-results" role="list">${cards}</ul>
  </section>`;
}

function renderPostCard(p, q) {
  const sub     = p.sub;
  const url     = appendHighlight(sub.url, q);
  const title   = sub.title || "Untitled";
  const dateIso = p.idDate || "";
  const author  = p.author || null;       // { name, url } | null
  const excerpt = stripTitlePrefix(sub.excerpt || "", title);

  // Card is an <li> (not an <a>) so we can nest two links inside: primary
  // title link (whole-card click target via ::before) + inline author link.
  const authorMarkup = author
    ? (author.url
        ? ` by <a class="search-result__author-link" href="${escapeAttr(author.url)}">${escapeHtml(author.name)}</a>`
        : ` by ${escapeHtml(author.name)}`)
    : "";

  return `<li class="search-result search-result--post">
    <h4 class="search-result__title">
      <a class="search-result__primary-link" href="${escapeAttr(url)}">${escapeHtml(title)}</a>
    </h4>
    ${dateIso ? `<p class="search-result__meta">
      <time datetime="${escapeAttr(dateIso)}">${escapeHtml(formatDate(dateIso))}</time>${authorMarkup}
    </p>` : ""}
    <p class="search-result__excerpt">${excerpt}</p>
  </li>`;
}

function renderPageCard(r, q) {
  const m       = r.meta || {};
  const url     = appendHighlight(m.url || r.url, q);
  const title   = m.title || "Untitled";
  // Prefer the explicit description meta when present (Author and Showcase pages set it)
  // so the excerpt is the description text — not whatever Pagefind auto-extracted from
  // the page body. We apply our own <mark> highlights for the query terms.
  const excerpt = m.description
    ? highlightInText(m.description, q)
    : (r.excerpt || "");

  return `<li>
    <a class="search-result search-result--page" href="${escapeAttr(url)}">
      <h4 class="search-result__title">${escapeHtml(title)}</h4>
      ${excerpt ? `<p class="search-result__excerpt">${excerpt}</p>` : ""}
    </a>
  </li>`;
}

function renderBundleCard(r, q) {
  const m       = r.meta || {};
  const url     = appendHighlight(m.url || r.url, q);
  const title   = m.title || "Issue";
  const dateIso = m.date || "";
  const excerpt = r.excerpt || "";

  return `<li>
    <a class="search-result search-result--bundle" href="${escapeAttr(url)}">
      <h4 class="search-result__title">${escapeHtml(title)}</h4>
      ${dateIso ? `<p class="search-result__meta">
        <time datetime="${escapeAttr(dateIso)}">${escapeHtml(formatDate(dateIso))}</time>
      </p>` : ""}
      <p class="search-result__excerpt">${excerpt}</p>
    </a>
  </li>`;
}

// Append ?highlight=Q (or &highlight=Q) to a URL, placing the param BEFORE any #anchor.
function appendHighlight(url, q) {
  if (!q) return url;
  const value = encodeURIComponent(q);
  const hashIdx = url.indexOf("#");
  const base = hashIdx === -1 ? url : url.slice(0, hashIdx);
  const hash = hashIdx === -1 ? "" : url.slice(hashIdx);
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}${HIGHLIGHT_PARAM}=${value}${hash}`;
}

// If a Pagefind-generated excerpt begins with the heading title (which happens on
// sub-results since the indexed body starts at the heading), strip that prefix so the
// excerpt reads as the description text. Preserves <mark> highlights inside the excerpt.
function stripTitlePrefix(excerpt, title) {
  if (!excerpt || !title) return excerpt;
  const cleanExcerpt = excerpt.replace(/<\/?mark>/g, "");
  if (!cleanExcerpt.startsWith(title)) return excerpt;

  // Walk the excerpt, advancing one "real" character per non-tag step, until we've
  // consumed enough characters to cover the title.
  let charCount = 0;
  let position = 0;
  while (charCount < title.length && position < excerpt.length) {
    if (excerpt.startsWith("<mark>", position)) position += 6;
    else if (excerpt.startsWith("</mark>", position)) position += 7;
    else { charCount++; position++; }
  }

  let trimmed = excerpt.slice(position).trim();
  trimmed = trimmed.replace(/^(<\/?mark>)+/, "");
  trimmed = trimmed.replace(/^[.,;:!?\s]+/, "");
  if (trimmed.length === 0) return excerpt;

  // Capitalize first real character (skipping a leading <mark> if present).
  const m = trimmed.match(/^(<mark>)?(.)/);
  if (m) {
    const prefix = m[1] || "";
    const firstChar = m[2].toUpperCase();
    trimmed = prefix + firstChar + trimmed.slice(prefix.length + 1);
  }
  return trimmed;
}

function showUnavailable() {
  panelInner.innerHTML = `<p class="search-empty">Search is unavailable right now.</p>`;
  announce.textContent = "Search is unavailable.";
  openPanel();
}

function openPanel() {
  panel.hidden = false;
  navInput.setAttribute("aria-expanded", "true");
  toggleBtn.setAttribute("aria-expanded", "true");
  positionPanel();
}

function closePanel() {
  panel.hidden = true;
  navInput.setAttribute("aria-expanded", "false");
  toggleBtn.setAttribute("aria-expanded", "false");
  if (debounceHandle) { clearTimeout(debounceHandle); debounceHandle = null; }
}

function positionPanel() {
  if (panel.hidden) return;
  if (window.matchMedia(MOBILE_QUERY).matches) {
    panel.style.top = "";
    return;
  }
  // CSS handles horizontal centering via left:50% + translateX(-50%).
  // JS sets `top` to sit just below the entire header (so the navigation row
  // stays visible above the open panel and the user can still click nav links).
  const header = document.querySelector(".site-header");
  const rect = header ? header.getBoundingClientRect() : navInput.getBoundingClientRect();
  panel.style.top = `${Math.max(rect.bottom + 8, 16)}px`;
}

function handleArrow(e) {
  // Walk only the primary card targets (post cards' inner title link, plus
  // page/bundle cards which are themselves anchors). Skip secondary links
  // like the author byline.
  const links = panel.querySelectorAll(".search-result__primary-link, a.search-result");
  if (links.length === 0) return;
  const idx = Array.from(links).indexOf(document.activeElement);
  e.preventDefault();
  if (e.key === "ArrowDown") {
    if (idx === -1) links[0].focus();
    else if (idx < links.length - 1) links[idx + 1].focus();
  } else {
    if (idx <= 0) {
      const target = window.matchMedia(MOBILE_QUERY).matches ? panelInput : navInput;
      target.focus();
    } else {
      links[idx - 1].focus();
    }
  }
}

function plural(n, one, many) { return n === 1 ? one : many; }

function byTitleAsc(a, b) {
  return ((a.meta && a.meta.title) || "").localeCompare(
    (b.meta && b.meta.title) || "",
    undefined,
    { sensitivity: "base", numeric: true }
  );
}

// Pages bucket: group by prefix (Category before Author before Showcase),
// then alphabetical within each group.
function byPagesGroupAndTitle(a, b) {
  const titleA = (a.meta && a.meta.title) || "";
  const titleB = (b.meta && b.meta.title) || "";
  const groupOrder = (t) => {
    if (t.startsWith("Category: ")) return 1;
    if (t.startsWith("Author: "))   return 2;
    if (t.startsWith("Showcase: ")) return 3;
    return 4;
  };
  const ga = groupOrder(titleA);
  const gb = groupOrder(titleB);
  if (ga !== gb) return ga - gb;
  return titleA.localeCompare(titleB, undefined, { sensitivity: "base", numeric: true });
}

function formatDate(iso) {
  // Parse YYYY-MM-DD as a local-time date so dates near midnight UTC don't
  // shift to the previous day in negative-UTC timezones.
  const ymd = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  const d = ymd
    ? new Date(Number(ymd[1]), Number(ymd[2]) - 1, Number(ymd[3]))
    : new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric", month: "short", day: "numeric",
  }).format(d);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}
function escapeAttr(s) { return escapeHtml(s); }

// Wrap each whitespace-separated query word in <mark>…</mark> within text. Case-insensitive,
// word-boundary aware. Returns HTML-safe markup (input text is HTML-escaped first).
function highlightInText(text, q) {
  const escaped = escapeHtml(text || "");
  if (!q) return escaped;
  const words = q.trim().split(/\s+/).filter((w) => w.length > 1);
  if (!words.length) return escaped;
  const escapedWords = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`\\b(${escapedWords.join("|")})`, "gi");
  return escaped.replace(pattern, "<mark>$1</mark>");
}

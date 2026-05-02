const PAGEFIND_PATH  = "/pagefind/pagefind.js";
const DEBOUNCE_MS    = 200;
const MOBILE_QUERY   = "(max-width: 699px)";
const MAX_POSTS      = 15;
const MAX_PAGES      = 5;
const MAX_BUNDLES    = 5;

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
    pagefindLoadPromise = import(PAGEFIND_PATH).then((mod) => (pagefind = mod));
  }
  return pagefindLoadPromise;
}

async function runQuery(q) {
  const token = ++lastQueryToken;

  let lib;
  try { lib = await loadPagefind(); }
  catch (err) { console.error("Pagefind failed to load", err); return showUnavailable(); }

  let postRes, pageRes, bundleRes;
  try {
    [postRes, pageRes, bundleRes] = await Promise.all([
      lib.search(q, { filters: { type: "post" }, sort: { date: "desc" } }),
      lib.search(q, { filters: { type: "page" } }),
      lib.search(q, { filters: { type: "blog" }, sort: { date: "desc" } }),
    ]);
  } catch (err) { console.error("Pagefind search failed", err); return showUnavailable(); }

  if (token !== lastQueryToken) return;

  const [posts, pages, bundles] = await Promise.all([
    Promise.all(postRes.results.slice(0, MAX_POSTS).map((r) => r.data())),
    Promise.all(pageRes.results.slice(0, MAX_PAGES).map((r) => r.data())),
    Promise.all(bundleRes.results.slice(0, MAX_BUNDLES).map((r) => r.data())),
  ]);

  if (token !== lastQueryToken) return;

  render(q, posts, pages, bundles);
  openPanel();
}

function render(q, posts, pages, bundles) {
  const sortedPages = [...pages].sort(byTitleAsc);

  const sections = [];
  if (posts.length)        sections.push(renderSection("Blog posts",   posts,       renderPostCard));
  if (sortedPages.length)  sections.push(renderSection("Pages",        sortedPages, renderPageCard));
  if (bundles.length)      sections.push(renderSection("Bundle issues", bundles,    renderBundleCard));

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

function renderPostCard(r) {
  const m       = r.meta || {};
  const url     = m.url || r.url;
  const title   = m.title || "Untitled";
  const dateIso = m.date || "";
  const author  = m.author || "";
  const excerpt = r.excerpt || "";

  return `<li>
    <a class="search-result search-result--post" href="${escapeAttr(url)}" target="_blank" rel="noopener">
      <h4 class="search-result__title">${escapeHtml(title)}</h4>
      <p class="search-result__meta">
        ${dateIso ? `<time datetime="${escapeAttr(dateIso)}">${escapeHtml(formatDate(dateIso))}</time>` : ""}
        ${author ? `<span class="search-result__author">${escapeHtml(author)}</span>` : ""}
      </p>
      <p class="search-result__excerpt">${excerpt}</p>
    </a>
  </li>`;
}

function renderPageCard(r) {
  const m       = r.meta || {};
  const url     = m.url || r.url;
  const title   = m.title || "Untitled";
  const excerpt = r.excerpt || "";

  return `<li>
    <a class="search-result search-result--page" href="${escapeAttr(url)}">
      <h4 class="search-result__title">${escapeHtml(title)}</h4>
      <p class="search-result__excerpt">${excerpt}</p>
    </a>
  </li>`;
}

function renderBundleCard(r) {
  const m       = r.meta || {};
  const url     = m.url || r.url;
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
    panel.style.left = "";
    panel.style.top = "";
    return;
  }
  const rect = navInput.getBoundingClientRect();
  panel.style.left = `${rect.left}px`;
  panel.style.top = `${rect.bottom + 8}px`;
}

function handleArrow(e) {
  const links = panel.querySelectorAll(".search-result");
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

function formatDate(iso) {
  const d = new Date(iso);
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

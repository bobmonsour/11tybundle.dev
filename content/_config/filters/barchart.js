/**
 * Bar chart SVG filter for Eleventy/Nunjucks.
 * Renders horizontal or vertical bar charts.
 * All colors via CSS classes — no inline hardcoded values.
 */

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * @param {object[]} data - Array of objects with label/value properties
 * @param {object} options
 * @param {string} options.title - Chart title for accessibility
 * @param {string} [options.description] - Chart description for accessibility
 * @param {number} [options.width=800] - SVG viewBox width
 * @param {number} [options.height=400] - SVG viewBox height
 * @param {string} [options.orientation="horizontal"] - "horizontal" or "vertical"
 * @param {string} [options.barClass="chart-bar"] - CSS class for bars
 * @param {string} [options.labelKey="name"] - Key for label in data objects
 * @param {string} [options.valueKey="count"] - Key for value in data objects
 * @param {boolean} [options.showValues=true] - Show value labels on bars
 * @returns {string} SVG markup
 */
export function barChart(data, options = {}) {
  const {
    title = "Bar Chart",
    description = "",
    width = 800,
    height = 400,
    orientation = "horizontal",
    barClass = "chart-bar",
    labelKey = "name",
    valueKey = "count",
    showValues = true,
  } = options;

  if (!data || data.length === 0) return "";

  const items = data.map((d) => ({
    label: String(d[labelKey] || ""),
    value: Number(d[valueKey] || 0),
  }));

  const maxVal = Math.max(...items.map((d) => d.value));
  if (maxVal === 0) return "";

  if (orientation === "horizontal") {
    return horizontalBarChart(items, {
      title,
      description,
      width,
      height,
      barClass,
      showValues,
      maxVal,
    });
  }
  return verticalBarChart(items, {
    title,
    description,
    width,
    height,
    barClass,
    showValues,
    maxVal,
  });
}

function horizontalBarChart(items, opts) {
  const { title, description, width, height, barClass, showValues, maxVal } =
    opts;
  const padLeft = 160;
  const padRight = 60;
  const padTop = 10;
  const padBottom = 10;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;
  const barHeight = Math.min(
    (chartH / items.length) * 0.7,
    30
  );
  const barGap = (chartH - barHeight * items.length) / (items.length + 1);

  let bars = "";
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const y = padTop + barGap * (i + 1) + barHeight * i;
    const barW = (item.value / maxVal) * chartW;

    // Label
    bars += `<text x="${padLeft - 8}" y="${y + barHeight / 2 + 4}" class="chart-bar-label" text-anchor="end">${escapeHtml(item.label)}</text>`;
    // Bar
    bars += `<rect x="${padLeft}" y="${y}" width="${barW}" height="${barHeight}" class="${barClass}" rx="2" />`;
    // Value
    if (showValues) {
      bars += `<text x="${padLeft + barW + 6}" y="${y + barHeight / 2 + 4}" class="chart-bar-value">${item.value.toLocaleString()}</text>`;
    }
  }

  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(title)}" class="chart-svg chart-bar-chart" xmlns="http://www.w3.org/2000/svg">
  <title>${escapeHtml(title)}</title>
  <desc>${escapeHtml(description)}</desc>
  ${bars}
</svg>`;
}

function verticalBarChart(items, opts) {
  const { title, description, width, height, barClass, showValues, maxVal } =
    opts;
  const padLeft = 50;
  const padRight = 20;
  const padTop = 30;
  const padBottom = 50;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;
  const barWidth = Math.min(
    (chartW / items.length) * 0.6,
    60
  );
  const barGap = (chartW - barWidth * items.length) / (items.length + 1);

  // Y-axis gridlines
  const yTicks = 4;
  let gridLines = "";
  for (let i = 0; i <= yTicks; i++) {
    const val = Math.round((maxVal / yTicks) * i);
    const y = padTop + chartH - (val / maxVal) * chartH;
    gridLines += `<line x1="${padLeft}" y1="${y}" x2="${padLeft + chartW}" y2="${y}" class="chart-grid" />`;
    gridLines += `<text x="${padLeft - 8}" y="${y + 4}" class="chart-axis-label" text-anchor="end">${val.toLocaleString()}</text>`;
  }

  let bars = "";
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const x = padLeft + barGap * (i + 1) + barWidth * i;
    const barH = (item.value / maxVal) * chartH;
    const y = padTop + chartH - barH;

    // Bar
    bars += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" class="${barClass}" rx="2" />`;
    // Label below
    bars += `<text x="${x + barWidth / 2}" y="${padTop + chartH + 20}" class="chart-bar-label" text-anchor="middle">${escapeHtml(item.label)}</text>`;
    // Value above
    if (showValues) {
      bars += `<text x="${x + barWidth / 2}" y="${y - 6}" class="chart-bar-value" text-anchor="middle">${item.value.toLocaleString()}</text>`;
    }
  }

  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(title)}" class="chart-svg chart-bar-chart" xmlns="http://www.w3.org/2000/svg">
  <title>${escapeHtml(title)}</title>
  <desc>${escapeHtml(description)}</desc>
  ${gridLines}
  ${bars}
</svg>`;
}

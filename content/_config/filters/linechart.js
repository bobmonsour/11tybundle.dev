/**
 * Line chart SVG filter for Eleventy/Nunjucks.
 * Renders multi-series line charts with milestones and direct labels.
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
 * @param {object} data - { months: string[], series: { [key]: number[] } }
 * @param {object} options
 * @param {string} options.title - Chart title for accessibility
 * @param {string} options.description - Chart description for accessibility
 * @param {number} [options.width=800] - SVG viewBox width
 * @param {number} [options.height=400] - SVG viewBox height
 * @param {string[]} options.seriesNames - Which keys from data.series to plot
 * @param {string[]} options.seriesLabels - Display names per series
 * @param {string[]} options.seriesClasses - CSS class per series (e.g. "chart-line--blog")
 * @param {string[]} [options.seriesDashes] - stroke-dasharray per series for accessibility
 * @param {number} [options.labelInterval=12] - Show every Nth x-axis label
 * @param {object[]} [options.milestones] - Vertical markers: { month, label, type }
 * @param {object} [options.siteJump] - Annotation: { month, amount }
 * @param {string} [options.legendStyle="end"] - "end" for end-labels, "box" for boxed vertical legend
 * @param {string[]} [options.seriesFootnotes] - Superscript footnote marker per series (e.g. ["", "1", "2"])
 * @param {string[]} [options.seriesLabelColors] - Inline fill color per series end-label (e.g. ["white", "white"])
 * @returns {string} SVG markup
 */
export function lineChart(data, options = {}) {
  const {
    title = "Line Chart",
    description = "",
    width = 800,
    height = 400,
    seriesNames = [],
    seriesLabels = [],
    seriesClasses = [],
    seriesDashes = [],
    seriesFootnotes = [],
    seriesLabelColors = [],
    labelInterval = 12,
    milestones = [],
    siteJump = null,
    legendStyle = "end",
  } = options;

  const months = data.months || [];
  const numPoints = months.length;
  if (numPoints === 0) return "";

  // Layout — extra top padding when milestones need room for labels
  const padLeft = 60;
  const padRight = legendStyle === "box" ? 140 : 120;
  const padTop = milestones.length > 0 ? 55 : 30;
  const padBottom = 65;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  // Compute max value across all plotted series
  let maxVal = 0;
  for (const name of seriesNames) {
    const vals = data.series[name] || [];
    for (const v of vals) {
      if (v > maxVal) maxVal = v;
    }
  }
  // Round up to a nice number
  const magnitude = Math.pow(10, Math.floor(Math.log10(maxVal || 1)));
  maxVal = Math.ceil(maxVal / magnitude) * magnitude;
  if (maxVal === 0) maxVal = 10;

  // Scales
  const xScale = (i) => padLeft + (i / (numPoints - 1)) * chartW;
  const yScale = (v) => padTop + chartH - (v / maxVal) * chartH;

  // Y-axis gridlines (5 ticks)
  const yTicks = 5;
  let gridLines = "";
  for (let i = 0; i <= yTicks; i++) {
    const val = Math.round((maxVal / yTicks) * i);
    const y = yScale(val);
    gridLines += `<line x1="${padLeft}" y1="${y}" x2="${padLeft + chartW}" y2="${y}" class="chart-grid" />`;
    gridLines += `<text x="${padLeft - 8}" y="${y + 4}" class="chart-axis-label" text-anchor="end">${val.toLocaleString()}</text>`;
  }

  // X-axis labels — show "Jan YYYY" for each January, angled
  const monthAbbr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let xLabels = "";
  for (let i = 0; i < numPoints; i++) {
    const [year, month] = months[i].split("-");
    const isJan = month === "01";
    if (isJan) {
      const x = xScale(i);
      const label = `${monthAbbr[parseInt(month) - 1]} ${year}`;
      const ty = padTop + chartH + 18;
      xLabels += `<text x="${x}" y="${ty}" class="chart-axis-label" text-anchor="end" transform="rotate(-45, ${x}, ${ty})">${escapeHtml(label)}</text>`;
      xLabels += `<line x1="${x}" y1="${padTop + chartH}" x2="${x}" y2="${padTop + chartH + 5}" class="chart-grid" />`;
    }
  }

  // Milestone vertical lines
  // Version labels (e.g. "v1.0.0") get an "11ty" prefix above them.
  // The major "11tybundle.dev launch" label is placed higher to clear nearby version labels.
  let milestoneMarkup = "";
  for (const ms of milestones) {
    const idx = months.indexOf(ms.month);
    if (idx === -1) continue;
    const x = xScale(idx);
    const isMajor = ms.type === "major";
    const isVersion = ms.label.startsWith("v");

    if (isVersion) {
      // Two-line label: "11ty" on top, version below; line starts at top gridline
      const versionY = padTop - 6;
      const prefixY = versionY - 12;
      milestoneMarkup += `<line x1="${x}" y1="${padTop}" x2="${x}" y2="${padTop + chartH}" class="chart-milestone" />`;
      milestoneMarkup += `<text x="${x}" y="${prefixY}" class="chart-milestone-label" text-anchor="middle">11ty</text>`;
      milestoneMarkup += `<text x="${x}" y="${versionY}" class="chart-milestone-label" text-anchor="middle">${escapeHtml(ms.label)}</text>`;
    } else {
      // Major milestone — two-line label, larger text; sits well above version labels
      const line2Y = padTop - 32;
      const line1Y = line2Y - 14;
      milestoneMarkup += `<line x1="${x}" y1="${line2Y + 6}" x2="${x}" y2="${padTop + chartH}" class="chart-milestone chart-milestone--major" />`;
      milestoneMarkup += `<text x="${x}" y="${line1Y}" class="chart-milestone-label chart-milestone-label--major" text-anchor="middle">11tybundle.dev</text>`;
      milestoneMarkup += `<text x="${x}" y="${line2Y}" class="chart-milestone-label chart-milestone-label--major" text-anchor="middle">launch</text>`;
    }
  }

  // Site jump annotation — same style as milestone labels, but italic
  let siteJumpMarkup = "";
  if (siteJump) {
    const idx = months.indexOf(siteJump.month);
    if (idx !== -1) {
      const x = xScale(idx);
      siteJumpMarkup += `<text x="${x - 8}" y="${padTop + 16}" class="chart-milestone-label" text-anchor="end" font-style="italic">+${siteJump.amount.toLocaleString()} sites imported</text>`;
    }
  }

  // Series polylines
  let seriesMarkup = "";
  for (let s = 0; s < seriesNames.length; s++) {
    const name = seriesNames[s];
    const vals = data.series[name] || [];
    const cls = seriesClasses[s] || "";
    const dash = seriesDashes[s] || "";
    const label = seriesLabels[s] || name;

    let points = "";
    for (let i = 0; i < vals.length; i++) {
      const x = xScale(i);
      const y = yScale(vals[i]);
      points += `${x},${y} `;
    }

    const dashAttr = dash ? ` stroke-dasharray="${dash}"` : "";
    seriesMarkup += `<polyline points="${points.trim()}" class="chart-line ${cls}" fill="none"${dashAttr} />`;

    // End labels (only for "end" legend style)
    if (legendStyle === "end" && vals.length > 0) {
      const lastVal = vals[vals.length - 1];
      const lastX = xScale(vals.length - 1);
      const lastY = yScale(lastVal);
      const footnote = seriesFootnotes[s] || "";
      const footnoteMark = footnote ? `<tspan baseline-shift="super" font-size="8">${escapeHtml(footnote)}</tspan>` : "";
      const labelColor = seriesLabelColors[s] || "";
      const colorStyle = labelColor ? ` style="fill: ${labelColor}"` : "";
      seriesMarkup += `<text x="${lastX + 8}" y="${lastY + 4}" class="chart-end-label ${cls}"${colorStyle}>${escapeHtml(label)}${footnoteMark}</text>`;
    }
  }

  // Boxed legend (vertical list with colored squares)
  let legendMarkup = "";
  if (legendStyle === "box") {
    const legendX = padLeft + chartW + 16;
    const lineHeight = 18;
    const boxSize = 10;
    for (let s = 0; s < seriesNames.length; s++) {
      const cls = seriesClasses[s] || "";
      const dash = seriesDashes[s] || "";
      const label = seriesLabels[s] || seriesNames[s];
      const y = padTop + s * lineHeight;
      const dashAttr = dash ? ` stroke-dasharray="${dash}"` : "";
      legendMarkup += `<line x1="${legendX}" y1="${y + boxSize / 2}" x2="${legendX + boxSize}" y2="${y + boxSize / 2}" class="chart-line ${cls}" stroke-width="3"${dashAttr} />`;
      const footnote = seriesFootnotes[s] || "";
      const footnoteMark = footnote ? `<tspan baseline-shift="super" font-size="8">${escapeHtml(footnote)}</tspan>` : "";
      legendMarkup += `<text x="${legendX + boxSize + 6}" y="${y + boxSize - 1}" class="chart-legend-label">${escapeHtml(label)}${footnoteMark}</text>`;
    }
  }

  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(title)}" class="chart-svg chart-line-chart" xmlns="http://www.w3.org/2000/svg">
  <title>${escapeHtml(title)}</title>
  <desc>${escapeHtml(description)}</desc>
  ${gridLines}
  ${xLabels}
  ${milestoneMarkup}
  ${siteJumpMarkup}
  ${seriesMarkup}
  ${legendMarkup}
</svg>`;
}

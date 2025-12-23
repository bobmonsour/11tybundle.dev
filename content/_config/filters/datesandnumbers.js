import { DateTime } from "luxon";

// Format the date of blog posts for the site
export const formatPostDate = (date) => {
  return DateTime.fromJSDate(date, { zone: "utc" }).toLocaleString(
    DateTime.DATE_MED
  );
};

// Format the date of the items that come from the database,
// which arrive as strings, not dates; for use in the Bundle posts
// dates are of the form of Dec 25, 2025
export const formatItemDate = (date) => {
  const itemDate = Date.parse(date);
  return DateTime.fromMillis(itemDate, { zone: "utc" }).toLocaleString(
    DateTime.DATE_MED
  );
};

// create a plain date from an ISO date (for webmentions)
export const plainDate = (isoDate) => {
  let date = new Date(isoDate);
  let options = { year: "numeric", month: "long", day: "numeric" };
  let formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

// Format the date of the items that come from
// the database, which arrive as strings, not dates;
// required for the firehose RSS feed
export const formatFirehoseDate = (date) => {
  const newDate = DateTime.fromISO(date);
  return newDate.toRFC2822();
};

// Format numbers to add commas where needed
export const formatNumber = (number) => {
  return Intl.NumberFormat().format(number);
};

// Return YYYY-MM-DD for a Date or date-string input (uses UTC)
export const formatYMD = (input) => {
  if (input === null || input === undefined || input === "") return "";
  const d = input instanceof Date ? input : new Date(input);
  if (!Number.isFinite(d.getTime())) return "";
  // console.log("formatYMD input:", input, "output:", d.toISOString().slice(0, 10));
  return d.toISOString().slice(0, 10);
};

// Generate a count label with proper pluralization of the "type"
export const countLabel = (count, type) => {
  return count === 1 ? `1 ${type}` : `${count} ${type}s`;
};

// Take a number an, if more than 999, insert a single comma
// before the last three digits; only handles commas for thousands
// Example: 1234 becomes "1,234", 123 becomes "123"
export const singleComma = (input) => {
  const s = String(input).replace(/,/g, "");
  if (s.length <= 3) return s;
  const prefix = s.slice(0, -3);
  const suffix = s.slice(-3);
  return `${prefix},${suffix}`;
};

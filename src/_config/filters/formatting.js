import { DateTime } from "luxon";

// Format the date of blog posts for the site
export const formatPostDate = (date) => {
	return DateTime.fromJSDate(date, { zone: "utc" }).toLocaleString(
		DateTime.DATE_MED
	);
};

// Format the date of the items that come from the database,
// which arrive as strings, not dates; for use in the Bundle posts
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
	// return number.toLocaleString();
};

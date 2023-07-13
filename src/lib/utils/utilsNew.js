export function formatDate(date, dateStyle = 'medium', locales = 'de') {
	const formatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return formatter.format(new Date(date));
}

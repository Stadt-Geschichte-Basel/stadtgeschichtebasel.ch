import { parseStringPromise } from 'xml2js';

// /** @type {import('./$types').PageLoad} */
/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const response = await fetch('https://www.kulturzueri.ch/xmlexport/kzexport-basel.xml');
	const xml = await response.text();
	const data = await parseStringPromise(xml);
	const activities = data['kdz:exportActivities']['Activities'][0]['Activity'];
	const parsedActivities = activities.map((activity) => {
		const dates =
			activity.ActivityDates?.[0]?.ActivityDate?.map((date) => ({
				startDate: date.$.startDate,
				endDate: date.$.endDate,
				startTime: date.$.startTime,
				endTime: date.$.endTime
			})) ?? [];

		return {
			owner: activity['$'].owner,
			dauerausstellung: activity['$'].dauerausstellung,
			title: activity.Title[0],
			shortDescription: activity.ShortDescription[0],
			originUrl: activity.OriginURL[0],
			dates
		};
	});
	const allOwners = parsedActivities.map((item) => item.owner);
	const uniqueOwners = [...new Set(allOwners)];
	// console.log(uniqueOwners);
	const filteredActivities = parsedActivities.filter((item) => {
		return (
			item.owner === 'Kunstmuseum Basel' ||
			item.owner === 'Museum der Kulturen Basel' ||
			item.owner === 'Antikenmuseum Basel und Sammlung Ludwig'
		);
	});
	// console.log(filteredActivities);
	// TODO make one entry per date and time
	return {
		filteredActivities
	};
}

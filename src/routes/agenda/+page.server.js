import { parseStringPromise } from 'xml2js';

// /** @type {import('./$types').PageLoad} */
/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const response = await fetch('https://www.kulturzueri.ch/xmlexport/kzexport-basel.xml');
	const xml = await response.text();
	const data = await parseStringPromise(xml);
	const activities = data["kdz:exportActivities"]["Activities"][0]['Activity'];
	// console.log(activities[0].ActivityDates.map(date => date.ActivityDate.map((date: any) => date.$.startTime)));
	// console.log(activities[0].ActivityDates.map(date => date.ActivityDate.map((date: any) => date.$.endTime)));
	// console.log(activities[0].ActivityDates.map(date => date.ActivityDate.map((date: any) => date.$.startDate)));
	// console.log(activities[0].ActivityDates.map(date => date.ActivityDate.map((date: any) => date.$.endDate)));
	const parsedData = activities.map((activity) => {
		return {
			owner: activities[0]['$'].owner,
			dauerausstellung: activities[0]['$'].dauerausstellung,
			title: activity.Title[0],
			originUrl: activity.OriginURL[0],
			// dates: [startTime, endTime, startDate, endDate] : activities[0].ActivityDates.flatMap(date =>
			// 	date.ActivityDate.map(({ $: { startTime, endTime, startDate, endDate } }) => ({
			// 		startTime,
			// 		endTime,
			// 		startDate,
			// 		endDate,
			// 	}))
			// );
		};
	});
	console.log(parsedData);
	return { parsedData };
}
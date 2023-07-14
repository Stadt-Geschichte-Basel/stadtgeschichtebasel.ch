import * as config from '$lib/config';

import { json } from '@sveltejs/kit';
import { promises as fs } from 'fs';
import { parseStringPromise } from 'xml2js';

/**
 * Indicates whether prerendering is enabled.
 * @type {boolean}
 */
export const prerender = true;

/**
 * Saves data to a file.
 * @param {any} data - The data to be saved.
 * @param {string} path - The path to save the file.
 * @returns {Promise<void>} A promise that resolves when the data is saved.
 */
async function saveToFile(data, path) {
	await fs.writeFile(path, JSON.stringify(data));
	console.log(`Data saved to: ${path}`);
}

/**
 * Returns an array of unique owners from the provided activities.
 * @param {Array<any>} activities - The activities array.
 * @returns {Array<string>} An array of unique owners.
 */
function getUniqueOwners(activities) {
	const allOwners = activities.map((item) => item.owner);
	const uniqueOwners = [...new Set(allOwners)];
	console.log(uniqueOwners);
	return uniqueOwners;
}

/**
 * Represents an activity.
 * @typedef {Object} Activity
 * @property {string} owner - The owner of the activity.
 * @property {string} dauerausstellung - The dauerausstellung value.
 * @property {string} title - The title of the activity.
 * @property {string} shortDescription - The short description of the activity.
 * @property {string} originUrl - The origin URL of the activity.
 * @property {Array<ActivityDate>} dates - The dates of the activity.
 */

/**
 * Represents a date for an activity.
 * @typedef {Object} ActivityDate
 * @property {string} startDate - The start date of the activity.
 * @property {string} endDate - The end date of the activity.
 * @property {string} startTime - The start time of the activity.
 * @property {string} endTime - The end time of the activity.
 * @property {string} TicketURL - The ticket URL of the activity.
 */

/**
 * Fetches activities data from the XML export and filters them based on configured partners.
 * @returns {Promise<{ activities: Array<Activity> }>} A promise that resolves to an object containing the activities data.
 */
async function getActivities() {
	const response = await fetch('https://www.kulturzueri.ch/xmlexport/kzexport-basel.xml');
	const xml = await response.text();
	const data = await parseStringPromise(xml);
	const activities = data['kdz:exportActivities']['Activities'][0]['Activity'];

	// await saveToFile(activities, join(tmpdir(), 'activities.json'));
	// getUniqueOwners(activities);

	const partners = config.partners;
	const filteredActivities = activities.filter((item) => {
		return partners.includes(item['$'].owner);
	});

	const parsedActivities = filteredActivities.map((activity) => {
		const dates =
			activity.ActivityDates?.[0]?.ActivityDate?.map((date) => ({
				startDate: date.$.startDate,
				endDate: date.$.endDate,
				startTime: date.$.startTime,
				endTime: date.$.endTime,
				TicketURL: date.TicketURL[0]
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

	return { activities: parsedActivities };
}

/**
 * Request handler for the GET method.
 * @type {import('./$types').RequestHandler}
 */
export async function GET() {
	const activities = await getActivities();
	return json(activities);
}

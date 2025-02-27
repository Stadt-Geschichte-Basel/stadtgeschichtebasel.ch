/**
 * @file This file contains API endpoints for fetching and displaying activities.
 */

import { dev } from '$app/environment';
import * as config from '$lib/config';
import { json } from '@sveltejs/kit';
import createDOMPurify from 'dompurify';
import { promises as fs } from 'fs';
import { JSDOM } from 'jsdom';
import { tmpdir } from 'os';
import { join } from 'path';
import { parseStringPromise } from 'xml2js';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

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
	const allOwners = activities.map((item) => item['$'].owner);
	const uniqueOwners = [...new Set(allOwners)];
	return uniqueOwners;
}

/**
 * Represents an exhibition.
 * @typedef {Object} Exhibition
 * @property {string} owner - The owner of the exhibition.
 * @property {string} title - The title of the exhibition.
 * @property {string} shortDescription - The short description of the exhibition.
 * @property {string} longDescription - The long description of the exhibition.
 * @property {string} originUrl - The origin URL of the exhibition.
 */

/**
 * Represents an event with date and time details.
 * @typedef {Object} Event
 * @property {string} owner - The owner of the event.
 * @property {string} title - The title of the event.
 * @property {string} shortDescription - The short description of the event.
 * @property {string} longDescription - The long description of the event.
 * @property {string} originUrl - The origin URL of the event.
 * @property {string} startDate - The start date of the event.
 * @property {string} endDate - The end date of the event.
 * @property {string} startTime - The start time of the event.
 * @property {string} endTime - The end time of the event.
 * @property {string} ticketURL - The ticket URL of the event.
 */

/**
 * Fetches activities data from the XML export and filters them based on configured partners.
 * @async
 * @returns {Promise<{ events: Array<Event>, exhibitions: Array<Exhibition> }>} A promise that resolves to an object containing the future dates and exhibitions.
 */
async function getActivities() {
	try {
		const response = await fetch('https://agendabasel.ch/xmlexport/kzexport-basel.xml');

		// Check if the response is OK (status 200-299)
		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
		}

		// Parse the response as text
		const xml = await response.text();

		// Check if the response is empty
		if (!xml || xml.trim() === '') {
			throw new Error('Received empty response from the server.');
		}

		let data;
		try {
			data = await parseStringPromise(xml);
		} catch (parseError) {
			throw new Error(`Failed to parse XML response. Original error: ${parseError.message}`);
		}

		// Extract the ExportFileLastUpdate
		const exportLastUpdateStr = data['kdz:exportActivities']['ExportFileLastUpdate'][0];
		const exportLastUpdate = new Date(exportLastUpdateStr);
		const now = new Date();

		// Calculate the time difference in days
		const timeDiff = (now - exportLastUpdate) / (1000 * 60 * 60 * 24); // Convert milliseconds to days

		// If older than 14 days, throw an error
		if (timeDiff > 14) {
			throw new Error('The export file is older than 2 weeks.');
		}

		const activities = data['kdz:exportActivities']['Activities'][0]['Activity'];

		if (dev) {
			await saveToFile(activities, join(tmpdir(), 'activities.json'));
			console.log(getUniqueOwners(activities));
		}

		const partners = config.partners;

		const parsedActivities = activities
			.filter(({ $: { owner } }) => partners.includes(owner))
			.map(
				({
					$: { owner, dauerausstellung },
					Title: [title],
					ShortDescription: [shortDesc],
					LongDescription: [longDesc],
					OriginURL: [originUrl],
					ActivityDates: [{ ActivityDate: dates = [] } = {}]
				}) => ({
					owner,
					dauerausstellung,
					title,
					shortDescription: DOMPurify.sanitize(shortDesc, { ALLOWED_TAGS: [] }),
					longDescription: DOMPurify.sanitize(longDesc, { ALLOWED_TAGS: [] }),
					originUrl,
					dates: dates.map(
						({ $: { startDate, endDate, startTime, endTime }, TicketURL: [ticketURL] }) => ({
							startDate,
							endDate,
							startTime,
							endTime,
							ticketURL: ticketURL
						})
					)
				})
			);

		const exhibitions = parsedActivities
			.filter(({ dauerausstellung }) => dauerausstellung === '1')
			.sort((a, b) => a.owner.localeCompare(b.owner));
		const events = parsedActivities.filter(({ dauerausstellung }) => dauerausstellung === '0');

		const flatEvents = events
			.flatMap(({ dates, owner, title, shortDescription, originUrl }) =>
				dates.map((date) => ({ ...date, owner, title, shortDescription, originUrl }))
			)
			.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
		return { events: flatEvents, exhibitions };
	} catch (error) {
		// In production, throw an error to stop the build process
		if (!dev) {
			throw new Error(`Error fetching activities: ${error.message}`);
		} else {
			throw error;
		}
	}
}

/**
 * Request handler for the GET method.
 * @type {import('./$types').RequestHandler}
 */
export async function GET() {
	const activities = await getActivities();
	return json(activities);
}

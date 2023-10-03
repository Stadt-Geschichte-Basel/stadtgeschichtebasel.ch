/**
 * @file This file contains API endpoints for fetching and displaying activities.
 */

import * as config from '$lib/config';

import { json } from '@sveltejs/kit';
import { promises as fs } from 'fs';
import { parseStringPromise } from 'xml2js';
import { tmpdir } from 'os';
import { join } from 'path';
import { dev } from '$app/environment';
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

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
 * @property {string} TicketURL - The ticket URL of the event.
 */

/**
 * Fetches activities data from the XML export and filters them based on configured partners.
 * @async
 * @returns {Promise<{ events: Array<Event>, exhibitions: Array<Exhibition> }>} A promise that resolves to an object containing the future dates and exhibitions.
 */
async function getActivities() {
	const response = await fetch('https://www.kulturzueri.ch/xmlexport/kzexport-basel.xml');
	const xml = await response.text();
	const data = await parseStringPromise(xml);
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
						TicketURL: ticketURL
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
}

/**
 * Request handler for the GET method.
 * @type {import('./$types').RequestHandler}
 */
export async function GET() {
	const activities = await getActivities();
	return json(activities);
}

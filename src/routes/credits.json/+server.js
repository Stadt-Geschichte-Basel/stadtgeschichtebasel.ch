import * as config from '$lib/config';
import { json } from '@sveltejs/kit';

/**
 * Indicates whether prerendering is enabled.
 * @type {boolean}
 */
export const prerender = true;

/**
 * @constant
 * @type {Object}
 * @description GitHub configuration constants.
 */
const { githubHandle, githubRepo, url } = config;

/**
 * @constant
 * @type {string}
 * @description API URL for GitHub repository.
 */
const apiUrl = `https://api.github.com/repos/${githubHandle}/${githubRepo}/commits`;

/**
 * @constant
 * @type {Object}
 * @description Fallback data in case of API failure.
 */
const fallbackData = {
	contributors: [
		{
			login: githubHandle,
			avatar_url: '/icon.svg',
			html_url: `https://github.com/${githubHandle}`
		}
	],
	latest_commit: {
		html_url: url,
		date: new Date().toISOString()
	}
};

/**
 * Fetches data from a given GitHub API endpoint.
 *
 * @async
 * @function
 * @param {string} endpoint - The API endpoint URL.
 * @returns {Promise<any>} A promise that resolves with the fetched data.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
async function fetchData(endpoint) {
	const response = await fetch(endpoint);
	const data = await response.json();
	return data;
}

/**
 * Fetches credits data from the GitHub API.
 *
 * @async
 * @function
 * @returns {Promise<Credits>} A promise that resolves with the credits data.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
async function getCredits() {
	try {
		const [contributorsData, latestCommitData] = await Promise.all([
			fetchData(`${apiUrl}/contributors`),
			fetchData(`${apiUrl}?per_page=1`)
		]);

		// Check if contributorsData is an empty array or not an array at all
		const contributors =
			Array.isArray(contributorsData) && contributorsData.length > 0
				? contributorsData.map(({ login, avatar_url, html_url }) => ({
						login,
						avatar_url,
						html_url
				  }))
				: fallbackData.contributors;

		// Check if latestCommitData is an empty array or not an array at all
		const latestCommit =
			Array.isArray(latestCommitData) && latestCommitData.length > 0 && latestCommitData[0]
				? {
						html_url: latestCommitData[0].html_url,
						date: latestCommitData[0].commit.author.date
				  }
				: fallbackData.latest_commit;

		return { contributors, latest_commit: latestCommit };
	} catch (error) {
		console.error('Error:', error);
		return fallbackData;
	}
}

/**
 * Request handler for the GET method.
 * @type {import('./$types').RequestHandler}
 */
export async function GET() {
	const credits = await getCredits();
	return json(credits);
}

import * as config from '$lib/config';

/**
 * Indicates whether prerendering is enabled.
 * @type {boolean}
 */
export const prerender = true;

/**
 * @constant
 * @type {string}
 * @description GitHub handle of the repository owner.
 */
const githubHandle = config.githubHandle;

/**
 * @constant
 * @type {string}
 * @description GitHub repository name.
 */

const githubRepo = config.githubRepo;

/**
 * @constant
 * @type {string}
 * @description API URL for GitHub repository.
 */
const apiUrl = `https://api.github.com/repos/${githubHandle}/${githubRepo}`;

/**
 * Fetches data from a given GitHub API endpoint.
 *
 * @async
 * @function
 * @param {string} endpoint - The API endpoint URL.
 * @returns {Promise<any>} A promise that resolves with the fetched data.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
async function fetchData(endpoint, fetch) {
	const response = await fetch(endpoint);
	if (!response.ok) {
		throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
	}
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
async function getCredits(fetch) {
	const [contributorsData, latestCommitData] = await Promise.all([
		fetchData(`${apiUrl}/contributors`, fetch),
		fetchData(`${apiUrl}/commits?per_page=1`, fetch)
	]);

	if (!Array.isArray(contributorsData)) {
		throw new Error('contributorsData is not an array');
	}

	const contributors = contributorsData.map(({ login, avatar_url, html_url }) => ({
		login,
		avatar_url,
		html_url
	}));

	const latestCommit = {
		html_url: latestCommitData[0].html_url,
		date: latestCommitData[0].commit.author.date
	};

	return { contributors, latest_commit: latestCommit };
}

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	try {
		const credits = await getCredits(fetch);
		return {
			...credits
		};
	} catch (error) {
		console.error('Error:', error);
		throw new Error('Failed to fetch credits data');
	}
}

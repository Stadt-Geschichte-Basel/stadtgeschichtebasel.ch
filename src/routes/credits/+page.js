import * as config from '$lib/config';

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
const { githubHandle, githubRepo } = config;

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
async function fetchData(endpoint) {
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
async function getCredits() {
	const [contributorsData, latestCommitData] = await Promise.all([
		fetchData(`${apiUrl}/contributors`),
		fetchData(`${apiUrl}/commits?per_page=1`)
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
export async function load() {
	try {
		const credits = await getCredits();
		return {
			...credits
		};
	} catch (error) {
		console.error('Error:', error);
		throw new Error('Failed to fetch credits data');
	}
}

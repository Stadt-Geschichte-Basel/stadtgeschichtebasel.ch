import * as config from '$lib/config';
import { json } from '@sveltejs/kit';

/**
 * Indicates whether prerendering is enabled.
 * @type {boolean}
 */
export const prerender = true;

/**
 * Represents a contributor.
 * @typedef {Object} Contributor
 * @property {string} login - The login of the contributor.
 * @property {string} avatar_url - The avatar URL of the contributor.
 * @property {string} html_url - The HTML URL of the contributor.
 */

/**
 * Represents the latest commit.
 * @typedef {Object} LatestCommit
 * @property {string} html_url - The HTML URL of the latest commit.
 * @property {string} date - The date of the latest commit.
 */

/**
 * Represents the credits data.
 * @typedef {Object} Credits
 * @property {Array<Contributor>} contributors - The contributors.
 * @property {LatestCommit} latest_commit - The latest commit.
 */

/**
 * Fetches credits data from the GitHub API.
 * @returns {Promise<Credits>} A promise that resolves with the credits data.
 * @throws {Error} An error is thrown if the request fails.
 */
async function getCredits() {
	const repoOwner = config.githubHandle;
	const repoName = config.githubRepo;
	const fallbackData = {
		contributors: [
			{
				login: config.githubHandle,
				avatar_url: '/icon.svg',
				html_url: `https://github.com/${config.githubHandle}`
			}
		],
		latest_commit: {
			html_url: config.url,
			date: new Date().toISOString()
		}
	};

	try {
		const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits`;
		const [contributors, latestCommit] = await Promise.all([
			fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contributors`)
				.then((res) => res.json())
				.then((data) =>
					data && Array.isArray(data)
						? data.map((contributor) => ({
								login: contributor.login,
								avatar_url: contributor.avatar_url,
								html_url: contributor.html_url
						  }))
						: []
				),
			fetch(`${apiUrl}?per_page=1`)
				.then((res) => res.json())
				.then((data) => {
					if (data && Array.isArray(data) && data[0]) {
						return {
							html_url: data[0].html_url,
							date: data[0].commit.author.date
						};
					} else {
						console.error('Error:', data);
						return fallbackData;
					}
				})
		]);

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

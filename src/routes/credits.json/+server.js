import * as config from '$lib/config';
import { json } from '@sveltejs/kit';

// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = true;

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const repoOwner = config.githubHandle; // Replace 'owner' with the actual repository owner
	const repoName = config.githubRepo; // Replace 'repository' with the actual repository name

	const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits`;

	try {
		const [contributors, latestCommit] = await Promise.all([
			fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contributors`)
				.then((res) => res.json())
				.then((data) =>
					data.map((contributor) => ({
						login: contributor.login,
						avatar_url: contributor.avatar_url,
						html_url: contributor.html_url
					}))
				),
			fetch(`${apiUrl}?per_page=1&status=success`)
				.then((res) => res.json())
				.then((data) => ({
					html_url: data[0].html_url,
					date: data[0].commit.author.date
				}))
		]);

		return json({ contributors, latest_commit: latestCommit });
	} catch (error) {
		console.error('Error:', error);

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

		return json(fallbackData);
	}
}

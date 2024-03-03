import { dev } from '$app/environment';

/**
 * The title of the website.
 * @type {string}
 */
export const title = 'Stadt.Geschichte.Basel';

/**
 * The subtitle of the website.
 * @type {string}
 */
export const subtitle = 'Wir schreiben Basler Geschichte.';

/**
 * Keywords related to the website content.
 * @type {string}
 */
export const keywords = 'Basel, Geschichte, Stadtgeschichte, Kultur';

/**
 * The author of the website.
 * @type {string}
 */
export const author = 'Stiftung Stadt.Geschichte.Basel';

/**
 * The description of the website.
 * @type {string}
 */
export const description =
	'Entdecken Sie die faszinierende Geschichte Basels. Tauchen Sie ein in die Kultur und Geschichte der Stadt am Rheinknie.';

/**
 * The email address associated with the website.
 * @type {string}
 */
export const email = 'info@stadtgeschichtebasel.ch';

/**
 * The instagram handle associated with the website.
 * @type {string}
 */
export const instagramHandle = 'sta.ge.ba';

/**
 * The Twitter handle associated with the website.
 * @type {string}
 */
export const twitterHandle = '@basel_stadt';

/**
 * The GitHub handle or organization associated with the website's repository.
 * @type {string}
 */
export const githubHandle = 'Stadt-Geschichte-Basel';

/**
 * The name of the GitHub repository for the website.
 * @type {string}
 */
export const githubRepo = 'stadtgeschichtebasel.ch';

/**
 * The domain of the website.
 * @type {string}
 */
export const domain = dev ? 'localhost:5173' : 'stadtgeschichtebasel.ch';

/**
 * The protocol used for the website URL.
 * @type {string}
 */
export const protocol = dev ? 'http://' : 'https://';

/**
 * The full URL of the website.
 * @type {string}
 */
export const url = protocol + domain;

/**
 * The language code of the website.
 * @type {string}
 */
export const lang = 'de';

/**
 * The theme color used for the website.
 * @type {string}
 */
export const themeColor = '#3A1E3E';

/**
 * The background color used for the website.
 * @type {string}
 */
export const backgroundColor = '#ffffff';

/**
 * The favicon information for the website.
 * @type {{ src: string, sizes: string, type: string }}
 */
export const favicon = {
	src: url + '/favicon.png',
	sizes: '48x48',
	type: 'image/png'
};

/**
 * The icons used for the website at different sizes.
 * @typedef {Object} Icon
 * @property {string} src - The URL of the icon image.
 * @property {string} sizes - The sizes of the icon image.
 * @property {string} type - The type of the icon image.
 */

/**
 * The icons used for the website at different sizes.
 * @type {{ 192: Icon, 512: Icon, any: Icon }}
 */
export const icons = {
	192: {
		src: url + '/android-chrome-192x192.png',
		sizes: '192x192',
		type: 'image/png'
	},
	512: {
		src: url + '/android-chrome-512x512.png',
		sizes: '512x512',
		type: 'image/png'
	},
	any: {
		src: url + '/icon.svg',
		sizes: '48x48 72x72 96x96 128x128 150x150 256x256 512x512 1024x1024',
		type: 'image/svg+xml'
	}
};

/**
 * The maskable icon used for the website.
 * @type {{ 512: Icon }}
 */
export const maskableicon = {
	512: {
		src: url + '/android-chrome-512x512.png',
		sizes: '512x512',
		type: 'image/png'
	}
};

/**
 * The partners associated with the website.
 * @type {Array<string>}
 */
export const partners = [
	'Antikenmuseum Basel und Sammlung Ludwig',
	'Basler Papiermühle',
	'Historisches Museum',
	'Jüdisches Museum der Schweiz',
	'Kunstmuseum Basel',
	'LITERATURSPUR',
	'Museum der Kulturen Basel',
	'Naturhistorisches Museum Basel',
	'Pharmaziemuseum der Universität Basel',
	'S AM Schweizerisches Architekturmuseum',
	'Verein Frauenstadtrundgang Basel',
	'Volkshochschule beider Basel'
];

import { dev } from '$app/environment';

export const title = 'Stadt.Geschicht.Basel';
export const keywords = 'Basel, Geschichte, Stadtgeschichte, Kultur';
export const author = 'Stiftung Stadt.Geschicht.Basel';
export const description =
	'Entdecken Sie die faszinierende Geschichte Basels. Tauchen Sie ein in die Kultur und Geschichte der Stadt am Rheinknie.'; //'Wir schreiben Basler Geschichten'
export const twitter = '@basel_stadt';
export const image512 = 'https://beta.stadtgeschichtebasel.ch/android-chrome-512x512.png';
export const domain = dev ? 'localhost:5173' : 'beta.stadtgeschichtebasel.ch';
export const protocol = dev ? 'http://' : 'https://';
export const url = protocol + domain;
export const lang = 'de';
export const themeColor = '#ffffff';
export const backgroundColor = '#ffffff';
export const favicon = {
	src: url + '/favicon.png',
	sizes: '48x48',
	type: 'image/png'
};
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
	}
};

export const maskableicon = {
	512: {
		src: url + '/android-chrome-512x512.png',
		sizes: '512x512',
		type: 'image/png'
	}
};

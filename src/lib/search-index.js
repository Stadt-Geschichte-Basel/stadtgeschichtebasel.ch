import lunr from 'lunr/lunr.js';
import lunrDe from 'lunr-languages/lunr.de.js';
import lunrStemmerSupport from 'lunr-languages/lunr.stemmer.support.js';
import posts from '$lib/data/posts.json';
import pages from '$lib/data/pages.json';

// Register the languages and the stemmer support
lunrStemmerSupport(lunr);
lunrDe(lunr);

// Define the fields to be indexed
const index = lunr(function () {
	this.use(lunrDe);
	this.ref('id');
	this.field('title', { boost: 10 });
	this.field('content');

	// Add documents to the index
	posts.forEach((post) => {
		this.add({
			id: post.id,
			title: post.title,
			content: post.content
		});
	});
	pages.forEach((page) => {
		this.add({
			id: page.id,
			title: page.title,
			content: page.content
		});
	});
});

export default index;

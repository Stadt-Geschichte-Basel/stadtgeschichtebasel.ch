import lunr from 'lunr/lunr.js';
import lunrDe from 'lunr-languages/lunr.de.js';
import lunrStemmerSupport from 'lunr-languages/lunr.stemmer.support.js';

// Register the languages and the stemmer support
lunrStemmerSupport(lunr);
lunrDe(lunr);

const posts = await fetch('/blog/posts-14.json').then((res) => res.json());
const pages = await fetch('/pages.json').then((res) => res.json());

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

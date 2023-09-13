<script>
	import Container from '$lib/components/Container.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
    const post = data.posts[0];
</script>

<Container>
	<h1>Wir schreiben Basler Geschichten</h1>
    <p>
        Tbd
    </p>
    <h2>Was Sie auf unserem Portal finden</h2>
    <p>
        Tbd
    </p>
    <h2>Unsere neusten Beiträge</h2>
    <article>
        <h3>
            <a href="/blog/{post.slug}" class="font-bold no-underline hover:underline" title={post.slug}
                >{post.title}</a
            >
        </h3>
        {#if post.featuredImage}
            <img
                src={post.featuredImage}
                alt={post.title}
                class="mx-auto aspect-video h-auto w-full object-cover"
            />
        {/if}
        <p class="description">
            {post.excerpt} <a href="/blog/{post.slug}" title={post.slug}>weiterlesen</a>
        </p>
    </article>
</Container>

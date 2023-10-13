<script>
	import { base } from '$app/paths';
    export let post;
    
</script>

<div class="card mt-4 overflow-hidden" aria-label={post.title}>
    <header>
        <img
            src="{base}{post.featuredImage}"
            class="aspect-[21/9] w-full bg-black/50 object-cover"
            alt=""
        />
    </header>
    <div class="px-4">
        <h2 class="m-0">
            <a
                href="{base}/blog/{post.slug}"
                class="font-bold no-underline hover:underline"
                title={post.slug}
                aria-hidden="true"
                tabindex="-1">{post.title}</a
            >
        </h2>
        <article>
            <p>
                {post.excerpt}
                <a href="{base}/blog/{post.slug}" title={post.slug}>weiterlesen</a>
            </p>
        </article>
    </div>
    <footer class="flex items-center justify-start space-x-4 p-4">
        <div class="flex flex-auto items-center justify-between">
            {#each post.categories as category}
                <a class="variant-filled badge" href="{base}/blog/kategorie/{category}"
                    >&num;{category}</a
                >
            {/each}
            <small>
                {#if post.modified}
                    {new Date(post.modified).toLocaleDateString('de-CH')}
                {:else}
                    {new Date(post.date).toLocaleDateString('de-CH')}
                {/if}
            </small>
        </div>
    </footer>
</div>
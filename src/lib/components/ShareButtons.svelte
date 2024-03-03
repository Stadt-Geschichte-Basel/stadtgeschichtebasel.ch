<script>
	import { browser } from '$app/environment';
	import * as config from '$lib/config';

	/** @type {string} */
	export let url;

	/** @type {string} */
	export let title;

	$: webShareAPISupported = browser && 'share' in navigator;

	$: handleWebShare;
	const handleWebShare = async () => {
		if (webShareAPISupported) {
			try {
				await navigator.share({
					title,
					text: `Geteilt von ${config.title}`,
					url
				});
			} catch (error) {
				console.error('Error sharing:', error);
			}
		}
	};
</script>

{#if !webShareAPISupported}
	<div class="group gap-1">
		<a
			class="variant-filled-primary btn-icon btn-icon-sm fill-white hover:fill-secondary-500"
			href="mailto:?subject={title}&body={title}:%20{url}"
			aria-label="Teilen mit Email"
		>
			<span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					aria-hidden="true"
					class="h-4 w-4"
					><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><title
						>Email</title
					>
					<path
						d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
					/></svg
				></span
			>
		</a>
		<a
			class="variant-filled-primary btn-icon btn-icon-sm fill-white hover:fill-secondary-500"
			target="_blank"
			rel="noopener"
			href="https://facebook.com/sharer/sharer.php?u={url}"
			aria-label="Teilen auf Facebook"
			><span>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 320 512"
					class="h-4 w-4"
					><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><title
						>Facebook</title
					><path
						d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
					/></svg
				></span
			>
		</a>
		<a
			class="variant-filled-primary btn-icon btn-icon-sm fill-white hover:fill-secondary-500"
			target="_blank"
			rel="noopener"
			href="https://twitter.com/intent/tweet?url={url}&amp;text={title}"
			aria-label="Teilen auf Twitter"
			><span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					aria-hidden="true"
					class="h-4 w-4"
					><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><title
						>Twitter</title
					>
					<path
						d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
					/>
				</svg></span
			>
		</a>
		<a
			class="variant-filled-primary btn-icon btn-icon-sm fill-white hover:fill-secondary-500"
			target="_blank"
			rel="noopener"
			href="https://api.whatsapp.com/send?text={url}"
			aria-label="Teilen auf Whatsapp"
		>
			<span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 448 512"
					aria-hidden="true"
					class="h-4 w-4"
					><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><title
						>Whatsapp</title
					>
					<path
						d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
					/>
				</svg></span
			>
		</a>
		<a
			class="variant-filled-primary btn-icon btn-icon-sm fill-white hover:fill-secondary-500"
			target="_blank"
			rel="noopener"
			href="https://www.linkedin.com/sharing/share-offsite/?url={url}"
			aria-label="Teilen auf Linkedin"
			><span>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 448 512"
					class="h-4 w-4"
					><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><title
						>Linkedin</title
					><path
						d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"
					/></svg
				></span
			>
		</a>
	</div>
{:else}
	<button
		class="variant-filled-primary btn-icon btn-icon-sm fill-white hover:fill-secondary-500"
		on:click={handleWebShare}
	>
		<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 512 512"
			><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
			<title>Teilen</title>
			<path
				d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"
			/>
		</svg>
	</button>
{/if}

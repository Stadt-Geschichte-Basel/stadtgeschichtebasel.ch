/**
 * Jampack options, merged with the defaults.
 * The prebuild step already converts CMS images to one WebP file each (src/lib/downloadManager.mjs).
 * @see https://jampack.divriots.com/
 */
export default {
	image: {
		// Do not compress or convert images
		compress: false,
		// Do not generate srcset variants
		srcset_min_width: Number.MAX_SAFE_INTEGER
	}
};

# Frequently Asked Questions (FAQ)

## General Questions

### What is stadtgeschichtebasel.ch?

stadtgeschichtebasel.ch is the digital portal for Stadt.Geschichte.Basel, a comprehensive historical research project at the University of Basel. The portal provides access to Basel's rich history through an interactive, accessible website built with modern web technologies.

### Is this project open source?

Yes! This project is open source under the GNU Affero General Public License v3.0. You can view, modify, and contribute to the code following the license terms.

### Who maintains this project?

The project is maintained by the Stadt.Geschichte.Basel team at the University of Basel, with main contributors including Moritz Mähr, Nico Görlich, and Moritz Twente.

### Can I use this code for my own project?

Yes, under the terms of the AGPL-3.0 license. You must also open-source any modifications and provide proper attribution.

## Technical Questions

### What technology stack is used?

The project uses:

- **Frontend**: SvelteKit, Svelte, Tailwind CSS
- **Build Tool**: Vite
- **CMS**: hypotheses.org (WordPress-based)
- **Hosting**: Cloudflare Pages
- **Testing**: Playwright, Vitest
- **Languages**: JavaScript, TypeScript

### Why SvelteKit instead of other frameworks?

SvelteKit was chosen for its:

- Excellent performance and small bundle sizes
- Static site generation capabilities
- Great developer experience
- Server-side rendering support
- File-based routing system

### What is the prebuild script?

The prebuild script (`pnpm run prebuild`) downloads content from the CMS at hypotheses.org, including pages, blog posts, and media assets. This content is then used during the build process to generate a static site.

### How often should I run the prebuild script?

Run it:

- Initially when setting up the project
- When you need to fetch updated content from the CMS
- After running `pnpm run clean`
- When content on hypotheses.org has changed

### Why does the build take so long?

The build process includes:

1. Fetching content from the CMS (prebuild)
2. Processing Markdown and MDsveX files
3. Compiling Svelte components
4. Optimizing with Tailwind CSS
5. Post-processing with Jampack

First builds are slower; subsequent builds use caching to speed up the process.

### Can I run this project without the CMS content?

Technically yes, but the site will be missing most of its content. The prebuild step is essential for a functional site. For development on components or features that don't rely on CMS content, you can work without running prebuild.

## Development Questions

### Which package manager should I use?

Use **pnpm** (version 9+). The project is configured specifically for pnpm and uses its features. npm and yarn may not work correctly.

### What Node.js version do I need?

Node.js version 20 or 24. Check your version with `node --version`. We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage Node versions.

### How do I run the development server?

```bash
pnpm run dev
```

The server starts at `http://localhost:5173` by default.

### Can I use a different port for development?

Yes, pass the `--port` flag:

```bash
pnpm run dev -- --port 3000
```

### How do I preview the production build locally?

```bash
pnpm run build
pnpm run preview
```

This builds the production version and serves it locally.

### What's the difference between `dev` and `preview`?

- **`dev`**: Development server with hot module replacement, fast rebuilds, but not optimized
- **`preview`**: Serves the production build locally for testing the final output

### How do I clear generated content?

```bash
pnpm run clean
```

This removes all downloaded pages, posts, and assets. You'll need to run `pnpm run prebuild` again afterward.

## Content Management

### Where does the content come from?

Content is sourced from [sgb.hypotheses.org](https://sgb.hypotheses.org/), a WordPress-based CMS hosted by hypotheses.org.

### Can I edit content directly in this repository?

No. Content is managed through the CMS and downloaded during the prebuild step. Editing files in `src/pages/` or `src/posts/` will be overwritten the next time you run `pnpm run prebuild`.

### How do I update content on the live site?

1. Update content in the CMS (hypotheses.org)
2. The CI/CD pipeline automatically runs prebuild and redeploys
3. Alternatively, manually run prebuild and push changes

### What happens if the CMS is down?

The prebuild script will fail. Since the site is static, the existing deployed version remains accessible. Once the CMS is back online, you can run prebuild again.

## Deployment Questions

### Where is the site hosted?

The production site is hosted on [Cloudflare Pages](https://pages.cloudflare.com/), which provides fast global CDN delivery.

### How does deployment work?

When changes are pushed to the `main` branch:

1. GitHub Actions runs the CI/CD pipeline
2. The code is linted, tested, and built
3. If all checks pass, it's deployed to Cloudflare Pages
4. The site is available at stadtgeschichtebasel.ch

### Can I deploy my own instance?

Yes! You can deploy to any static hosting provider:

1. Run `pnpm run build`
2. Upload the `build/` directory to your hosting
3. Configure your hosting to serve the static files

Popular options: Cloudflare Pages, Vercel, Netlify, GitHub Pages

### What environment variables are needed?

For the basic site, no environment variables are required. The `example.env` file is a placeholder for future configuration needs.

## Testing Questions

### What types of tests exist?

- **End-to-end tests**: Using Playwright (`pnpm run test`)
- **Unit tests**: Using Vitest (`pnpm run test:unit`)
- **Linting**: ESLint and Prettier (`pnpm run lint`)
- **Type checking**: TypeScript/Svelte check (`pnpm run check`)

### How do I run tests?

```bash
# All E2E tests
pnpm run test

# Unit tests
pnpm run test:unit

# Lint code
pnpm run lint

# Check types
pnpm run check
```

### Why do Playwright tests fail?

Common causes:

- Playwright browsers not installed: Run `pnpm exec playwright install --with-deps`
- Development server not running (for some tests)
- Content not downloaded: Run `pnpm run prebuild`

### How do I debug a failing test?

```bash
# Run tests in headed mode
pnpm exec playwright test --headed

# Run a specific test
pnpm exec playwright test tests/example.spec.js

# Use Playwright Inspector
pnpm exec playwright test --debug
```

## Contribution Questions

### How do I contribute?

1. Read [CONTRIBUTING.md](../CONTRIBUTING.md)
2. Fork the repository or create a branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### What kind of contributions are welcome?

- Bug fixes
- Feature implementations
- Documentation improvements
- Accessibility enhancements
- Performance optimizations
- Test coverage improvements

### Do I need to sign a CLA?

No, there is no Contributor License Agreement. By contributing, you agree your contributions will be licensed under AGPL-3.0.

### How long does PR review take?

Typically a few days. Complex changes may take longer. Maintainers review PRs as their schedules allow.

## Troubleshooting

For detailed troubleshooting steps, see the Troubleshooting section in [README.md](../README.md#troubleshooting).

### Common issues:

- **Port in use**: Use a different port with `pnpm run dev -- --port 3000`
- **Prebuild fails**: Check internet connection, try again, or run `pnpm run clean` first
- **Build errors after update**: Clear and reinstall dependencies
- **Playwright errors**: Install browsers with `pnpm exec playwright install --with-deps`

## Performance Questions

### What is Jampack?

[Jampack](https://jampack.divriots.com/) is a post-build optimization tool that:

- Optimizes images
- Minifies CSS and JavaScript
- Improves loading performance
- Adds performance best practices

It runs automatically with `pnpm run postbuild`.

### How can I improve build performance?

- Use caching in CI/CD (already configured)
- Use a faster machine with more CPU/RAM
- Ensure you have a fast internet connection for CMS downloads
- Use incremental builds when possible

### What is the Lighthouse score?

The project maintains high Lighthouse scores for:

- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

See the badge in the README for current scores.

## Accessibility Questions

### Is the site accessible?

Yes! The project prioritizes accessibility and complies with WCAG 2.1 AA standards. See the [accessibility statement](https://stadtgeschichtebasel.ch/barrierefreiheitserklaerung/).

### How is accessibility tested?

- Automated tools (Lighthouse, axe)
- Manual keyboard navigation testing
- Screen reader testing
- Color contrast verification
- Neurodiversity-friendly design guidelines

### How can I contribute to accessibility?

- Test with keyboard navigation
- Use a screen reader to test changes
- Ensure proper semantic HTML
- Add ARIA labels where needed
- Verify color contrast ratios

## Still Have Questions?

If your question isn't answered here:

1. Check the [README.md](../README.md) documentation
2. Search [existing issues](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/issues)
3. Browse [GitHub Discussions](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/discussions)
4. Ask a new question in Discussions
5. Contact maintainers via GitHub

## Need Help?

- 🚨 **Bug Reports**: [GitHub Issues](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/issues)
- 🎁 **Feature Requests**: [GitHub Issues](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/issues)
- 💬 **General Questions**: [GitHub Discussions](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/discussions)
- 🛡 **Security Issues**: [GitHub Issues](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/issues) (use security template)

# stadtgeschichtebasel.ch

The open-source code of the digital portal of Stadt.Geschichte.Basel.

[![GitHub issues](https://img.shields.io/github/issues/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch.svg)](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/issues)
[![GitHub forks](https://img.shields.io/github/forks/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch.svg)](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/network)
[![GitHub stars](https://img.shields.io/github/stars/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch.svg)](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/stargazers)
[![GitHub license](https://img.shields.io/github/license/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch.svg)](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/blob/main/LICENSE.md)

## Overview

Welcome to [Stadt.Geschichte.Basel](https://stadtgeschichtebasel.ch/), a historical research project at the University of Basel in Switzerland, funded with over 9 million Swiss Francs from public and private sources, running from 2017 to 2025. It is a comprehensive digital and print project that aims to present the multifaceted history of Basel from its earliest beginnings to the present day. Visit [Stadt.Geschichte.Basel](https://stadtgeschichtebasel.ch) to see how our digital portal brings Basel's history to life. This live site showcases the practical application of our open-source code, offering an interactive experience of Basel's rich heritage.

[Stadt.Geschichte.Basel](https://stadtgeschichtebasel.ch/) seeks to bridge research gaps and present historical findings in accessible formats. Our project encompasses an [extensive nine-volume book series](https://www.merianverlag.ch/buecher/stadt.geschichte.basel.html), an overview volume, a digital portal, and a digital platform for research data. Hosted at the University of Basel, this project aims to make historical research and insights accessible to scholars and the public like never before.

This project is the open-source code of the digital portal of Stadt.Geschichte.Basel. It is a static website built with [SvelteKit](https://kit.svelte.dev/) and hosted on [Cloudflare Pages](https://pages.cloudflare.com/). It uses [hypotheses.org](https://sgb.hypotheses.org/) as CMS and consumes data from [Agendabasel](https://agendabasel.ch/) for the agenda.

The digital platform for research data can be found at [forschung.stadtgeschichtebasel.ch](https://forschung.stadtgeschichtebasel.ch/). The source code for the digital platform can be found [here](https://github.com/Stadt-Geschichte-Basel/forschung.stadtgeschichtebasel.ch).

## Key Features

- **Fast Static Website**: The website is built with SvelteKit, providing a fast and responsive user experience.
- **Interactive Features**: The website includes an interactive map and agenda.
- **Accessibility-Focused Design**: Ensuring inclusivity for all users by complying with WCAG standards and observing neurodiversity design guidelines. More at our [accessibility statement](https://stadtgeschichtebasel.ch/barrierefreiheitserklaerung/).

![Lighthouse Score](/assets/images/pagespeed-insights.svg)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 20 or 24 (required by the project engines configuration)
  - Download from [nodejs.org](https://nodejs.org/)
  - Check your version: `node --version`
- **pnpm**: Version 9 or higher (package manager)
  - Install globally: `npm install -g pnpm@9`
  - Check your version: `pnpm --version`
- **Git**: For version control
  - Download from [git-scm.com](https://git-scm.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch.git
   cd stadtgeschichtebasel.ch
   ```

2. **Install dependencies**

   Use the package manager [pnpm](https://pnpm.io/installation) to install all dependencies.

   ```bash
   pnpm install
   ```

3. **Download content from CMS**

   Run the prebuild script to download the pages, posts, and assets from [hypotheses.org](https://sgb.hypotheses.org/).

   ```bash
   pnpm run prebuild
   ```

   This script fetches all necessary content from the CMS and prepares it for the static site generation.

### Quick Start

Once installation is complete, you can start the development server:

```bash
pnpm run dev
```

The development server will start at `http://localhost:5173` (or another port if 5173 is in use). The site will automatically reload when you make changes to the source files.

## Repository Structure

Understanding the project layout will help you navigate and contribute more effectively:

```
stadtgeschichtebasel.ch/
├── .github/              # GitHub Actions workflows and templates
│   ├── workflows/        # CI/CD pipelines (build, test, deploy)
│   └── ISSUE_TEMPLATE/   # Issue templates for bugs and features
├── assets/               # Static assets and images
├── src/                  # Source code
│   ├── lib/              # Reusable libraries and utilities
│   │   ├── components/   # Svelte components
│   │   ├── data/         # Data utilities and helpers
│   │   └── images/       # Image processing utilities
│   ├── pages/            # Generated pages from CMS (created by prebuild)
│   ├── posts/            # Generated posts from CMS (created by prebuild)
│   ├── routes/           # SvelteKit routes and pages
│   ├── params/           # Route parameter matchers
│   └── app.html          # HTML template
├── static/               # Static files served as-is
│   └── files/            # Downloaded assets from CMS
├── tests/                # Test files
├── svelte.config.js      # SvelteKit configuration
├── vite.config.js        # Vite build tool configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── package.json          # Project dependencies and scripts
└── README.md             # This file
```

### Key Directories and Files

- **`src/routes/`**: Contains the application routes following SvelteKit's file-based routing system
- **`src/lib/`**: Shared libraries, components, and utilities
- **`src/lib/downloadPostsPagesAssets.mjs`**: Script that fetches content from hypotheses.org CMS
- **`src/pages/` and `src/posts/`**: Auto-generated from CMS (don't edit manually)
- **`static/`**: Public files served directly (images, fonts, etc.)
- **`.github/workflows/`**: CI/CD pipelines for testing and deployment to Cloudflare Pages

## Usage

### Development Commands

Run the development server with hot module replacement:

```bash
pnpm run dev
```

Access the site at `http://localhost:5173` and make changes to see them reflected immediately.

### Building for Production

Build the static site for production:

```bash
pnpm run build
```

This creates an optimized production build in the `build/` directory.

Optimize the build with [Jampack](https://jampack.divriots.com/) for production:

```bash
rm -Rf build/_jampack/ && pnpm run postbuild # FIXME: Quick fix to make jampack work
```

Preview the production build locally:

```bash
pnpm run preview
```

### Code Quality

Check TypeScript types and Svelte components:

```bash
pnpm run check
```

Watch mode for continuous checking:

```bash
pnpm run check:watch
```

Lint your code (runs Prettier and ESLint):

```bash
pnpm run lint
```

Format your code with Prettier:

```bash
pnpm run format
```

### Testing

Run end-to-end tests with Playwright:

```bash
pnpm run test
```

Run unit tests with Vitest:

```bash
pnpm run test:unit
```

### Cleaning Generated Content

If you need to reset the downloaded content from the CMS:

```bash
pnpm run clean
```

This removes all downloaded pages, posts, and assets. Run `pnpm run prebuild` again to re-download them.

## Development Workflow

### Typical Development Cycle

1. **Fetch latest changes**

   ```bash
   git pull origin main
   ```

2. **Update dependencies** (if package.json changed)

   ```bash
   pnpm install
   ```

3. **Download latest content** (if CMS content changed)

   ```bash
   pnpm run prebuild
   ```

4. **Start development server**

   ```bash
   pnpm run dev
   ```

5. **Make your changes** in the `src/` directory

6. **Test your changes**

   ```bash
   pnpm run lint      # Check code quality
   pnpm run check     # Check types
   pnpm run test      # Run tests
   ```

7. **Commit your changes**
   ```bash
   git add .
   pnpm run commit    # Uses Commitizen for conventional commits
   ```

## Troubleshooting

### Common Issues and Solutions

#### Port Already in Use

**Issue**: Development server fails to start with "Port 5173 is already in use"

**Solution**: Either stop the process using that port or use a different port:

```bash
pnpm run dev -- --port 3000
```

#### Prebuild Script Fails

**Issue**: `pnpm run prebuild` fails or times out

**Solution**:

- Check your internet connection
- Verify that hypotheses.org is accessible
- Try running the script again (sometimes it's a temporary network issue)
- Clear the generated content and try again:
  ```bash
  pnpm run clean
  pnpm run prebuild
  ```

#### Build Errors After Pulling Changes

**Issue**: Build fails after pulling new changes

**Solution**:

1. Clean install dependencies:
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```
2. Re-download CMS content:
   ```bash
   pnpm run clean
   pnpm run prebuild
   ```

#### Playwright Tests Fail

**Issue**: Tests fail with browser-related errors

**Solution**: Install Playwright browsers:

```bash
pnpm exec playwright install --with-deps
```

#### Jampack Errors During Build

**Issue**: `pnpm run postbuild` fails

**Solution**: Clear the jampack cache and rebuild:

```bash
rm -rf build/_jampack/
pnpm run build
pnpm run postbuild
```

#### Node Version Mismatch

**Issue**: Errors related to incompatible Node.js version

**Solution**: Ensure you're using Node.js version 20 or 24. Use [nvm](https://github.com/nvm-sh/nvm) to manage versions:

```bash
nvm install 20
nvm use 20
```

### Getting Help

If you encounter issues not covered here:

1. Check existing [GitHub Issues](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/issues)
2. Search [GitHub Discussions](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/discussions)
3. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Your environment (OS, Node version, pnpm version)
   - Relevant error messages or logs

## Technology Stack

This project is built with modern web technologies:

- **[SvelteKit](https://kit.svelte.dev/)**: Application framework for Svelte
- **[Svelte](https://svelte.dev/)**: UI component framework
- **[Vite](https://vitejs.dev/)**: Build tool and development server
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Skeleton UI](https://www.skeleton.dev/)**: UI component library
- **[MDsveX](https://mdsvex.pngwn.io/)**: Markdown preprocessor for Svelte
- **[Playwright](https://playwright.dev/)**: End-to-end testing framework
- **[Vitest](https://vitest.dev/)**: Unit testing framework
- **[Jampack](https://jampack.divriots.com/)**: Post-build optimization tool
- **[Cloudflare Pages](https://pages.cloudflare.com/)**: Hosting platform

## Additional Documentation

- **[FAQ](docs/FAQ.md)**: Frequently asked questions and answers
- **[Architecture](docs/ARCHITECTURE.md)**: Technical architecture and design decisions
- **[Contributing Guidelines](CONTRIBUTING.md)**: How to contribute to this project
- **[Code of Conduct](CODE_OF_CONDUCT.md)**: Our community guidelines
- **[Security Policy](SECURITY.md)**: How to report security vulnerabilities
- **[Changelog](CHANGELOG.md)**: Project version history

## Support

This project is maintained by [@Stadt-Geschichte-Basel](https://github.com/Stadt-Geschichte-Basel). Please understand that we won't be able to provide individual support via email. We believe that help is much more valuable if it's shared publicly, so that more people can benefit from it.

| Type                                   | Platforms                                                                                           |
| -------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 🚨 **Bug Reports**                     | [GitHub Issue Tracker](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/issues)    |
| 🎁 **Feature Requests**                | [GitHub Issue Tracker](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/issues)    |
| 🛡 **Report a security vulnerability** | [GitHub Issue Tracker](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/issues)    |
| 💬 **General Questions**               | [GitHub Discussions](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/discussions) |

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/tags).

## Authors and acknowledgment

- **Moritz Mähr** - [maehr](https://github.com/maehr)
- **Nico Görlich** - [koilebeit](https://github.com/koilebeit)
- **Moritz Twente** - [mtwente](https://github.com/mtwente)

See also the list of [contributors](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/graphs/contributors) who participated in this project.

## License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE.md](LICENSE.md) file for details.

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

## Installation

Use the package manager [pnpm](https://pnpm.io/installation) to install all dependencies.

```bash
pnpm install
```

Run the prebuild script to download the pages, posts, and assets from [hypotheses.org](https://sgb.hypotheses.org/).

```bash
pnpm run prebuild
```

## Usage

Run the development server.

```bash
pnpm run dev
```

Build for production.

```bash
pnpm run build
```

Optimize the build with [Jampack](https://jampack.divriots.com/) for production.

```bash
rm -Rf build/_jampack/ && pnpm run postbuild # FIXME: Quick fix to make jampack work
```

## Development

To check the code and format it.

```bash
pnpm run check
pnpm run format
```

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

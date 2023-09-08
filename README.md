# stadtgeschichtebasel.ch

The open source code of the digital portal of Stadt.Geschichte.Basel.

[![GitHub issues](https://img.shields.io/github/issues/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch.svg)](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/issues)
[![GitHub forks](https://img.shields.io/github/forks/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch.svg)](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/network)
[![GitHub stars](https://img.shields.io/github/stars/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch.svg)](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/stargazers)
[![GitHub license](https://img.shields.io/github/license/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch.svg)](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/blob/main/LICENSE.md)

## Installation

Use the package manager [pnpm](https://pnpm.io/installation) to install all dependencies.

```bash
pnpm install
```

## Usage

```bash
pnpm run check
pnpm run format
```

## Support

This project is maintained by [@maehr](https://github.com/maehr). Please understand that we won't be able to provide individual support via email. We also believe that help is much more valuable if it's shared publicly, so that more people can benefit from it.

| Type                                   | Platforms                                                                                        |
| -------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 🚨 **Bug Reports**                     | [GitHub Issue Tracker](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/issues) |
| 🎁 **Feature Requests**                | [GitHub Issue Tracker](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/issues) |
| 🛡 **Report a security vulnerability** | [GitHub Issue Tracker](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/issues) |

## Roadmap

- [ ] feat: improved accessability
  - [ ] feat: wcag 2.1 compliance <https://a11y.digitaldialog.swiss/checklist>
  - [ ] feat: <https://www.neurodiversity.design/>
  - [ ] feat: Add toc to long pages <https://toc.janosh.dev/?ref=madewithsvelte.com>
- [ ] feat: link to research data platform
- [ ] feat: lunr.js based search
- [ ] feat: improved SEO
  - [ ] feat: allow all robots in robots.txt as soon as the page is public
  - [ ] feat: rss.xml (via <https://github.com/matfantinel/sveltekit-static-blog-template/blob/main/src/routes/rss.xml/%2Bserver.ts>)
  - [ ] feat: atom.xml
  - [ ] fix: replace svelte-sitemap and improve sitemap.xml
  - [ ] fix: improved meta-tags
  - [ ] fix: Add metadata to svg images <https://www.w3.org/TR/SVGTiny12/metadata.html>
  - [ ] fix: better description for old page redirects
- [ ] fix: improve map UX (https://www.skeleton.dev/utilities/modals)
- [ ] fix: remove fallback data from /credits as soon as the repo is public
- [ ] fix: configure purgecss so that it doesn't remove classes from svelte-maplibre

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/tags).

## Authors and acknowledgment

- **Moritz Mähr** - _Initial work_ - [maehr](https://github.com/maehr)
- **Nico Görlich** - _Maps_ - [koilebeit](https://github.com/koilebeit)
- **Sebastian Flick** - _Refinement_ - [flicksolutions](https://github.com/flicksolutions)

See also the list of [contributors](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/graphs/contributors) who participated in this project.

## License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE.md](LICENSE.md) file for details.

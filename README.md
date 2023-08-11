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

- [x] Basic layout (inspired by <https://sveltekit-mdsvex-starter-blog.vercel.app/posts>)
- [x] Download all posts and pages from sgb.hypotheses.org
- [x] Download all assets from sgb.hypotheses.org
- [x] Implement blog functionality
- [x] Implement page functionality
- [x] Add robots.txt
- [x] Add fonts
- [ ] Add Meta-Tag, Twitter Card and OpenGraph Generator
- [ ] Add search functionality via lunr or elasticlunr (or similar)
- [ ] Collapse search on mobile
- [ ] Read params from url
- [ ] Add newsletter functionality
- [ ] Add wcag accessibility functionality and logo
- [ ] Add copyright info
- [ ] Add sitemap
- [ ] Add agenda page <https://github.com/vkurko/calendar>
- [ ] Add map page
- [ ] Add dark mode
- [ ] Add breadcrumb
- [ ] Add confirmation page for newsletter subscription
- [ ] Remove mdsvex dependency if no longer needed
- [ ] Remove turndown dependency if no longer needed
- [ ] <https://toc.janosh.dev/?ref=madewithsvelte.com>
- [ ] <https://a11y.digitaldialog.swiss/checklist>
- [ ] <https://www.neurodiversity.design/>
- [ ] Add metadata to svg <https://www.w3.org/TR/SVGTiny12/metadata.html>
- [ ] Add "@vite-pwa/sveltekit": "^0.2.1",
- [ ] <https://github.com/n1kk/rehype-mdsvex-image-autoimport>
- [ ] <rehypeAutolinkHeadings>
- [ ] https://sveltekit-static-blog-template.vercel.app/
- [ ] https://github.com/matfantinel/image-transmutation
- [ ] make all page prerenderable

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/tags).

## Authors and acknowledgment

- **Moritz Mähr** - _Initial work_ - [maehr](https://github.com/maehr)

See also the list of [contributors](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/graphs/contributors) who participated in this project.

## License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE.md](LICENSE.md) file for details.

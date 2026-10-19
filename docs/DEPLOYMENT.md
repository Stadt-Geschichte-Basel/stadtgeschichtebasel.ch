# Deployment

The CI workflow deploys the site to GitHub Pages. Before [#222](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/issues/222), the workflow published the site to Cloudflare Pages. The workflow no longer publishes to Cloudflare Pages. Until the DNS cutover, `stadtgeschichtebasel.ch` still points to Cloudflare Pages, which keeps its last deployment.

## Table of Contents

- [Workflow](#workflow)
- [GitHub Pages Limits](#github-pages-limits)
- [URL Behavior](#url-behavior)
- [Audit a Deployment](#audit-a-deployment)
- [Cutover](#cutover)
- [Rollback](#rollback)
- [After the Sign-off](#after-the-sign-off)

## Workflow

The workflow `.github/workflows/sveltekitci.yml` starts on these events:

- a push to `main`
- every day at 00:00 UTC, to get new CMS content
- a manual start (`workflow_dispatch`)
- a `repository_dispatch` event

A pull request runs the build and the tests, but it does not deploy.

The workflow has two jobs:

| Job           | Steps                                                                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sveltekitci` | Lint, unit tests, build, build audit, Playwright tests. On `main`, it uploads `build/` as the GitHub Pages artifact.                                                              |
| `deploy`      | Deploys the artifact to GitHub Pages with `actions/deploy-pages`. Then it runs `src/lib/auditDeployment.mjs` against the GitHub Pages URL and adds the report to the job summary. |

The `deploy` job needs no secret. It gets a short-lived token from GitHub (`id-token: write`).

A newer run cancels an older run on the same branch (`concurrency`). Thus an older build cannot deploy after a newer build.

Before the custom domain is set, GitHub Pages serves the site at `https://dokumentation.stadtgeschichtebasel.ch/stadtgeschichtebasel.ch/`. At this URL, the absolute links to CSS and JavaScript do not work. The deployment audit checks status codes only, so it still works there.

## GitHub Pages Limits

| Limit                        | Value                         | This site                                                                                   |
| ---------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------- |
| Size of the published site   | 1 GB                          | About 160 MB on 2026-10-19. `pnpm run audit:build --strict` fails if `build/` exceeds 1 GB. |
| Bandwidth                    | 100 GB per month (soft limit) | Check the Cloudflare analytics before the cutover.                                          |
| Time for one deployment      | 10 minutes                    | The `deploy` job fails if the deployment takes longer.                                      |
| Builds per hour (soft limit) | 10                            | This limit does not apply to a custom GitHub Actions workflow.                              |

A soft limit does not stop the site. If the site exceeds a soft limit, GitHub can contact the owner. For the current values, see [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

## URL Behavior

SvelteKit writes each page as `<path>.html` (`trailingSlash = 'never'`). GitHub Pages serves `/blog` from `blog.html`, also when the directory `blog/` exists.

| Request                                | Cloudflare Pages                                                              | GitHub Pages                                                                    |
| -------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `/blog`                                | 200                                                                           | 200                                                                             |
| `/blog/`                               | 308 to `/blog`                                                                | 404. The client router then shows the blog page and changes the URL to `/blog`. |
| `/blog.html`                           | 308 to `/blog`                                                                | 200. The canonical link points to `/blog`.                                      |
| `/index/das-projekt/verein.html`       | 308 to `/index/das-projekt/verein`, then 200 with a meta refresh to `/verein` | 200 with a meta refresh to `/verein`                                            |
| An unknown URL                         | 404 with `404.html`                                                           | 404 with `404.html`                                                             |
| `http://stadtgeschichtebasel.ch/`      | 301 to HTTPS                                                                  | 301 to HTTPS, after you turn on "Enforce HTTPS"                                 |
| `https://www.stadtgeschichtebasel.ch/` | 301 to `https://stadtgeschichtebasel.ch/`                                     | 301 to `https://stadtgeschichtebasel.ch/`                                       |

Before [#222](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/issues/222), the build had no `404.html`. Cloudflare Pages then served the home page with status 200 for an unknown URL. The build now has `404.html` (`fallback: '404.html'` in `svelte.config.js`). On both hosts, an unknown URL returns 404, and the client router shows the error page.

### Legacy URLs

`src/lib/data/archive.json` lists 162 URLs of the old website. 131 of them have a new address (`slug`). The route `src/routes/index/[...path]/+page.js` calls `redirect(301, slug)`. SvelteKit writes this redirect as an HTML page with a meta refresh, not as an HTTP 301. Thus the behavior is the same on both hosts. Google Search reads an immediate meta refresh as a permanent redirect.

## Audit a Deployment

The deployment audit checks a deployed site:

```bash
pnpm run audit:deployment [baseURL]
```

The default base URL is `https://stadtgeschichtebasel.ch`. The base URL can have a path. The audit checks these items:

- The critical URLs return 200: `/`, `/robots.txt`, `/sitemap.xml`, `/rss.xml`, `/posts.json`, `/pages.json`, `/agenda.json` and `/manifest.webmanifest`.
- Each URL in the sitemap returns 200.
- Each legacy URL in `archive.json` returns 200.
- Each legacy URL with a `slug` has a meta refresh to that `slug`, and the `slug` returns 200.
- An unknown URL returns 404.

The report also shows the host that served the site: GitHub Pages or Cloudflare. If a check fails, the audit exits with code 1.

## Cutover

The cutover moves `stadtgeschichtebasel.ch` and `www.stadtgeschichtebasel.ch` to GitHub Pages. Do the cutover soon after the merge of #222. Until the cutover, the live site shows no new CMS content, because Cloudflare Pages gets no new deployments. The DNS zone stays on Cloudflare. The records for GitHub Pages use the proxy status "DNS only", so that GitHub can issue the certificate for HTTPS.

You need:

- admin access to the repository settings
- access to the DNS zone of `stadtgeschichtebasel.ch` in Cloudflare
- the GitHub CLI (`gh`)

The organization has already verified the domain `stadtgeschichtebasel.ch` for GitHub Pages.

### Prepare the Cutover

1. Write down the DNS records for `stadtgeschichtebasel.ch` and `www.stadtgeschichtebasel.ch`. You need them for a rollback.
2. Open the Cloudflare analytics. Make sure that the bandwidth of the last 30 days is below 100 GB.
3. Make sure that the last run of the `deploy` job passed.

### Switch the DNS Records

> **Caution:** Do the switch at a time with little traffic. HTTPS fails until GitHub issues the certificate, which can take some minutes. Cloudflare sends an HTTP Strict Transport Security (HSTS) header for the site. Browsers that have this header do not let users continue.

1. In Cloudflare, delete the DNS record for `stadtgeschichtebasel.ch` that points to Cloudflare Pages.
2. Add these records for `stadtgeschichtebasel.ch`. Set the proxy status to "DNS only" and the time to live (TTL) to 5 minutes.

   | Type   | Content               |
   | ------ | --------------------- |
   | `A`    | `185.199.108.153`     |
   | `A`    | `185.199.109.153`     |
   | `A`    | `185.199.110.153`     |
   | `A`    | `185.199.111.153`     |
   | `AAAA` | `2606:50c0:8000::153` |
   | `AAAA` | `2606:50c0:8001::153` |
   | `AAAA` | `2606:50c0:8002::153` |
   | `AAAA` | `2606:50c0:8003::153` |

3. Change the record for `www` to `CNAME` `stadt-geschichte-basel.github.io`. Set the proxy status to "DNS only".
4. Set the custom domain of GitHub Pages:

   ```bash
   gh api -X PUT repos/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/pages -f cname=stadtgeschichtebasel.ch
   ```

5. Wait until this command returns `approved`:

   ```bash
   gh api repos/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/pages -q .https_certificate.state
   ```

6. Turn on "Enforce HTTPS":

   ```bash
   gh api -X PUT repos/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/pages -F https_enforced=true
   ```

### Verify the Cutover

1. Run `pnpm run audit:deployment`. The report must show "Served by: GitHub Pages" and no failed checks.
2. Run `curl -sI http://stadtgeschichtebasel.ch/`. The response must be a 301 to `https://stadtgeschichtebasel.ch/`.
3. Run `curl -sI https://www.stadtgeschichtebasel.ch/agenda`. The response must be a 301 to `https://stadtgeschichtebasel.ch/agenda`.
4. In a browser, open `/agenda`, a blog post, a data story and the map on `/partner`.

## Rollback

Cloudflare Pages keeps its last deployment from before the merge of #222. A rollback to Cloudflare Pages thus shows old content.

1. In Cloudflare, delete the `A` and `AAAA` records for `stadtgeschichtebasel.ch`.
2. Add the records that you wrote down before the cutover. Set the proxy status to "Proxied".
3. Change the record for `www` back to the record that you wrote down.
4. Run `pnpm run audit:deployment`. The report must show "Served by: Cloudflare".
5. If Cloudflare Pages must show new content, restore the step "Publish to Cloudflare Pages" from the history of `.github/workflows/sveltekitci.yml`. The step uses the secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

## After the Sign-off

Sign off the cutover after one week of passed `deploy` jobs without open problems. Then do these steps:

1. Delete the repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
2. Delete the Cloudflare Pages project `stadtgeschichtebasel-ch`.
3. Remove the section [Rollback](#rollback) from this document.
4. Remove the text about the cutover from `docs/FAQ.md`.
5. Close [#222](https://github.com/Stadt-Geschichte-Basel/stadtgeschichtebasel.ch/issues/222).

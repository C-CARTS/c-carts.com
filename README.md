# C-CARTS.com

[![CI](https://github.com/C-CARTS/c-carts.com/actions/workflows/ci-build.yml/badge.svg)](https://github.com/C-CARTS/c-carts.com/actions/workflows/ci-build.yml)
![GitHub deployments](https://img.shields.io/github/deployments/C-CARTS/c-carts.com/Production?label=Vercel%20Deployment)

The [C-CARTS website](https://c-carts.com), its standalone Sanity Studio, schemas, and generated content types. Built with Next.js, React, TypeScript, CSS Modules, and Sanity.

## Requirements

Use **Node.js 24.x** and the integrity-pinned **pnpm** version in the root `package.json`. Node 24 is the shared local/CI/Vercel runtime; do not adopt Node 26 until it is supported by the deployment platform. Node type declarations intentionally track the runtime major rather than the newest published major.

Install the pinned pnpm version using your preferred pnpm installation method, then verify `node --version` and `pnpm --version`. Run commands from the repository root unless specified otherwise. Do not mix npm/yarn lockfiles with `pnpm-lock.yaml`.

## Workspace layout

| Directory                     | Package                       | Responsibility                                                                |
| ----------------------------- | ----------------------------- | ----------------------------------------------------------------------------- |
| `apps/site`                   | `@c-carts/site`               | Public Next.js pages, existing UI/assets, GTFS download and revalidation APIs |
| `apps/cms`                    | `@c-carts/cms`                | Standalone Studio, editor plugins, custom desk structure and Studio build     |
| `packages/sanity-definitions` | `@c-carts/sanity-definitions` | Existing document/object schemas                                              |
| `packages/types`              | `@c-carts/types`              | Generated schema and GROQ result types, including client inference            |

Internal packages are private. The public site does not embed Studio or import its runtime. CSS Modules, C-CARTS branding, and existing content schema names remain unchanged.

## Local configuration

Copy each application's `.env.example` to `.env.local` in that same application, and supply actual project values:

```powershell
Copy-Item apps\site\.env.example apps\site\.env.local
Copy-Item apps\cms\.env.example apps\cms\.env.local
pnpm install --frozen-lockfile
pnpm dev
```

Site: `http://localhost:3000`. Studio: `http://localhost:3333/`. With `STUDIO_ORIGIN=http://localhost:3333`, the site's `/studio` path redirects to the standalone development server, stripping `/studio` and preserving deep links and query parameters. Development uses temporary 307 redirects to avoid caching localhost destinations. `pnpm dev:site` and `pnpm dev:cms` run only the selected app. Schema/query types are generated before the site starts; regenerate after changes when running only the site.

The previous repository-root `.env` is **not** loaded by the workspace apps. Move its relevant values to the app-specific files; do not commit them. Next loads its standard `.env*` precedence. Sanity loads Studio env files through its CLI. Validation scripts use the corresponding loader rather than a different dotenv order.

### Site environment

| Variable                                                      | Purpose                                                                                                                       |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` | Existing Content Lake project and dataset; do not substitute a new project                                                    |
| `NEXT_PUBLIC_SANITY_API_VERSION`                              | Dated content API contract, currently `2024-03-21`; package upgrades do not automatically advance this                        |
| `NEXT_PUBLIC_SETTINGS_DOC_NAME`                               | Settings document ID, normally `siteConfig`                                                                                   |
| `NEXT_PUBLIC_HOMEPAGE_DOC_NAME`                               | Home document ID, normally `homepage`                                                                                         |
| `NEXT_PUBLIC_JOBS_PAGE_DOC_NAME`                              | Jobs listing document ID, normally `jobsPage`                                                                                 |
| `NEXT_PUBLIC_NEWS_PAGE_DOC_NAME`                              | News listing document ID, normally `newsPage`                                                                                 |
| `NEXT_PUBLIC_PERFORMANCE_PAGE_DOC_NAME`                       | Performance page ID, normally `performance`                                                                                   |
| `NEXT_PUBLIC_GTFS_PAGE_DOC_NAME`                              | GTFS feed singleton ID, normally `gtfsFeed`                                                                                   |
| `NEXT_PUBLIC_MAX_IMAGE_SIZE`                                  | Positive integer image-width limit, normally `1500`                                                                           |
| `NEXT_PUBLIC_BASE_URL`                                        | Canonical public site URL                                                                                                     |
| `STATIC_SLUGS`                                                | Comma-separated routes excluded from generic static-page generation                                                           |
| `SANITY_WEBHOOK_SECRET`                                       | Required server-only signature secret; never put it in a public-prefixed variable                                             |
| `STUDIO_ORIGIN`                                               | Studio redirect destination origin, without a path, credentials, query, or fragment; production: `https://studio.c-carts.com` |

`NEXT_PUBLIC_*` values are public, not a way to store secrets. Only the explicit public env accessor is used by browser-compatible code. The site's Sanity configuration and webhook secret remain server-only.

### Studio environment

Studio uses `SANITY_STUDIO_*` variables, not the old embedded Studio's `NEXT_PUBLIC_*` variables. Its `.env.example` lists project/dataset, the Google Maps browser key, API version, and configured singleton IDs, including the formerly undocumented GTFS singleton. Every Studio-prefixed value can be included in the browser bundle. Restrict the Maps key to approved origins/APIs; never supply a write token or webhook secret there.

Keep site and CMS document IDs/project/dataset consistent. Existing singleton defaults are preserved; changing a singleton ID does not migrate documents. `NEXT_PUBLIC_SANITY_USE_CDN` is no longer an option: the site explicitly uses the direct API in production and the previous CDN behavior in development.

## Commands

| Command                          | Behavior                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| `pnpm dev`                       | Generate types, then run site and Studio concurrently                                 |
| `pnpm dev:site` / `pnpm dev:cms` | Run an individual application                                                         |
| `pnpm typegen`                   | Extract schema, generate schema/query types, then generate Next route types           |
| `pnpm check` / `pnpm lint`       | Read-only Biome checks                                                                |
| `pnpm format`                    | Apply Biome formatting/import fixes; review the resulting diff                        |
| `pnpm typecheck`                 | Strict TypeScript checks for every workspace                                          |
| `pnpm test`                      | Focused environment, schema/query, cache, webhook, and GTFS regression tests          |
| `pnpm ci:verify`                 | Generation, Biome, workspace types, and tests                                         |
| `pnpm build`                     | Generate prerequisites and build both applications                                    |
| `pnpm start`                     | Serve the built production Next.js site                                               |
| `pnpm clean`                     | Remove only declared generated/build outputs; preserves dependencies and env files    |
| `pnpm update:check`              | Check workspace dependencies for newer versions, excluding runtime-matched Node types |
| `pnpm update:install`            | Update those manifest ranges; follow with install and full verification               |

Schema/query generation is local and does not change Sanity content. Generated `schema.json`, `sanity-types.ts`, Next types, and TypeScript caches are ignored and must be reproducible from source. Use unique static `defineQuery` constants with named parameters; do not interpolate values into GROQ strings. Treat generated nullable fields as nullable instead of adding assertions.

Verification without live configuration can explicitly supply test-only public Studio values:

```powershell
$env:SANITY_STUDIO_PROJECT_ID = "testproject"
$env:SANITY_STUDIO_DATASET = "production"
$env:SANITY_STUDIO_GOOGLE_MAPS_API_KEY = "verification-only"
$env:STUDIO_ORIGIN = "https://studio.example.com"
pnpm ci:verify
```

These are verification fixtures, not production defaults. Production builds validate actual site and Studio configuration and fail for missing values.

## Coding and dependency standards

Biome owns supported source/config/CSS formatting and linting: tabs, 120 columns, double quotes, import organization, and recommended React/Next rules. YAML and Markdown use their appropriate editor formatters. Generated files are not reformatted manually.

Husky runs lint-staged and commitlint. Staged formatting is scoped to staged files; TypeScript checks cover relevant workspace consumers. Commit types follow the MTD convention: `build`, `add`, `feature`, `bug`, `chore`, `ci`, `docs`, `refactor`, `revert`, `test`, `style`, `perf`, and `package`. Keep lowercase subjects and headers within 100 characters. Example: `feature: add a content section`.

Keep pnpm's build-script allowlist narrow and review release-age exceptions rather than disabling install protections. Upgrade retained direct dependencies to latest stable, aligning framework/plugin peers and React versions; remove obsolete dependencies. Do not bypass compatibility with forced installs. Dependabot handles weekly package/Action updates, with deliberate review for framework majors and guarded minor/patch auto-merge subject to repository checks.

Scoped overrides patch vulnerable dependencies in Sanity's build tooling, including `uuid` under `typeid-js@1.2.0`; keep each override scoped and remove it when the parent adopts the fix. Recheck `pnpm audit` and test the Studio build with each Sanity CLI upgrade.

Sanity timetable code is treated as untrusted HTML and sanitized to the table/formatting elements and attributes the site supports before rendering. SVG image optimization remains enabled for Sanity assets with attachment disposition and a restrictive SVG content security policy.

Studio runtime auto-updates are disabled: deployed Studio changes must pass dependency review and CI. CodeQL is retained. Bundle-size PR reporting was removed; Vercel Analytics and Speed Insights remain.

Review Node 24 type-package patch/minor updates separately; bulk helpers and Dependabot must not move them to Node 26 types while the runtime is Node 24.

## Caching and APIs

Production Sanity data and page ISR retain a **14,400-second** safety-net interval. Slug enumeration remains uncached. Sanity's signed webhook at `/api/revalidate` verifies the raw request body, validates its payload, waits for Content Lake consistency, and expires the corresponding tags immediately using `{ expire: 0 }` before invalidating relevant paths. This deliberately does not switch publishing to stale-while-revalidate.

The generated sitemap and `robots.txt` use each page's Sanity `includeInSitemap` and `disallowRobots` settings. A missing `includeInSitemap` value is treated as included for compatibility with existing content.

Configure the existing Sanity webhook to keep sending `_id`, `_type`, and optional `slug.current`, using the matching server-only secret. Invalid/malformed requests do not invalidate content; unexpected failures are logged and return an error. File-asset changes also invalidate file/GTFS consumers.

`/api/gtfs` returns the configured feed bytes as `application/zip` with the download name `gtfs.zip`. Upstream/missing-asset failures are logged and return a generic error, not private diagnostics.

## Vercel projects and domains

**Changing this repository does not update Vercel project settings or perform a cutover.** Use two projects linked to the same repo:

| Setting            | Public website                                                                | Studio                                 |
| ------------------ | ----------------------------------------------------------------------------- | -------------------------------------- |
| Production domain  | `c-carts.com`                                                                 | `studio.c-carts.com`                   |
| Root directory     | `apps/site`                                                                   | `apps/cms`                             |
| Framework          | Next.js                                                                       | Static/Other                           |
| Runtime/build Node | `24.x`                                                                        | `24.x`                                 |
| Install            | Pinned pnpm, frozen workspace lockfile                                        | Same                                   |
| Build              | `pnpm build` from the site root (includes CMS type generation)                | `pnpm build` from the CMS root         |
| Output             | Next's `.next`                                                                | `dist`                                 |
| Environment        | Actual site values, `STUDIO_ORIGIN`, and public Studio type-generation values | Actual public `SANITY_STUDIO_*` values |

Enable access to workspace files outside each project's root. Keep `c-carts.com` on the site project and assign `studio.c-carts.com` to the CMS project. Studio is mounted at `/`, not `/studio`, with root-relative assets and a filesystem-first SPA fallback for deep links. Missing asset requests return 404 instead of Studio HTML.

The site build extracts the CMS schema before compiling. Its Vercel project also needs `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, and `SANITY_STUDIO_GOOGLE_MAPS_API_KEY` for that build step, matching the CMS project. Vercel projects do not share env settings automatically. Locally, the CMS command loads these from `apps/cms/.env.local`.

### Redirects and environment scopes

Set the site's Production `STUDIO_ORIGIN` to `https://studio.c-carts.com` and keep local development set to `http://localhost:3333`. Set Preview destinations explicitly to the intended CMS preview deployment or stable preview alias; the two Vercel projects are not automatically paired by this repository. Do not silently route previews to production Studio. For GitHub's trusted build job, set its `STUDIO_ORIGIN` repository variable explicitly as well.

Built deployments issue permanent **308 redirects** from `/studio` and `/studio/:path*`, before generic page routing. The old prefix is removed, with nested paths and query strings retained:

```text
https://c-carts.com/studio
  -> https://studio.c-carts.com/
https://c-carts.com/studio/structure/page;drafts.homepage?view=preview
  -> https://studio.c-carts.com/structure/page;drafts.homepage?view=preview
```

Changing the destination requires rebuilding/redeploying the site; restart local development after changing its env file. Existing app-specific env files are not changed automatically. Origins with paths/credentials are rejected, as is redirecting back to the public site's own origin. There is no longer a Studio proxy: users navigate to the CMS host directly, and Vercel deployment protection applies normally to that host. Do not put protection-bypass tokens in redirect destinations.

### Administrative cutover

1. Configure the CMS project and its environment, deploy it, and add `studio.c-carts.com` under that project's domains. Apply the exact DNS records Vercel supplies at the authoritative DNS provider; do not guess an IP or CNAME. Wait for Vercel to confirm domain ownership and working HTTPS.
2. In the existing Sanity project's CORS settings, allow `https://studio.c-carts.com` with credentials and explicitly approved local/preview origins. The origin excludes a path. With the provided local URLs, use `http://localhost:3333`; if opening `127.0.0.1:3333` directly, allow that origin separately. Restrict the public Google Maps browser key to the new Studio host and approved local/preview hosts and required APIs.
3. If maintaining a self-hosted Studio registration, update its URL to `https://studio.c-carts.com`. Review `sanity deploy --external --url https://studio.c-carts.com` and its schema-publication effects before running it. Source builds do not perform registration or publish schemas.
4. Verify Studio login/logout, editor tools, Maps, document navigation, intent links, deep-link refresh, favicon/manifest, and JS/CSS assets on the new host. Verify approved previews and their Vercel protection without weakening protection or leaking tokens.
5. Configure the public site's Production redirect destination, confirm its existing domain remains `c-carts.com`, and deploy the site only after Studio is working. Verify `/studio`, `/studio/`, nested and encoded document paths, and query parameters. Keep `/api/revalidate` and its webhook configuration on the public site unchanged; navigation redirects do not require new public-site API CORS rules.

All DNS, Vercel domain/env, Sanity CORS/registration, key-restriction changes, and remote deployments are separate administrative actions requiring authorization. Do not remove previous allowed origins until the migration is verified and older deployments no longer need them.

Keep the previous deployments and settings for rollback. **308 redirects can be cached permanently by clients**: reverting the website deployment does not revoke a cached redirect. Keep `studio.c-carts.com` serving a working Studio even during rollback. Preserve the existing Sanity project, dataset, content, and webhook endpoint throughout.

## Validation and contribution

Run frozen install, `pnpm ci:verify`, and `pnpm build` before handoff. Inspect the diff and run `git diff --check`. Confirm Windows/Linux compatibility, including filenames containing spaces in staged checks.

Smoke-test home, generic pages, jobs/news lists and detail, performance reports, fixed-route tables/maps, files/PDFs/GTFS, navigation, images, metadata/manifest/robots/sitemap, analytics, cache invalidation, and Studio deep links. There is intentionally no new Storybook or UI testing platform.

CI verifies forks and Dependabot changes without secrets, including a Studio build using explicit verification-only public configuration. Live-content site builds run only in trusted contexts with repository configuration; Dependabot cannot access Actions secrets. When replacing old workflow checks, coordinate required-check names with branch protection before removing an old required check. Do not change remote branch rules or auto-merge settings implicitly.

## License and contact

Apache-2.0; see [LICENSE](LICENSE). Contact [developer@mtd.org](mailto:developer@mtd.org).

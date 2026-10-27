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

Site: `http://localhost:3000`. Studio: `http://localhost:3333/studio`. With `STUDIO_ORIGIN=http://localhost:3333`, the site's `/studio` path proxies to the standalone development server. `pnpm dev:site` and `pnpm dev:cms` run only the selected app. Schema/query types are generated before the site starts; regenerate after changes when running only the site.

The previous repository-root `.env` is **not** loaded by the workspace apps. Move its relevant values to the app-specific files; do not commit them. Next loads its standard `.env*` precedence. Sanity loads Studio env files through its CLI. Validation scripts use the corresponding loader rather than a different dotenv order.

### Site environment

| Variable                                                      | Purpose                                                                                                |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` | Existing Content Lake project and dataset; do not substitute a new project                             |
| `NEXT_PUBLIC_SANITY_API_VERSION`                              | Dated content API contract, currently `2024-03-21`; package upgrades do not automatically advance this |
| `NEXT_PUBLIC_SETTINGS_DOC_NAME`                               | Settings document ID, normally `siteConfig`                                                            |
| `NEXT_PUBLIC_HOMEPAGE_DOC_NAME`                               | Home document ID, normally `homepage`                                                                  |
| `NEXT_PUBLIC_JOBS_PAGE_DOC_NAME`                              | Jobs listing document ID, normally `jobsPage`                                                          |
| `NEXT_PUBLIC_NEWS_PAGE_DOC_NAME`                              | News listing document ID, normally `newsPage`                                                          |
| `NEXT_PUBLIC_PERFORMANCE_PAGE_DOC_NAME`                       | Performance page ID, normally `performance`                                                            |
| `NEXT_PUBLIC_MAX_IMAGE_SIZE`                                  | Positive integer image-width limit, normally `1500`                                                    |
| `NEXT_PUBLIC_BASE_URL`                                        | Canonical public site URL                                                                              |
| `STATIC_SLUGS`                                                | Comma-separated routes excluded from generic static-page generation                                    |
| `SANITY_WEBHOOK_SECRET`                                       | Required server-only signature secret; never put it in a public-prefixed variable                      |
| `STUDIO_ORIGIN`                                               | Dedicated Studio upstream origin, without `/studio`, credentials, query, or fragment                   |

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
pnpm ci:verify
```

These are verification fixtures, not production defaults. Production builds validate actual site and Studio configuration and fail for missing values.

## Coding and dependency standards

Biome owns supported source/config/CSS formatting and linting: tabs, 120 columns, double quotes, import organization, and recommended React/Next rules. YAML and Markdown use their appropriate editor formatters. Generated files are not reformatted manually.

Husky runs lint-staged and commitlint. Staged formatting is scoped to staged files; TypeScript checks cover relevant workspace consumers. Commit types follow the MTD convention: `build`, `add`, `feature`, `bug`, `chore`, `ci`, `docs`, `refactor`, `revert`, `test`, `style`, `perf`, and `package`. Keep lowercase subjects and headers within 100 characters. Example: `feature: add a content section`.

Keep pnpm's build-script allowlist narrow and review release-age exceptions rather than disabling install protections. Upgrade retained direct dependencies to latest stable, aligning framework/plugin peers and React versions; remove obsolete dependencies. Do not bypass compatibility with forced installs. Dependabot handles weekly package/Action updates, with deliberate review for framework majors and guarded minor/patch auto-merge subject to repository checks.

Scoped, same-major overrides patch pinned `js-yaml`, `smol-toml`, and `undici` dependencies in Sanity's build tooling; remove them when the parents adopt the fixes. One moderate `uuid@10` advisory remains in `@sanity/cli -> typeid-js@0.3`: no patched 10.x release exists, so it is not forced across a breaking major. Recheck `pnpm audit --prod` with each Sanity CLI upgrade. This is a tooling dependency, not an assertion that all dependency advisories are cleared.

Studio runtime auto-updates are disabled: deployed Studio changes must pass dependency review and CI. CodeQL is retained. Bundle-size PR reporting was removed; Vercel Analytics and Speed Insights remain.

Review Node 24 type-package patch/minor updates separately; bulk helpers and Dependabot must not move them to Node 26 types while the runtime is Node 24.

## Caching and APIs

Production Sanity data and page ISR retain a **14,400-second** safety-net interval. Slug enumeration remains uncached. Sanity's signed webhook at `/api/revalidate` verifies the raw request body, validates its payload, waits for Content Lake consistency, and expires the corresponding tags immediately using `{ expire: 0 }` before invalidating relevant paths. This deliberately does not switch publishing to stale-while-revalidate.

Configure the existing Sanity webhook to keep sending `_id`, `_type`, and optional `slug.current`, using the matching server-only secret. Invalid/malformed requests do not invalidate content; unexpected failures are logged and return an error. File-asset changes also invalidate file/GTFS consumers.

`/api/gtfs` returns the configured feed bytes as `application/zip` with the download name `gtfs.zip`. Upstream/missing-asset failures are logged and return a generic error, not private diagnostics.

## Vercel deployment and `/studio`

**Changing this repository does not update Vercel project settings or perform a cutover.** Use two projects linked to the same repo:

| Setting            | Public website                                                                | Studio                                 |
| ------------------ | ----------------------------------------------------------------------------- | -------------------------------------- |
| Root directory     | `apps/site`                                                                   | `apps/cms`                             |
| Framework          | Next.js                                                                       | Static/Other                           |
| Runtime/build Node | `24.x`                                                                        | `24.x`                                 |
| Install            | Pinned pnpm, frozen workspace lockfile                                        | Same                                   |
| Build              | `pnpm build` from the site root (includes CMS type generation)                | `pnpm build` from the CMS root         |
| Output             | Next's `.next`                                                                | `dist`                                 |
| Environment        | Actual site values, `STUDIO_ORIGIN`, and public Studio type-generation values | Actual public `SANITY_STUDIO_*` values |

Enable access to workspace files outside each project's root. Keep the existing public domain on the site project. Supply the dedicated CMS origin as `STUDIO_ORIGIN` without a path. Site rewrites preserve `/studio` and `/studio/:path*` before generic page routing. CMS CLI config sets the base path exactly once; its static configuration serves assets before deep-link HTML fallback.

The site build extracts the CMS schema before compiling. Its Vercel project also needs `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, and `SANITY_STUDIO_GOOGLE_MAPS_API_KEY` for that build step, matching the CMS project. Vercel projects do not share env settings automatically. Locally, the CMS command loads these from `apps/cms/.env.local`.

Set production and preview origins explicitly. Do not point a preview silently at production Studio, and do not point the Studio upstream back to the public site. Verify preview pairing and Vercel deployment protection: a protected upstream must be accessible to its approved proxy without leaking bypass tokens or disabling protection accidentally.

Before cutover, verify `/studio`, trailing slash, deep document URLs, authentication redirects, JS/CSS assets, browser CORS credentials, and Maps key restrictions. Sanity CORS must allow the public Studio origin and approved development/preview origins. Any CORS change, schema publication, or external Studio registration is an administrative action, not part of building the source. If registering a self-hosted Studio, review `sanity deploy --external --url https://c-carts.com/studio` and its schema-publication effects before running it.

Keep the previous production deployment available until the split preview works. Roll back by restoring the previous deployment and its corresponding project root/build/environment settings. Keep the existing Sanity project, dataset, content, and webhook endpoint throughout.

## Validation and contribution

Run frozen install, `pnpm ci:verify`, and `pnpm build` before handoff. Inspect the diff and run `git diff --check`. Confirm Windows/Linux compatibility, including filenames containing spaces in staged checks.

Smoke-test home, generic pages, jobs/news lists and detail, performance reports, fixed-route tables/maps, files/PDFs/GTFS, navigation, images, metadata/manifest/robots/sitemap, analytics, cache invalidation, and Studio deep links. There is intentionally no new Storybook or UI testing platform.

CI verifies forks and Dependabot changes without secrets, including a Studio build using explicit verification-only public configuration. Live-content site builds run only in trusted contexts with repository configuration; Dependabot cannot access Actions secrets. When replacing old workflow checks, coordinate required-check names with branch protection before removing an old required check. Do not change remote branch rules or auto-merge settings implicitly.

## License and contact

Apache-2.0; see [LICENSE](LICENSE). Contact [developer@mtd.org](mailto:developer@mtd.org).

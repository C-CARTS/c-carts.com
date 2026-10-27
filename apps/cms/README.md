# Standalone C-CARTS Studio

This private workspace owns Studio configuration, plugins, and the custom desk.
The unchanged content model lives in `@c-carts/sanity-definitions`; generated
schema and query types live in `@c-carts/types`.

## Configuration and development

Use Node 24 and the repository-pinned pnpm. Copy `.env.example` to `.env.local`
in this directory and supply the existing Sanity project's actual project ID,
dataset, and browser-restricted Maps key. These three `SANITY_STUDIO_*` values
are required and public. Do not put tokens or webhook secrets in Studio env.
Sanity loads this workspace's env files for its CLI and browser build.

The dated API version remains `2024-03-21`. Singleton IDs default to the
documented existing values, including `gtfsFeed`. If an existing deployment
overrides any ID, set the corresponding Studio and site env variables to the
same value. Document IDs do not change schema names (`siteConfig`, `page`,
`gtfsFeed`, etc.).

From the repository root:

```sh
pnpm --filter @c-carts/cms dev
pnpm --filter @c-carts/cms test
pnpm --filter @c-carts/cms typegen
pnpm --filter @c-carts/cms typecheck
pnpm --filter @c-carts/cms build
pnpm --filter @c-carts/cms start
```

Development and local production preview use `http://localhost:3333/`.
Studio is mounted at the domain root: workspace `basePath` is `/` and no CLI
subpath is configured. The website's local `/studio` URLs temporarily redirect
here rather than proxying requests. Runtime auto-updates are disabled. Keep upgrades in
dependency PRs and retain the code, Maps, table, structure, and Vision plugins.

## Schema and query generation

`typegen` first extracts `schema.json` with `--enforce-required-fields`, then
generates `../../packages/types/sanity-types.ts`. The generator scans site
TypeScript/TSX, excluding dependencies, build output, tests, and generated
sources. Queries must use uniquely named `defineQuery` constants with named
parameters. Generated files are ignored and must be regenerated before
consumer typechecks/builds.

Client overload generation is enabled. Consumers must include
`../../packages/types/sanity-types.ts` in their TypeScript compilation so its
`@sanity/client` module augmentation is active, even in files without direct
imports from `@c-carts/types`.

Secretless CI must pass explicit fixtures:

```text
SANITY_STUDIO_PROJECT_ID=testproject
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_GOOGLE_MAPS_API_KEY=verification-only
STUDIO_ORIGIN=https://studio.example.com
```

These are verification inputs, not runtime defaults or deployment values.
`STUDIO_ORIGIN` is needed by site routing when running root verification, not
by the standalone Studio build.
Extraction/typegen read local schema sources; no authentication token or
Content Lake writes are needed.

## Vercel static hosting

Create a separate Vercel project rooted at `apps/cms`, with Node 24 and access
to workspace files outside that directory. `vercel.json` builds this workspace
with the locked dependencies and publishes `dist`. Supply the three actual
public Studio env values in each deployment's appropriate scope. Assign
`studio.c-carts.com` to this project, not the public Next.js project.

The bundle is mounted at `/`, with root-relative `/static` assets. Static routing
serves existing files first, returns 404 for missing assets, and falls back to
`index.html` for document/structure/intent deep links. No path-prefix rewriting
or favicon patch is needed. The public website redirects its old `/studio`
URLs to this host, stripping that prefix and retaining deep links and queries.
`sanity preview` uses Vite's own SPA fallback, not `vercel.json`; it may return
HTML for nonexistent assets. Verify missing-asset 404s on a Vercel preview
before cutover, in addition to the configuration regression tests.

Use Vercel-provided DNS records and confirm HTTPS. Add the new Studio origin
`https://studio.c-carts.com` to the existing Sanity project's credentialed CORS
allowlist; approve local/preview origins explicitly and update browser Maps
restrictions. If a self-hosted Studio registration is used, its URL becomes
`https://studio.c-carts.com`. Do not change project, dataset, or content IDs.

Verify login/logout, preview pairing, normal Vercel protection on the CMS host,
assets, Maps, and deep-link refresh before enabling the website's permanent
redirects. Deploy and verify Studio first. Cached 308 redirects cannot be
revoked by a website rollback; keep the Studio hostname working.

Registration, schema publication, CORS/DNS/domain changes, remote deployment,
and production cutover require separate authorization; these local commands
do not perform them. See the root README for the two-project settings and
administrative cutover procedure.

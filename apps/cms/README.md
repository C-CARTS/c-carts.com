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

Development and preview use `http://127.0.0.1:3333/studio`. CLI
`project.basePath` alone owns `/studio`; workspace `basePath` stays `/` to
avoid `/studio/studio`. Runtime auto-updates are disabled. Keep upgrades in
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
```

These are verification inputs, not runtime defaults or deployment values.
Extraction/typegen read local schema sources; no authentication token or
Content Lake writes are needed.

## Vercel static hosting

Create a separate Vercel project rooted at `apps/cms`, with Node 24 and access
to workspace files outside that directory. `vercel.json` builds this workspace
with the locked dependencies and publishes `dist`. Supply the three actual
public Studio env values in each deployment's appropriate scope.

The generated bundle is mounted at `/studio`. The static routing rules strip
that prefix for `assets` and `static` files before the SPA fallback, so missing
JS/CSS requests are not served HTML. Existing filesystem files remain available;
Studio base paths and deep links fall back to `index.html`. The site proxies
`/studio` and `/studio/:path*` to this project's explicitly configured origin.
The local Vite plugin also prefixes Sanity 6's otherwise root-relative favicon
links, keeping those browser requests under the same proxy boundary.

Before any cutover, verify preview pairing, Vercel protection, assets/deep-link
refresh, Sanity login/credentialed CORS, and browser Maps restrictions through
the public site origin. Registration, schema publication, CORS changes, remote
deployment, and production cutover require separate authorization; these local
commands/configuration do not perform them. Keep the existing deployment for
rollback until the paired preview passes.

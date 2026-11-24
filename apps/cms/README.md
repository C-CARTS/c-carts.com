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

## Sanity hosting

`sanity.cli.ts` sets `studioHost` to `c-carts`, so the GitHub deployment
workflow publishes this Studio to `https://c-carts.sanity.studio`. It runs
`pnpm --filter ./apps/cms run deploy` on the current `main` revision using
Node 24. Configure the `SANITY_DEPLOYMENT_TOKEN` GitHub Actions secret with
deployment permission for the existing project, along with the workflow's
public Studio environment values. The hostname must be available to or
assigned to that project. Runtime auto-updates remain disabled.

`sanity deploy` builds and uploads the Studio and extracts and uploads its
schema. Local build and type-generation commands do not publish either.
`vercel.json` and its routing tests describe the previous static-hosting
configuration; they do not configure Sanity hosting.

Review the existing project's CORS settings for the hosted origin and approved
local/preview origins, and update browser Maps key restrictions as needed.
Verify login/logout, assets, Maps, navigation, and deep-link refresh before
pointing the public site's `STUDIO_ORIGIN` at the new host. The site strips
the old `/studio` prefix and retains deep links and queries. Cached 308
redirects cannot be revoked by a website rollback; keep old and new
destinations working as needed.

Registration, schema publication, CORS/domain changes, remote deployment,
and production cutover require separate authorization. See the root README
for environment settings and the administrative cutover procedure.

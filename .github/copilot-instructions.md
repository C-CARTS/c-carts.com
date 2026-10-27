# Copilot instructions

This repository is a pnpm monorepo for the C-CARTS public site, standalone Sanity Studio, and shared schema/type packages. Read the root `README.md` for the workspace map, environment variables, deployment topology, and operational constraints. For Next.js-specific guidance, also follow `apps/site/AGENTS.md`.

## Runtime and package management

- Use Node.js 24.x and the integrity-pinned pnpm version in the root `package.json`.
- Run workspace commands from the repository root with `pnpm`; do not introduce npm/yarn lockfiles or bypass the frozen lockfile.
- Keep package boundaries intact: public site code belongs in `apps/site`, Studio code in `apps/cms`, schemas in `packages/sanity-definitions`, and generated Sanity types in `packages/types`.
- Generated schema/query types and Next route types are outputs of `pnpm typegen`; do not edit generated files by hand.

## Application conventions

- Preserve the existing Sanity project, dataset, document type names, and singleton document IDs unless the user explicitly authorizes a migration.
- Define GROQ queries as uniquely named `defineQuery` constants with named parameters; do not interpolate values into query strings.
- Keep server-only Sanity configuration and webhook secrets out of browser code. `NEXT_PUBLIC_*` and `SANITY_STUDIO_*` values are public build-time configuration; never put tokens or secrets in them.
- Follow the existing CSS Modules, TypeScript, React, and Biome patterns. Validate content from Sanity where it crosses into application behavior, and preserve explicit error reporting.
- Treat Vercel projects, domains, DNS, Sanity CORS/registration, production credentials, and deployments as external administrative state; do not change them as part of source-code work.

## Verification

- Make sure code is well formatted and passes all linting and type checks. (`pnpm lint` to lint, `pnpm typecheck` to type check, or `pnpm format` to write)
- After source or workspace configuration changes, run the relevant focused tests/typechecks and `pnpm ci:verify`.
- Run `pnpm build` for production-facing changes when required configuration is available. Report exact commands and any environment-dependent checks not run.
- For dependency changes, update `pnpm-lock.yaml` with the pinned pnpm version and verify compatibility without forcing unsupported peer versions.
- Unless directed otherwise, default to leaving code uncommitted until human review.

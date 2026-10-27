import path from "node:path";

const workspaces = [
	{ directory: "apps/site", name: "@c-carts/site" },
	{ directory: "apps/cms", name: "@c-carts/cms" },
	{ directory: "packages/sanity-definitions", name: "@c-carts/sanity-definitions" },
	{ directory: "packages/types", name: "@c-carts/types" },
];

const generated = /(?:^|\/)(?:node_modules|\.next|\.sanity|dist|build|out|coverage)\//;
const supported = /\.(?:[cm]?[jt]sx?|jsonc?|css|graphql|gql)$/;
const source = /\.(?:[cm]?[jt]sx?|jsonc?)$/;
const quote = (filename) => JSON.stringify(filename);

export default {
	"*": (filenames) => {
		const files = filenames
			.map((filename) => path.relative(process.cwd(), filename).split(path.sep).join("/"))
			.filter(
				(filename) =>
					!generated.test(filename) &&
					!filename.endsWith("next-env.d.ts") &&
					filename !== "apps/cms/schema.json" &&
					filename !== "packages/types/sanity-types.ts",
			);
		const commands = [];
		const biomeFiles = files.filter((filename) => supported.test(filename));
		if (biomeFiles.length > 0) {
			// Check only: even partially staged files must never be rewritten by a hook.
			commands.push(
				`pnpm -w exec biome check --no-errors-on-unmatched --files-ignore-unknown=true --colors=off -- ${biomeFiles.map(quote).join(" ")}`,
			);
		}

		const checksAll = files.some(
			(filename) =>
				/^(?:package\.json|pnpm-(?:lock|workspace)\.yaml|tsconfig(?:\.base)?\.json)$/.test(filename) ||
				filename.startsWith("packages/") ||
				/^apps\/[^/]+\/(?:package|tsconfig)\.json$/.test(filename),
		);
		const affected = workspaces.filter(
			(workspace) =>
				checksAll || files.some((filename) => filename.startsWith(`${workspace.directory}/`) && source.test(filename)),
		);
		if (checksAll || files.some((filename) => filename.startsWith("scripts/") && source.test(filename))) {
			commands.push("pnpm -w exec tsc --noEmit --incremental false");
		}
		if (affected.length > 0) {
			// Generation writes ignored outputs only and must precede consumer checks.
			commands.push("pnpm -w typegen");
			for (const workspace of affected) {
				commands.push(`pnpm --filter ${workspace.name} typecheck --incremental false`);
			}
		}
		return commands;
	},
};

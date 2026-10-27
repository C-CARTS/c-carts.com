import { defineCliConfig } from "sanity/cli";
import { studioEnv } from "./env";

export default defineCliConfig({
	api: {
		projectId: studioEnv.SANITY_STUDIO_PROJECT_ID,
		dataset: studioEnv.SANITY_STUDIO_DATASET,
	},
	project: {
		basePath: "/studio",
	},
	deployment: {
		autoUpdates: false,
	},
	vite: {
		plugins: [
			{
				name: "studio-static-base-path",
				generateBundle: {
					order: "post",
					handler(_options, bundle) {
						const html = bundle["index.html"];
						if (html?.type === "asset" && typeof html.source === "string") {
							// Sanity 6's default favicon links ignore project.basePath.
							html.source = html.source.replaceAll('href="/static/', 'href="/studio/static/');
						}
					},
				},
			},
		],
	},
	typegen: {
		enabled: false,
		path: [
			"../site/**/*.{ts,tsx}",
			"!../site/**/node_modules/**",
			"!../site/**/.next/**",
			"!../site/**/tests/**",
			"!../site/**/__tests__/**",
			"!../site/**/*.test.{ts,tsx}",
			"!../site/**/*.spec.{ts,tsx}",
			"!../site/**/generated/**",
			"!../site/**/sanity-types.ts",
		],
		schema: "./schema.json",
		generates: "../../packages/types/sanity-types.ts",
		overloadClientMethods: true,
	},
});

import { defineCliConfig } from "sanity/cli";
import { studioEnv } from "./env";

export default defineCliConfig({
	api: {
		projectId: studioEnv.SANITY_STUDIO_PROJECT_ID,
		dataset: studioEnv.SANITY_STUDIO_DATASET,
	},
	deployment: {
		autoUpdates: false,
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

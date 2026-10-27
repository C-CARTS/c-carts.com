import { schemaTypes } from "@c-carts/sanity-definitions";
import { codeInput } from "@sanity/code-input";
import { googleMapsInput } from "@sanity/google-maps-input";
import { table } from "@sanity/table";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { studioEnv } from "./env";
import structure from "./structure";

const config = defineConfig({
	basePath: "/",
	projectId: studioEnv.SANITY_STUDIO_PROJECT_ID,
	dataset: studioEnv.SANITY_STUDIO_DATASET,
	schema: {
		types: schemaTypes,
	},
	plugins: [
		codeInput(),
		googleMapsInput({
			apiKey: studioEnv.SANITY_STUDIO_GOOGLE_MAPS_API_KEY,
			defaultLocation: {
				lat: 40.1139125,
				lng: -88.224896,
			},
			defaultZoom: 12,
		}),
		structureTool({ structure }),
		table(),
		visionTool({ defaultApiVersion: studioEnv.SANITY_STUDIO_API_VERSION }),
	],
});

export default config;

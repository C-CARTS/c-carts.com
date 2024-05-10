import { googleMapsInput } from "@sanity/google-maps-input";
import { table } from "@sanity/table";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import throwError from "./helpers/throwError";
import structure from "./sanity/deskStructure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import job from "./sanity/schema/documents/job";
import navItem from "./sanity/schema/documents/navItem";
import news from "./sanity/schema/documents/news";
import page from "./sanity/schema/documents/page";
import performance from "./sanity/schema/documents/performance";
import siteConfig from "./sanity/schema/documents/siteConfig";
import content from "./sanity/schema/objects/content";
import imageWithAlt from "./sanity/schema/objects/imageWithAlt";
const apiKey =
	process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ??
	throwError("No NEXT_PUBLIC_GOOGLE_MAPS_API_KEY");

const config = defineConfig({
	basePath: "/studio",
	projectId,
	dataset,
	schema: {
		types: [
			job,
			news,
			siteConfig,
			navItem,
			page,
			imageWithAlt,
			content,
			performance,
		],
	},
	plugins: [
		structureTool({ structure }),
		googleMapsInput({
			apiKey,
			defaultLocation: {
				lat: 40.1139125,
				lng: -88.224896,
			},
			defaultZoom: 12,
		}),
		visionTool({ defaultApiVersion: apiVersion }),
		table(),
	],
});

export default config;

import { z } from "zod";

const publicValue = z.string().trim().min(1);
const documentId = publicValue.max(128).regex(/^[a-zA-Z0-9_][a-zA-Z0-9_.-]*$/, "Expected a valid Sanity document ID");

export const studioEnvSchema = z.object({
	SANITY_STUDIO_PROJECT_ID: publicValue.regex(/^[a-z0-9-]+$/, "Expected a Sanity project ID"),
	SANITY_STUDIO_DATASET: publicValue.regex(/^[a-z0-9_][a-z0-9_-]*$/, "Expected a Sanity dataset name"),
	SANITY_STUDIO_GOOGLE_MAPS_API_KEY: publicValue,
	SANITY_STUDIO_API_VERSION: z.iso.date().default("2024-03-21"),
	SANITY_STUDIO_SETTINGS_DOC_NAME: documentId.default("siteConfig"),
	SANITY_STUDIO_HOMEPAGE_DOC_NAME: documentId.default("homepage"),
	SANITY_STUDIO_JOBS_PAGE_DOC_NAME: documentId.default("jobsPage"),
	SANITY_STUDIO_NEWS_PAGE_DOC_NAME: documentId.default("newsPage"),
	SANITY_STUDIO_PERFORMANCE_PAGE_DOC_NAME: documentId.default("performance"),
	SANITY_STUDIO_GTFS_PAGE_DOC_NAME: documentId.default("gtfsFeed"),
});

export type StudioEnv = z.infer<typeof studioEnvSchema>;

export function parseStudioEnv(input: Record<string, unknown>): StudioEnv {
	return studioEnvSchema.parse(input);
}

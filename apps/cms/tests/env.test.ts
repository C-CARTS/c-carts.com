import { describe, expect, it } from "vitest";
import { parseStudioEnv } from "../env/schema";

const verificationEnv = {
	SANITY_STUDIO_PROJECT_ID: "testproject",
	SANITY_STUDIO_DATASET: "production",
	SANITY_STUDIO_GOOGLE_MAPS_API_KEY: "verification-only",
};

describe("Studio public environment", () => {
	it("accepts explicit secretless verification fixtures", () => {
		const env = parseStudioEnv(verificationEnv);
		expect(env.SANITY_STUDIO_PROJECT_ID).toBe("testproject");
		expect(env.SANITY_STUDIO_DATASET).toBe("production");
		expect(env.SANITY_STUDIO_GOOGLE_MAPS_API_KEY).toBe("verification-only");
	});

	it.each(Object.keys(verificationEnv))("requires a nonempty %s", (key) => {
		for (const value of [undefined, "", "  "]) {
			expect(() => parseStudioEnv({ ...verificationEnv, [key]: value })).toThrow();
		}
	});

	it("preserves the dated API contract and documented singleton IDs", () => {
		expect(parseStudioEnv(verificationEnv)).toMatchObject({
			SANITY_STUDIO_API_VERSION: "2024-03-21",
			SANITY_STUDIO_SETTINGS_DOC_NAME: "siteConfig",
			SANITY_STUDIO_HOMEPAGE_DOC_NAME: "homepage",
			SANITY_STUDIO_JOBS_PAGE_DOC_NAME: "jobsPage",
			SANITY_STUDIO_NEWS_PAGE_DOC_NAME: "newsPage",
			SANITY_STUDIO_PERFORMANCE_PAGE_DOC_NAME: "performance",
			SANITY_STUDIO_GTFS_PAGE_DOC_NAME: "gtfsFeed",
		});
	});

	it("accepts explicit singleton overrides without changing schema type names", () => {
		expect(
			parseStudioEnv({
				...verificationEnv,
				SANITY_STUDIO_SETTINGS_DOC_NAME: "custom.settings",
				SANITY_STUDIO_GTFS_PAGE_DOC_NAME: "custom-gtfs",
			}),
		).toMatchObject({
			SANITY_STUDIO_SETTINGS_DOC_NAME: "custom.settings",
			SANITY_STUDIO_GTFS_PAGE_DOC_NAME: "custom-gtfs",
		});
	});

	it.each([
		{ SANITY_STUDIO_PROJECT_ID: "invalid project" },
		{ SANITY_STUDIO_DATASET: "Invalid Dataset" },
		{ SANITY_STUDIO_API_VERSION: "2024-02-30" },
		{ SANITY_STUDIO_API_VERSION: "latest" },
		{ SANITY_STUDIO_HOMEPAGE_DOC_NAME: "" },
		{ SANITY_STUDIO_GTFS_PAGE_DOC_NAME: 'injected" || true' },
		{ SANITY_STUDIO_SETTINGS_DOC_NAME: "invalid/id" },
		{ SANITY_STUDIO_NEWS_PAGE_DOC_NAME: "a".repeat(129) },
	])("rejects malformed configuration: %j", (override) => {
		expect(() => parseStudioEnv({ ...verificationEnv, ...override })).toThrow();
	});

	it("does not copy server-only values into browser configuration", () => {
		expect(
			parseStudioEnv({
				...verificationEnv,
				SANITY_AUTH_TOKEN: "not-a-real-token",
				SANITY_WEBHOOK_SECRET: "not-a-real-secret",
			}),
		).toEqual(parseStudioEnv(verificationEnv));
	});
});

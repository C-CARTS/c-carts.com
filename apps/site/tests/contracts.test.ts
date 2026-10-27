import { createHmac } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import { PublicEnvSchema, ServerEnvSchema } from "../env/schema";
import { cacheOptions, DATA_CACHE_TTL_SECONDS } from "../lib/sanity/cache";
import { gtfsResponse } from "../lib/sanity/gtfs";
import * as queries from "../lib/sanity/queries";
import { invalidationTargets, readWebhook, waitForContentLake } from "../lib/sanity/webhook";
import { studioRewrites } from "../lib/studio-routing";

const fixture = {
	NEXT_PUBLIC_SANITY_PROJECT_ID: "testproject",
	NEXT_PUBLIC_SANITY_DATASET: "production",
	NEXT_PUBLIC_SANITY_API_VERSION: "2024-03-21",
	NEXT_PUBLIC_SETTINGS_DOC_NAME: "siteConfig",
	NEXT_PUBLIC_HOMEPAGE_DOC_NAME: "homepage",
	NEXT_PUBLIC_JOBS_PAGE_DOC_NAME: "jobsPage",
	NEXT_PUBLIC_NEWS_PAGE_DOC_NAME: "newsPage",
	NEXT_PUBLIC_PERFORMANCE_PAGE_DOC_NAME: "performance",
	SANITY_WEBHOOK_SECRET: "test-secret",
	STATIC_SLUGS: "jobs,news,/",
	STUDIO_ORIGIN: "https://cms.example.com",
};

function signedRequest(body: string, secret = "test-secret") {
	const timestamp = Date.now().toString();
	const signature = createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("base64url");
	return new Request("https://example.com/api/revalidate", {
		method: "POST",
		headers: { "sanity-webhook-signature": `t=${timestamp},v1=${signature}` },
		body,
	});
}

describe("environment validation", () => {
	it("requires real server configuration without secret defaults", () => {
		expect(ServerEnvSchema.parse(fixture).STATIC_SLUGS).toEqual(["jobs", "news", "/"]);
		expect(ServerEnvSchema.safeParse({ ...fixture, SANITY_WEBHOOK_SECRET: "" }).success).toBe(false);
		expect(ServerEnvSchema.safeParse({ ...fixture, NEXT_PUBLIC_SANITY_API_VERSION: "today" }).success).toBe(false);
		expect(ServerEnvSchema.safeParse({ ...fixture, STATIC_SLUGS: " , " }).success).toBe(false);
	});
	it("validates public URL and image size", () => {
		expect(
			PublicEnvSchema.safeParse({ NEXT_PUBLIC_BASE_URL: "ftp://example.com", NEXT_PUBLIC_MAX_IMAGE_SIZE: "1500" })
				.success,
		).toBe(false);
		expect(
			PublicEnvSchema.parse({ NEXT_PUBLIC_BASE_URL: "https://example.com", NEXT_PUBLIC_MAX_IMAGE_SIZE: "1500" })
				.NEXT_PUBLIC_MAX_IMAGE_SIZE,
		).toBe(1500);
		for (const size of ["bad", "0", "-1", "2.5"]) {
			expect(
				PublicEnvSchema.safeParse({ NEXT_PUBLIC_BASE_URL: "https://example.com", NEXT_PUBLIC_MAX_IMAGE_SIZE: size })
					.success,
			).toBe(false);
		}
	});
});

describe("cache and query contracts", () => {
	it("retains production TTL and development no-store", () => {
		expect(DATA_CACHE_TTL_SECONDS).toBe(14400);
		expect(cacheOptions(["news"], false)).toEqual({ next: { revalidate: 14400, tags: ["news"] } });
		expect(cacheOptions(["news"], true)).toEqual({ cache: "no-store" });
	});
	it("uses static parameterized queries with preserved projections", () => {
		expect(Object.keys(queries)).toHaveLength(13);
		expect(queries.PAGE_BY_SLUG_QUERY).toContain("$slug");
		expect(queries.SITE_CONFIG_QUERY).toContain("$id");
		expect(queries.NAV_ITEMS_QUERY).toContain("children[]->{_id, title, slug}");
		expect(queries.GTFS_QUERY).toContain("feed{asset->}");
	});
});

describe("webhook contracts", () => {
	it("invalidates the home path without generating a double slash", () => {
		expect(
			invalidationTargets({ _id: "homepage", _type: "page", slug: { current: "/" } }, "homepage", "siteConfig").paths,
		).toEqual(["/"]);
	});
	it("verifies the raw body before accepting content", async () => {
		const body = JSON.stringify({ _id: "homepage", _type: "page" });
		expect((await readWebhook(signedRequest(body), "test-secret")).status).toBe(200);
		expect((await readWebhook(signedRequest(body), "wrong-secret")).status).toBe(401);
		expect((await readWebhook(signedRequest("{"), "test-secret")).status).toBe(400);
		expect((await readWebhook(signedRequest("{}"), "test-secret")).status).toBe(400);
		expect(
			(await readWebhook(new Request("https://example.com", { method: "POST", body }), "test-secret")).status,
		).toBe(401);
	});
	it.each([
		["page", ["page-homepage", "page-example"], ["/", "/example"]],
		["job", ["jobs", "jobs-example"], ["/jobs/example"]],
		["news", ["news", "news-example"], ["/news/example"]],
		["navItem", ["nav"], []],
		["siteConfig", ["siteConfig"], []],
		["performance", ["performance"], []],
		["gtfsFeed", ["gtfsFeed"], []],
		["sanity.imageAsset", ["images"], []],
		["sanity.fileAsset", ["files", "gtfsFeed"], []],
		["unmanaged", [], []],
	])("maps %s to the existing tag/path contract", (type, tags, paths) => {
		expect(
			invalidationTargets({ _id: "homepage", _type: type, slug: { current: "example" } }, "homepage", "siteConfig"),
		).toEqual({ tags, paths });
	});
	it("retains the Content Lake consistency wait", async () => {
		vi.useFakeTimers();
		try {
			const done = vi.fn();
			const promise = waitForContentLake().then(done);
			await vi.advanceTimersByTimeAsync(2999);
			expect(done).not.toHaveBeenCalled();
			await vi.advanceTimersByTimeAsync(1);
			await promise;
			expect(done).toHaveBeenCalledOnce();
		} finally {
			vi.useRealTimers();
		}
	});
});

describe("GTFS downloads", () => {
	it("preserves ZIP bytes and response headers", async () => {
		const bytes = new Uint8Array([80, 75, 3, 4]);
		const fetchFile = vi.fn<typeof fetch>().mockResolvedValue(new Response(bytes));
		const response = await gtfsResponse("https://cdn.sanity.io/file.zip", fetchFile);
		expect(response.headers.get("Content-Type")).toBe("application/zip");
		expect(response.headers.get("Content-Disposition")).toContain("gtfs.zip");
		expect(new Uint8Array(await response.arrayBuffer())).toEqual(bytes);
		expect(fetchFile).toHaveBeenCalledWith("https://cdn.sanity.io/file.zip", { cache: "no-store" });
	});
	it("fails explicitly for missing data or failed upstream", async () => {
		await expect(gtfsResponse(undefined)).rejects.toThrow("missing");
		await expect(
			gtfsResponse("https://example.com", vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 503 }))),
		).rejects.toThrow("503");
	});
});

describe("standalone Studio rewrites", () => {
	it("preserves the base path and deep-link suffix once", () => {
		expect(studioRewrites("https://cms.example.com")).toEqual([
			{ source: "/studio", destination: "https://cms.example.com/studio" },
			{ source: "/studio/:path*", destination: "https://cms.example.com/studio/:path*" },
		]);
		expect(studioRewrites("http://localhost:3333")[1]?.destination).toBe("http://localhost:3333/studio/:path*");
	});
	it.each([
		"http://remote.example.com",
		"https://example.com/studio",
		"https://user:password@example.com",
		"https://example.com?token=secret",
	])("rejects invalid upstream %s", (origin) => {
		expect(() => studioRewrites(origin)).toThrow();
	});
});

import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
	revalidateTag: vi.fn(),
	revalidatePath: vi.fn(),
	getGtfsFeed: vi.fn(),
}));

vi.mock("next/cache", () => ({
	revalidateTag: mocks.revalidateTag,
	revalidatePath: mocks.revalidatePath,
}));
vi.mock("../env/server", () => ({
	serverEnv: {
		SANITY_WEBHOOK_SECRET: "test-secret",
		NEXT_PUBLIC_HOMEPAGE_DOC_NAME: "homepage",
		NEXT_PUBLIC_SETTINGS_DOC_NAME: "siteConfig",
	},
}));
vi.mock("../api", () => ({ getGtfsFeed: mocks.getGtfsFeed }));

import { GET } from "../app/api/gtfs/route";
import { POST } from "../app/api/revalidate/route";

function request(body: string, secret = "test-secret") {
	const timestamp = Date.now().toString();
	const signature = createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("base64url");
	return new Request("https://example.com/api/revalidate", {
		method: "POST",
		headers: { "sanity-webhook-signature": `t=${timestamp},v1=${signature}` },
		body,
	});
}

beforeEach(() => {
	vi.clearAllMocks();
	vi.spyOn(console, "info").mockImplementation(() => {});
	vi.spyOn(console, "warn").mockImplementation(() => {});
	vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
	vi.useRealTimers();
	vi.unstubAllGlobals();
	vi.restoreAllMocks();
});

describe("webhook route", () => {
	it("invalidates immediately after the consistency wait, not stale-while-revalidate", async () => {
		vi.useFakeTimers();
		const response = POST(request(JSON.stringify({ _id: "homepage", _type: "page", slug: { current: "/" } })));
		// Signature validation uses Web Crypto, which must settle before advancing its timer.
		await vi.waitFor(() => expect(vi.getTimerCount()).toBeGreaterThan(0));
		await vi.runAllTimersAsync();
		expect((await response).status).toBe(200);
		expect(mocks.revalidateTag).toHaveBeenCalledWith("page-homepage", { expire: 0 });
		expect(mocks.revalidatePath).toHaveBeenCalledWith("/");
	});
	it("rejects malformed or forged requests without invalidating content", async () => {
		expect((await POST(request("{}"))).status).toBe(400);
		expect((await POST(request('{"_id":"homepage","_type":"page"}', "wrong"))).status).toBe(401);
		expect(mocks.revalidateTag).not.toHaveBeenCalled();
	});
	it("logs failures and returns an explicit error", async () => {
		vi.useFakeTimers();
		mocks.revalidateTag.mockImplementationOnce(() => {
			throw new Error("cache unavailable");
		});
		const response = POST(request(JSON.stringify({ _id: "nav", _type: "navItem" })));
		await vi.waitFor(() => expect(vi.getTimerCount()).toBeGreaterThan(0));
		await vi.runAllTimersAsync();
		expect((await response).status).toBe(500);
		expect(console.error).toHaveBeenCalled();
	});
});

describe("GTFS route", () => {
	it("serves the configured asset", async () => {
		mocks.getGtfsFeed.mockResolvedValue({ feed: { asset: { url: "https://cdn.sanity.io/feed.zip" } } });
		vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(new Uint8Array([80, 75]))));
		const response = await GET();
		expect(response.status).toBe(200);
		expect(response.headers.get("Content-Type")).toBe("application/zip");
	});
	it("does not expose internal errors to download callers", async () => {
		mocks.getGtfsFeed.mockRejectedValue(new Error("private diagnostic detail"));
		const response = await GET();
		expect(response.status).toBe(500);
		expect(await response.json()).toEqual({ error: "Unable to download GTFS feed" });
		expect(console.error).toHaveBeenCalled();
	});
});

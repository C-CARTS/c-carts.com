import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
	getAllPageSlugs: vi.fn(),
	getHomepage: vi.fn(),
}));

vi.mock("../api", () => mocks);
vi.mock("../env/global", () => ({
	globalEnv: { NEXT_PUBLIC_BASE_URL: "https://c-carts.com" },
}));

import sitemap from "../app/sitemap";

describe("sitemap", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("uses the canonical site URL for the homepage and excludes the homepage slug", async () => {
		mocks.getAllPageSlugs.mockResolvedValue([
			{ slug: { current: "/" }, includeInSitemap: true },
			{ slug: { current: "about" } },
			{ slug: { current: "hidden" }, includeInSitemap: false },
		]);
		mocks.getHomepage.mockResolvedValue({ slug: { current: "/" }, includeInSitemap: true });

		await expect(sitemap()).resolves.toEqual([
			{ url: "https://c-carts.com/", priority: 1 },
			{ url: "https://c-carts.com/about", priority: 0.5 },
		]);
	});

	it("respects the homepage sitemap setting", async () => {
		mocks.getAllPageSlugs.mockResolvedValue([{ slug: { current: "/" }, includeInSitemap: true }]);
		mocks.getHomepage.mockResolvedValue({ slug: { current: "/" }, includeInSitemap: false });

		await expect(sitemap()).resolves.toEqual([]);
	});
});

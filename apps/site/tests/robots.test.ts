import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
	getAllPageSlugs: vi.fn(),
}));

vi.mock("../api", () => mocks);
vi.mock("../env/global", () => ({
	globalEnv: { NEXT_PUBLIC_BASE_URL: "https://c-carts.com" },
}));

import robots from "../app/robots";

describe("robots metadata route", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("disallows only pages marked in Sanity and publishes the sitemap URL", async () => {
		mocks.getAllPageSlugs.mockResolvedValue([
			{ slug: { current: "public-page" }, disallowRobots: false },
			{ slug: { current: "private-page" }, disallowRobots: true },
			{ slug: { current: "/" }, disallowRobots: true },
		]);

		await expect(robots()).resolves.toEqual({
			rules: { userAgent: "*", disallow: ["/private-page", "/"] },
			sitemap: "https://c-carts.com/sitemap.xml",
		});
	});
});

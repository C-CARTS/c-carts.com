import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
	getSiteConfig: vi.fn(),
}));

vi.mock("../api", () => mocks);

import manifest from "../app/manifest";

describe("web app manifest", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mocks.getSiteConfig.mockResolvedValue({ shortTitle: "C-CARTS", title: "C-CARTS Website" });
	});

	it("uses valid JPEG MIME types for screenshots", async () => {
		const result = await manifest();

		expect(result.screenshots.map(({ type }) => type)).toEqual(["image/jpeg", "image/jpeg"]);
	});
});

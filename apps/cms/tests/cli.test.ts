import { describe, expect, it, vi } from "vitest";

vi.mock("../env", () => ({
	studioEnv: {
		SANITY_STUDIO_PROJECT_ID: "testproject",
		SANITY_STUDIO_DATASET: "production",
	},
}));

import config from "../sanity.cli";

describe("Studio deployment configuration", () => {
	it("targets the Sanity-hosted Studio without enabling runtime updates", () => {
		expect(config.studioHost).toBe("c-carts");
		expect(config.deployment?.autoUpdates).toBe(false);
	});
});

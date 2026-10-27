import { describe, expect, it } from "vitest";
import nextConfig from "../next.config";

describe("image security configuration", () => {
	it("allows SVG optimization only with safe response headers", () => {
		const config = nextConfig("phase-production-build");

		expect(config.images).toMatchObject({
			dangerouslyAllowSVG: true,
			contentDispositionType: "attachment",
			contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		});
	});
});

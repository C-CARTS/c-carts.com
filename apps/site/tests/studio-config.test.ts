import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants";
import { afterEach, describe, expect, it, vi } from "vitest";
import nextConfig from "../next.config";

afterEach(() => vi.unstubAllEnvs());

describe("Studio redirect configuration", () => {
	it.each([
		[PHASE_DEVELOPMENT_SERVER, false],
		[PHASE_PRODUCTION_BUILD, true],
	])("uses the correct redirect permanence for %s", async (phase, permanent) => {
		vi.stubEnv("STUDIO_ORIGIN", "https://studio.c-carts.com");
		vi.stubEnv("NEXT_PUBLIC_BASE_URL", "https://c-carts.com");
		const config = nextConfig(phase);
		expect(config.rewrites).toBeUndefined();
		expect(await config.redirects?.()).toEqual([
			{ source: "/studio", destination: "https://studio.c-carts.com/", permanent },
			{ source: "/studio/:path*", destination: "https://studio.c-carts.com/:path*", permanent },
		]);
	});

	it("fails server routing configuration if the destination is missing", async () => {
		vi.stubEnv("STUDIO_ORIGIN", undefined);
		await expect(nextConfig(PHASE_DEVELOPMENT_SERVER).redirects?.()).rejects.toThrow();
	});

	it("rejects redirecting to the website's own origin", async () => {
		vi.stubEnv("STUDIO_ORIGIN", "https://c-carts.com");
		vi.stubEnv("NEXT_PUBLIC_BASE_URL", "https://c-carts.com");
		await expect(nextConfig(PHASE_PRODUCTION_BUILD).redirects?.()).rejects.toThrow("must not point back");
	});
});

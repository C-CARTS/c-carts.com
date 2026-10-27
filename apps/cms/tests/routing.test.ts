import { describe, expect, it } from "vitest";
import vercel from "../vercel.json";

function firstPathRoute(pathname: string) {
	return vercel.routes.find((route) => "src" in route && new RegExp(`^${route.src}$`).test(pathname));
}

describe("standalone Studio static hosting", () => {
	it.each([
		["/studio/assets/app.js", "/assets/app.js"],
		["/studio/assets/missing.css", "/assets/missing.css"],
		["/studio/static/app.js", "/static/app.js"],
		["/studio/favicon.ico", "/favicon.ico"],
	])("serves %s as a file, never the SPA fallback", (pathname, expected) => {
		const route = firstPathRoute(pathname);
		expect(route).toBeDefined();
		if (!route || !("src" in route) || !("dest" in route)) {
			throw new Error("Missing static asset route");
		}
		expect(pathname.replace(new RegExp(`^${route.src}$`), route.dest)).toBe(expected);
	});

	it.each(["/studio", "/studio/", "/studio/structure/settings", "/studio/structure/page;drafts.homepage"])(
		"falls back to the Studio HTML for %s",
		(pathname) => {
			expect(firstPathRoute(pathname)).toMatchObject({ dest: "/index.html" });
		},
	);

	it.each(["/studio/missing.js", "/studio/deep/missing.css", "/studio/missing.js.map"])(
		"does not disguise an unrecognized asset request as HTML: %s",
		(pathname) => {
			expect(firstPathRoute(pathname)).toMatchObject({ status: 404 });
		},
	);
});

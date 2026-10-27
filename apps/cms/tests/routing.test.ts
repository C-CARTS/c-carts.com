import { describe, expect, it } from "vitest";
import vercel from "../vercel.json";

function firstPathRoute(pathname: string) {
	return vercel.routes.find((route) => "src" in route && new RegExp(`^${route.src}$`).test(pathname));
}

describe("standalone Studio static hosting", () => {
	it("serves existing files before applying the SPA fallback or missing-asset rules", () => {
		expect(vercel.routes[0]).toEqual({ handle: "filesystem" });
	});

	it.each(["/", "/structure/settings", "/structure/page;drafts.homepage", "/intent/edit/id=homepage;type=page"])(
		"falls back to the Studio HTML for %s",
		(pathname) => {
			expect(firstPathRoute(pathname)).toMatchObject({ dest: "/index.html" });
		},
	);

	it.each([
		"/assets/missing.js",
		"/static/missing.css",
		"/static/missing-font.woff2",
		"/missing.js",
		"/deep/missing.css",
		"/missing.js.map",
		"/favicon.ico",
		"/manifest.webmanifest",
	])("does not disguise an unrecognized asset request as HTML: %s", (pathname) => {
		expect(firstPathRoute(pathname)).toMatchObject({ status: 404 });
	});
});

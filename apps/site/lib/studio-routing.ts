import { z } from "zod";

export const StudioOriginSchema = z.url().refine((value) => {
	const url = new URL(value);
	return (
		(url.protocol === "https:" || (url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))) &&
		url.pathname === "/" &&
		!url.search &&
		!url.hash &&
		!url.username &&
		!url.password
	);
}, "STUDIO_ORIGIN must be an HTTPS origin (or local HTTP origin), without a path or credentials");

export function studioRedirects(
	origin: string | undefined,
	{ permanent = true, siteOrigin }: { permanent?: boolean; siteOrigin?: string } = {},
) {
	const target = new URL(StudioOriginSchema.parse(origin)).origin;
	if (siteOrigin && target === new URL(siteOrigin).origin) {
		throw new Error("STUDIO_ORIGIN must not point back to the public site");
	}
	return [
		{ source: "/studio", destination: `${target}/`, permanent },
		{ source: "/studio/:path*", destination: `${target}/:path*`, permanent },
	];
}

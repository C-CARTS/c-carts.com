import { z } from "zod";

const OriginSchema = z.url().refine((value) => {
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

export function studioRewrites(origin: string | undefined) {
	if (!origin) {
		// Generation and static checks do not need a deployed Studio. Production validation requires this value.
		return [];
	}
	const target = new URL(OriginSchema.parse(origin)).origin;
	return [
		{ source: "/studio", destination: `${target}/studio` },
		{ source: "/studio/:path*", destination: `${target}/studio/:path*` },
	];
}

import type { MetadataRoute } from "next";
import { getAllPageSlugs } from "../api";
import { globalEnv } from "../env/global";

const baseUrl = globalEnv.NEXT_PUBLIC_BASE_URL;

function routePath(slug: string): string {
	return slug === "/" ? "/" : `/${slug.replace(/^\/+|\/+$/g, "")}`;
}

export default async function robots(): Promise<MetadataRoute.Robots> {
	const pages = await getAllPageSlugs();
	const disallow = pages.flatMap(({ slug, disallowRobots }) =>
		disallowRobots && slug?.current ? [routePath(slug.current)] : [],
	);

	return {
		rules: { userAgent: "*", disallow },
		sitemap: new URL("/sitemap.xml", baseUrl).toString(),
	};
}

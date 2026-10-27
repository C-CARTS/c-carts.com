import type { Slug } from "@c-carts/types";
import type { MetadataRoute } from "next";
import { getAllPageSlugs, getHomepage } from "../api";
import { globalEnv } from "../env/global";

const baseUrl = globalEnv.NEXT_PUBLIC_BASE_URL;

function buildUrl({ current: slug }: Slug): string {
	return new URL(slug ?? "/", baseUrl).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const pages = await getAllPageSlugs();
	const homepage = await getHomepage();
	const homepageSlug = homepage.slug.current;

	const pageNodes = pages.flatMap(({ slug, includeInSitemap }) =>
		includeInSitemap !== false && slug?.current && slug.current !== homepageSlug
			? [
					{
						url: buildUrl(slug),
						priority: 0.5,
					},
				]
			: [],
	);

	return [
		...(homepage.includeInSitemap !== false ? [{ url: new URL("/", baseUrl).toString(), priority: 1 }] : []),
		...pageNodes,
	];
}

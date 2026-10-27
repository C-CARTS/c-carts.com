import type { Slug } from "@c-carts/types";
import type { MetadataRoute } from "next";
import { getAllPageSlugs, getHomepage } from "../api";
import { globalEnv } from "../env/global";

const baseUrl = globalEnv.NEXT_PUBLIC_BASE_URL;

function buildUrl({ current: slug }: Slug): string {
	return `${baseUrl}/${slug ?? ""}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const pages = await getAllPageSlugs();
	const homepageSlug = (await getHomepage()).slug.current;

	const pageNodes = pages.flatMap(({ slug }) =>
		slug?.current && slug.current !== homepageSlug
			? [
					{
						url: buildUrl(slug),
						priority: 0.5,
					},
				]
			: [],
	);

	return [
		{
			url: "baseUrl",
			priority: 1,
		},
		...pageNodes,
	];
}

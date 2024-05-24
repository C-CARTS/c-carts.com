import { MetadataRoute } from "next";
import { Slug } from "sanity";
import { getAllPageSlugs, getHomepage } from "../api";
import throwError from "../helpers/throwError";

const baseUrl =
	process.env.NEXT_PUBLIC_BASE_URL ??
	throwError("NEXT_PUBLIC_BASE_URL is required");

function buildUrl({ current: slug }: Slug): string {
	return `${baseUrl}/${slug}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const pages = await getAllPageSlugs();
	const {
		slug: { current: homepageSlug },
	} = await getHomepage();

	const pageNodes = pages
		.filter(({ slug: { current: slug } }) => slug !== homepageSlug)
		.map(({ slug }) => ({
			url: buildUrl(slug),
			priority: 0.5,
		}));

	return [
		{
			url: "baseUrl",
			priority: 1,
		},
		...pageNodes,
	];
}

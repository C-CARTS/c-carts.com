import { defineQuery } from "groq";

export const SITE_CONFIG_QUERY = defineQuery(`*[_id == $id && _type == "siteConfig"][0]`);
export const NAV_ITEMS_QUERY = defineQuery(`*[_type == "navItem"]{
	_id, _type, title, sortOrder, children[]->{_id, title, slug}
} | order(sortOrder asc)`);
export const PAGE_BY_ID_QUERY = defineQuery(`*[_id == $id && _type == "page"][0]`);
export const PAGE_BY_SLUG_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]`);
export const IMAGE_QUERY = defineQuery(`*[_id == $id && _type == "sanity.imageAsset"][0]`);
export const PAGE_SLUGS_QUERY = defineQuery(`*[_type == "page"]{slug, includeInSitemap, disallowRobots}`);
export const FILE_QUERY = defineQuery(`*[_id == $id && _type == "sanity.fileAsset"][0]`);
export const JOBS_QUERY = defineQuery(`*[_type == "job"] | order(_createdAt desc)`);
export const NEWS_QUERY = defineQuery(`*[_type == "news"] | order(_createdAt desc)`);
export const NEWS_ITEM_QUERY = defineQuery(`*[_type == "news" && slug.current == $slug][0]`);
export const PERFORMANCE_QUERY = defineQuery(`*[_type == "performance"] | order(year desc, quarter desc)`);
export const JOB_QUERY = defineQuery(`*[_type == "job" && slug.current == $slug][0]`);
export const GTFS_QUERY = defineQuery(`*[_id == $id && _type == "gtfsFeed"][0]{..., feed{asset->}}`);

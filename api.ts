import { Slug } from "sanity";
import "server-only";
import type FileAsset from "./@types/fileAsset";
import GtfsFeed from "./@types/gtfsFeed";
import type ImageData from "./@types/imageData";
import type Job from "./@types/job";
import type NavItem from "./@types/navItem";
import type News from "./@types/news";
import type Page from "./@types/page";
import type Performance from "./@types/performance";
import type SiteConfig from "./@types/siteConfig";
import throwError from "./helpers/throwError";
import { client } from "./sanity/lib/client";

const isDev = process.env.NODE_ENV === "development";

// Cached responses must expire. With `cache: "force-cache"` they never do, and the Vercel Data Cache keeps them
// across deployments, so ISR regeneration could serve stale Sanity content. Webhook tag revalidation handles
// immediate updates; this TTL is the safety net.
const DATA_CACHE_TTL_SECONDS = 14_400; // 4 hours

function cacheOptions(tags: string[]) {
	return isDev
		? { cache: "no-store" as const }
		: { next: { revalidate: DATA_CACHE_TTL_SECONDS, tags } };
}

const settingsName =
	process.env.NEXT_PUBLIC_SETTINGS_DOC_NAME ??
	throwError("No NEXT_PUBLIC_SETTINGS_DOC_NAME");

const homepageName =
	process.env.NEXT_PUBLIC_HOMEPAGE_DOC_NAME ??
	throwError("No NEXT_PUBLIC_HOMEPAGE_DOC_NAME");

const jobsPageName =
	process.env.NEXT_PUBLIC_JOBS_PAGE_DOC_NAME ??
	throwError("No NEXT_PUBLIC_JOBS_PAGE_DOC_NAME");

const newsPageName =
	process.env.NEXT_PUBLIC_NEWS_PAGE_DOC_NAME ??
	throwError("No NEXT_PUBLIC_NEWS_PAGE_DOC_NAME");

const performancePageName =
	process.env.NEXT_PUBLIC_PERFORMANCE_PAGE_DOC_NAME ??
	throwError("No NEXT_PUBLIC_PERFORMANCE_PAGE_DOC_NAME");

export async function getSiteConfig(): Promise<SiteConfig> {
	const query = `*[ _id == '${settingsName}' && _type == 'siteConfig' ][0]`;
	return await client.fetch(
		query,
		{},
		cacheOptions([settingsName]),
	);
}

export async function getNavItems(): Promise<NavItem[]> {
	const query = `* [ _type == 'navItem' ]{
		_id,
		title,
		sortOrder,
		slug,
		children[]->{ _id, title, slug }
	} | order(sortOrder asc)`;
	return await client.fetch<NavItem[]>(
		query,
		{},
		cacheOptions(["nav"]),
	);
}

export async function getHomepage(): Promise<Page> {
	const query = `*[ _id == '${homepageName}' && _type == 'page' ][0]`;
	return await client.fetch(
		query,
		{},
		cacheOptions([`page-${homepageName}`]),
	);
}

export async function getJobsPage(): Promise<Page> {
	const query = `*[ _id == '${jobsPageName}' && _type == 'page' ][0]`;
	return await client.fetch(
		query,
		{},
		cacheOptions([`page-${jobsPageName}`]),
	);
}

export async function getPerformancePage(): Promise<Page> {
	const query = `*[ _id == '${performancePageName}' && _type == 'page' ][0]`;
	return await client.fetch(
		query,
		{},
		cacheOptions([`page-${performancePageName}`]),
	);
}

export async function getNewsPage(): Promise<Page> {
	const query = `*[ _id == '${newsPageName}' && _type == 'page' ][0]`;
	return await client.fetch(
		query,
		{},
		cacheOptions([`page-${newsPageName}`]),
	);
}

export async function getPage(slug: string): Promise<Page> {
	const query = `*[ slug.current == '${slug}' && _type == 'page' ][0]`;
	const data = await client.fetch(
		query,
		{},
		cacheOptions([`page-${slug}`]),
	);
	return data;
}

export async function getImage(id: string): Promise<ImageData> {
	const query = `*[ _id == '${id}' && _type == 'sanity.imageAsset' ][0]`;
	const data = await client.fetch(
		query,
		{},
		cacheOptions(["images"]),
	);
	return data;
}

export async function getAllPageSlugs(): Promise<{ slug: Slug }[]> {
	const query = `*[_type == 'page'] { slug }`;
	return await client.fetch(query, {}, { cache: "no-store" });
}

export async function getFile(id: string): Promise<FileAsset> {
	const query = `*[ _id == '${id}' && _type == 'sanity.fileAsset' ][0]`;
	const data = await client.fetch(
		query,
		{},
		cacheOptions(["files"]),
	);
	return data;
}

export async function getJobs(): Promise<Job[]> {
	const query = `*[_type == 'job'] | order(date desc)`;

	const data = await client.fetch(
		query,
		{},
		cacheOptions(["jobs"]),
	);

	return data;
}

export async function getNews(): Promise<News[]> {
	const query = `*[_type == 'news'] | order(date desc)`;

	const data = await client.fetch(
		query,
		{},
		cacheOptions(["news"]),
	);

	return data;
}

export async function getNewsItem(slug: string): Promise<News> {
	const query = `*[_type == 'news' && slug.current == '${slug}'][0]`;

	const data = await client.fetch(
		query,
		{},
		cacheOptions([`news-${slug}`]),
	);

	return data;
}

export async function getPerformanceData(): Promise<Performance[]> {
	const query = `*[_type == 'performance'] | order(date desc) | order(quarter desc)`;

	const data = await client.fetch(
		query,
		{},
		cacheOptions([`performance`]),
	);

	return data;
}

export async function getJob(slug: string): Promise<Job> {
	const query = `*[_type == 'job' && slug.current == '${slug}'][0]`;

	const data = await client.fetch(
		query,
		{},
		cacheOptions([`jobs-${slug}`]),
	);

	return data;
}

export async function getGtfsFeed(): Promise<GtfsFeed> {
	const query = `*[_type == "gtfsFeed"][0]{ ..., feed{asset-> }}`;
	return await client.fetch(
		query,
		{},
		cacheOptions(["gtfsFeed"]),
	);
}

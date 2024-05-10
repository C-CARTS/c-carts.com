import { Slug } from "sanity";
import "server-only";
import FileAsset from "../@types/fileAsset";
import type ImageData from "../@types/imageData";
import Job from "../@types/job";
import type NavItem from "../@types/navItem";
import News from "../@types/news";
import type Page from "../@types/page";
import Performance from "../@types/performance";
import type SiteConfig from "../@types/siteConfig";
import { client } from "../sanity/lib/client";
import throwError from "./throwError";

const isDev = process.env.NODE_ENV === "development";
const cache = isDev ? "no-store" : "force-cache";

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
		{
			cache,
			next: { tags: [settingsName] },
		},
	);
}

export async function getNavItems(): Promise<NavItem[]> {
	const query = `* [ _type == 'navItem' ]{
		_id,
		title,
		slug,
		children[]->{ _id, title, slug }
	  }`;
	return await client.fetch<NavItem[]>(
		query,
		{},
		{
			cache,
			next: { tags: ["nav"] },
		},
	);
}

export async function getHomepage(): Promise<Page> {
	const query = `*[ _id == '${homepageName}' && _type == 'page' ][0]`;
	return await client.fetch(
		query,
		{},
		{
			cache,
			next: { tags: [`page-${homepageName}`] },
		},
	);
}

export async function getJobsPage(): Promise<Page> {
	const query = `*[ _id == '${jobsPageName}' && _type == 'page' ][0]`;
	return await client.fetch(
		query,
		{},
		{
			cache,
			next: { tags: [`page-${jobsPageName}`] },
		},
	);
}

export async function getPerformancePage(): Promise<Page> {
	const query = `*[ _id == '${performancePageName}' && _type == 'page' ][0]`;
	return await client.fetch(
		query,
		{},
		{
			cache,
			next: { tags: [`page-${performancePageName}`] },
		},
	);
}

export async function getNewsPage(): Promise<Page> {
	const query = `*[ _id == '${newsPageName}' && _type == 'page' ][0]`;
	return await client.fetch(
		query,
		{},
		{
			cache,
			next: { tags: [`page-${newsPageName}`] },
		},
	);
}

export async function getPage(slug: string): Promise<Page> {
	const query = `*[ slug.current == '${slug}' && _type == 'page' ][0]`;
	const data = await client.fetch(
		query,
		{},
		{
			cache,
			next: { tags: [`page-${slug}`] },
		},
	);
	return data;
}

export async function getImage(id: string): Promise<ImageData> {
	const query = `*[ _id == '${id}' && _type == 'sanity.imageAsset' ][0]`;
	const data = await client.fetch(
		query,
		{},
		{
			cache,
			next: { tags: ["images"] },
		},
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
		{
			cache,
			next: { tags: ["files"] },
		},
	);
	return data;
}

export async function getJobs(): Promise<Job[]> {
	const query = `*[_type == 'job'] | order(date desc)`;

	const data = await client.fetch(
		query,
		{},
		{
			cache,
			next: { tags: ["jobs"] },
		},
	);

	return data;
}

export async function getNews(): Promise<News[]> {
	const query = `*[_type == 'news'] | order(date desc)`;

	const data = await client.fetch(
		query,
		{},
		{
			cache,
			next: { tags: ["news"] },
		},
	);

	return data;
}

export async function getNewsItem(slug: string): Promise<News> {
	const query = `*[_type == 'news' && slug.current == '${slug}'][0]`;

	const data = await client.fetch(
		query,
		{},
		{
			cache,
			next: { tags: [`news-${slug}`] },
		},
	);

	return data;
}

export async function getPerformanceData(): Promise<Performance[]> {
	const query = `*[_type == 'performance'] | order(date desc) | order(quarter desc)`;

	const data = await client.fetch(
		query,
		{},
		{
			cache,
			next: { tags: [`performance`] },
		},
	);

	return data;
}

export async function getJob(slug: string): Promise<Job> {
	const query = `*[_type == 'job' && slug.current == '${slug}'][0]`;

	const data = await client.fetch(
		query,
		{},
		{
			cache,
			next: { tags: [`jobs-${slug}`] },
		},
	);

	return data;
}

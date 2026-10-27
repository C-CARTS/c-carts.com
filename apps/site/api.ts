import "server-only";
import type {} from "@c-carts/types";
import { serverEnv } from "./env/server";
import { cacheOptions } from "./lib/sanity/cache";
import { client } from "./lib/sanity/client";
import { FileDetailsSchema, ImageDetailsSchema } from "./lib/sanity/content";
import {
	FILE_QUERY,
	GTFS_QUERY,
	IMAGE_QUERY,
	JOB_QUERY,
	JOBS_QUERY,
	NAV_ITEMS_QUERY,
	NEWS_ITEM_QUERY,
	NEWS_QUERY,
	PAGE_BY_ID_QUERY,
	PAGE_BY_SLUG_QUERY,
	PAGE_SLUGS_QUERY,
	PERFORMANCE_QUERY,
	SITE_CONFIG_QUERY,
} from "./lib/sanity/queries";

function required<T>(value: T | null, label: string): T {
	if (value === null) throw new Error(`Required Sanity content is missing: ${label}`);
	return value;
}

export async function getSiteConfig() {
	const id = serverEnv.NEXT_PUBLIC_SETTINGS_DOC_NAME;
	return required(await client.fetch(SITE_CONFIG_QUERY, { id }, cacheOptions([id])), "site settings");
}

export async function getNavItems() {
	const items = await client.fetch(NAV_ITEMS_QUERY, {}, cacheOptions(["nav"]));
	return items.map((item) => ({
		...item,
		children: (item.children ?? []).filter((child) => {
			if (!child) console.warn("Navigation contains a missing document reference", { id: item._id });
			return child !== null;
		}),
	}));
}

async function getPageById(id: string) {
	return required(await client.fetch(PAGE_BY_ID_QUERY, { id }, cacheOptions([`page-${id}`])), id);
}

export const getHomepage = () => getPageById(serverEnv.NEXT_PUBLIC_HOMEPAGE_DOC_NAME);
export const getJobsPage = () => getPageById(serverEnv.NEXT_PUBLIC_JOBS_PAGE_DOC_NAME);
export const getNewsPage = () => getPageById(serverEnv.NEXT_PUBLIC_NEWS_PAGE_DOC_NAME);
export const getPerformancePage = () => getPageById(serverEnv.NEXT_PUBLIC_PERFORMANCE_PAGE_DOC_NAME);

export function getPage(slug: string) {
	return client.fetch(PAGE_BY_SLUG_QUERY, { slug }, cacheOptions([`page-${slug}`]));
}

export async function getImage(id: string) {
	const image = required(await client.fetch(IMAGE_QUERY, { id }, cacheOptions(["images"])), `image ${id}`);
	return ImageDetailsSchema.parse(image);
}

export function getAllPageSlugs() {
	return client.fetch(PAGE_SLUGS_QUERY, {}, { cache: "no-store" });
}

export async function getFile(id: string) {
	const file = required(await client.fetch(FILE_QUERY, { id }, cacheOptions(["files"])), `file ${id}`);
	return FileDetailsSchema.parse(file);
}

export function getJobs() {
	return client.fetch(JOBS_QUERY, {}, cacheOptions(["jobs"]));
}

export function getNews() {
	return client.fetch(NEWS_QUERY, {}, cacheOptions(["news"]));
}

export function getNewsItem(slug: string) {
	return client.fetch(NEWS_ITEM_QUERY, { slug }, cacheOptions([`news-${slug}`]));
}

export function getPerformanceData() {
	return client.fetch(PERFORMANCE_QUERY, {}, cacheOptions(["performance"]));
}

export function getJob(slug: string) {
	return client.fetch(JOB_QUERY, { slug }, cacheOptions([`jobs-${slug}`]));
}

export async function getGtfsFeed() {
	return required(await client.fetch(GTFS_QUERY, {}, cacheOptions(["gtfsFeed"])), "GTFS feed");
}

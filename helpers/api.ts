import { Slug } from "sanity";
import "server-only";
import FileAsset from "../@types/fileAsset";
import type ImageData from "../@types/imageData";
import type NavItem from "../@types/navItem";
import type Page from "../@types/page";
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

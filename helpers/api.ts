import NavItem from "../@types/navItem";
import Page from "../@types/page";
import SiteConfig from "../@types/siteConfig";
import { client } from "../sanity/lib/client";
import throwError from "./throwError";

const settingsName =
	process.env.NEXT_PUBLIC_SETTINGS_DOC_NAME ??
	throwError("No NEXT_PUBLIC_SETTINGS_DOC_NAME");

const homepageName =
	process.env.NEXT_PUBLIC_HOMEPAGE_DOC_NAME ??
	throwError("No NEXT_PUBLIC_HOMEPAGE_DOC_NAME");

export function getSiteConfig(): Promise<SiteConfig> {
	const query = `*[ _id == '${settingsName}' && _type == 'siteConfig' ][0]`;
	return client.fetch<SiteConfig>(query);
}

export function getNavItems(): Promise<NavItem[]> {
	const query = `* [ _type == 'navItem' ]{
		_id,
		title,
		slug,
		children[]->{ _id, title, slug }
	  }`;
	return client.fetch<NavItem[]>(query);
}

export function getHomepage(): Promise<Page> {
	const query = `*[ _id == '${homepageName}' && _type == 'page' ][0]`;
	return client.fetch<Page>(query);
}

export function getPage(slug: string): Promise<Page> {
	const query = `*[ slug.current == '${slug}' && _type == 'page' ][0]`;
	return client.fetch<Page>(query);
}

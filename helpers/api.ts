import NavItem from "../@types/navItem";
import SiteConfig from "../@types/siteConfig";
import { client } from "../sanity/lib/client";

export async function getSiteConfig(): Promise<SiteConfig> {
	const query = `*[ _id == 'siteConfig' && _type == 'siteConfig' ][0]`;
	const config = await client.fetch<SiteConfig>(query);
	return config;
}

export async function getNavItems(): Promise<NavItem[]> {
	const query = `* [ _type == 'navItem' ]{
		_id,
		title,
		slug,
		children[]->{ _id, title, slug }
	  }`;
	const result = await client.fetch<NavItem[]>(query);
	console.log("nav", result);
	return result;
}

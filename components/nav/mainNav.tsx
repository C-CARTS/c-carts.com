import { getNavItems, getSiteConfig } from "../../helpers/api";
import MainNavClient from "./mainNavClient";

export default async function MainNav() {
	const navItems = await getNavItems();
	const siteConfig = await getSiteConfig();
	const { shortTitle } = siteConfig;

	return <MainNavClient navItems={navItems} shortTitle={shortTitle} />;
}

import { NavItem, Page, SanityKeyedReference } from '@c-carts/cms';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { createDataHook } from 'next-data-hooks';
import sanityClient from '../sanity/sanityClient';
import useSiteConfig from './useSiteConfig';

export interface MainNavItem extends NavItem {
	subPages: Page[];
}

export async function getMainNav(mainNavigation: SanityKeyedReference<NavItem>[], pages: Page[], navItems: NavItem[]): Promise<MainNavItem[]> {
	const items: MainNavItem[] = [];

	for (let i = 0; i < mainNavigation.length; i++) {
		const item = mainNavigation[i];
		const matchedItem = navItems.filter((ni) => ni._id === item._ref)[0];
		const subPageIds = matchedItem.routes?.map((r) => r._ref) ?? [];
		const subPages = pages.filter((p) => subPageIds.indexOf(p._id) > -1);

		items.push({
			...matchedItem,
			subPages
		});
	}
	return items;
}

const useMainNav = createDataHook<MainNavItem[]>('mainNav', async (context: GetStaticPropsContext | GetServerSidePropsContext) => {
	const data = await useSiteConfig.getData(context);
	const { mainNavigation } = data;

	if (mainNavigation) {
		const pages = await sanityClient.getAll('page');
		const navItems = await sanityClient.getAll('navItem');
		const result = await getMainNav(mainNavigation, pages, navItems);
		return result;
	}
	return [];
});

export default useMainNav;

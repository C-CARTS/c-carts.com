import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { createDataHook } from 'next-data-hooks';
import sanityClient from '../sanity/sanityClient';
import { NavItem, Page } from '../sanity/schema';
import useSiteConfig from './useSiteConfig';

export interface MainNavItem extends NavItem {
	subPages: Page[];
}

const useMainNav = createDataHook<MainNavItem[]>('mainNav', async (context: GetStaticPropsContext | GetServerSidePropsContext) => {
	const data = await useSiteConfig.getData(context);
	const { mainNavigation } = data;

	if (mainNavigation) {
		const items: MainNavItem[] = [];
		const pages = await sanityClient.getAll('page');
		const navItems = await sanityClient.getAll('navItem');

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
	return [];
});

export default useMainNav;

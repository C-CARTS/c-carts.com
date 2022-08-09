import { News, NavItem, Page } from '@c-carts/cms';
import { createDataHook } from 'next-data-hooks';
import sanityClient from '../sanity/sanityClient';

export interface MainNavItem extends NavItem {
	subPages: Page[];
}

const useNewz = createDataHook<News[]>('NEWS', async () => {
	const Nws = await sanityClient.getAll('news');
	return Nws;
});

export default useNewz;

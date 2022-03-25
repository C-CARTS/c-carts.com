import { NavItem, News, Page } from '@c-carts/cms';
import { createDataHook } from 'next-data-hooks';
import sanityClient from '../sanity/sanityClient';

export interface MainNavItem extends NavItem {
	subPages: Page[];
}

const useNewz = createDataHook<News[]>('news', async () => {
	const news = await sanityClient.getAll('news');
	return news;
});

export default useNewz;

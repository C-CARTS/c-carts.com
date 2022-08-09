import { Routes, NavItem, Page } from '@c-carts/cms';
import { createDataHook } from 'next-data-hooks';
import sanityClient from '../sanity/sanityClient';

export interface MainNavItem extends NavItem {
	subPages: Page[];
}

const useSchedules = createDataHook<Routes[]>('schdul', async () => {
	const routes = await sanityClient.getAll('routes');
	return routes;
});

export default useSchedules;

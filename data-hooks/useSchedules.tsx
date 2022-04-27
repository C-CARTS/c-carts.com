import { Maps, NavItem, Page } from '@c-carts/cms';
import { createDataHook } from 'next-data-hooks';
import sanityClient from '../sanity/sanityClient';

export interface MainNavItem extends NavItem {
	subPages: Page[];
}

const useSchedule = createDataHook<Maps[]>('schedules', async () => {
	const maps = await sanityClient.getAll('maps');
	return maps;
});

export default useSchedule;

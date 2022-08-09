import { Job, NavItem, Page } from '@c-carts/cms';
import { createDataHook } from 'next-data-hooks';
import sanityClient from '../sanity/sanityClient';

export interface MainNavItem extends NavItem {
	subPages: Page[];
}

const useJobs = createDataHook<Job[]>('jobs', async () => {
	const jobs = await sanityClient.getAll('job');
	return jobs;
});

export default useJobs;

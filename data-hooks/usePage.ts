import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { createDataHook } from 'next-data-hooks';
import sanityClient from '../sanity/sanityClient';
import { NavItem, Page } from '../sanity/schema';

export interface MainNavItem extends NavItem {
	subPages: Page[];
}

const usePage = createDataHook<Page>('page', async (context: GetStaticPropsContext | GetServerSidePropsContext) => {
	const { params } = context;
	if (params) {
		const { slug } = params;

		if (typeof slug === 'string') {
			const data = await sanityClient.getAll('page', `slug.current == "${slug}"`);
			return data[0];
		}
	}

	throw new Error('Not found');
});

export default usePage;

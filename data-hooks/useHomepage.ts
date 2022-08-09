import { Page } from '@c-carts/cms';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { createDataHook } from 'next-data-hooks';
import sanityClient from '../sanity/sanityClient';
import useSiteConfig from './useSiteConfig';

const useHomepage = createDataHook<Page>('useHomepage', async (context: GetStaticPropsContext | GetServerSidePropsContext) => {
	const data = await useSiteConfig.getData(context);
	const { frontpage } = data;

	if (frontpage) {
		const { _ref } = frontpage;
		const page = await sanityClient.get('page', _ref);
		return page;
	}
	throw new Error('No frontpage');
});

export default useHomepage;

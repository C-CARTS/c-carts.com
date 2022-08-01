import { News } from '@c-carts/cms';
import { GetStaticPropsContext, GetServerSidePropsContext } from 'next';
import { createDataHook } from 'next-data-hooks';
import sanityClient from '../sanity/sanityClient';

const useNews = createDataHook<News>('news', async (context: GetStaticPropsContext | GetServerSidePropsContext) => {
	const { params } = context;
	if (params) {
		const { slug } = params;

		if (typeof slug === 'string') {
			const data = await sanityClient.getAll('news', `slug.current == "${slug}"`);
			return data[0];
		}
	}

	throw new Error('Not Found');
});
export default useNews;

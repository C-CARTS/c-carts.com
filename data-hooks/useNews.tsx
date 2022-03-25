import { News } from '@c-carts/cms';
import { GetStaticPropsContext, GetServerSidePropsContext } from 'next';
import { createDataHook } from 'next-data-hooks';
import sanityClient from '../sanity/sanityClient';

const useNews = createDataHook<News[]>('news', async (context: GetStaticPropsContext | GetServerSidePropsContext) => {
	// const query = `*[ _type== "page" && _id == 'd3916bca-e2c6-4039-af7d-46e49f58791a']{_id,'content':content[]{dateTime,newsHeading,'content':content[]{children}}}`;
	// const news: Data = await sanityClient.query(query);
	const { params } = context;
	if (params) {
		const { slug } = params;

		if (typeof slug === 'string') {
			const data = await sanityClient.getAll('news', `slug.current == "${slug}"`);
			return data;
		}
	}

	throw new Error('Not Found');
});
export default useNews;

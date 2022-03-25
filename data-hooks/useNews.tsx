import { GetStaticPropsContext, GetServerSidePropsContext } from 'next';
import { createDataHook } from 'next-data-hooks';
import sanityClient from '../sanity/sanityClient';

const useNews = createDataHook('news', async (context: GetStaticPropsContext | GetServerSidePropsContext) => {
	// const query = `*[ _type== "page" && _id == 'd3916bca-e2c6-4039-af7d-46e49f58791a']{_id,'content':content[]{dateTime,newsHeading,'content':content[]{children}}}`;
	// const news: Data = await sanityClient.query(query);
	const { params } = context;
	if (params) {
		const { slug } = params;

		if (typeof slug === 'string') {
			const data = await sanityClient.getAll('page', `slug.current == "${slug}"`);
			return data[0];
		}
	}

	throw new Error('Not Found');
});
export default useNews;

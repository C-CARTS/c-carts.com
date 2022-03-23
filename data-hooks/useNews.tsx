import { createDataHook } from 'next-data-hooks';
import sanityClient from '../sanity/sanityClient';

type Data = Array<Object> | undefined;

const useNews = createDataHook('news', async () => {
	const query = `*[ _type== "page" && _id == 'd3916bca-e2c6-4039-af7d-46e49f58791a']{_id,'content':content[]{dateTime,newsHeading,'content':content[]{children}}}`;
	const news: Data = await sanityClient.query(query);
	return news[0];
});

export default useNews;

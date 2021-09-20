import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { createDataHook } from 'next-data-hooks';
import sanityClient from '../sanity/sanityClient';
import { Job } from '../sanity/schema';

const useJob = createDataHook<Job>('job', async (context: GetStaticPropsContext | GetServerSidePropsContext) => {
	const { params } = context;
	if (params) {
		const { slug } = params;

		if (typeof slug === 'string') {
			const data = await sanityClient.getAll('job', `slug.current == "${slug}"`);
			return data[0];
		}
	}

	throw new Error('Not found');
});

export default useJob;

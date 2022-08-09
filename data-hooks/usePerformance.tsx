import { Performance } from '@c-carts/cms';
import { createDataHook } from 'next-data-hooks';
import sanityClient from '../sanity/sanityClient';

const usePerformance = createDataHook<Performance[]>('perform', async () => {
	const data = await sanityClient.getAll('performance');
	return data;
});

export default usePerformance;

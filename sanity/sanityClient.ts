import { Documents } from '@c-carts/cms';
import sanityClient from '@sanity/client';
import { createClient } from 'sanity-codegen';
import config from './sanityConfig';

export default createClient<Documents>({
	...config,
	fetch
});

export const basicClient = sanityClient(config);

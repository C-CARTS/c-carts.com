import sanityClient from '@sanity/client';
import { createClient } from 'sanity-codegen';
import config from './sanityConfig';
import { Documents } from './schema';

export default createClient<Documents>({
	...config,
	fetch
});

export const imageClient = sanityClient(config);

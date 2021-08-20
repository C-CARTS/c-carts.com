import { createClient } from 'sanity-codegen';
import config from './sanityConfig';
import { Documents } from './schema';

export default createClient<Documents>({
	...config,
	fetch
});

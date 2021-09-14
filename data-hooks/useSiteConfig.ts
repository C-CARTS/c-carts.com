import { createDataHook } from 'next-data-hooks';
import sanityClient from '../sanity/sanityClient';
import { SiteConfig } from '../sanity/schema';

const useSiteConfig = createDataHook<SiteConfig>('SiteConfig', async () => {
	const siteConfig = await sanityClient.get('siteConfig', process.env.SANITY_SITE_CONFIG_ID ?? 'No SANITY_SITE_CONFIG_ID');
	return siteConfig;
});

export default useSiteConfig;

import { SiteConfig } from '@c-carts/cms';
import { createDataHook } from 'next-data-hooks';
import sanityClient from '../sanity/sanityClient';

const useSiteConfig = createDataHook<SiteConfig>('SiteConfig', async () => {
	const siteConfig = await sanityClient.get('siteConfig', process.env.NEXT_PUBLIC_SANITY_SITE_CONFIG_ID ?? 'No NEXT_PUBLIC_SANITY_SITE_CONFIG_ID');
	return siteConfig;
});

export default useSiteConfig;

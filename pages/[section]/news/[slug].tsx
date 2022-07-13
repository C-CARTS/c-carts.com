/* eslint-disable react/jsx-props-no-spreading */
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps } from 'next';
import { getDataHooksProps } from 'next-data-hooks';
import CardNews from '../../../components/card/cardNews';

import GenericPage from '../../../components/generic/genericPage';
import useMainNav, { getMainNav } from '../../../data-hooks/useMainNav';
import useNews from '../../../data-hooks/useNews';
import useSiteConfig from '../../../data-hooks/useSiteConfig';
import sanityClient from '../../../sanity/sanityClient';

const newsSlug = 'news';
/**
 * It renders a page that shows the news updates.
 * @returns A page with a news component and a link back to the news page.
 */

export default function NewsUpdates() {
	const siteConfig = useSiteConfig();
	const mainNav = useMainNav();
	const news = useNews();

	return (
		<GenericPage title="" siteConfig={siteConfig} mainNav={mainNav}>
			<CardNews currentNews={news} />
		</GenericPage>
	);
}

NewsUpdates.dataHooks = [useSiteConfig, useMainNav, useNews];

export const getStaticPaths: GetStaticPaths = async () => {
	const config = await sanityClient.get('siteConfig', process.env.NEXT_PUBLIC_SANITY_SITE_CONFIG_ID ?? 'No Config');
	const { mainNavigation } = config;
	if (mainNavigation) {
		const pages = await sanityClient.getAll('page');
		const navItems = await sanityClient.getAll('navItem');
		const mainNav = await getMainNav(mainNavigation, pages, navItems);

		const newsNavItem = mainNav.filter(({ subPages }) => subPages.filter((item) => item.slug?.current === newsSlug).length > 0)[0];
		const section = newsNavItem.slug?.current ?? '';

		const newz = await sanityClient.getAll('news');

		const paths = newz.map((n) => ({ params: { section, slug: n.slug?.current } }));

		return {
			paths,
			fallback: false
		};
	}

	return {
		paths: [],
		fallback: false
	};
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPathsContext) => {
	const dataHookProps = await getDataHooksProps({
		context,
		dataHooks: NewsUpdates.dataHooks
	});
	return {
		props: {
			...dataHookProps
		}
	};
};

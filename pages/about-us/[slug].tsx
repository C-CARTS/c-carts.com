/* eslint-disable react/jsx-props-no-spreading */
import { Page } from '@c-carts/cms';
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps } from 'next';
import { getDataHooksProps } from 'next-data-hooks';
import GenericPage from '../../components/generic/genericPage';
// eslint-disable-next-line import/no-named-as-default
import News from '../../components/news';
import useMainNav, { getMainNav } from '../../data-hooks/useMainNav';
import useNews from '../../data-hooks/useNews';
import useSiteConfig from '../../data-hooks/useSiteConfig';
import sanityClient from '../../sanity/sanityClient';

type NewsType = Page;

const newsSlug = 'news-updates';
export default function NewsUpdates() {
	const siteConfig = useSiteConfig();
	const mainNav = useMainNav();

	const navItems = mainNav.filter(({ subPages }) => subPages.filter((item) => item.slug?.current === newsSlug).length > 0)[0];
	const { slug: navSlug } = navItems;
	const { title: newsHeading, slug: nwSlug } = navItems.subPages.filter((pg) => pg.slug.current === newsSlug)[0];

	const news: NewsType = useNews();
	const { title } = news;

	return (
		<GenericPage title={title ?? 'news'} siteConfig={siteConfig} mainNav={mainNav}>
			<News news={news} />
			<a href={`/${navSlug?.current}/${nwSlug?.current}`}>Back to {newsHeading}</a>
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
		const newsPg = newsNavItem.subPages.filter((pg) => pg.slug.current === newsSlug)[0];
		const slugPath: string = newsPg.slug.current.toString();

		const paths = [{ params: { slug: slugPath } }];

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

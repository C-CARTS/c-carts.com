/* eslint-disable react/jsx-props-no-spreading */
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { getDataHooksProps } from 'next-data-hooks';
import GenericPage from '../../../components/generic/genericPage';
import useMainNav, { getMainNav } from '../../../data-hooks/useMainNav';
import useNews from '../../../data-hooks/useNews';
import useSiteConfig from '../../../data-hooks/useSiteConfig';
import sanityClient from '../../../sanity/sanityClient';
import NewsComponent from '../../../components/blockContent/news';

const newsSlug = 'news-updates';

export default function News() {
	const siteConfig = useSiteConfig();
	const mainNav = useMainNav();

	const navItems = mainNav.filter(({ subPages }) => subPages.filter((item) => item.slug?.current === newsSlug).length > 0)[0];
	const { slug: navSlug } = navItems;
	const { title: headline, slug: newzSlug } = navItems.subPages.filter((pg) => pg.slug.current === newsSlug)[0];

	const news = useNews();
	const { slug } = news;
	return (
		<GenericPage title={slug.current ?? 'news'} siteConfig={siteConfig} mainNav={mainNav}>
			<NewsComponent nz={news} />
			<a href={`/${navSlug?.current}/${newzSlug?.current}`}>Back to {headline}</a>
		</GenericPage>
	);
}

News.dataHooks = [useSiteConfig, useMainNav, useNews];

export const getStaticPaths: GetStaticPaths = async () => {
	const config = await sanityClient.get('siteConfig', process.env.NEXT_PUBLIC_SANITY_SITE_CONFIG_ID ?? 'No Config');
	const { mainNavigation } = config;
	if (mainNavigation) {
		const pages = await sanityClient.getAll('page');
		const navItems = await sanityClient.getAll('navItem');
		const mainNav = await getMainNav(mainNavigation, pages, navItems);

		const newsNavItem = mainNav.filter(({ subPages }) => subPages.filter((item) => item.slug?.current === newsSlug).length > 0)[0];
		const section = newsNavItem.slug?.current ?? '';
		// TODO chnage the path to news
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

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
	const dataHookProps = await getDataHooksProps({
		context,
		dataHooks: News.dataHooks
	});
	return {
		props: {
			...dataHookProps
		}
	};
};

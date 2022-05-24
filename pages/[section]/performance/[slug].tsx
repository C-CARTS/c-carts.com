import { GetStaticPaths, GetStaticPathsContext, GetStaticProps } from 'next';
import { getDataHooksProps } from 'next-data-hooks';
import useMainNav, { getMainNav } from '../../../data-hooks/useMainNav';
import useSiteConfig from '../../../data-hooks/useSiteConfig';
import PerformanceOperations from '../../../components/blockContent/performance';
import GenericPage from '../../../components/generic/genericPage';
import usePerformance from '../../../data-hooks/usePerformance';
import sanityClient from '../../../sanity/sanityClient';

const performanceSlug = 'performance';

function Perform() {
	const siteConfig = useSiteConfig();
	const mainNav = useMainNav();

	const navItems = mainNav.filter(({ subPages }) => subPages.filter((item) => item.slug?.current === performanceSlug).length > 0)[0];
	const { slug: navSlug } = navItems;
	const { title: headline, slug: performzSlug } = navItems.subPages.filter((pg) => pg.slug.current === performanceSlug)[0];

	return (
		<GenericPage title={'Performance' || 'Fiscal year Data'} siteConfig={siteConfig} mainNav={mainNav}>
			<PerformanceOperations
				block={{
					_type: 'performanceSection',
					label: 'string'
				}}
			/>
			<a href={`/${navSlug?.current}/${performzSlug?.current}`}>Back to {headline}</a>
		</GenericPage>
	);
}
export default Perform;
Perform.dataHooks = [useSiteConfig, useMainNav, usePerformance];

export const getStaticPaths: GetStaticPaths = async () => {
	const config = await sanityClient.get('siteConfig', process.env.NEXT_PUBLIC_SANITY_SITE_CONFIG_ID ?? 'No Config');
	const { mainNavigation } = config;
	if (mainNavigation) {
		const pages = await sanityClient.getAll('page');
		const navItems = await sanityClient.getAll('navItem');
		const mainNav = await getMainNav(mainNavigation, pages, navItems);

		const newsNavItem = mainNav.filter(({ subPages }) => subPages.filter((item) => item.slug?.current === performanceSlug).length > 0)[0];
		const section = newsNavItem.slug?.current ?? '';

		const mapz = await sanityClient.getAll('performance');

		const paths = mapz.map((n) => ({ params: { section, slug: n.slug?.current } }));

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
		dataHooks: Perform.dataHooks
	});
	return {
		props: {
			...dataHookProps
		}
	};
};

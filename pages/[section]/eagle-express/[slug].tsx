/* eslint-disable react/jsx-props-no-spreading */
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps } from 'next';
import { getDataHooksProps } from 'next-data-hooks';
import GenericPage from '../../../components/generic/genericPage';
import useMainNav, { getMainNav } from '../../../data-hooks/useMainNav';
import useSiteConfig from '../../../data-hooks/useSiteConfig';
import sanityClient from '../../../sanity/sanityClient';
import EagleExpress from '../../../components/tabs/eagleExpress';

const eagle = 'eagle-express';

function Eagle() {
	const siteConfig = useSiteConfig();
	const mainNav = useMainNav();
	const navItems = mainNav.filter(({ subPages }) => subPages.filter((item) => item.slug?.current === eagle).length > 0)[0];
	const { slug: navSlug } = navItems;
	const { title: headline, slug: mpsSlug } = navItems.subPages.filter((pg) => pg.slug.current === eagle)[0];

	return (
		<GenericPage title="" siteConfig={siteConfig} mainNav={mainNav}>
			<EagleExpress
				block={{
					_type: 'eagleExpressSection',
					label: 'string'
				}}
			/>
			<a href={`/${navSlug?.current}/${mpsSlug?.current}`}>Back to {headline}</a>
		</GenericPage>
	);
}
export default Eagle;
Eagle.dataHooks = [useSiteConfig, useMainNav];

export const getStaticPaths: GetStaticPaths = async () => {
	const config = await sanityClient.get('siteConfig', process.env.NEXT_PUBLIC_SANITY_SITE_CONFIG_ID ?? 'No Config');
	const { mainNavigation } = config;
	if (mainNavigation) {
		const pages = await sanityClient.getAll('page');
		const navItems = await sanityClient.getAll('navItem');
		const mainNav = await getMainNav(mainNavigation, pages, navItems);

		const newsNavItem = mainNav.filter(({ subPages }) => subPages.filter((item) => item.slug?.current === eagle).length > 0)[0];
		const section = newsNavItem.slug?.current ?? '';

		const mapz = await sanityClient.getAll('page');

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
		dataHooks: Eagle.dataHooks
	});
	return {
		props: {
			...dataHookProps
		}
	};
};

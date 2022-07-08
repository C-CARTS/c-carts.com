/* eslint-disable react/jsx-props-no-spreading */
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps } from 'next';
import { getDataHooksProps } from 'next-data-hooks';
import GenericPage from '../../../components/generic/genericPage';
import useMainNav, { getMainNav } from '../../../data-hooks/useMainNav';
import useSiteConfig from '../../../data-hooks/useSiteConfig';
import sanityClient from '../../../sanity/sanityClient';

import RantoulConnect from '../../../components/_tabs/rantoul';
import useSchedule from '../../../data-hooks/useSchedules';

const rantoul = 'rantoul-connector';

function Rantoul() {
	const siteConfig = useSiteConfig();
	const mainNav = useMainNav();
	const navItems = mainNav.filter(({ subPages }) => subPages.filter((item) => item.slug?.current === rantoul).length > 0)[0];
	const { slug: navSlug } = navItems;
	const { title: headline, slug: mpsSlug } = navItems.subPages.filter((pg) => pg.slug.current === rantoul)[0];

	return (
		<GenericPage title="" siteConfig={siteConfig} mainNav={mainNav}>
			<RantoulConnect
				block={{
					_type: 'rantoulSection',
					label: 'string'
				}}
			/>

			<a href={`/${navSlug?.current}/${mpsSlug?.current}`}>Back to {headline}</a>
		</GenericPage>
	);
}
export default Rantoul;
Rantoul.dataHooks = [useSiteConfig, useMainNav, useSchedule];

export const getStaticPaths: GetStaticPaths = async () => {
	const config = await sanityClient.get('siteConfig', process.env.NEXT_PUBLIC_SANITY_SITE_CONFIG_ID ?? 'No Config');
	const { mainNavigation } = config;
	if (mainNavigation) {
		const pages = await sanityClient.getAll('page');
		const navItems = await sanityClient.getAll('navItem');
		const mainNav = await getMainNav(mainNavigation, pages, navItems);

		const newsNavItem = mainNav.filter(({ subPages }) => subPages.filter((item) => item.slug?.current === rantoul).length > 0)[0];
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
		dataHooks: Rantoul.dataHooks
	});
	return {
		props: {
			...dataHookProps
		}
	};
};

/* eslint-disable react/jsx-props-no-spreading */
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps } from 'next';
import { getDataHooksProps } from 'next-data-hooks';
import GenericPage from '../../../components/generic/genericPage';
import useMainNav, { getMainNav } from '../../../data-hooks/useMainNav';
import useSiteConfig from '../../../data-hooks/useSiteConfig';
import sanityClient from '../../../sanity/sanityClient';

import DemandResponse from '../../../components/tabs/demandResponse';
import useSchedule from '../../../data-hooks/useSchedules';

const demand = 'demand-response';

function Demand() {
	const siteConfig = useSiteConfig();
	const mainNav = useMainNav();
	return (
		<GenericPage title="" siteConfig={siteConfig} mainNav={mainNav}>
			<DemandResponse
				block={{
					_type: 'demandResponseSection',
					label: 'string'
				}}
			/>
		</GenericPage>
	);
}
export default Demand;
Demand.dataHooks = [useSiteConfig, useMainNav, useSchedule];

export const getStaticPaths: GetStaticPaths = async () => {
	const config = await sanityClient.get('siteConfig', process.env.NEXT_PUBLIC_SANITY_SITE_CONFIG_ID ?? 'No Config');
	const { mainNavigation } = config;
	if (mainNavigation) {
		const pages = await sanityClient.getAll('page');
		const navItems = await sanityClient.getAll('navItem');
		const mainNav = await getMainNav(mainNavigation, pages, navItems);

		const newsNavItem = mainNav.filter(({ subPages }) => subPages.filter((item) => item.slug?.current === demand).length > 0)[0];
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
		dataHooks: Demand.dataHooks
	});
	return {
		props: {
			...dataHookProps
		}
	};
};

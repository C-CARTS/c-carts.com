import type { GetStaticPaths, GetStaticPathsContext, GetStaticProps } from 'next';
import { getDataHooksProps } from 'next-data-hooks';
import React from 'react';
import PageContent from '../../components/generic/genericPage';
import PageComponent from '../../components/generic/page';
import useJobs from '../../data-hooks/useJobs';
import useMainNav, { getMainNav } from '../../data-hooks/useMainNav';
import useNewz from '../../data-hooks/useNewz';
import usePage from '../../data-hooks/usePage';
import useSchedule from '../../data-hooks/useSchedules';
import useSiteConfig from '../../data-hooks/useSiteConfig';
import sanityClient from '../../sanity/sanityClient';

export default function Slug() {
	const siteConfig = useSiteConfig();
	const mainNav = useMainNav();
	const page = usePage();
	const { title } = page;
	return (
		<PageContent title={title ?? ''} siteConfig={siteConfig} mainNav={mainNav}>
			<PageComponent page={page} />
		</PageContent>
	);
}

Slug.dataHooks = [useSiteConfig, useMainNav, usePage, useJobs, useNewz, useSchedule];

export const getStaticPaths: GetStaticPaths = async () => {
	const config = await sanityClient.get('siteConfig', process.env.NEXT_PUBLIC_SANITY_SITE_CONFIG_ID ?? 'No Config');
	const { mainNavigation } = config;
	if (mainNavigation) {
		const pages = await sanityClient.getAll('page');

		const navItems = await sanityClient.getAll('navItem');

		const mainNav = await getMainNav(mainNavigation, pages, navItems);

		const paths = mainNav
			.map((mn) => mn.subPages.map((sp) => ({ params: { section: mn.slug?.current ?? '', slug: sp.slug?.current ?? '' } })))
			.reduce((acc, items) => acc.concat(items));
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
	const dataHooksProps = await getDataHooksProps({
		context,
		dataHooks: Slug.dataHooks
	});

	return {
		props: {
			...dataHooksProps
		}
	};
};

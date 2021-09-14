import type { GetStaticPaths, GetStaticPathsContext, GetStaticProps } from 'next';
import { getDataHooksProps } from 'next-data-hooks';
import React from 'react';
import HeadContent from '../../components/generic/headContent';
import Menu from '../../components/menu/menu';
import useMainNav, { getMainNav } from '../../data-hooks/useMainNav';
import usePage from '../../data-hooks/usePage';
import useSiteConfig from '../../data-hooks/useSiteConfig';
import sanityClient from '../../sanity/sanityClient';
import { SiteConfig } from '../../sanity/schema';

function Slug() {
	const { title, logo }: SiteConfig = useSiteConfig();
	const mainNav = useMainNav();
	const page = usePage();

	return (
		<>
			<HeadContent page={page} />
			<Menu nav={mainNav} logo={logo} title={title ?? ''} />
			<main>
				<h1>{title}</h1>
			</main>
		</>
	);
}

Slug.dataHooks = [useSiteConfig, useMainNav, usePage];

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

export default Slug;

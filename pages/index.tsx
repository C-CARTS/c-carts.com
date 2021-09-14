import type { GetStaticPathsContext, GetStaticProps } from 'next';
import { getDataHooksProps } from 'next-data-hooks';
import React from 'react';
import HeadContent from '../components/generic/headContent';
import Menu from '../components/menu/menu';
import useHomepage from '../data-hooks/useHomepage';
import useMainNav from '../data-hooks/useMainNav';
import useSiteConfig from '../data-hooks/useSiteConfig';
import { SiteConfig } from '../sanity/schema';

function Home() {
	const { title, logo }: SiteConfig = useSiteConfig();
	const mainNav = useMainNav();
	const page = useHomepage();

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

Home.dataHooks = [useSiteConfig, useMainNav, useHomepage];

export const getStaticProps: GetStaticProps = async (context: GetStaticPathsContext) => {
	const dataHooksProps = await getDataHooksProps({
		context,
		dataHooks: Home.dataHooks
	});

	return {
		props: {
			...dataHooksProps
		}
	};
};

export default Home;

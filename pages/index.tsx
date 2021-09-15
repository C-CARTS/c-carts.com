import type { GetStaticPathsContext, GetStaticProps } from 'next';
import { getDataHooksProps } from 'next-data-hooks';
import React from 'react';
import PageContent from '../components/generic/pageContent';
import useHomepage from '../data-hooks/useHomepage';
import useMainNav from '../data-hooks/useMainNav';
import useSiteConfig from '../data-hooks/useSiteConfig';

function Home() {
	const siteConfig = useSiteConfig();
	const mainNav = useMainNav();
	const page = useHomepage();

	return <PageContent siteConfig={siteConfig} mainNav={mainNav} page={page} />;
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

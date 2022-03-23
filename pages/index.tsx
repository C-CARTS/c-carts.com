import type { GetStaticPathsContext, GetStaticProps } from 'next';
import { getDataHooksProps } from 'next-data-hooks';
import React from 'react';
import GenericPage from '../components/generic/genericPage';
import PageComponent from '../components/generic/page';
import News from '../components/news';
import useHomepage from '../data-hooks/useHomepage';
import useMainNav from '../data-hooks/useMainNav';
import useSiteConfig from '../data-hooks/useSiteConfig';

export default function Home() {
	const siteConfig = useSiteConfig();
	const { title: siteName } = siteConfig;
	const mainNav = useMainNav();
	const page = useHomepage();
	const { title, description } = page;
	return (
		<GenericPage title={siteName ?? title ?? ''} description={description} siteConfig={siteConfig} mainNav={mainNav}>
			<PageComponent page={page} />
		</GenericPage>
	);
}

Home.dataHooks = [useSiteConfig, useMainNav, useHomepage, ...News.dataHooks];

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

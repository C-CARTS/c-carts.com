import type { GetStaticPathsContext, GetStaticProps } from 'next';
import { getDataHooksProps } from 'next-data-hooks';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import GenericPage from '../components/generic/genericPage';
import PageComponent from '../components/generic/page';
import useHomepage from '../data-hooks/useHomepage';
import useMainNav from '../data-hooks/useMainNav';
import useSiteConfig from '../data-hooks/useSiteConfig';
import { titleState } from '../state/changeProperty';

export default function Home() {
	const siteConfig = useSiteConfig();
	const { title: siteName } = siteConfig;
	const mainNav = useMainNav();
	const page = useHomepage();
	const { title, description } = page;
	const setTitle = useSetRecoilState(titleState);
	useEffect(() => {
		setTitle(page.title);
	}, [setTitle, page.title]);

	return (
		<GenericPage title={siteName ?? title ?? ''} description={description} siteConfig={siteConfig} mainNav={mainNav}>
			<PageComponent page={page} />
		</GenericPage>
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

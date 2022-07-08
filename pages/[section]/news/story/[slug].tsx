import { News } from '@c-carts/cms';
import { GetStaticPropsContext } from 'next';
import { getDataHooksProps } from 'next-data-hooks';
import React from 'react';
import CardNews from '../../../../components/card/cardNews';

import GenericPage from '../../../../components/generic/genericPage';
import useMainNav from '../../../../data-hooks/useMainNav';

import useSiteConfig from '../../../../data-hooks/useSiteConfig';
import sanityClient from '../../../../sanity/sanityClient';

interface Props {
	currentNews: News;
	// eslint-disable-next-line react/no-unused-prop-types
	children: any;
}

export default function CardNewsDisplay({ currentNews }: Props) {
	const siteConfig = useSiteConfig();
	const mainNav = useMainNav();
	return (
		<GenericPage title="News" siteConfig={siteConfig} mainNav={mainNav}>
			<CardNews currentNews={currentNews} />
		</GenericPage>
	);
}

CardNewsDisplay.dataHooks = [useSiteConfig, useMainNav];

export async function getStaticPaths() {
	const config = await sanityClient.get('siteConfig', process.env.NEXT_PUBLIC_SANITY_SITE_CONFIG_ID ?? 'No Config');
	const { mainNavigation } = config;
	if (mainNavigation) {
		const section = 'about-us';

		const newz = await sanityClient.getAll('news');

		const paths = newz.map((n) => ({ params: { section, slug: n.slug?.current } }));
		return {
			paths,
			fallback: false
		};
	}
	return {
		paths: [],
		fallback: false
	};
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const dataHookProps = await getDataHooksProps({
		context,
		dataHooks: CardNewsDisplay.dataHooks
	});
	if (context.params !== undefined) {
		const {
			params: { slug }
		} = context;

		const newz = await sanityClient.getAll('news');
		const currentNews = newz.find((nz) => nz.slug.current === slug);

		return {
			props: {
				...dataHookProps,
				currentNews
			}
		};
	}
	return {
		props: {
			...dataHookProps
		}
	};
}

/// TO-DO discuss with Ryan about this Prop Validation Issue

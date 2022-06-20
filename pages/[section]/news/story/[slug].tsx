import { News } from '@c-carts/cms';
import { GetStaticPropsContext } from 'next';
import { getDataHooksProps } from 'next-data-hooks';
import CardNews from '../../../../components/card/cardNews';

import GenericPage from '../../../../components/generic/genericPage';
import useMainNav from '../../../../data-hooks/useMainNav';

import useSiteConfig from '../../../../data-hooks/useSiteConfig';
import sanityClient from '../../../../sanity/sanityClient';

interface Props {
	props: {
		currentNews: News;
	};
}

export default function CardNewsDisplay({ props: { currentNews } }: Props) {
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
		// TODO change the path to news
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
	const {
		params: { slug }
	} = context;
	const newz = await sanityClient.getAll('news');
	const currentNews = newz.find((nz) => nz.slug.current === slug);
	const dataHookProps = await getDataHooksProps({
		context,
		dataHooks: CardNewsDisplay.dataHooks
	});
	return {
		props: {
			...dataHookProps,
			currentNews
		}
	};
}

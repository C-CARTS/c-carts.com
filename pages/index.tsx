import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Block from '../components/blockContent/block';
import sanityClient from '../sanity/sanityClient';
import { Page, SiteConfig } from '../sanity/schema';

interface Props {
	siteConfig: SiteConfig;
	page: Page;
}

const Home: NextPage<Props> = ({ siteConfig: { title }, page: { description, content } }: Props) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				{description && description.length > 0 && <meta name="description" content={description} />}
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<h1>{title}</h1>
				{content && content.length > 0 && content.map((block) => <Block block={block} key={block._key} />)}
			</main>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const siteConfig = await sanityClient.get('siteConfig', process.env.SANITY_SITE_CONFIG_ID ?? 'No SANITY_SITE_CONFIG_ID');

	if (siteConfig) {
		const ref = siteConfig?.frontpage?._ref;
		if (ref && ref.length > 0) {
			const page = await sanityClient.get('page', ref);
			return {
				props: {
					siteConfig,
					page
				}
			};
		}
	}

	throw new Error('Could not load data from CMS.');
};

export default Home;

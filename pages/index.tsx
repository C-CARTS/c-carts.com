import type { GetStaticPathsContext, GetStaticProps } from 'next';
import { getDataHooksProps } from 'next-data-hooks';
import Head from 'next/head';
import MainNav from '../components/navigation/mainNav';
import useMainNav from '../data-hooks/useMainNav';
import useSiteConfig from '../data-hooks/useSiteConfig';
import { SiteConfig } from '../sanity/schema';

function Home() {
	const { title }: SiteConfig = useSiteConfig();
	const mainNav = useMainNav();

	return (
		<>
			<Head>
				<title>{title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<MainNav nav={mainNav} />
			<main>
				<h1>{title}</h1>
			</main>
		</>
	);
}

Home.dataHooks = [useSiteConfig, useMainNav];

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

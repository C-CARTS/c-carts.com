import type { GetStaticPaths, GetStaticPathsContext, GetStaticProps } from 'next';
import { getDataHooksProps } from 'next-data-hooks';
import React from 'react';
import JobsComponent from '../../../components/blockContent/job';
import GenericPage from '../../../components/generic/genericPage';
import useJob from '../../../data-hooks/useJob';
import useMainNav, { getMainNav } from '../../../data-hooks/useMainNav';
import useSiteConfig from '../../../data-hooks/useSiteConfig';
import sanityClient from '../../../sanity/sanityClient';

const jobsSlug = 'jobs';

export default function Job() {
	const siteConfig = useSiteConfig();
	const mainNav = useMainNav();
	const navItem = mainNav.filter((mn) => mn.subPages.filter((sp) => sp.slug?.current === jobsSlug).length > 0)[0];
	const { slug: navSlug } = navItem;
	const { title: jobTitle, slug: jobSlug } = navItem.subPages.filter((sp) => sp.slug?.current === jobsSlug)[0];

	const job = useJob();
	const { name } = job;

	return (
		<GenericPage title={name ?? 'Job'} siteConfig={siteConfig} mainNav={mainNav}>
			<JobsComponent job={job} hideHeading />
			<a href={`/${navSlug?.current}/${jobSlug?.current}`}>Back to {jobTitle}</a>
		</GenericPage>
	);
}

Job.dataHooks = [useSiteConfig, useMainNav, useJob];

export const getStaticPaths: GetStaticPaths = async () => {
	const config = await sanityClient.get('siteConfig', process.env.NEXT_PUBLIC_SANITY_SITE_CONFIG_ID ?? 'No Config');
	const { mainNavigation } = config;
	if (mainNavigation) {
		const pages = await sanityClient.getAll('page');
		const navItems = await sanityClient.getAll('navItem');

		const mainNav = await getMainNav(mainNavigation, pages, navItems);

		const jobsNavItem = mainNav.filter((mn) => mn.subPages.filter((sp) => sp.slug?.current === jobsSlug).length > 0)[0];
		const section = jobsNavItem.slug?.current ?? '';
		const jobs = await sanityClient.getAll('job');

		const paths = jobs.map((j) => ({ params: { section, slug: j.slug?.current } }));

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
		dataHooks: Job.dataHooks
	});

	return {
		props: {
			...dataHooksProps
		}
	};
};

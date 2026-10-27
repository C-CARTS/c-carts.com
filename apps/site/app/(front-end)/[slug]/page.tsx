import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "server-only";
import { getAllPageSlugs, getPage } from "../../../api";
import SanityPage from "../../../components/sanityPage";
import { serverEnv } from "../../../env/server";
import generatePageMetadata from "../../../helpers/generatePageMetadata";

const staticSlugs = serverEnv.STATIC_SLUGS;

interface Params {
	slug: string;
}

interface Props {
	params: Promise<Params>;
}

export const revalidate = 14_400; // 4 hours

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const page = await getPage(slug);
	if (!page) notFound();
	const metadata = await generatePageMetadata(page, false);
	return metadata;
}

export default async function Page({ params }: Props) {
	const { slug } = await params;
	const page = await getPage(slug);

	if (!page) {
		notFound();
	}

	return <SanityPage page={page} />;
}

export async function generateStaticParams(): Promise<Params[]> {
	const slugs = await getAllPageSlugs();
	const mapped = slugs.flatMap(({ slug }) =>
		slug?.current && !staticSlugs.includes(slug.current) ? [{ slug: slug.current }] : [],
	);
	return mapped;
}

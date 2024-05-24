import { Metadata } from "next";
import "server-only";
import { getAllPageSlugs, getHomepage, getPage } from "../../../api";
import SanityPage from "../../../components/sanityPage";
import generatePageMetadata from "../../../helpers/generatePageMetadata";

interface Params {
	slug: string;
}

interface Props {
	params: Params;
}

export async function generateMetadata({
	params: { slug },
}: Props): Promise<Metadata> {
	const page = await getPage(slug);
	const metadata = await generatePageMetadata(page, false);
	return metadata;
}

export default async function Page({ params: { slug } }: Props) {
	const page = await getPage(slug);

	if (!page) {
		return null;
	}

	return <SanityPage page={page} />;
}

export async function generateStaticParams(): Promise<Params[]> {
	const slugs = await getAllPageSlugs();
	const {
		slug: { current: homepageSlug },
	} = await getHomepage();

	const mapped = slugs
		.map(({ slug: { current } }) => ({ slug: current }))
		.filter(({ slug }) => slug[0] !== homepageSlug);

	return mapped;
}

import "server-only";
import SanityPage from "../../../components/sanityPage";
import { getAllPageSlugs, getHomepage, getPage } from "../../../helpers/api";

interface Params {
	slug: string[];
}

interface Props {
	params: Params;
}

export default async function Page({ params: { slug } }: Props) {
	const page = await getPage(slug[0]);

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
		.map(({ slug: { current } }) => ({ slug: [current] }))
		.filter(({ slug }) => slug[0] !== homepageSlug);

	return mapped;
}

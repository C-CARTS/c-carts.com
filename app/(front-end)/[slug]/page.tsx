import { Metadata } from "next";
import "server-only";
import { getAllPageSlugs, getPage } from "../../../api";
import SanityPage from "../../../components/sanityPage";
import generatePageMetadata from "../../../helpers/generatePageMetadata";
import throwError from "../../../helpers/throwError";

const staticSlugs = (
	process.env.STATIC_SLUGS ?? throwError("No STATIC_SLUGS")
).split(",");

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
	try {
		const slugs = await getAllPageSlugs();
		const mapped = slugs
			.filter((slugObj) => slugObj && slugObj.slug && slugObj.slug.current) // Filter out invalid entries
			.filter((slugObj) => !staticSlugs.includes(slugObj.slug.current)) // Filter out slugs that have a static route
			.map(({ slug: { current: slug } }) => ({ slug }));
		return mapped;
	} catch (error) {
		console.error("Error in generateStaticParams:", error);
		return []; // Return an empty array on error
	}
}

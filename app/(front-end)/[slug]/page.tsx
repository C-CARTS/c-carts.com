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
	try {
		const slugs = await getAllPageSlugs();
		console.log("slugs", slugs);

		const homepageData = await getHomepage();
		if (!homepageData || !homepageData.slug || !homepageData.slug.current) {
			throw new Error("Invalid homepage data");
		}
		const homepageSlug = homepageData.slug.current;

		const mapped = slugs
			.map((slugObj) => {
				if (slugObj && slugObj.slug && slugObj.slug.current) {
					return { slug: slugObj.slug.current };
				}
				return null; // Return null for invalid entries
			})
			.filter(
				(slugObj) =>
					slugObj && slugObj.slug && slugObj.slug[0] !== homepageSlug,
			);

		console.log("mapped", mapped);

		return mapped as Params[];
	} catch (error) {
		console.error("Error in generateStaticParams:", error);
		return []; // Return an empty array on error
	}
}

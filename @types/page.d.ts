import type { SanityDocument, Slug } from "sanity";
import BlockContent from "./block";
import ImageWithAlt from "./imageWithAlt";

type Page = SanityDocument & {
	_type: "page";
	title: string;
	slug: Slug;
	content: BlockContent[];
	openGraphImage: ImageWithAlt;
	description: string;
	includeInSitemap: boolean;
	disallowRobots: boolean;
};

export default Page;

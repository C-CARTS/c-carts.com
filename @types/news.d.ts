import type { SanityDocument, Slug } from "sanity";
import BlockContent from "./block";

type News = SanityDocument & {
	_type: "news";
	headline: string;
	slug: Slug;
	content: BlockContent[];
};

export default News;

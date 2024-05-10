import type { SanityDocument, Slug } from "sanity";
import BlockContent from "./block";

type Job = SanityDocument & {
	_type: "job";
	position: string;
	slug: Slug;
	content: BlockContent[];
};

export default Job;

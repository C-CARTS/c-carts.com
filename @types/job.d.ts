import type { SanityDocument } from "sanity";
import BlockContent from "./block";

type Job = SanityDocument & {
	_type: "job";
	position: string;
	content: BlockContent[];
};

export default Job;

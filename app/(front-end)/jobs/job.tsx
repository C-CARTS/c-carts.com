import Link from "next/link";
import "server-only";
import JobType from "../../../@types/job";
import SanityBlockContent from "../../../components/sanityBlock/sanityBlockContent";
import { getJobsPage } from "../../../helpers/api";

interface Props {
	job: JobType;
}

export default async function Job({
	job: {
		position,
		content,
		slug: { current: subSlug },
	},
}: Props) {
	const {
		slug: { current: slug },
	} = await getJobsPage();

	return (
		<div>
			<h3>
				<Link href={`/${slug}/${subSlug}`}>{position}</Link>
			</h3>
			<div>
				<SanityBlockContent content={content} />
			</div>
		</div>
	);
}

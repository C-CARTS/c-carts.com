import JobType from "../../../@types/job";
import SanityBlockContent from "../../../components/sanityBlock/sanityBlockContent";

interface Props {
	job: JobType;
}

export default function Job({ job: { position, content } }: Props) {
	return (
		<div>
			<h3>{position}</h3>
			<div>
				<SanityBlockContent content={content} />
			</div>
		</div>
	);
}

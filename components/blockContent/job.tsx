import { Job } from '@c-carts/cms';
import { PortableText } from '@portabletext/react';

interface Props {
	hideHeading?: boolean;
	job: Job;
}

export default function JobsComponent({ job: { name, rate, content }, hideHeading }: Props) {
	return (
		<section className="job">
			{hideHeading !== null && <h3>{name}</h3>}
			{rate && (
				<p>
					<span className="sr">Pay Rate:</span>${rate}
				</p>
			)}
			<PortableText value={content} />
		</section>
	);
}

JobsComponent.defaultProps = {
	hideHeading: false
};

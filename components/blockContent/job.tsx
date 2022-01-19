import { Job } from '@c-carts/cms';
import PortableText from '../../sanity/portableText';

interface Props {
	hideHeading?: boolean;
	job: Job;
}

export default function JobsComponent({ job: { name, rate, content }, hideHeading }: Props) {
	return (
		<section className="job">
			{hideHeading && <h3>{name}</h3>}
			{rate && (
				<p>
					<span className="sr">Pay Rate:</span>${rate}
				</p>
			)}
			<PortableText blocks={content} />
		</section>
	);
}

JobsComponent.defaultProps = {
	hideHeading: false
};

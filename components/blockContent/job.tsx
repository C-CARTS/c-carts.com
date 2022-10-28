import { Job } from '@c-carts/cms';
import PortableText from '../../sanity/portableText';

interface Props {
	hideHeading?: boolean;
	job: Job;
}

export default function JobsComponent({ job: { name, rate, content }, hideHeading }: Props) {
	return (
		<section className="job">
			{hideHeading !== null && <h3>{name}</h3>}
			{rate && (
				<p className="sr">
					<span>Pay Rate:${rate}</span>
				</p>
			)}
			<PortableText blocks={content} />
		</section>
	);
}

JobsComponent.defaultProps = {
	hideHeading: false
};

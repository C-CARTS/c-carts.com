import { FC } from 'react';
import PortableText from '../../sanity/portableText';
import { Job } from '../../sanity/schema';

interface Props {
	hideHeading?: boolean;
	job: Job;
}

const JobsComponent: FC<Props> = ({ job: { name, rate, content }, hideHeading }: Props) => (
	<section className="job">
		{!hideHeading && <h2>{name}</h2>}
		{rate && <span className="rate">${rate}</span>}
		<PortableText blocks={content} />
	</section>
);

JobsComponent.defaultProps = {
	hideHeading: false
};

export default JobsComponent;

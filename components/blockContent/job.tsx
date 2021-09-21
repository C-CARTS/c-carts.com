import { FC } from 'react';
import PortableText from '../../sanity/portableText';
import { Job } from '../../sanity/schema';
import styles from '../../styles/job.module.scss';

interface Props {
	hideHeading?: boolean;
	job: Job;
}

const JobsComponent: FC<Props> = ({ job: { name, rate, content }, hideHeading }: Props) => (
	<section className="job">
		{hideHeading && <h3>{name}</h3>}
		{rate && (
			<p className={styles.rate}>
				<span className="sr">Pay Rate:</span>${rate}
			</p>
		)}
		<PortableText blocks={content} />
	</section>
);

JobsComponent.defaultProps = {
	hideHeading: false
};

export default JobsComponent;

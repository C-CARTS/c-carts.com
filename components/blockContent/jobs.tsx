import { FC } from 'react';
import useJobs from '../../data-hooks/useJobs';
import { JobsSection } from '../../sanity/schema';
import Job from './job';

interface Props {
	block: JobsSection;
}

const JobsComponent: FC<Props> = ({ block: { count } }: Props) => {
	const jobs = useJobs().sort((j1, j2) => new Date(j2._updatedAt).getTime() - new Date(j1._updatedAt).getTime());

	if (jobs.length === 0) {
		return (
			<p className="no-openings">
				<strong>There are currently no job openings available.</strong>
			</p>
		);
	}

	const filtered = count === 0 ? jobs : jobs.slice(0, count);

	return (
		<>
			<h2>Job Openings</h2>
			{filtered.map((j) => (
				<Job job={j} key={j._id} />
			))}
		</>
	);
};

export default JobsComponent;

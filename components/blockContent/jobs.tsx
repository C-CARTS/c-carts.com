import { JobsSection } from '@c-carts/cms';
import useJobs from '../../data-hooks/useJobs';
import Job from './job';

interface Props {
	block: JobsSection;
}

export default function JobsComponent({ block: { count } }: Props) {
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
}

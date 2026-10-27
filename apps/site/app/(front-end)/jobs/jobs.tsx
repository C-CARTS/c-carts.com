import "server-only";
import { getJobs } from "../../../api";
import Job from "./job";

export default async function Jobs() {
	const jobs = await getJobs();

	return (
		<div>
			<h2>Job Openings</h2>
			{jobs.map((job) => (
				<Job key={job._id} job={job} />
			))}
		</div>
	);
}

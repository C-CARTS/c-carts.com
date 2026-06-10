import "server-only";
import { getJobs } from "../../../api";
import Job from "./job";

export default async function Jobs() {
	const jobs = await getJobs();

	return (
		<div>
			{jobs &&
				jobs.map((job) => (
					<>
						<h2>Job Openings</h2>
						<Job key={job._id} job={job} />
					</>
				))}
		</div>
	);
}

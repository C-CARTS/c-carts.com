import { getJobs } from "../../../helpers/api";
import Job from "./job";

export default async function Jobs() {
	const jobs = await getJobs();

	return (
		<div>
			<h2>Job Openings</h2>
			{(!jobs || !jobs.length) && (
				<p>
					There are not currently any job openings. Please check back later.
				</p>
			)}
			{jobs && jobs.map((job) => <Job key={job._id} job={job} />)}
		</div>
	);
}

import "server-only";
import { Fragment } from "react";
import { getJobs } from "../../../api";
import Job from "./job";

export default async function Jobs() {
	const jobs = await getJobs();

	return (
		<div>
			{jobs.map((job) => (
				<Fragment key={job._id}>
					<h2>Job Openings</h2>
					<Job job={job} />
				</Fragment>
			))}
		</div>
	);
}

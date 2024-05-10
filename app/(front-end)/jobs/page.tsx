import "server-only";
import SanityPage from "../../../components/sanityPage";
import { getJobsPage } from "../../../helpers/api";
import Jobs from "./jobs";

export default async function Home() {
	const jobsPage = await getJobsPage();
	return (
		<SanityPage page={jobsPage}>
			<Jobs />
		</SanityPage>
	);
}

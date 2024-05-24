import { Metadata } from "next";
import "server-only";
import SanityPage from "../../../components/sanityPage";
import { getJobsPage } from "../../../helpers/api";
import generatePageMetadata from "../../../helpers/generatePageMetadata";
import Jobs from "./jobs";

export async function generateMetadata(): Promise<Metadata> {
	const page = await getJobsPage();
	const metadata = await generatePageMetadata(page, false);
	return metadata;
}

export default async function Home() {
	const jobsPage = await getJobsPage();
	return (
		<SanityPage page={jobsPage}>
			<Jobs />
		</SanityPage>
	);
}

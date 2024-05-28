import { getJob, getJobs } from "../../../../api";
import SanityPage from "../../../../components/sanityPage";

interface Params {
	slug: string;
}

interface Props {
	params: Params;
}

export default async function Page({ params: { slug } }: Props) {
	const job = await getJob(slug);

	return <SanityPage page={job} />;
}

export async function generateStaticParams(): Promise<Params[]> {
	const jobs = await getJobs();
	const mapped = jobs.map(({ slug: { current } }) => ({ slug: current }));
	return mapped;
}

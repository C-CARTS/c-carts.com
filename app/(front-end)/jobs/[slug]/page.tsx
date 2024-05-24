import SanityPage from "../../../../components/sanityPage";
import { getJob, getJobs } from "../../../../helpers/api";

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
	const news = await getJobs();
	const mapped = news.map(({ slug: { current } }) => ({ slug: current }));
	return mapped;
}

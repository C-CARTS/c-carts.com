import { notFound } from "next/navigation";
import { getJob, getJobs } from "../../../../api";
import SanityPage from "../../../../components/sanityPage";

interface Params {
	slug: string;
}

interface Props {
	params: Promise<Params>;
}

export const revalidate = 14_400; // 4 hours

export default async function Page({ params }: Props) {
	const { slug } = await params;
	const job = await getJob(slug);
	if (!job) notFound();

	return <SanityPage page={job} />;
}

export async function generateStaticParams(): Promise<Params[]> {
	const jobs = await getJobs();
	const mapped = jobs.map(({ slug: { current } }) => ({ slug: current }));
	return mapped;
}

import "server-only";
import { notFound } from "next/navigation";
import { getNews, getNewsItem } from "../../../../api";
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
	const news = await getNewsItem(slug);
	if (!news) notFound();

	return <SanityPage page={news} />;
}

export async function generateStaticParams(): Promise<Params[]> {
	const news = await getNews();
	const mapped = news.map(({ slug: { current } }) => ({ slug: current }));
	return mapped;
}

import "server-only";
import { getNews, getNewsItem } from "../../../../api";
import SanityPage from "../../../../components/sanityPage";

interface Params {
	slug: string;
}

interface Props {
	params: Params;
}

export const revalidate = 14_400; // 4 hours

export default async function Page({ params: { slug } }: Props) {
	const news = await getNewsItem(slug);

	return <SanityPage page={news} />;
}

export async function generateStaticParams(): Promise<Params[]> {
	const news = await getNews();
	const mapped = news.map(({ slug: { current } }) => ({ slug: current }));
	return mapped;
}

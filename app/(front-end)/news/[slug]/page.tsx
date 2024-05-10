import SanityPage from "../../../../components/sanityPage";
import { getNews, getNewsItem } from "../../../../helpers/api";

interface Params {
	slug: string;
}

interface Props {
	params: Params;
}

export default async function Page({ params: { slug } }: Props) {
	const news = await getNewsItem(slug);

	return <SanityPage page={news} />;
}

export async function generateStaticParams(): Promise<Params[]> {
	const news = await getNews();

	const mapped = news.map(({ slug: { current } }) => ({ slug: current }));

	return mapped;
}

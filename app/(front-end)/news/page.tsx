import { Metadata } from "next";
import "server-only";
import { getNewsPage } from "../../../api";
import SanityPage from "../../../components/sanityPage";
import generatePageMetadata from "../../../helpers/generatePageMetadata";
import NewsItems from "./newsItems";

export async function generateMetadata(): Promise<Metadata> {
	const page = await getNewsPage();
	const metadata = await generatePageMetadata(page, false);
	return metadata;
}

export const revalidate = 14_400; // 4 hours

export default async function Home() {
	const newsPage = await getNewsPage();
	return (
		<SanityPage page={newsPage}>
			<NewsItems />
		</SanityPage>
	);
}

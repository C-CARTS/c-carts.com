import "server-only";
import SanityPage from "../../../components/sanityPage";
import { getNewsPage } from "../../../helpers/api";
import NewsItems from "./newsItems";

export default async function Home() {
	const newsPage = await getNewsPage();
	return (
		<div style={{ backgroundColor: "red" }}>
			<SanityPage page={newsPage}>
				<NewsItems />
			</SanityPage>
		</div>
	);
}

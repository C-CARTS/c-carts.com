import "server-only";
import { getNews } from "../../../api";
import NewsItem from "./newsItem";

export default async function NewsItems() {
	const newsItems = await getNews();

	return (
		<div>
			<h2>Stories</h2>
			{!newsItems.length && <p>There are not currently any news stories posted. Please check back later.</p>}
			{newsItems.map((newsItem) => (
				<NewsItem key={newsItem._id} news={newsItem} />
			))}
		</div>
	);
}

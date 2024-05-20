import "server-only";
import { getNews } from "../../../helpers/api";
import Job from "./newsItem";

export default async function NewsItems() {
	const newsItems = await getNews();

	return (
		<div>
			<h2>Stories</h2>
			{(!newsItems || !newsItems.length) && (
				<p>
					There are not currently any news stories posted. Please check back
					later.
				</p>
			)}
			{newsItems &&
				newsItems.map((newsItem) => <Job key={newsItem._id} news={newsItem} />)}
		</div>
	);
}

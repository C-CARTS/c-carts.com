import Link from "next/link";
import News from "../../../@types/news";
import SanityBlockContent from "../../../components/sanityBlock/sanityBlockContent";
import { getNewsPage } from "../../../helpers/api";

interface Props {
	news: News;
}

export default async function NewsItem({
	news: {
		headline,
		content,
		slug: { current: subSlug },
	},
}: Props) {
	const {
		slug: { current: slug },
	} = await getNewsPage();
	return (
		<div>
			<h3>
				<Link href={`/${slug}/${subSlug}`}>{headline}</Link>
			</h3>
			<div>
				<SanityBlockContent content={content} />
			</div>
		</div>
	);
}
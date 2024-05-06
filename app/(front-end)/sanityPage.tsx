import Page from "../../@types/page";
import SanityBlockContent from "./sanityBlockContent";

interface Props {
	page: Page;
}

export default function SanityPage({ page }: Props) {
	const { title, content } = page;
	return (
		<>
			<h1>{title}</h1>
			<SanityBlockContent content={content} />
		</>
	);
}

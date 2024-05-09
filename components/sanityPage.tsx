import Page from "../@types/page";
import StandardLayout from "./layout/standardLayout";
import SanityBlockContent from "./sanityBlock/sanityBlockContent";

interface Props {
	isHomepage?: boolean;
	page: Page;
}

export default function SanityPage({ page, isHomepage }: Props) {
	const { title, content } = page;
	return (
		<StandardLayout isHomepage={isHomepage}>
			<h1>{title}</h1>
			<SanityBlockContent content={content} />
		</StandardLayout>
	);
}

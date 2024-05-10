import { ReactNode } from "react";
import Page from "../@types/page";
import StandardLayout from "./layout/standardLayout";
import SanityBlockContent from "./sanityBlock/sanityBlockContent";

interface Props {
	isHomepage?: boolean;
	page: Page;
	children?: ReactNode;
}

export default function SanityPage({ page, isHomepage, children }: Props) {
	const { title, content } = page;
	return (
		<StandardLayout isHomepage={isHomepage}>
			<h1>{title}</h1>
			<SanityBlockContent content={content} />
			{children}
		</StandardLayout>
	);
}

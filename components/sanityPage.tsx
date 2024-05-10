import { ReactNode } from "react";
import News from "../@types/news";
import Page from "../@types/page";
import { assertUnreachable } from "../helpers/assertUnreachable";
import StandardLayout from "./layout/standardLayout";
import SanityBlockContent from "./sanityBlock/sanityBlockContent";

interface Props {
	isHomepage?: boolean;
	page: Page | News;
	children?: ReactNode;
}

function isPage(page: Page | News): page is Page {
	return (page as Page).title !== undefined;
}

function isNews(page: Page | News): page is News {
	return (page as News).headline !== undefined;
}

function getPageTitle(page: Page | News): string {
	if (isPage(page)) {
		return page.title;
	}
	if (isNews(page)) {
		return page.headline;
	}
	assertUnreachable(page);
}

export default function SanityPage({ page, isHomepage, children }: Props) {
	const { content } = page;
	return (
		<StandardLayout isHomepage={isHomepage}>
			<h1>{getPageTitle(page)}</h1>
			<SanityBlockContent content={content} />
			{children}
		</StandardLayout>
	);
}

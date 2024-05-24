import { ReactNode } from "react";
import Job from "../@types/job";
import News from "../@types/news";
import Page from "../@types/page";
import { assertUnreachable } from "../helpers/assertUnreachable";
import StandardLayout from "./layout/standardLayout";
import SanityBlockContent from "./sanityBlock/sanityBlockContent";

type PageType = Page | News | Job;

interface Props {
	isHomepage?: boolean;
	page: PageType;
	children?: ReactNode;
}

function isPage(page: PageType): page is Page {
	return (page as Page).title !== undefined;
}

function isNews(page: PageType): page is News {
	return (page as News).headline !== undefined;
}

function isJob(page: PageType): page is Job {
	return (page as Job).position !== undefined;
}

function getPageTitle(page: PageType): string {
	if (isPage(page)) {
		return page.title;
	}
	if (isNews(page)) {
		return page.headline;
	}
	if (isJob(page)) {
		return page.position;
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

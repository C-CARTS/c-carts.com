import {
	FcBusinesswoman,
	FcDocument,
	FcGlobe,
	FcHome,
	FcLineChart,
	FcMoneyTransfer,
	FcNews,
	FcScatterPlot,
	FcSettings,
	FcTodoList,
} from "react-icons/fc";
import type { StructureResolver } from "sanity/structure";
import throwError from "../helpers/throwError";

const settingsName =
	process.env.NEXT_PUBLIC_SETTINGS_DOC_NAME ??
	throwError("No NEXT_PUBLIC_SETTINGS_DOC_NAME");

const homepageName =
	process.env.NEXT_PUBLIC_HOMEPAGE_DOC_NAME ??
	throwError("No NEXT_PUBLIC_HOMEPAGE_DOC_NAME");

const jobsPageName =
	process.env.NEXT_PUBLIC_JOBS_PAGE_DOC_NAME ??
	throwError("No NEXT_PUBLIC_JOBS_PAGE_DOC_NAME");

const newsPageName =
	process.env.NEXT_PUBLIC_NEWS_PAGE_DOC_NAME ??
	throwError("No NEXT_PUBLIC_NEWS_PAGE_DOC_NAME");

const performancePageName =
	process.env.NEXT_PUBLIC_PERFORMANCE_PAGE_DOC_NAME ??
	throwError("No NEXT_PUBLIC_PERFORMANCE_PAGE_DOC_NAME");

const structure: StructureResolver = (S, _context) => {
	return S.list()
		.title("Content")
		.items([
			S.listItem()
				.title("Settings")
				.icon(FcSettings)
				.child(
					S.list()
						.title("Items")
						.items([
							S.listItem()
								.title("Global Settings")
								.icon(FcGlobe)
								.child(
									S.document()
										.schemaType(settingsName)
										.documentId(settingsName),
								),
							S.listItem()
								.title("Homepage")
								.icon(FcHome)
								.child(
									S.document().schemaType("page").documentId(homepageName),
								),
							S.listItem()
								.icon(FcTodoList)
								.title("Navigation")
								.child(S.documentTypeList("navItem").title("Nav Items")),
						]),
				),
			S.listItem()
				.title("Jobs")
				.icon(FcMoneyTransfer)
				.child(
					S.list()
						.title("Items")
						.items([
							S.listItem()
								.title("Job Page")
								.icon(FcDocument)
								.child(
									S.document().schemaType("page").documentId(jobsPageName),
								),
							S.listItem()
								.title("Jobs")
								.icon(FcBusinesswoman)
								.schemaType("job")
								.child(S.documentTypeList("job").title("Jobs")),
						]),
				),
			S.listItem()
				.title("News")
				.icon(FcNews)
				.child(
					S.list()
						.title("Items")
						.items([
							S.listItem()
								.title("News Page")
								.icon(FcDocument)
								.child(
									S.document().schemaType("page").documentId(newsPageName),
								),
							S.listItem()
								.title("Stories")
								.icon(FcNews)
								.schemaType("news")
								.child(S.documentTypeList("news").title("Stories")),
						]),
				),
			S.listItem()
				.title("Performance")
				.icon(FcScatterPlot)
				.child(
					S.list()
						.title("Items")
						.items([
							S.listItem()
								.title("Performance Page")
								.icon(FcDocument)
								.child(
									S.document()
										.schemaType("page")
										.documentId(performancePageName),
								),
							S.listItem()
								.title("Quarters")
								.icon(FcLineChart)
								.schemaType("news")
								.child(S.documentTypeList("performance").title("Quarters")),
						]),
				),
			S.listItem()
				.title("Pages")
				.icon(FcDocument)
				.schemaType("page")
				.child(
					S.documentTypeList("page")
						.title("Pages")
						.filter(
							`_type == "page" && _id != "${homepageName}" && _id != "${jobsPageName}" && _id != "${newsPageName}" && _id != "${performancePageName}"`,
						),
				),
		]);
};

export default structure;

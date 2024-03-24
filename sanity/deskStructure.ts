import { FcDocument, FcGlobe, FcSettings, FcTodoList } from "react-icons/fc";
import type { StructureResolver } from "sanity/structure";

const structure: StructureResolver = (S, context) => {
	console.log("s ctx", context);
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
										.schemaType("siteConfig")
										.documentId("siteConfig"),
								),
							S.listItem()
								.icon(FcTodoList)
								.title("Navigation")
								.child(S.documentTypeList("navItem").title("Nav Items")),
						]),
				),
			S.listItem()
				.title("Pages")
				.icon(FcDocument)
				.schemaType("page")
				.child(S.documentTypeList("page").title("Pages")),
			S.listItem()
				.title("Jobs")
				.schemaType("job")
				.child(S.documentTypeList("job").title("Jobs")),
			S.listItem()
				.title("News")
				.schemaType("news")
				.child(S.documentTypeList("news").title("News")),
		]);
};

export default structure;

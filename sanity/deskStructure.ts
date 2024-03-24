import type { StructureResolver } from "sanity/structure";

const structure: StructureResolver = (S, context) => {
	console.log("s ctx", context);
	return S.list()
		.title("Content")
		.items([
			S.listItem()
				.title("Site Configuration")
				.schemaType("siteConfig")
				.child(S.document().schemaType("siteConfig").documentId("siteConfig")),
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

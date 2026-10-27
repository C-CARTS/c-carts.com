import { MdFolderZip } from "react-icons/md";
import { defineField, defineType } from "sanity";

const siteConfig = defineType({
	name: "gtfsFeed",
	type: "document",
	title: "GTFS Feed",
	icon: MdFolderZip,
	fields: [
		defineField({
			name: "feed",
			title: "GTFS Feed",
			type: "file",
			options: {
				accept: ".zip",
			},
			validation: (rule) => rule.required(),
		}),
	],
});

export default siteConfig;

import { FcNews } from "react-icons/fc";
import { defineField, defineType } from "sanity";

const news = defineType({
	name: "news",
	title: "News",
	type: "document",
	icon: FcNews,
	fields: [
		defineField({
			name: "headline",
			title: "Headline",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "headline",
				maxLength: 96,
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "content",
			title: "Job Description",
			type: "content",
		}),
	],
	preview: {
		select: {
			title: "headline",
			subtitle: "dateTime",
		},
	},
});

export default news;

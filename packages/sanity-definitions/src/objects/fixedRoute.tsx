import { MdInsertPhoto, MdOutlineDirectionsBus } from "react-icons/md";
import { defineField, defineType } from "sanity";

const fixedRoute = defineType({
	title: "Fixed Route",
	name: "fixedRoute",
	icon: MdOutlineDirectionsBus,
	type: "object",
	fields: [
		defineField({
			name: "image",
			title: "Map of Route",
			icon: MdInsertPhoto,
			type: "image",
			options: { hotspot: false },
			description: "Map of the route.",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "pdf",
			type: "file",
			title: "PDF",
			description: "PDF of the route schedule",
			validation: (rule) => rule.required(),
			options: {
				storeOriginalFilename: true,
				accept: "application/pdf",
			},
		}),
		defineField({
			name: "table",
			type: "code",
			title: "Route Table Markup",
			description: "HTML table markup for the route schedule",
			validation: (rule) => rule.required(),
			options: {
				language: "html",
				languageAlternatives: [
					{ title: "Javascript", value: "javascript" },
					{ title: "HTML", value: "html" },
					{ title: "CSS", value: "css" },
				],
			},
		}),
	],
	preview: {
		prepare({ image }) {
			return {
				title: "Fixed Route",
				subtitle: "🗺️🚌🚏",
				media: image,
			};
		},
		select: {
			image: "image",
		},
	},
});

export default fixedRoute;

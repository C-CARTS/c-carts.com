import { FcViewDetails } from "react-icons/fc";
import { defineArrayMember, defineField, defineType } from "sanity";

const navItem = defineType({
	name: "navItem",
	title: "Nav Item",
	type: "document",
	icon: FcViewDetails,
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "Title to show at the top level.",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "sortOrder",
			title: "Sort Order",
			type: "number",
			description: "Sort order of the nav item.",
			validation: (rule) => rule.required().min(0).integer(),
		}),
		defineField({
			name: "children",
			title: "Children",
			type: "array",
			of: [
				defineArrayMember({
					type: "reference",
					to: [{ type: "page" as const }],
				}),
			],
			validation: (rule) => rule.required(),
		}),
	],
	orderings: [
		{
			name: "sortOrder",
			title: "Sort Order",
			by: [{ field: "sortOrder", direction: "asc" }],
		},
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return {
				title,
			};
		},
	},
});

export default navItem;

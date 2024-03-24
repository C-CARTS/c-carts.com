import {
	defineArrayMember,
	defineField,
	defineType,
} from "@sanity-typed/types";
import { FcViewDetails } from "react-icons/fc";

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
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (rule) => rule.required(),
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
	preview: {
		select: {
			title: 'title',
			slug: 'slug.current'
		},
		prepare({ title, slug }) {
			const s = slug === '/' ? '/' : `/${slug}`;
			return {
				title: `${title} (${s})`
			};
		}
	}
});

export default navItem;
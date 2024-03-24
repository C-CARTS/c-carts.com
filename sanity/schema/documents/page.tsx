import {
	defineArrayMember,
	defineField,
	defineType,
} from "@sanity-typed/types";
import { FcDocument } from "react-icons/fc";

const page = defineType({
	name: "page",
	title: "Page",
	type: "document",
	icon: FcDocument,
	fieldsets: [
		{
			title: "SEO & metadata",
			name: "metadata",
		},
	],
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
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
			name: "content",
			title: "Page sections",
			type: "array",
			of: [defineArrayMember({ type: "block" })],
		}),
		defineField({
			name: "description",
			type: "text",
			title: "Description",
			description: "This description populates meta-tags on the webpage",
			fieldset: "metadata",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "openGraphImage",
			type: "imageWithAlt",
			title: "Open Graph Image",
			description: "Image for sharing previews on Facebook, Twitter etc.",
			fieldset: "metadata",
		}),
		defineField({
			name: "includeInSitemap",
			type: "boolean",
			title: "Include page in sitemap",
			description: "For search engines. Will be added to /sitemap.xml",
			initialValue: true,
			fieldset: "metadata",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "disallowRobots",
			type: "boolean",
			title: "Disallow in robots.txt",
			description: "Hide this route for search engines",
			initialValue: false,
			fieldset: "metadata",
			validation: (rule) => rule.required(),
		}),
	],
	preview: {
		select: {
			title: "title",
			media: "openGraphImage",
			slug: "slug.current",
		},
		prepare({ title, media, slug }) {
			const s = slug === "/" ? "/" : `/${slug}`;
			return {
				title: `${title} (${s})`,
				media,
			};
		},
	},
});

export default page;

import { FcSettings } from "react-icons/fc";
import { defineField, defineType } from "sanity";

const siteConfig = defineType({
	name: "siteConfig",
	type: "document",
	title: "Site Configuration",
	icon: FcSettings,
	fieldsets: [{ name: "contact", title: "Contact Information" }],
	fields: [
		defineField({
			name: "title",
			title: "Site Title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "shortTitle",
			title: "Short Title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "bannerImage",
			type: "imageWithAlt",
			title: "Banner Image",
			description: "Background image for homepage",
			options: {
				hotspot: true,
				metadata: ["lqip"],
			},
		}),
		defineField({
			name: "url",
			title: "URL",
			type: "string",
			description: "The main site URL. Used to create canonical url.",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "lang",
			title: "Language",
			type: "string",
			description: "The language of the site",
			validation: (rule) =>
				rule.custom((lang) => {
					if (lang === undefined || lang.length === 0) {
						return "Language is required";
					}
					if (lang.length !== 2) {
						return "Language must be a two-letter code";
					}
					return true;
				}),
		}),
		defineField({
			name: "brandLogo",
			title: "Brand Logo",
			description: "The logo for the site",
			type: "imageWithAlt",
			options: {
				hotspot: true,
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "address",
			title: "Address",
			type: "text",
			fieldset: "contact",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "phone",
			title: "Phone",
			type: "string",
			fieldset: "contact",
			validation: (rule) => rule.required(),
		}),
	],
});

export default siteConfig;

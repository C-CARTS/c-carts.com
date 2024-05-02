import { defineField, defineType } from "sanity";

const imageWithAlt = defineType({
	title: "Image",
	name: "imageWithAlt",
	type: "image",
	options: { hotspot: true },
	fields: [
		defineField({
			name: "alt",
			title: "Alt Text",
			type: "string",
			validation: (rule) =>
				rule.custom((val, ctx) => {
					const hasAlt = val !== undefined && val.length > 0;
					const decorative =
						(ctx.parent as { decorative?: boolean })?.decorative === true;
					console.log("validate", {
						ctx,
						val,
						hasAlt,
						decorative,
					});

					if (decorative) {
						return !hasAlt || "Alt text is not needed for decorative images";
					} else {
						return hasAlt || "Alt text is required";
					}
				}),
		}),
		defineField({
			name: "decorative",
			title: "Decorative",
			description: "This image is decorative and does not need alt text",
			type: "boolean",
			initialValue: false,
		}),
	],
	preview: {
		select: {
			subtitle: "alt",
			media: "image",
		},
		prepare({ subtitle, media }) {
			return {
				title: "Image",
				subtitle,
				media,
			};
		},
	},
});

export default imageWithAlt;

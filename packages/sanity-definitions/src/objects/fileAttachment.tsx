import { MdAttachFile } from "react-icons/md";
import { defineField, defineType } from "sanity";

const fileAttachment = defineType({
	title: "File",
	name: "fileAttachment",
	icon: MdAttachFile,
	type: "file",
	options: { storeOriginalFilename: true },
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "Used as the accessible link text for the file",
			validation: (rule) => rule.required().error("A title is required for accessible link text"),
		}),
	],
	preview: {
		select: {
			title: "title",
			fileName: "asset.originalFilename",
		},
		prepare({ title, fileName }) {
			return {
				title: title ?? fileName ?? "File",
				subtitle: fileName,
			};
		},
	},
});

export default fileAttachment;

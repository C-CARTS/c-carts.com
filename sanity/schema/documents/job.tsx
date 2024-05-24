import { FcMoneyTransfer } from "react-icons/fc";
import { defineArrayMember, defineField, defineType } from "sanity";

const job = defineType({
	name: "job",
	title: "Job",
	type: "document",
	icon: FcMoneyTransfer,
	fields: [
		defineField({
			name: "position",
			title: "Position Name",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "position",
				maxLength: 96,
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "rate",
			title: "Pay Rate",
			type: "number",
			validation: (rule) => rule.required().positive().precision(2),
		}),
		defineField({
			name: "content",
			title: "Job Description",
			type: "array",
			of: [defineArrayMember({ type: "block" })],
			validation: (rule) => rule.required(),
		}),
	],
	preview: {
		select: {
			title: "position",
		},
	},
});

export default job;

import { FcScatterPlot } from "react-icons/fc";
import { defineField, defineType } from "sanity";

const job = defineType({
	name: "performance",
	title: "Performance",
	type: "document",
	icon: FcScatterPlot,
	fields: [
		defineField({
			name: "year",
			title: "Year",
			type: "number",
			validation: (rule) => rule.required().min(2000).max(2100),
		}),
		defineField({
			name: "quarter",
			title: "Quarter",
			type: "number",
			validation: (rule) => rule.required().min(1).max(4),
		}),
		defineField({
			name: "file",
			title: "file",
			type: "file",
			options: {
				storeOriginalFilename: true,
				accept: "application/pdf",
			},
		}),
	],
	orderings: [
		{
			name: "yearDesc",
			title: "Year, Descending",
			by: [
				{ field: "year", direction: "desc" },
				{ field: "quarter", direction: "desc" },
			],
		},
		{
			name: "yearAsc",
			title: "Year, Ascending",
			by: [
				{ field: "year", direction: "asc" },
				{ field: "quarter", direction: "asc" },
			],
		},
	],
	preview: {
		select: {
			year: "year",
			quarter: "quarter",
			file: "file.asset.originalFilename",
		},
		prepare(selection) {
			const { year, quarter, file } = selection;
			return {
				title: `${year} - Q${quarter}`,
				subtitle: file,
			};
		},
	},
});

export default job;

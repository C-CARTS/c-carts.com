import {
	MdDirectionsBus,
	MdInsertPhoto,
	MdOutlinePictureAsPdf,
	MdTableChart,
} from "react-icons/md";
import { defineArrayMember, defineType } from "sanity";

const content = defineType({
	title: "Content",
	type: "array",
	name: "content",
	of: [
		defineArrayMember({
			type: "block",
			marks: {
				annotations: [
					{
						name: "pdfLink",
						type: "object",
						title: "PDF Link",
						icon: MdOutlinePictureAsPdf,
						fields: [
							{
								name: "file",
								type: "file",
								title: "File",
								options: {
									storeOriginalFilename: true,
									accept: "application/pdf",
								},
							},
						],
					},
				],
			},
		}),
		defineArrayMember({
			type: "imageWithAlt",
			icon: MdInsertPhoto,
			title: "Image",
		}),
		defineArrayMember({ type: "table", icon: MdTableChart, title: "Table" }),
		defineArrayMember({
			type: "fixedRoute",
			icon: MdDirectionsBus,
			title: "Fixed Route",
		}),
	],
});

export default content;

import { PortableText } from "next-sanity";
import "server-only";
import BlockContent from "../../@types/block";
import FixedRoute from "./fixedRoute/fixedRoute";
import ImageWithAlt from "./imageWithAlt";
import PdfLink from "./pdfLink";
import Table from "./table";

interface Props {
	content: BlockContent[];
}

const components = {
	types: {
		imageWithAlt: ImageWithAlt,
		table: Table,
		fixedRoute: FixedRoute,
	},
	marks: {
		pdfLink: PdfLink,
	},
};

export default function SanityBlockContent({ content }: Props) {
	return (
		<PortableText
			value={content}
			components={components}
			onMissingComponent={(message, options) => {
				console.warn("onMissingComponent", { message, options });
			}}
		/>
	);
}

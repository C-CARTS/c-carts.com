import { PortableText } from "@portabletext/react";
import "server-only";
import type BlockContent from "../../@types/block";
import FileCard from "./fileCard";
import FixedRoute from "./fixedRoute/fixedRoute";
import ImageWithAlt from "./imageWithAlt";
import PdfLink from "./pdfLink";
import Table from "./table";

interface Props {
	content: BlockContent[] | undefined;
}

const components = {
	types: {
		imageWithAlt: ImageWithAlt,
		table: Table,
		fixedRoute: FixedRoute,
		fileAttachment: FileCard,
	},
	marks: {
		pdfLink: PdfLink,
	},
};

export default function SanityBlockContent({ content }: Props) {
	return (
		<PortableText
			value={content ?? []}
			components={components}
			onMissingComponent={(message, options) => {
				console.warn("onMissingComponent", { message, options });
			}}
		/>
	);
}

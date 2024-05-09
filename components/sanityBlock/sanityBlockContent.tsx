import { PortableText } from "next-sanity";
import BlockContent from "../../@types/block";
import ImageWithAlt from "./imageWithAlt";
import Table from "./table";

interface Props {
	content: BlockContent[];
}

const components = {
	types: {
		imageWithAlt: ImageWithAlt,
		table: Table,
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

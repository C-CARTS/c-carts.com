import { PortableText } from "next-sanity";
import BlockContent from "../../@types/block";

interface Props {
	content: BlockContent[];
}

export default function SanityBlockContent({ content }: Props) {
	return <PortableText value={content} />;
}

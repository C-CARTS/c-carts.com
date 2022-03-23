import { TextSection } from '@c-carts/cms';
import { PortableText } from '@portabletext/react';

interface Props {
	block: TextSection;
}

export default function TextComponent({ block: { text } }: Props) {
	return <PortableText value={text} />;
}

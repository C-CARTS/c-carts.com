import { TextSection } from '@c-carts/cms';
import PortableText from '../../sanity/portableText';

interface Props {
	block: TextSection;
}

export default function TextComponent({ block: { text } }: Props) {
	return <PortableText blocks={text} />;
}

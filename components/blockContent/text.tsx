import { FC } from 'react';
import PortableText from '../../sanity/portableText';
import { TextSection } from '../../sanity/schema';

interface Props {
	block: TextSection;
}

const TextComponent: FC<Props> = ({ block: { text } }: Props) => {
	return <PortableText blocks={text} />;
};

export default TextComponent;

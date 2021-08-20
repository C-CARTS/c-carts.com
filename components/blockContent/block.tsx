import { FC } from 'react';
import { SanityKeyed } from 'sanity-codegen/types';
import assertUnreachable from '../../helpers/assertUnreachable';
import { Hero, ImageSection, TextSection } from '../../sanity/schema';
import HeroComponent from './hero';
import ImageComponent from './image';
import TextComponent from './text';

interface Props {
	block: SanityKeyed<Hero> | SanityKeyed<ImageSection> | SanityKeyed<TextSection>;
}

const Block: FC<Props> = ({ block }: Props) => {
	const { _type } = block;
	switch (_type) {
		case 'hero':
			return <HeroComponent block={block as Hero} />;
		case 'imageSection':
			return <ImageComponent block={block as ImageSection} />;
		case 'textSection':
			return <TextComponent block={block as TextSection} />;
		default:
			assertUnreachable(_type);
	}
	return null;
};

export default Block;

import { ImageSection, JobsSection, TextSection } from '@c-carts/cms';
import { SanityKeyed } from 'sanity-codegen/types';
import assertUnreachable from '../../helpers/assertUnreachable';
import ImageComponent from './image';
import JobsComponent from './jobs';
import TextComponent from './text';

interface Props {
	block: SanityKeyed<ImageSection> | SanityKeyed<TextSection> | SanityKeyed<JobsSection>;
}

export default function Block({ block }: Props) {
	console.log('Reached HERE', block.text[0].children);
	const { _type } = block;
	switch (_type) {
		case 'imageSection':
			return <ImageComponent block={block as ImageSection} />;
		case 'textSection':
			return <TextComponent block={block as TextSection} />;
		case 'jobsSection':
			return <JobsComponent block={block as JobsSection} />;
		default:
			assertUnreachable(_type);
	}
	return null;
}

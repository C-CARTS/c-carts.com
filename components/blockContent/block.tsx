import { ImageSection, JobsSection, MapsSection, NewsSection, PerformanceSection, TextSection } from '@c-carts/cms';
import { SanityKeyed } from 'sanity-codegen/types';
import assertUnreachable from '../../helpers/assertUnreachable';
import ScheduleComponent from './schedules';
import ImageComponent from './image';
import JobsComponent from './jobs';
import NewsComponent from './newz';
import TextComponent from './text';
import PerformanceOperations from './performance';

interface Props {
	block:
		| SanityKeyed<ImageSection>
		| SanityKeyed<TextSection>
		| SanityKeyed<JobsSection>
		| SanityKeyed<NewsSection>
		| SanityKeyed<MapsSection>
		| SanityKeyed<PerformanceSection>;
}

export default function Block({ block }: Props) {
	const { _type } = block;

	switch (_type) {
		case 'imageSection':
			return <ImageComponent block={block as ImageSection} />;
		case 'textSection':
			return <TextComponent block={block as TextSection} />;
		case 'jobsSection':
			return <JobsComponent block={block as JobsSection} />;
		case 'newsSection':
			return <NewsComponent block={block as NewsSection} />;
		case 'mapsSection':
			return <ScheduleComponent block={block as MapsSection} />;
		case 'performanceSection':
			return <PerformanceOperations block={block as PerformanceSection} />;
		default:
			assertUnreachable(_type);
	}
	return null;
}

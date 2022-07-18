import { CodeSection, ImageSection, JobsSection, NewsSection, PerformanceSection, RoutesReferences, TextSection } from '@c-carts/cms';
import { SanityKeyed } from 'sanity-codegen/types';
import assertUnreachable from '../../helpers/assertUnreachable';
import Schedules from '../tabs/schedules';
import DemandResponse from '../tabs/schedules';
import ImageComponent from './image';
import JobsComponent from './jobs';
import NewsComponent from './newz';
import PerformanceOperations from './performance';
import DisplayHtmlTable from './table';
import TextComponent from './text';

interface Props {
	block:
		| SanityKeyed<ImageSection>
		| SanityKeyed<TextSection>
		| SanityKeyed<JobsSection>
		| SanityKeyed<NewsSection>
		| SanityKeyed<PerformanceSection>
		| SanityKeyed<CodeSection>
		| SanityKeyed<RoutesReferences>;
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
		case 'performanceSection':
			return <PerformanceOperations block={block as PerformanceSection} />;
		case 'codeSection':
			return <DisplayHtmlTable block={block as CodeSection} />;
		case 'routesReferences':
			return <Schedules block={block as RoutesReferences} />;
		default:
			assertUnreachable(_type);
	}
	return null;
}

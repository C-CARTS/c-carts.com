import {
	ImageSection,
	JobsSection,
	NewsSection,
	PerformanceSection,
	TextSection,
	RantoulSection,
	EagleExpressSection,
	DemandResponseSection,
	CodeSection
} from '@c-carts/cms';
import { SanityKeyed } from 'sanity-codegen/types';
import assertUnreachable from '../../helpers/assertUnreachable';
import ImageComponent from './image';
import JobsComponent from './jobs';
import NewsComponent from './newz';
import TextComponent from './text';
import PerformanceOperations from './performance';
import RantoulConnect from '../tabs/rantoul';
import DemandResponse from '../tabs/demandResponse';
import EagleExpress from '../tabs/eagleExpress';
import DisplayHtmlTable from './table';

interface Props {
	block:
		| SanityKeyed<ImageSection>
		| SanityKeyed<TextSection>
		| SanityKeyed<JobsSection>
		| SanityKeyed<NewsSection>
		| SanityKeyed<PerformanceSection>
		| SanityKeyed<RantoulSection>
		| SanityKeyed<DemandResponseSection>
		| SanityKeyed<EagleExpressSection>
		| SanityKeyed<CodeSection>;
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
		case 'rantoulSection':
			return <RantoulConnect block={block as RantoulSection} />;
		case 'demandResponseSection':
			return <DemandResponse block={block as DemandResponseSection} />;
		case 'eagleExpressSection':
			return <EagleExpress block={block as EagleExpressSection} />;
		case 'codeSection':
			return <DisplayHtmlTable block={block as CodeSection} />;
		default:
			assertUnreachable(_type);
	}
	return null;
}

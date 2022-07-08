import {
	CodeSection,
	DemandResponseSection,
	EagleExpressSection,
	ImageSection,
	JobsSection,
	NewsSection,
	PerformanceSection,
	RantoulSection,
	TextSection
} from '@c-carts/cms';
import { SanityKeyed } from 'sanity-codegen/types';
import assertUnreachable from '../../helpers/assertUnreachable';
import DemandResponse from '../_tabs/demandResponse';
import EagleExpress from '../_tabs/eagleExpress';
import RantoulConnect from '../_tabs/rantoul';
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

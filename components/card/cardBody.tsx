import { PortableText } from '@c-carts/cms';

import styled from 'styled-components';
import PortableTxt from '../../sanity/portableText';

import CardButton from './cardButton';

const CardBodyContent = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	align-items: flex-start;
	justify-content: flex-start;
	flex: 1 1 auto;
`;

const TextSection = styled(CardBodyContent)`
	padding: 0;
	width: 100%;

	p {
		max-height: 7rem;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 3; /* number of lines to show */
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
	}
`;

interface Prop {
	content: PortableText | undefined;
	slug: string;
}
export default function CardBody({ content, slug }: Prop) {
	return (
		<CardBodyContent>
			<TextSection>
				<PortableTxt blocks={content} />
			</TextSection>
			<CardButton news={slug} />
		</CardBodyContent>
	);
}

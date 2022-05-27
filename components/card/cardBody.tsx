import { PortableText } from '@c-carts/cms';
import styled from 'styled-components';
import PortableTxt from '../../sanity/portableText';
import { ThemeProps } from '../../types/theme';

import CardButton from './cardButton';

const CardBodyContent = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: baseline;
	align-content: center;
	padding: 0.312rem 0px 0.625rem 0.625rem;
`;

const TextSection = styled(CardBodyContent)`
	padding-bottom: 0px;
	margin-bottom: 0px;
	width: ${({ theme }: ThemeProps) => theme.widths.elevelByTwelve}%;

	p {
		max-width: ${({ theme }: ThemeProps) => theme.widths.tenByTwelve}%;
		margin-bottom: 0px;
		max-height: 7rem;
		margin-bottom: 1.125rem;

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
			<CardButton slug={slug} />
		</CardBodyContent>
	);
}

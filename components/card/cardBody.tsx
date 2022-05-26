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
	width: ${({ theme }: ThemeProps) => theme.widths.elevelByTwelve}%;
	height: fit-content;
`;

interface Prop {
	content: PortableText | undefined;
}
export default function CardBody({ content }: Prop) {
	return (
		<CardBodyContent>
			<TextSection>
				<PortableTxt blocks={content} />
			</TextSection>
			<CardButton />
		</CardBodyContent>
	);
}

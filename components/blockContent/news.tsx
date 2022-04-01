/* eslint-disable no-underscore-dangle */
import { News } from '@c-carts/cms';
import styled from 'styled-components';
import PortableText from '../../sanity/portableText';
import { ThemeProps } from '../../types/theme';
import getDate from '../../utils/dateTime';

const NewsContainer = styled.section`
	font-family: ${({ theme }: ThemeProps) => theme.typography.fontFamily};

	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	align-items: flex-start;
`;

const Heading = styled.h1`
	font-size: 1.35rem;
	${({ theme }: ThemeProps) => theme.typography.headingFont};
	font-weight: 500;
`;

const SubHeading = styled.h2`
	font-size: 1.001rem;
	font-weight: 400;
	align-self: flex-end;
	font-family: 'NotoSans';
`;

interface Props {
	nz: News;
}

export default function NewsComponent({ nz: { headline, dateTime, content } }: Props) {
	return (
		<NewsContainer className="news">
			<Heading>{headline}</Heading>
			<SubHeading>{getDate(dateTime)}</SubHeading>
			<div style={{ fontFamily: 'Corbert', fontSize: '2.2em' }}>
				<PortableText blocks={content} />
			</div>
		</NewsContainer>
	);
}

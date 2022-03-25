/* eslint-disable no-underscore-dangle */
import { News } from '@c-carts/cms';
import styled from 'styled-components';
import PortableText from '../../sanity/portableText';
import { ThemeProps } from '../../types/theme';

const NewsContainer = styled.section`
	font-family: ${({ theme }: ThemeProps) => theme.typography.fontFamily};
`;

const Heading = styled.h1`
	font-size: 1.35rem;
`;

const SubHeading = styled.h2`
	font-size: 1.1rem;
`;

interface Props {
	nz: News;
}

export default function NewsComponent({ nz: { headline, dateTime, content } }: Props) {
	return (
		<NewsContainer className="news">
			<Heading>{headline}</Heading>
			<SubHeading>{dateTime}</SubHeading>

			<PortableText blocks={content} />
		</NewsContainer>
	);
}

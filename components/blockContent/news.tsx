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
	font-weight: bold;
	align-self: flex-start;
	font-family: 'NotoSans';
`;

const ContentWrapper = styled.div`
	a {
		&,
		&:link {
			text-decoration: underline;
			text-decoration-thickness: 0.15rem;
			text-decoration-color: ${({ theme }: ThemeProps) => theme.colors.primary.color};
		}
		&:hover {
			text-decoration: underline;
			text-decoration-color: ${({ theme }: ThemeProps) => theme.colors.error.contrastColor};
			text-decoration-thickness: 0.15rem;
		}
		&:focus,
		&:focus-visible {
			outline-color: transparent;
			> span {
				text-decoration: underline;
				text-decoration-color: ${({ theme }: ThemeProps) => theme.colors.secondary.color};
				text-decoration-thickness: 0.15rem;
				background: ${({ theme }: ThemeProps) => theme.colors.secondary.subtle};
			}
		}
	}
`;

interface Props {
	news: News;
}

export default function NewsComponent({ news: { headline, dateTime, content } }: Props) {
	return (
		<NewsContainer className="news">
			<Heading>{headline}</Heading>
			<SubHeading>{getDate(dateTime)}</SubHeading>
			<ContentWrapper>
				<PortableText blocks={content} />
			</ContentWrapper>
		</NewsContainer>
	);
}

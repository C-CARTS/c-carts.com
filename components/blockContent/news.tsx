/* eslint-disable no-underscore-dangle */
import { News } from '@c-carts/cms';
import styled from 'styled-components';

import Card from '../card/card';

const CardOuterContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	.outer {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
	}
`;

const CardInnerContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	.inner {
		display: flex;
		flex-direction: row;
		width: 100%;
	}
`;

// const Heading = styled.h1`
// 	font-size: 1.35rem;
// 	${({ theme }: ThemeProps) => theme.typography.headingFont};
// 	font-weight: 500;
// `;

// const SubHeading = styled.h2`
// 	font-size: 1.001rem;
// 	font-weight: bold;
// 	align-self: flex-start;
// 	font-family: 'NotoSans';
// `;

// const ContentWrapper = styled.div`
// 	a {
// 		&,
// 		&:link {
// 			text-decoration: underline;
// 			text-decoration-thickness: 0.15rem;
// 			text-decoration-color: ${({ theme }: ThemeProps) => theme.colors.primary.color};
// 		}
// 		&:hover {
// 			text-decoration: underline;
// 			text-decoration-color: ${({ theme }: ThemeProps) => theme.colors.error.contrastColor};
// 			text-decoration-thickness: 0.15rem;
// 		}
// 		&:focus,
// 		&:focus-visible {
// 			outline-color: transparent;
// 			> span {
// 				text-decoration: underline;
// 				text-decoration-color: ${({ theme }: ThemeProps) => theme.colors.secondary.color};
// 				text-decoration-thickness: 0.15rem;
// 				background: ${({ theme }: ThemeProps) => theme.colors.secondary.subtle};
// 			}
// 		}
// 	}
// `;

interface Props {
	news: News;
}

export default function NewsComponent({ news }: Props) {
	return <Card news={news} />;
}

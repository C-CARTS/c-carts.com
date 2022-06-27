import { useRouter } from 'next/router';
import { MouseEvent, useCallback } from 'react';

import styled from 'styled-components';

import { ThemeProps } from '../../types/theme';

const ReadMoreLink = styled.a`
	border: none;
	font-family: inherit;
	color: ${({ theme }: ThemeProps) => theme.colors.primary.contrastColor};
	font-size: 1rem;
	font-weight: 600;
	padding: 0.25rem 1.5rem;
	white-space: nowrap;
	background: ${({ theme }: ThemeProps) => theme.colors.primary.background};
	text-decoration: none;
	flex-flow: 0 0 auto;
	align-self: flex-end;

	&:hover {
		border-bottom: 4px solid ${({ theme }: ThemeProps) => theme.colors.link.subtle};
	}
	& {
		border-bottom: 4px solid ${({ theme }: ThemeProps) => theme.colors.link.underline};
	}
`;
const LinkDescription = styled.span`
	position: absolute;
	left: -10000px;
	top: auto;
	width: 1px;
	height: 1px;
	overflow: hidden;
`;

interface Prop {
	news: string;
}

export default function CardButton({ news }: Prop) {
	const { asPath, push } = useRouter();

	const clickEvent = useCallback(
		(event: MouseEvent<HTMLAnchorElement>) => {
			event.preventDefault();
			push(`${event?.currentTarget.baseURI}/story/${news}`);
		},
		[push, news]
	);

	return (
		<ReadMoreLink id="readlink" href={`${asPath}/story/${news}`} onClick={(event) => clickEvent(event)}>
			Read More <LinkDescription>{news}</LinkDescription>
		</ReadMoreLink>
	);
}

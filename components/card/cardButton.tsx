import { useRouter } from 'next/router';
import { MouseEvent, useCallback } from 'react';
import { useRecoilCallback } from 'recoil';
import styled from 'styled-components';

import { ThemeProps } from '../../types/theme';
import { processSnapshot } from '../../utils/helperFunctions';

const ReadMoreLink = styled.a`
	border: none;
	font-family: inherit;
	color: ${({ theme }: ThemeProps) => theme.colors.primary.color};
	font-size: 1.25rem;
	font-weight: 500;
	padding: 0.25rem 1.5rem;
	white-space: nowrap;
	background: ${({ theme }: ThemeProps) => theme.colors.primary.background};
	text-decoration: none;

	&:hover {
		border-bottom: 4px solid ${({ theme }: ThemeProps) => theme.colors.link.subtle};
	}
	& {
		border-bottom: 4px solid ${({ theme }: ThemeProps) => theme.colors.link.underline};
	}
`;

interface Prop {
	news: string;
}

export default function CardButton({ news }: Prop) {
	const { asPath, push } = useRouter();
	const saveState = useRecoilCallback(({ snapshot }) => () => {
		processSnapshot(snapshot);
	});
	const clickEvent = useCallback(
		(event: MouseEvent<HTMLAnchorElement> | undefined) => {
			event?.preventDefault();
			push(`${event?.currentTarget.baseURI}/news/${news}`);
			saveState();
		},
		[push, news, saveState]
	);

	return (
		<ReadMoreLink href={`${asPath}/news/${news}`} onClick={(event) => clickEvent(event)}>
			ReadMore
		</ReadMoreLink>
	);
}

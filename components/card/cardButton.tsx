import { useRouter } from 'next/router';
import { MouseEvent, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { newsSlugState } from '../../state/newsCardState';
import { ThemeProps } from '../../types/theme';

const BtnCard = styled.button`
	border: none;

	font-family: inherit;
	color: #cc4d4d;
	font-size: 0.96rem;

	width: ${({ theme }: ThemeProps) => theme.widths.fourByTwelve}%;
	transition: 0.25s;

	border-radius: 0.25rem;

	&:active {
		transform: scale(0.98);
	}
`;

interface Prop {
	slug: string;
}

export default function CardButton({ slug }: Prop) {
	const { push } = useRouter();
	const setSlugValue = useSetRecoilState(newsSlugState);

	const clickEvent = useCallback(
		(event: MouseEvent<HTMLButtonElement> | undefined, id: string) => {
			event?.preventDefault();
			setSlugValue(id);
			push(`${event?.currentTarget.baseURI}/news/${id}`);
		},
		[push, setSlugValue]
	);
	return <BtnCard onClick={(e) => clickEvent(e, slug)}>Read More</BtnCard>;
}

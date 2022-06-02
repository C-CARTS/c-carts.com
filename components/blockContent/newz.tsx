import { NewsSection } from '@c-carts/cms';
import { useMemo } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import useNewz from '../../data-hooks/useNewz';
import { newsObjectState } from '../../state/newsCardState';
import { ThemeProps } from '../../types/theme';
import News from './news';

interface Props {
	block: NewsSection;
}

const Container = styled.div`
	font-family: ${({ theme }: ThemeProps) => theme.typography.fontFamily};
	max-width: 1200px;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: minmax(250px, auto);
	grid-row-gap: 1.25rem;
	grid-column-gap: 0.6rem;

	@media (max-width: 900px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (max-width: 720px) {
		grid-template-columns: 1fr;
	}
`;

export default function NewsComponent({ block: { count } }: Props) {
	const newsUpdates = useNewz();
	const setNewsObject = useSetRecoilState(newsObjectState);
	useMemo(() => {
		setNewsObject(newsUpdates);
	}, [newsUpdates, setNewsObject]);

	if (newsUpdates.length === 0) {
		return (
			<p className="news unavailable">
				<strong>There are currently no news updates available</strong>
			</p>
		);
	}

	const filtered = count === 0 ? newsUpdates : newsUpdates.slice(0, count);

	return (
		<Container className="Container">
			{filtered.map((j: any) => (
				<News news={j} key={j._id} />
			))}
		</Container>
	);
}

NewsComponent.datahooks = [useNewz];

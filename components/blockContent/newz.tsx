import { NewsSection, News as NewsType } from '@c-carts/cms';

import styled from 'styled-components';
import useNewz from '../../data-hooks/useNewz';
import { mediaQueryMaxWidths } from '../../styles/theme';

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
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: auto;
	justify-items: stretch;
	align-items: stretch;
	grid-row-gap: 1.25rem;
	grid-column-gap: 1rem;

	@media (max-width: ${mediaQueryMaxWidths.newscontainerTwoCol}px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (max-width: ${mediaQueryMaxWidths.newscontainerOneCol}px) {
		grid-template-columns: 1fr;
	}
`;

export default function NewsComponent({ block: { count } }: Props) {
	const newsUpdates = useNewz();

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
			{filtered.map((j: NewsType) => (
				<News news={j} key={j._id} />
			))}
		</Container>
	);
}

NewsComponent.datahooks = [useNewz];

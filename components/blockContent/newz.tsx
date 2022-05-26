import { NewsSection } from '@c-carts/cms';
import styled from 'styled-components';
import useNewz from '../../data-hooks/useNewz';
import { ThemeProps } from '../../types/theme';
import News from './news';

interface Props {
	block: NewsSection;
}

const Container = styled.div`
	width: 100%;
	max-width: 1200px;
	flex-direction: row;
	flex-wrap: wrap;
	margin: auto;
	font-family: ${({ theme }: ThemeProps) => theme.typography.fontFamily};
`;

const CardOuterContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
`;

const CardInnerContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	width: 100%;

	@media (max-width: 880px) {
		flex-direction: column;
		flex-wrap: nowrap;
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
		<Container>
			<CardOuterContainer>
				<CardInnerContainer>
					{filtered.map((j: any) => (
						<News news={j} key={j._id} />
					))}
				</CardInnerContainer>
			</CardOuterContainer>
		</Container>
	);
}

NewsComponent.datahooks = [useNewz];

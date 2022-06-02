import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { newsSelector } from '../../state/newsCardState';
import PortableTxt from '../../sanity/portableText';
import getDate from '../../utils/dateTime';
import { ThemeProps } from '../../types/theme';

const ErrorMessage = styled.div`
	font-size: 1.2rem;
	font-weight: 600;
`;

const NewsCard = styled.div`
	box-shadow: 2px 3px 2px -12px ${({ theme }: ThemeProps) => theme.colors.secondary.contrastColor};
`;

export default function CardNews() {
	const selectedNews = useRecoilValue(newsSelector);

	if (selectedNews === undefined) {
		return <ErrorMessage>The selected item does not exist</ErrorMessage>;
	}
	const { headline, content, dateTime } = selectedNews;

	return (
		<NewsCard>
			<h2>{headline}</h2>
			<h3>{getDate(dateTime)}</h3>
			<div>
				<PortableTxt blocks={content} />
			</div>
		</NewsCard>
	);
}

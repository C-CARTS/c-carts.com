import styled from 'styled-components';
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

export default function CardNews(props: any) {
	const {
		props: { currentNews }
	} = props;

	if (currentNews === undefined) {
		return <ErrorMessage>The selected item does not exist</ErrorMessage>;
	}

	const { headline, content, dateTime } = currentNews;

	return (
		<NewsCard>
			<h2>{headline}</h2>
			<h3>{getDate(dateTime)}</h3>
			<PortableTxt blocks={content} />
		</NewsCard>
	);
}

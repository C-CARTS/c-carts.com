import { News } from '@c-carts/cms';
import styled from 'styled-components';

import PortableTxt from '../../sanity/portableText';
import getDate from '../../utils/dateTime';

const ErrorMessage = styled.div`
	font-size: 1.2rem;
	font-weight: 600;
`;

const NewsCard = styled.div`
	padding-left: 2rem;
	padding-top: 2rem;
	box-shadow: 2px 4px 12px hsl(220deg 0% 80%);
	box-shadow: 2px 4px 12px hsl(0deg 0% 80%);
	box-shadow: 2px 4px 12px hsl(360deg 0% 80%);
	box-shadow: 2px 4px 12px hsl(180deg 0% 80%);
	border-radius: 5px;
`;

interface Props {
	currentNews: News;
}

export default function CardNews({ currentNews }: Props) {
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

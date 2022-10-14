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
`;

interface Props {
	currentNews: News;
}

export default function CardNews({ currentNews }: Props) {
	if (currentNews === undefined) {
		return <ErrorMessage>The selected News Card item does not exist</ErrorMessage>;
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

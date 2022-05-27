import { News } from '@c-carts/cms';
import styled from 'styled-components';

import CardBody from './cardBody';
import CardHeader from './cardHeader';

const CardContainer = styled.article`
	width: 100%;
	background-color: #aeabb4;
	box-shadow: 0px 7px 30px -10px rgba(150, 170, 180, 0.5);
	transition: 0.25s;

	&:hover {
		box-shadow: 0 5px 10px rgba(56, 56, 56, 0.871), 0 15px 40px rgba(50, 50, 50, 0.871);
		pointer-events: auto;
		transform: scale(1.05);

		transition: all 150ms ease-in-out;

		.button-primary {
			cursor: pointer;
			transform: translate(10px, 0);
		}
	}
	&:active {
		box-shadow: none;
		transform-origin: center;
	}

	@media (max-width: 820px) {
		margin: 1.125rem 0px;
	}
`;

interface Props {
	news: News;
}

export default function Card({ news: { slug, headline, dateTime, content } }: Props) {
	return (
		<CardContainer>
			<CardHeader headline={headline} date={dateTime} />
			<CardBody content={content} slug={slug.current} />
		</CardContainer>
	);
}

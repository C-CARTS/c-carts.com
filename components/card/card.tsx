import { News } from '@c-carts/cms';
import styled from 'styled-components';
import { ThemeProps } from '../../types/theme';
import CardBody from './cardBody';
import CardHeader from './cardHeader';

const CardContainer = styled.article`
	width: ${({ theme }: ThemeProps) => theme.widths.fiveByTwelve}%;
	max-width: 400px;
	display: block;
	background-color: #aeabb4;
	box-shadow: 10px 5px 40px 20px darken(#341cac, 5%);
	transition: 0.25s;
	margin: 0px 0.325rem;
	&:hover {
		box-shadow: 0 2px 4px rgba(#000, 0.2), 0 4px 8px rgba(#000, 0.2);
		cursor: pointer;

		.button-primary {
			transform: translate(10px, 0);
		}
	}
	&:active {
		box-shadow: none;
		transform-origin: center;
		transform: scale(0.98);
	}

	@media (max-width: 820px) {
		margin: 1.125rem 0px;
	}
`;

interface Props {
	news: News;
}

export default function Card({ news: { headline, dateTime, content } }: Props) {
	return (
		<CardContainer>
			<CardHeader headline={headline} date={dateTime} />
			<CardBody content={content} />
		</CardContainer>
	);
}

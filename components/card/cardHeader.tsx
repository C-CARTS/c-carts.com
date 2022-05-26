import styled from 'styled-components';
import { ThemeProps } from '../../types/theme';
import getDate from '../../utils/dateTime';

const Header = styled.header`
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	height: 250px;
	width: 100%;
	padding: 0.625rem;
	background-image: url('http://placehold.jp/300x150.png');
	background-size: cover;
	color: #fff;
`;

const Heading = styled.h3`
	text-transform: uppercase;
	height: ${({ theme }: ThemeProps) => theme.widths.nineByTwelve}%;
	margin: 0px;
`;

const Date = styled.span`
	color: #ffffff;
	text-transform: uppercase;
	font-weight: 600;
	height: ${({ theme }: ThemeProps) => theme.widths.twoByTwelve}%;
`;

interface Props {
	headline: string;
	date: string;
}
export default function CardHeader({ headline, date }: Props) {
	return (
		<Header>
			<Heading>{headline}</Heading>
			<Date>{getDate(date)}</Date>
		</Header>
	);
}

import styled from 'styled-components';
import { ThemeProps } from '../../types/theme';
import getDate from '../../utils/dateTime';

const Header = styled.header`
	flex: 0 0 auto;
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: stretch;
	align-items: stretch;
	flex-wrap: nowrap;
	padding: 0.625rem;
	min-height: 170px;
	background-size: cover;
	color: ${({ theme }: ThemeProps) => theme.colors.primary.background};
`;

const Heading = styled.h3`
	text-transform: uppercase;
	margin: 0px;
`;

const Date = styled.span`
	text-transform: capitalize;
	font-weight: 600;
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

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
	flex-flow: 0 0 auto;
	flex-wrap: nowrap;
	color: ${({ theme }: ThemeProps) => theme.colors.primary.contrastColor};
`;

const Heading = styled.h2`
	text-transform: uppercase;
	margin: 0px;
	padding: 0px;
	font-size: 1.315rem;
	line-height: 1.8rem;
`;

const Date = styled.span`
	text-transform: capitalize;
	font-weight: 600;
	font-size: 0.8rem;
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

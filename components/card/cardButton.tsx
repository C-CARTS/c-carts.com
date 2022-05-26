import styled from 'styled-components';
import { ThemeProps } from '../../types/theme';

const BtnCard = styled.button`
	border: none;
	box-shadow: none;
	font-family: inherit;
	color: #cc4d4d;
	font-size: 1rem;
	width: ${({ theme }: ThemeProps) => theme.widths.fourByTwelve}%;
	transition: 0.25s;
`;

export default function CardButton() {
	return <BtnCard>Read More</BtnCard>;
}

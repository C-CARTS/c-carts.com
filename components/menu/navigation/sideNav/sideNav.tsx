import styled from 'styled-components';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useCallback, useState } from 'react';
import { MainNavItem } from '../../../../data-hooks/useMainNav';
// eslint-disable-next-line import/no-cycle
import SideSection from './sideSection';
import { ThemeProps } from '../../../../types/theme';

const navButtonHeight = '2rem';

const SideNavButton = styled.button`
	-webkit-appearance: none;
	height: 100%;

	background: ${({ theme }: ThemeProps) => theme.colors.secondary.contrastColor};
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize * 1.35}px;
	font-weight: ${({ theme }: ThemeProps) => theme.typography.boldFontWeight};
	color: ${({ theme }: ThemeProps) => theme.colors.secondary.subtle};
	text-align: center;
	width: fit-content;
	padding: 0.75rem;

	height: ${navButtonHeight};

	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	white-space: nowrap;
	justify-content: center;

	& {
		margin-left: 1.05rem;
		margin-top: 0.45rem;
		margin-bottom: 0.45rem;
	}

	&:focus-visible {
		border-color: #fff;
		border-width: 0.15rem;
		border-style: solid;
	}
`;
const ListContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
`;

export interface Props {
	nav: MainNavItem[];
}

export default function SideNav({ nav }: Props) {
	const [buttonState, setButtonState] = useState(false);
	const [keyPressState, setKeypresed] = useState(false);
	const buttonClick = useCallback(() => {
		if (buttonState) {
			setButtonState(false);
		} else {
			setButtonState(true);
		}
	}, [setButtonState, buttonState]);

	const keyPress = useCallback(
		(event) => {
			if (event.key === 'Enter' || event.key === 'Tab' || event.key === 'Space') {
				setKeypresed(true);
			} else {
				setKeypresed(false);
			}
		},
		[setKeypresed]
	);

	return (
		// eslint-disable-next-line react/button-has-type
		<ListContainer>
			<SideNavButton
				aria-label="Side Navigation Menu"
				aria-haspopup="menu"
				aria-controls="ccarts"
				aria-expanded={buttonState || keyPressState}
				type="button"
				onClick={buttonClick}
				onKeyPress={keyPress}
			>
				{buttonState ? <AiOutlineClose /> : <AiOutlineMenu />}
			</SideNavButton>
			{buttonState ? <SideSection nav={nav} /> : ''}
		</ListContainer>
	);
}

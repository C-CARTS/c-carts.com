import Link from 'next/link';
import { KeyboardEvent, useCallback, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import styled from 'styled-components';

import { useSetRecoilState } from 'recoil';
import { MainNavItem } from '../../../../data-hooks/useMainNav';
// eslint-disable-next-line import/no-cycle
import { sideButtonState } from '../../../../state/changeProperty';
import { ThemeProps } from '../../../../types/theme';
import SideSection from './sideSection';

const Container = styled.div`
	width: 100%;
	z-index: 10;
	position: relative;
	overflow: visible;
`;

const ListContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	padding-left: 0.45rem;
`;

const SideNavButton = styled.button`
	-webkit-appearance: none;
	height: 36px;
	width: 36px;
	box-sizing: content-box;
	padding: 0;

	background: ${({ theme }: ThemeProps) => theme.colors.primary.background}00;
	border: 2px solid ${({ theme }: ThemeProps) => theme.colors.secondary.color};
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize * 1.5}px;
	font-weight: ${({ theme }: ThemeProps) => theme.typography.boldFontWeight};
	color: ${({ theme }: ThemeProps) => theme.colors.secondary.contrastColor};
	text-align: center;
	margin-right: 0.25rem;

	display: grid;
	place-content: center;
	transition: color 0.2s ease-out, background 0.2s ease-out;

	&.open {
		background: ${({ theme }: ThemeProps) => theme.colors.secondary.color};
	}

	&,
	&:visited {
		color: ${({ theme }: ThemeProps) => theme.colors.primary.contrastColor};
	}

	&:hover,
	&:focus-visible {
		transition: all 0.2s ease-in;
		text-decoration-color: ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder};
		outline-color: transparent;
	}

	&:focus-visible {
		background: ${({ theme }: ThemeProps) => theme.colors.secondary.subtle};
		text-decoration-color: ${({ theme }: ThemeProps) => theme.colors.secondary.color};
	}
`;

const LogoLink = styled.a`
	font-size: calc(${({ theme }: ThemeProps) => theme.typography.baseFontSize} * 0.086rem);
	font-weight: ${({ theme }: ThemeProps) => theme.typography.boldFontWeight};
	text-decoration-color: transparent;
	text-decoration-thickness: 0.22rem;
	transition: all 0.2s ease-out;
	outline-color: transparent;
	padding-left: 0.45rem;

	&:hover,
	&:focus-visible {
		transition: all 0.2s ease-in;
		text-decoration-color: ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder};
		outline-color: transparent;
	}
	&:focus-visible {
		background: ${({ theme }: ThemeProps) => theme.colors.secondary.subtle};
		text-decoration-color: ${({ theme }: ThemeProps) => theme.colors.secondary.color};
	}
`;

export interface Props {
	nav: MainNavItem[];
}

export default function SideNav({ nav }: Props) {
	const [buttonState, setButtonState] = useState(false);
	const [keyPressState, setKeypresed] = useState(false);
	const btnRef = useRef<HTMLButtonElement | null>(null);
	const setSideNavButton = useSetRecoilState(sideButtonState);

	const buttonClick = useCallback(() => {
		if (buttonState) {
			setButtonState(false);
		} else {
			setButtonState(true);
		}
	}, [setButtonState, buttonState]);

	const keyPress = useCallback(
		(event: KeyboardEvent<HTMLButtonElement>) => {
			if (event.key === 'Enter' || event.key === 'Tab' || event.key === 'Space') {
				setSideNavButton(btnRef.current);
				setKeypresed(true);
			} else {
				setKeypresed(false);
			}
		},
		[setKeypresed, setSideNavButton]
	);

	return (
		// eslint-disable-next-line react/button-has-type
		<Container role="navigation" aria-label="Hamburger Menu">
			<ListContainer>
				<SideNavButton
					ref={btnRef}
					aria-controls="side-navigation"
					aria-haspopup="true"
					id="sideNavButton"
					aria-expanded={keyPressState}
					type="button"
					aria-label="Button to open or close side navigation menu"
					onClick={buttonClick}
					onKeyPress={keyPress}
					className={buttonState ? 'open' : 'closed'}
				>
					{buttonState ? <AiOutlineClose aria-hidden="true" /> : <AiOutlineMenu aria-hidden="true" />}
				</SideNavButton>

				<Link href="/" passHref>
					<LogoLink role="link" aria-label="Link to C-Carts Homepage">
						<span>C-CARTS</span>
					</LogoLink>
				</Link>
			</ListContainer>

			{buttonState ? <SideSection nav={nav} /> : null}
		</Container>
	);
}

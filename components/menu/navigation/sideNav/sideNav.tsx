import Link from 'next/link';
import { KeyboardEvent, useCallback, useRef } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { MainNavItem } from '../../../../data-hooks/useMainNav';
import mobileMenuOpenState from '../../../../state/siteState';
// eslint-disable-next-line import/no-cycle
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

const LogoLink = styled(Link)`
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
	const [mobileMenuOpen, setMobileMenuOpen] = useRecoilState(mobileMenuOpenState);
	const btnRef = useRef<HTMLButtonElement | null>(null);

	const buttonClick = useCallback(() => {
		setMobileMenuOpen(!mobileMenuOpen);
	}, [setMobileMenuOpen, mobileMenuOpen]);

	const keyPress = useCallback(
		(event: KeyboardEvent<HTMLElement>) => {
			if (event.key === 'Enter' || event.key === 'Tab' || event.key === 'Space') {
				setMobileMenuOpen(!mobileMenuOpen);
			} else if (event.key === 'Escape') {
				setMobileMenuOpen(false);
				if (btnRef.current) {
					btnRef.current.blur();
				}
			}
		},
		[mobileMenuOpen, setMobileMenuOpen]
	);

	return (
		// eslint-disable-next-line react/button-has-type
		<Container role="navigation" aria-label="Hamburger Menu" onKeyUp={keyPress}>
			<ListContainer>
				<SideNavButton
					ref={btnRef}
					aria-controls="side-navigation"
					aria-haspopup="true"
					id="sideNavButton"
					aria-expanded={mobileMenuOpen}
					type="button"
					aria-label="Button to open or close side navigation menu"
					onClick={buttonClick}
					className={mobileMenuOpen ? 'open' : 'closed'}
				>
					{mobileMenuOpen ? <AiOutlineClose aria-hidden="true" /> : <AiOutlineMenu aria-hidden="true" />}
				</SideNavButton>

				<LogoLink href="/" role="link" aria-label="Link to C-Carts Homepage">
					<span>C-CARTS</span>
				</LogoLink>
			</ListContainer>

			<SideSection nav={nav} />
		</Container>
	);
}

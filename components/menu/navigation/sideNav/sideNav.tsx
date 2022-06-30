import styled from 'styled-components';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { KeyboardEvent, useCallback, useState } from 'react';
import Link from 'next/link';

import { useRecoilValue } from 'recoil';
import { MainNavItem } from '../../../../data-hooks/useMainNav';
// eslint-disable-next-line import/no-cycle
import SideSection from './sideSection';
import { ThemeProps } from '../../../../types/theme';
import titleState from '../../../../state/changeProperty';

const navButtonHeight = '2rem';

const Container = styled.div`
	width: 100%;
	height: 100px;
	z-index: 1;
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

	&:focus-visible {
		border-color: #e1dcdc;
		border-width: 0.15rem;
		border-style: solid;
	}
`;

interface TitleProp {
	pgTitle: string;
}

const LogoLink = styled.a<TitleProp>`
	font-size: calc(${({ theme }: ThemeProps) => theme.typography.baseFontSize} * 0.086rem);
	font-weight: ${({ theme }: ThemeProps) => theme.typography.boldFontWeight};
	text-decoration-color: transparent;
	text-decoration-thickness: 0.22rem;
	transition: all 0.2s ease-out;
	outline-color: transparent;
	padding-left: 0.45rem;
	span {
		color: ${({ pgTitle }) => (pgTitle === 'Homepage' ? `#fff` : `#000`)};
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

export interface Props {
	nav: MainNavItem[];
}

export default function SideNav({ nav }: Props) {
	const [buttonState, setButtonState] = useState(false);
	const [keyPressState, setKeypresed] = useState(false);
	const pageTitle = useRecoilValue(titleState);

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
				setKeypresed(true);
			} else {
				setKeypresed(false);
			}
		},
		[setKeypresed]
	);

	return (
		// eslint-disable-next-line react/button-has-type
		<Container role="navigation" aria-label="Hamburger Menu">
			<ListContainer>
				<SideNavButton
					role="button"
					aria-haspopup="true"
					id="sideNavButton"
					aria-expanded={keyPressState}
					type="button"
					aria-label="Side Navigation Menu"
					onClick={buttonClick}
					onKeyPress={keyPress}
				>
					{buttonState ? <AiOutlineClose aria-hidden="true" /> : <AiOutlineMenu aria-hidden="true" />}
				</SideNavButton>

				<Link href="/" passHref>
					<LogoLink pgTitle={pageTitle} role="link" aria-label="Link to C-Carts Homepage">
						<span>C-CARTS</span>
					</LogoLink>
				</Link>
			</ListContainer>

			{buttonState ? <SideSection nav={nav} /> : null}
		</Container>
	);
}

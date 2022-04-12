import styled from 'styled-components';
import { AiOutlineMenu } from 'react-icons/ai';
import { useCallback, useState } from 'react';
import { MainNavItem } from '../../../../data-hooks/useMainNav';
// eslint-disable-next-line import/no-cycle
import SideSection from './sideSection';
import { ThemeProps } from '../../../../types/theme';

const navButtonHeight = '2rem';

const SideNavButton = styled.button`
	-webkit-appearance: none;
	border: none;
	background: ${({ theme }: ThemeProps) => theme.colors.primary.color};
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize * 1.35}px;
	font-weight: ${({ theme }: ThemeProps) => theme.typography.boldFontWeight};
	color: ${({ theme }: ThemeProps) => theme.colors.primary.background};
	text-align: center;
	height: ${navButtonHeight};
	border-bottom: 0.25rem solid transparent;
	transition: all 0.2s ease-out;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	white-space: nowrap;
	justify-content: center;

	&:focus-visible,
	&.open,
	&.open:hover {
		outline: transparent;
		border-bottom-color: ${({ theme }: ThemeProps) => theme.colors.secondary.color};
		transition: all 0.2s ease-in;
		background: ${({ theme }: ThemeProps) => theme.colors.secondary.subtle};
	}

	&.open,
	&.open:hover {
		svg {
			color: ${({ theme }: ThemeProps) => theme.colors.secondary.color};
			transition: all 0.2s ease-in;
		}
	}

	&:hover {
		border-bottom-color: ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder};
	}

	svg {
		transition: all 0.2s ease-out;
	}
`;

export interface Props {
	nav: MainNavItem[];
}

export default function SideNav({ nav }: Props) {
	const [buttonState, setButtonState] = useState(false);
	const buttonClick = useCallback(() => {
		if (buttonState) {
			setButtonState(false);
		} else {
			setButtonState(true);
		}
	}, [setButtonState, buttonState]);

	return (
		// eslint-disable-next-line react/button-has-type
		<div>
			<SideNavButton type="button" onClick={buttonClick}>
				<AiOutlineMenu aria-label="Side Menu" />
			</SideNavButton>
			{buttonState ? <SideSection nav={nav} /> : ''}
		</div>
	);
}

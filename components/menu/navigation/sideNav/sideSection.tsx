import styled from 'styled-components';
import { MainNavItem } from '../../../../data-hooks/useMainNav';
import { ThemeProps } from '../../../../types/theme';
import SideNavigationSection from './sideNavigationSection';

const SideSectionNav = styled.nav`
	color: ${({ theme }: ThemeProps) => theme.colors.primary.text};
	background-color: ${({ theme }: ThemeProps) => theme.colors.primary.background};
	box-shadow: 0 5px 6px -3px ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder};
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize}px;
	font-weight: ${({ theme }: ThemeProps) => theme.typography.boldFontWeight};
	border-bottom: 0.5rem solid transparent;
	transition: all 0.2s ease-out;
	padding: 1.5rem 1rem;
	position: absolute;
	top: 75px;
	right: 0;
	left: 0;

	h2 {
		font-weight: 800;
		margin-bottom: 0.25rem;
	}

	&:focus-visible {
		outline: transparent;
		border-bottom-color: ${({ theme }: ThemeProps) => theme.colors.secondary.color};
		transition: all 0.2s ease-in;
		background: ${({ theme }: ThemeProps) => theme.colors.secondary.subtle};
	}
`;

export interface Props {
	nav: MainNavItem[];
}

export default function SideSection({ nav }: Props) {
	return (
		<SideSectionNav id="side-navigation" role="menu">
			{nav && nav.map((item) => <SideNavigationSection key={item._id} item={item} />)}
		</SideSectionNav>
	);
}

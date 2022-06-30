import styled from 'styled-components';
import { MainNavItem } from '../../../../data-hooks/useMainNav';
import { ThemeProps } from '../../../../types/theme';
import SideNavigationSection from './sideNavigationSection';

const SideSectionNav = styled.nav`
	background-color: ${({ theme }: ThemeProps) => theme.colors.primary.contrastColor};
	opacity: 0.9;
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize * 0.95}px;
	font-weight: ${({ theme }: ThemeProps) => theme.typography.boldFontWeight};
	color: ${({ theme }: ThemeProps) => theme.colors.primary.subtle};
	margin-bottom: calc(${({ theme }: ThemeProps) => theme.sizes.contentPaddingBottom} * 0.21);
	border-bottom: 0.25rem solid transparent;
	transition: all 0.2s ease-out;
	padding-top: 0.45rem;
	padding-left: 0.45rem;
	h2 {
		font-weight: 800;
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
		<SideSectionNav id="sideSection" aria-controls="sideNavButton">
			{nav && nav.map((item) => <SideNavigationSection key={item._id} item={item} />)}
		</SideSectionNav>
	);
}

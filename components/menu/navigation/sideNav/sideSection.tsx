import Link from 'next/link';
import styled from 'styled-components';
import { MainNavItem } from '../../../../data-hooks/useMainNav';
import { ThemeProps } from '../../../../types/theme';
import SideNavigationSection from './sideNavigationSection';

const SideSectionNav = styled.nav`
	display: flex;
	width: 100%;
	height: max-content;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }: ThemeProps) => theme.colors.primary.background};
	opacity: 0.55;
`;

const LogoLink = styled.a`
	font-size: calc(${({ theme }: ThemeProps) => theme.typography.baseFontSize} * 0.086rem);
	font-weight: ${({ theme }: ThemeProps) => theme.typography.boldFontWeight};
	text-decoration-color: transparent;
	text-decoration-thickness: 0.22rem;
	transition: all 0.2s ease-out;
	outline-color: transparent;
	padding: 0.5rem 1rem;

	&,
	&:visited {
		color: ${({ theme }: ThemeProps) => theme.colors.primary.text};
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

export default function SideSection({ nav }: Props) {
	return (
		<SideSectionNav id="sideSection">
			<Link href="/" passHref>
				<LogoLink role="link">C-CARTS</LogoLink>
			</Link>
			{nav && nav.map((item) => <SideNavigationSection key={item._id} item={item} />)}
		</SideSectionNav>
	);
}

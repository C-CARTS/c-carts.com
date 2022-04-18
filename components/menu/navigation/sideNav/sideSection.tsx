import Link from 'next/link';
import styled from 'styled-components';
import { ThemeProps } from '../../../../types/theme';
// eslint-disable-next-line import/no-cycle
import { Props } from './sideNav';
import SideNavigationSection from './sideNavigationSection';

const SideSectionNav = styled.nav`
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }: ThemeProps) => theme.colors.primary.background};
	opacity: 0.55;
	margin-top: 0.35rem;
	padding: 0.25rem;
`;

const LogoLink = styled.a`
	font-size: 1.5rem;
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

export default function SideSection({ nav }: Props) {
	return (
		<SideSectionNav>
			<Link href="/" passHref>
				<LogoLink>C-CARTS</LogoLink>
			</Link>
			{nav && nav.map((item, index) => <SideNavigationSection key={item._id} item={item} index={index} />)}
		</SideSectionNav>
	);
}

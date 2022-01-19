/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styled from 'styled-components';
import { MainNavItem } from '../../data-hooks/useMainNav';
import { ThemeProps } from '../../types/theme';
import MainNav from './navigation/mainNav';

const Header = styled.div`
	padding: 0 ${({ theme }: ThemeProps) => theme.sizes.contentPaddingSides};
	width: min(100%, ${({ theme }: ThemeProps) => theme.sizes.maxContentWidth}px);
	margin: 0 auto;
	display: grid;
	grid-template-columns: max-content 1fr;
	grid-gap: 1rem;
	grid-template-areas: 'logo menu';
	justify-content: center;
	align-items: center;

	a {
		grid-area: logo;
	}

	nav {
		grid-area: menu;
	}
`;

const LogoLink = styled.a`
	font-size: 1.5rem;
	font-weight: ${({ theme }: ThemeProps) => theme.typography.boldFontWeight};
	text-decoration-color: transparent;
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
		text-decoration-color: ${({ theme }: ThemeProps) => theme.colors.secondary.color};
		outline-color: transparent;
	}

	&:focus-visible {
		background: ${({ theme }: ThemeProps) => theme.colors.secondary.subtle};
	}
`;

interface Props {
	shortTitle: string;
	nav: MainNavItem[];
}

export default function Menu({ shortTitle, nav }: Props) {
	return (
		<Header className="header-content">
			<Link href="/" passHref>
				<LogoLink>{shortTitle}</LogoLink>
			</Link>
			<MainNav nav={nav} />
		</Header>
	);
}

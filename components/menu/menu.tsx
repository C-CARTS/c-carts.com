/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { MainNavItem } from '../../data-hooks/useMainNav';
import useMediaQuery from '../../hooks/useMediaQueryHook';
import titleState from '../../state/changeProperty';

import { ThemeProps } from '../../types/theme';
import MainNav from './navigation/mainNav';
import SideNav from './navigation/sideNav/sideNav';

interface HeaderProps {
	ops: number;
	UiBreakPoint: boolean;
}
const Header = styled.header.attrs((props: HeaderProps) => ({
	ops: props.ops,
	UiBreakPoint: props.UiBreakPoint
}))`
	padding: 0 ${({ theme }: ThemeProps) => theme.sizes.contentPaddingSides}px;
	padding-bottom: ${({ theme }: ThemeProps) => theme.sizes.contentPaddingBottom}px;
	background-color: ${({ UiBreakPoint }: HeaderProps) => (UiBreakPoint ? 'none' : (theme: ThemeProps) => theme.theme.colors.primary.background)};
	opacity: ${(props) => props.ops};
	max-width: 100%;
	max-width: 100%;
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

	@media (max-width: 700px) {
		grid-template-area: 'full';
		grid-gap: 0;
		a {
			grid-area: 'full';
		}

		nav {
			grid-area: 'full';
			flex-flow: column nowrap;
			align-items: center;
		}
	}
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

interface Props {
	shortTitle: string;
	nav: MainNavItem[];
}

/**
 * It returns a header with a logo and a navigation bar.
 * @param {Props}  - shortTitle: The short title of the site.
 * @returns The Menu component is returning a Header component.
 */
export default function Menu({ shortTitle, nav }: Props) {
	const pageTitle = useRecoilValue(titleState);
	const query = '(max-width:700px)';
	const breakpoint = useMediaQuery({ query });

	return (
		// eslint-disable-next-line react/no-unstable-nested-components
		<Header ops={pageTitle === 'Homepage' ? 0.75 : 1} UiBreakPoint={breakpoint} className="header-content">
			{breakpoint ? (
				<SideNav nav={nav} />
			) : (
				<>
					<Link href="/" passHref>
						<LogoLink>{shortTitle}</LogoLink>
					</Link>
					<MainNav nav={nav} />
				</>
			)}
		</Header>
	);
}

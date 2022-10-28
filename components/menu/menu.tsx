/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { MainNavItem } from '../../data-hooks/useMainNav';
import useMediaQuery from '../../hooks/useMediaQueryHook';
import titleState, { breakPointState } from '../../state/changeProperty';
import mobileMenuOpenState from '../../state/siteState';
import { mediaQueryMaxWidths } from '../../styles/theme';
import { ThemeProps } from '../../types/theme';
import MainNav from './navigation/mainNav';
import SideNav from './navigation/sideNav/sideNav';

const reducedOpacity = 0.85;
const fullOpacity = 1;

interface HeaderProps {
	ops: number;
	UiBreakPoint: boolean;
}
const Header = styled.header<HeaderProps & ThemeProps>`
	background-color: ${({ theme }) => theme.colors.primary.background}bb;
	backdrop-filter: blur(5px);
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	align-content: center;
	padding-top: clamp(1rem, 2vh, 3rem);
	padding-bottom: clamp(1rem, 1.5vh, 2rem);

	&.mobile-open {
		background: ${({ theme }: ThemeProps) => theme.colors.primary.background};
	}

	@media screen and (max-width: 768px) {
		padding-left: 0;
		padding-right: 0;
	}
`;

const OuterWrapper = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	width: 100%;
`;

const InnerWrapper = styled.div`
	display: flex;
	flex: row;
	max-width: ${({ theme }: ThemeProps) => theme.sizes.maxContentWidth}px;
	justify-content: center;
	width: 100%;
	padding-left: ${({ theme }: ThemeProps) => theme.sizes.contentPaddingSides};
	padding-right: ${({ theme }: ThemeProps) => theme.sizes.contentPaddingSides};

	margin: 0 auto;
	a {
		width: 100%;
		justify-self: flex-start;
	}

	nav {
		width: 100%;
		justify-self: flex-end;
	}
`;

const LogoLink = styled.a`
	font-size: 1.5rem;
	font-weight: ${({ theme }: ThemeProps) => theme.typography.boldFontWeight};
	text-decoration-color: transparent;
	text-decoration-thickness: 0.22rem;
	transition: all 0.2s ease-out;
	outline-color: transparent;

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
	const query = `(max-width:${mediaQueryMaxWidths.maxWidth}px)`;
	const setBreakPoint = useSetRecoilState(breakPointState);
	const breakpoint = useMediaQuery({ query });
	const mobileMenuOpen = useRecoilValue(mobileMenuOpenState);

	useEffect(() => {
		setBreakPoint(breakpoint);
	}, [breakpoint, setBreakPoint]);

	return (
		// eslint-disable-next-line react/no-unstable-nested-components

		<Header
			ops={pageTitle === 'Homepage' ? reducedOpacity : fullOpacity}
			UiBreakPoint={breakpoint}
			className={`header-content ${mobileMenuOpen ? 'mobile-open' : 'mobile-closed'}`}
		>
			{breakpoint ? (
				<SideNav nav={nav} />
			) : (
				<OuterWrapper>
					<InnerWrapper>
						<Link href="/" passHref>
							<LogoLink id="logoLink" role="link" title="home" aria-label={`Return to ${shortTitle} homepage`}>
								{shortTitle}
							</LogoLink>
						</Link>
						<MainNav nav={nav} />
					</InnerWrapper>
				</OuterWrapper>
			)}
		</Header>
	);
}

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
const Header = styled.header<HeaderProps>`
	background-color: ${({ UiBreakPoint }: HeaderProps) => (UiBreakPoint ? 'none' : (theme: ThemeProps) => theme.theme.colors.primary.background)};
	opacity: ${({ ops, UiBreakPoint }) => (UiBreakPoint ? fullOpacity : ops)};
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	align-content: center;
	padding-top: ${({ ops }) => (ops === reducedOpacity ? 'clamp(1rem,3vh,2rem)' : '')};
	padding-bottom: ${({ ops }) => (ops === reducedOpacity ? 'clamp(1rem,1vh,1rem)' : '')};
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
	const query = `(max-width:${mediaQueryMaxWidths.maxWidth}px)`;
	const setBreakPoint = useSetRecoilState(breakPointState);
	const breakpoint = useMediaQuery({ query });

	useEffect(() => {
		setBreakPoint(breakpoint);
	}, [breakpoint, setBreakPoint]);

	return (
		// eslint-disable-next-line react/no-unstable-nested-components

		<Header ops={pageTitle === 'Homepage' ? reducedOpacity : fullOpacity} UiBreakPoint={breakpoint} className="header-content">
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

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
const Header = styled.header<HeaderProps>`
	//padding: 0 ${({ theme }: ThemeProps) => theme.sizes.contentPaddingSides}px;
	//padding-bottom: ${({ theme }: ThemeProps) => theme.sizes.contentPaddingBottom}px;
	background-color: ${({ UiBreakPoint }: HeaderProps) => (UiBreakPoint ? 'none' : (theme: ThemeProps) => theme.theme.colors.primary.background)};
	opacity: ${({ ops }) => ops};
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;

	padding-top: ${({ ops }) => (ops === 0.75 ? 'clamp(1rem,1vh,1rem)' : '')};
	padding-bottom: ${({ ops }) => (ops === 0.75 ? 'clamp(1rem,1vh,1rem)' : '')};
`;

const InnerHeaderWrapper = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	max-width: 1200px;
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
	//padding: 0.5rem 0.5rem;

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
				<InnerHeaderWrapper>
					<Link href="/" passHref>
						<LogoLink id="logoLink" role="link" aria-label={`Return to ${shortTitle} homepage`}>
							{shortTitle}
						</LogoLink>
					</Link>
					<MainNav nav={nav} />
				</InnerHeaderWrapper>
			)}
		</Header>
	);
}

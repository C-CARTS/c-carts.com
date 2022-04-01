/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { MainNavItem } from '../../data-hooks/useMainNav';
import titleState from '../../state/changeProperty';

import { ThemeProps } from '../../types/theme';
import MainNav from './navigation/mainNav';

interface HeaderProps {
	backgroundColor: string | undefined;
	ops: number;
}
const Header = styled.header.attrs((props: HeaderProps) => ({
	backgroundColor: props.backgroundColor,
	ops: props.ops
}))`
	padding: 0 ${({ theme }: ThemeProps) => theme.sizes.contentPaddingSides}px;
	background-color: ${({ backgroundColor }: HeaderProps) => {
		if (backgroundColor === 'Homepage') {
			const value = ({ theme }: ThemeProps) => theme.colors.primary.contrastColor;
			return value;
		}
		const layout = `${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder}`;
		return layout;
	}};
	opacity: ${(props) => props.ops};

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

interface LinkProps {
	colour: string;
}

const LogoLink = styled.a.attrs((props: LinkProps) => ({
	colour: props.colour
}))`
	font-size: 1.5rem;
	font-weight: ${({ theme }: ThemeProps) => theme.typography.boldFontWeight};
	text-decoration-color: transparent;
	transition: all 0.2s ease-out;
	outline-color: transparent;
	padding: 0.5rem 1rem;

	&,
	&:visited {
		color: ${({ colour }: LinkProps) => {
			if (colour === 'Homepage') {
				const result = ({ theme }: ThemeProps) => theme.colors.primary.layoutBorder;
				return result;
			}
			const original = ({ theme }: ThemeProps) => theme.colors.primary.text;
			return original;
		}};
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
	const pageTitle = useRecoilValue(titleState);
	return (
		<Header backgroundColor={pageTitle} ops={pageTitle === 'Homepage' ? 0.6 : 1} className="header-content">
			<Link href="/" passHref>
				<LogoLink colour={pageTitle}>{shortTitle}</LogoLink>
			</Link>
			<MainNav nav={nav} />
		</Header>
	);
}

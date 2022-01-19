/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Link from 'next/link';
import styled from 'styled-components';
import { MainNavItem } from '../../data-hooks/useMainNav';
import { ThemeProps } from '../../types/theme';
import Logo from './logo';
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

	div {
		grid-area: logo;
	}

	nav {
		grid-area: menu;
	}
`;

interface Props {
	title: string;
	logo: SanityImageSource | undefined;
	nav: MainNavItem[];
}

export default function Menu({ title, nav, logo }: Props) {
	return (
		<Header className="header-content">
			<Link href="/">
				<a>
					<Logo logo={logo} />
					<span className="sr">{title}</span>
				</a>
			</Link>
			<MainNav nav={nav} />
		</Header>
	);
}

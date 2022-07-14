import { SiteConfig } from '@c-carts/cms';
import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { MainNavItem } from '../../data-hooks/useMainNav';
import titleState, { breakPointState } from '../../state/changeProperty';
import { mediaQueryMaxWidths } from '../../styles/theme';
import { ThemeProps } from '../../types/theme';
import Footer from '../footer/footer';
import Menu from '../menu/menu';
import HeadContent from './headContent';
import SkipLink from './skipLink';

interface Props {
	title: string;
	description?: string | undefined;
	children: ReactElement | ReactElement[];
	mainNav: MainNavItem[];
	siteConfig: SiteConfig;
}

const ContentWrap = styled.div`
	display: flex;
	flex-flow: column nowrap;
	margin: 0 auto;
	height: 100%;
`;

const changeValues = (val: string) => {
	switch (val) {
		case 'Homepage':
			return `height: 400px; background-image:url("https://placeimg.com/1200/420/any");
			background-repeat:no-repeat;
			background-size:cover;
			background-attachment: fixed;
			width:100%;
			padding:0px;
		`;
		default:
			return `background-color: none;
			`;
	}
};

interface Prop {
	home: string;
	breakpt: boolean;
}

const Wrapper = styled.div<Prop>`
	width: 100%;
	padding-top: clamp(1rem, 3vh, 2rem);
	padding-right: ${({ breakpt }) => (breakpt ? '0px' : `clamp(1rem, 5vw, 3rem)`)};
	padding-bottom: clamp(2rem, 5vh, 5rem);
	padding-left: ${({ breakpt }) => (breakpt ? '0px' : `clamp(1rem, 5vw, 3rem)`)};
	margin-left: 0;

	${({ home }) => changeValues(home)}

	@media (max-width:${mediaQueryMaxWidths.genericpage}px) {
		height: 100%;
	}
`;

const MainWrap = styled.div`
	padding: ${({ theme }: ThemeProps) => `${theme.sizes.contentPaddingTop} ${theme.sizes.contentPaddingSides} ${theme.sizes.contentPaddingBottom}`};
	//width: min(100%, ${({ theme }: ThemeProps) => theme.sizes.maxContentWidth}px);
	max-width: 1200px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	background-color: ${({ theme }: ThemeProps) => theme.colors.primary.background};

	h1 {
		font-family: ${({ theme }: ThemeProps) => theme.typography.headingFont};
		width: 100%;
	}

	div > p {
		padding: ${({ theme }: ThemeProps) => `${theme.sizes.contentPaddingTop} 0px ${theme.sizes.contentPaddingBottom} 0px`};
		line-height: calc(${({ theme }: ThemeProps) => theme.typography.baseLineHeight} + 0.25);
		width: ${({ theme }: ThemeProps) => theme.widths.tenByTwelve}%;
	}

	ul > li {
		line-height: calc(${({ theme }: ThemeProps) => theme.typography.baseLineHeight} + 0.25);
		width: ${({ theme }: ThemeProps) => theme.widths.tenByTwelve}%;
	}

	div > p a {
		&,
		&:link {
			text-decoration: underline;
			text-decoration-thickness: 0.15rem;
			text-decoration-color: ${({ theme }: ThemeProps) => theme.colors.secondary.color};
		}
		&:hover {
			text-decoration: underline;
			text-decoration-color: ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder};
			text-decoration-thickness: 0.15rem;
		}
		&:focus,
		&:focus-visible {
			outline-color: transparent;
			> span {
				text-decoration: underline;
				text-decoration-color: ${({ theme }: ThemeProps) => theme.colors.secondary.color};
				text-decoration-thickness: 0.15rem;
				background: ${({ theme }: ThemeProps) => theme.colors.secondary.subtle};
			}
		}
	}
`;

const Main = styled.main`
	max-width: 1200px;
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: flex-start;
`;

const MenuWrapper = styled.div`
	width: 100%;
`;

export default function GenericPage({ title, description, children, mainNav, siteConfig: { shortTitle, address, phone, logo } }: Props) {
	const pageTitle = useRecoilValue(titleState);
	const breakpoint = useRecoilValue(breakPointState);
	return (
		<>
			<SkipLink />
			<ContentWrap>
				<HeadContent title={title} description={description} />
				<Wrapper breakpt={breakpoint} home={pageTitle}>
					<MenuWrapper className="menuWrapper">
						<Menu nav={mainNav} shortTitle={shortTitle} />
					</MenuWrapper>
				</Wrapper>
				<MainWrap id="main-content">
					<Main>
						{title && <h1> {title}</h1>}
						{children}
					</Main>
				</MainWrap>
				<Footer address={address} phone={phone} logo={logo} />
			</ContentWrap>
		</>
	);
}

GenericPage.defaultProps = {
	description: undefined
};

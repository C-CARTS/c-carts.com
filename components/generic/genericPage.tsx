import { SiteConfig } from '@c-carts/cms';
import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { MainNavItem } from '../../data-hooks/useMainNav';
import titleState from '../../state/changeProperty';
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
	min-height: 100vh;
`;

const changeValues = (val: string) => {
	switch (val) {
		case 'Homepage':
			return `height: 400px; background-image:url("http://placeimg.com/1200/420/any");
			background-repeat:no-repeat;
			background-size:cover;
			background-attachment: fixed;
			-webkit-transition: 0.25s all ease-in-out;
			-moz-transition: 0.25s all ease-in-out;
			-o-transition: 0.25s all ease-in-out;
			transition: 0.25s all ease-in;
		`;
		default:
			return `background-image: none;`;
	}
};

interface Prop {
	home: string;
}

const Wrapper = styled.div.attrs((home) => ({
	value: home
}))`
	${({ home }: Prop) => changeValues(home)}
	width: 100%;
	@media (max-width: 700px) {
		height: 100%;
	}
`;

const MainWrap = styled.div`
	padding: ${({ theme }: ThemeProps) => `${theme.sizes.contentPaddingTop} ${theme.sizes.contentPaddingSides} ${theme.sizes.contentPaddingBottom}`};
	//width: min(100%, ${({ theme }: ThemeProps) => theme.sizes.maxContentWidth}px);
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
	h1 {
		width: 100%;
	}
	@media (max-width: 1200px) {
		h1 {
			text-indent: 0;
		}
	}
`;

export default function GenericPage({ title, description, children, mainNav, siteConfig: { shortTitle, address, phone, logo } }: Props) {
	const pageTitle = useRecoilValue(titleState);

	return (
		<>
			<SkipLink />
			<ContentWrap>
				<HeadContent title={title} description={description} />
				<Wrapper home={pageTitle}>
					<Menu nav={mainNav} shortTitle={shortTitle} />
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

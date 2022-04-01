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
			return `height: 300px; background-image:url("http://placeimg.com/1200/420/any"); -webkit-transition: 0.25s all ease-in-out; -moz-transition: 0.25s all ease-in-out; -o-transition: 0.25s all ease-in-out; transition: 0.25s all ease-in;
		`;
		default:
			return `height:100%; background-image: none;`;
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
`;

const MainWrap = styled.div`
	padding: ${({ theme }: ThemeProps) => `${theme.sizes.contentPaddingTop} ${theme.sizes.contentPaddingSides} ${theme.sizes.contentPaddingBottom}`};
	//width: min(100%, ${({ theme }: ThemeProps) => theme.sizes.maxContentWidth}px);
	margin: 0 auto;
	flex: 1 1 auto;
	background-color: ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder};
	width: 100%;

	h1 {
		font-family: ${({ theme }: ThemeProps) => theme.typography.headingFont};
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
					<main>
						{title && <h1>{title}</h1>}
						{children}
					</main>
				</MainWrap>
				<Footer address={address} phone={phone} logo={logo} />
			</ContentWrap>
		</>
	);
}

GenericPage.defaultProps = {
	description: undefined
};

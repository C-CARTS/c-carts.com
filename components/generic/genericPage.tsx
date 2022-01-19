import { SiteConfig } from '@c-carts/cms';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { MainNavItem } from '../../data-hooks/useMainNav';
import { ThemeProps } from '../../types/theme';
import Menu from '../menu/menu';
import HeadContent from './headContent';

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
`;

const MainWrap = styled.div`
	padding: ${({ theme }: ThemeProps) => `${theme.sizes.contentPaddingTop} ${theme.sizes.contentPaddingSides} ${theme.sizes.contentPaddingBottom}`};
	width: min(100%, ${({ theme }: ThemeProps) => theme.sizes.maxContentWidth}px);
	margin: 0 auto;
`;

export default function GenericPage({ title, description, children, mainNav, siteConfig: { logo } }: Props) {
	return (
		<ContentWrap>
			<HeadContent title={title} description={description} />
			<Menu nav={mainNav} logo={logo} title={title ?? ''} />
			<main>
				<MainWrap>
					{title && <h1>{title}</h1>}
					{children}
				</MainWrap>
			</main>
		</ContentWrap>
	);
}

GenericPage.defaultProps = {
	description: undefined
};

import React, { FC } from 'react';
import { MainNavItem } from '../../data-hooks/useMainNav';
import { Page, SiteConfig } from '../../sanity/schema';
import Block from '../blockContent/block';
import Menu from '../menu/menu';
import HeadContent from './headContent';

interface Props {
	page: Page;
	mainNav: MainNavItem[];
	siteConfig: SiteConfig;
}

const PageContent: FC<Props> = ({ page, mainNav, siteConfig: { title, logo } }: Props) => {
	const { content } = page;
	return (
		<>
			<HeadContent page={page} />
			<Menu nav={mainNav} logo={logo} title={title ?? ''} />
			<main>
				<h1>{title}</h1>
				{content && content?.map((block) => <Block key={block._key} block={block} />)}
			</main>
		</>
	);
};

export default PageContent;

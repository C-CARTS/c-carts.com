import React, { FC } from 'react';
import { MainNavItem } from '../../data-hooks/useMainNav';
import { Page, SiteConfig } from '../../sanity/schema';
import Block from '../blockContent/block';
import Menu from '../menu/menu';
import HeadContent from './headContent';

interface Props {
	title?: string | undefined;
	page: Page;
	mainNav: MainNavItem[];
	siteConfig: SiteConfig;
}

const PageContent: FC<Props> = ({ title, page, mainNav, siteConfig: { logo } }: Props) => {
	const { content } = page;
	return (
		<>
			<HeadContent page={page} />
			<Menu nav={mainNav} logo={logo} title={title ?? ''} />
			<main>
				{title && <h1>{title}</h1>}
				{content && content?.map((block) => <Block key={block._key} block={block} />)}
			</main>
		</>
	);
};

PageContent.defaultProps = {
	title: undefined
};

export default PageContent;

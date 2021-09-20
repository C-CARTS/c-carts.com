import React, { FC, ReactElement } from 'react';
import { MainNavItem } from '../../data-hooks/useMainNav';
import { SiteConfig } from '../../sanity/schema';
import Menu from '../menu/menu';
import HeadContent from './headContent';

interface Props {
	title: string;
	description?: string | undefined;
	children: ReactElement | ReactElement[];
	mainNav: MainNavItem[];
	siteConfig: SiteConfig;
}

const GenericPage: FC<Props> = ({ title, description, children, mainNav, siteConfig: { logo } }: Props) => {
	return (
		<>
			<HeadContent title={title} description={description} />
			<Menu nav={mainNav} logo={logo} title={title ?? ''} />
			<main>
				{title && <h1>{title}</h1>}
				{children}
			</main>
		</>
	);
};

GenericPage.defaultProps = {
	description: undefined
};

export default GenericPage;

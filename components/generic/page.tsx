import React, { FC } from 'react';
import { Page } from '../../sanity/schema';
import Block from '../blockContent/block';

interface Props {
	page: Page;
}

const PageComponent: FC<Props> = ({ page: { content } }: Props) => {
	return <>{content && content?.map((block) => <Block key={block._key} block={block} />)}</>;
};

export default PageComponent;

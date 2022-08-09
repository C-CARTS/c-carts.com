import { Page } from '@c-carts/cms';
import Block from '../blockContent/block';

interface Props {
	page: Page;
}

export default function PageComponent({ page: { content } }: Props) {
	// eslint-disable-next-line react/jsx-no-useless-fragment
	return <>{content && content?.map((block) => <Block key={block._key} block={block} />)}</>;
}

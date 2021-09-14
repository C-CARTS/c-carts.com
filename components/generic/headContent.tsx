import Head from 'next/head';
import { FC } from 'react';
import { Page } from '../../sanity/schema';

interface Props {
	page: Page;
}

const HeadContent: FC<Props> = ({ page: { title, description } }: Props) => {
	return (
		<Head>
			{description && <meta name="description" content={description} />}
			{title && <title>{title} | C-CARTS</title>}
		</Head>
	);
};

export default HeadContent;

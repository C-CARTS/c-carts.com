import Head from 'next/head';
import { FC } from 'react';

interface Props {
	title: string | undefined;
	description: string | undefined;
}

const HeadContent: FC<Props> = ({ title, description }: Props) => {
	return (
		<Head>
			{description && <meta name="description" content={description} />}
			{title && <title>{title} | C-CARTS</title>}
		</Head>
	);
};

export default HeadContent;

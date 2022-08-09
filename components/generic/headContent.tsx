import Head from 'next/head';

interface Props {
	title: string | undefined;
	description: string | undefined;
}

export default function HeadContent({ title, description }: Props) {
	return (
		<Head>
			{description && <meta name="description" content={description} />}
			{title && <title>{title} | C-CARTS</title>}
		</Head>
	);
}

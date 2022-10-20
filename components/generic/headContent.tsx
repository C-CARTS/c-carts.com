import Head from 'next/head';

interface Props {
	title: string | undefined;
	description: string | undefined;
}

export default function HeadContent({ title, description }: Props) {
	const titleText = title ? `${title} | C-CARTS` : 'C-CARTS';

	return (
		<Head>
			{description && <meta name="description" content={description} />}
			<title>{titleText}</title>
		</Head>
	);
}

/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

interface Prop {
	pdfUrl: string;
}

export default function PdfTab({ pdfUrl }: Prop) {
	const donwload = `${pdfUrl}?dl=`;
	return (
		<Link href={donwload} passHref>
			<a target="_blank">PDF</a>
		</Link>
	);
}

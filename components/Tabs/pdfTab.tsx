/* eslint-disable jsx-a11y/anchor-is-valid */

import Link from 'next/link';
import styled from 'styled-components';
import { ThemeProps } from '../../types/theme';

interface Prop {
	pdfUrl: string;
}

const PdfContainer = styled.div`
	text-align: center;
	width: 100%;
	margin-top: 10px;
	a,
	a:link {
		text-decoration: none;
		border-bottom: 5px solid ${({ theme }: ThemeProps) => theme.colors.secondary.color};
	}

	a:hover {
		border-bottom: 5px solid ${({ theme }: ThemeProps) => theme.colors.link.subtle};
	}
`;

export default function PdfTab({ pdfUrl }: Prop) {
	const donwload = `${pdfUrl}`;
	return (
		<PdfContainer aria-labelledby="file">
			<Link href={donwload} passHref>
				<a>Open Pdf</a>
			</Link>
		</PdfContainer>
	);
}

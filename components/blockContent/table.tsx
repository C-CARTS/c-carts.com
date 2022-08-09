import { CodeSection } from '@c-carts/cms';
import styled from 'styled-components';
import { ThemeProps } from '../../types/theme';

/* eslint-disable react/no-danger */
interface Prop {
	block: CodeSection;
}

const Table = styled.div`
	margin: ${({ theme }: ThemeProps) => theme.sizes.contentPaddingTop} 0 ${({ theme }: ThemeProps) => theme.sizes.contentPaddingBottom};
	padding: 0;
	width: 100%;
`;

export default function DisplayHtmlTable({ block }: Prop) {
	return <Table dangerouslySetInnerHTML={{ __html: block.faresTable.code }} />;
}

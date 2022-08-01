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

	table {
		width: 100%;
		border-collapse: collapse;

		thead {
			border-bottom: 2px solid ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder};
		}

		th {
			text-align: left;
			font-size: 1.05em;
		}

		tr:nth-child(even) {
			background-color: ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder};
		}

		th,
		td {
			padding-left: 0.45rem;
			padding-right: 0.45rem;
		}
	}

	caption {
		position: absolute;
		left: -10000px;
		top: auto;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}
`;

export default function DisplayHtmlTable({ block }: Prop) {
	return <Table dangerouslySetInnerHTML={{ __html: block.faresTable.code }} />;
}

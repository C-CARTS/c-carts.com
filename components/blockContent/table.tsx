import { CodeSection } from '@c-carts/cms';
import styled from 'styled-components';
import { ThemeProps } from '../../types/theme';

/* eslint-disable react/no-danger */
interface Prop {
	block: CodeSection;
}

const Table = styled.div`
	caption {
		font-size: 1.1rem;
		font-weight: 700;
		padding: 0.25rem 0px;
	}

	table {
		border: 1px solid ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder};
		tr:nth-child(even),
		th {
			background-color: ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder};
		}
		tr > td {
			padding-left: 0.45rem;
			padding-right: 0.45rem;
		}
	}
`;

export default function DisplayHtmlTable({ block }: Prop) {
	return <Table dangerouslySetInnerHTML={{ __html: block.faresTable.code }} />;
}

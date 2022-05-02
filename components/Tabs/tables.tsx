import styled from 'styled-components';
import { ThemeProps } from '../../types/theme';

/* eslint-disable react/no-danger */
interface Props {
	code: any;
}

const TableContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	table,
	tr,
	td {
		border: 1px solid white;
		border-collapse: collapse;
		text-align: center;
	}

	th,
	tr {
		width: 100%;
		background-color: #96d4d4;
	}
	td {
		text-align: center;
		background-color: ${({ theme }: ThemeProps) => theme.colors.secondary.subtle};
	}
	@media (max-width: 500px) {
		.table thead {
			display: none;
		}

		table,
		tbody,
		tr,
		td,
		th {
			display: block;
			width: 100%;
		}
	}
`;

export default function Tables({ code }: Props) {
	return (
		// Reduced Service
		<TableContainer dangerouslySetInnerHTML={{ __html: code }} />
	);
}

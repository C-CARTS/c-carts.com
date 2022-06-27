/* eslint-disable no-return-assign */
import { Operations, OperationType } from '@c-carts/cms';
import styled from 'styled-components';
import { ThemeProps } from '../../types/theme';

interface Ops {
	system: Operations;
}

const TableContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	overflow-x: auto;
	padding: ${({ theme }: ThemeProps) => theme.sizes.contentPaddingTop} 0px;
	table {
		flex: 1 1 auto;
		//width: ${({ theme }: ThemeProps) => theme.widths.eightByTwelve}%;
		text-align: center;
		caption {
			font-weight: bold;
		}

		tr:nth-child(even),
		th {
			background-color: ${({ theme }: ThemeProps) => theme.colors.primary.layoutBorder};
		}
		/* @media (max-width: 650px) {
			width: ${({ theme }: ThemeProps) => theme.widths.fiveByTwelve}%;
		} */
	}
`;

export default function SystemOperations({ system }: Ops) {
	const mnths = Object.values(system)
		.splice(1)
		.filter((month) => typeof month !== 'string') as OperationType[];
	let totalHours = 0;
	let totalMiles = 0;
	mnths.forEach(({ hours, miles }: OperationType) => {
		totalHours += hours;
		totalMiles += miles;
	});

	return (
		<TableContainer>
			<table
				role="table"
				summary="Table to display hours and miles driveb by 6,12 and 14 passenger van and their cumulative total and cumulative hours and miles driven"
			>
				<caption>System Operations</caption>
				<thead>
					<tr>
						<th scope="col">Month</th>
						<th scope="col">6 Passenger Van</th>
						<th scope="col">12 Passenger Van</th>
						<th scope="col">14 Passenger Van</th>
						<th scope="col">Miles</th>
						<th scope="col">Hours</th>
					</tr>
				</thead>
				<tbody>
					{mnths.map(({ fourteenPassVan, hours, miles, months, sixPassVan, twelvePassVan }: OperationType) => (
						<tr key={months}>
							<td>{months}</td>
							<td>{sixPassVan}</td>
							<td>{twelvePassVan}</td>
							<td>{fourteenPassVan}</td>
							<td>{miles}</td>
							<td>{hours}</td>
						</tr>
					))}

					<tr style={{ marginTop: '20rem' }}>
						<td colSpan={4}>Total</td>
						<td>{totalMiles}</td>
						<td>{totalHours}</td>
					</tr>
				</tbody>
			</table>
		</TableContainer>
	);
}

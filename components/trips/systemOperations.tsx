/* eslint-disable no-return-assign */
import { Operations } from '@c-carts/cms';
import styled from 'styled-components';

interface Ops {
	system: Operations;
}
type Mnth = string | number | any;

const TableContainer = styled.div`
	width: 100%;
	justify-self: center;
	padding-top: 2rem;
	table {
		width: 100%;
		text-align: center;
		overflow-x: auto;

		caption {
			font-weight: bold;
		}

		td {
			padding-left: 4rem;
			padding-right: 4rem;
		}

		tr:nth-child(even),
		th {
			background-color: #f2f2f2;
		}
	}
`;

export default function SystemOperations({ system }: Ops) {
	const months = Object.values(system).splice(1);
	let totalHours = 0;
	let totalMiles = 0;
	months.forEach((element: any) => {
		totalHours += element.hours;
		totalMiles += element.miles;
	});

	return (
		<TableContainer>
			<table summary="Table to display hours and miles driveb by 6,12 and 14 passenger van and their cumulative total and cumulative hours and miles driven">
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
					{months.map(({ fourteenPassVan, hours, miles, month, sixPassVan, twelvePassVan }: Mnth) => (
						<tr key={month}>
							<td>{month}</td>
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

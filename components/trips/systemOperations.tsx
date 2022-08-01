/* eslint-disable no-return-assign */
import { Operations, OperationType } from '@c-carts/cms';
import { KeyboardEventHandler, useCallback } from 'react';
import styled from 'styled-components';
import useThrottle from '../../hooks/useThrottle';
import { ThemeProps } from '../../types/theme';

interface Ops {
	system: Operations;
}

const Table = styled.div`
	margin: ${({ theme }: ThemeProps) => theme.sizes.contentPaddingTop} 0 ${({ theme }: ThemeProps) => theme.sizes.contentPaddingBottom};
	padding: 0;
	width: 100%;
	grid-area: table;
`;

const TotalRow = styled.tr`
	font-weight: ${({ theme }: ThemeProps) => theme.typography.boldFontWeight};
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

	const focusHandler = useCallback<KeyboardEventHandler<HTMLDivElement>>((event) => {
		const eventExist = event !== undefined;
		if (eventExist) {
			const { key } = event;

			const screenSize = window.innerWidth;
			if (screenSize <= 540) {
				switch (key) {
					case 'ArrowLeft':
						window.scrollY = -1;
						break;
					case 'ArrowRight':
						window.scrollY = -1;
						break;
					default:
						break;
				}
			}
		}
	}, []);
	const throttledHandler = useThrottle(focusHandler, 100);

	return (
		<Table tabIndex={0} onKeyDown={throttledHandler} id="operationsTableContainer">
			<table
				role="table"
				summary="Table to display hours and miles driven by 6,12 and 14 passenger van and their cumulative total and cumulative hours and miles driven"
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
					{mnths.map(({ fourteenPassVan, hours, miles, month, sixPassVan, twelvePassVan }: OperationType) => (
						<tr key={month}>
							<td>{month}</td>
							<td>{sixPassVan}</td>
							<td>{twelvePassVan}</td>
							<td>{fourteenPassVan}</td>
							<td>{miles}</td>
							<td>{hours}</td>
						</tr>
					))}

					<TotalRow>
						<td colSpan={4}>Total</td>
						<td>{totalMiles}</td>
						<td>{totalHours}</td>
					</TotalRow>
				</tbody>
			</table>
		</Table>
	);
}

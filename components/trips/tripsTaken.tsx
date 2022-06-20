import { TotalTrips } from '@c-carts/cms';
import dynamic from 'next/dynamic';

import styled from 'styled-components';
import { ThemeProps } from '../../types/theme';

const ChartComponent = dynamic(() => import('./clusteredColChart'), { ssr: false });

interface Trips {
	trips: Array<TotalTrips>;
}

const PieChartContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	span {
		font-size: 1rem;
		//width: ${({ theme }: ThemeProps) => theme.widths.eightByTwelve}%;
		font-style: italic;
		font-weight: 500;
	}
`;

export default function TripsTaken({ trips }: Trips) {
	const dt = trips.filter((element: TotalTrips) => element.month);

	const data = dt.map(({ month, denied, lift, sixtyPlus }: TotalTrips) => {
		const properties = { id: month, Denied: denied, Lift: lift, SixtyPlus: sixtyPlus };

		return properties;
	});

	return (
		// eslint-disable-next-line jsx-a11y/aria-role
		<PieChartContainer role="graphics-document">
			<ChartComponent data={data} chartId="tripsTakenChart" />
			<span aria-hidden>
				Below is a Clustered Bar chart for trips which were denied,Lyft provided or over sixty plus by C-Carts vehicles for month of october,november and
				december
			</span>
		</PieChartContainer>
	);
}

import { TotalTrips } from '@c-carts/cms';
import { RadialBarSerie } from '@nivo/radial-bar';
import dynamic from 'next/dynamic';

import styled from 'styled-components';
import { ThemeProps } from '../../types/theme';

const ChartComponent = dynamic(() => import('./responsivePieChart'), { ssr: false });

interface Trips {
	trips: Array<TotalTrips>;
}

const PieChartContainer = styled.div`
	height: 25rem;
	width: 90%;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	span {
		font-size: 1rem;
		width: 100%;
		//width: ${({ theme }: ThemeProps) => theme.widths.eightByTwelve}%;
		font-style: italic;
		font-weight: 500;
	}
`;

export default function TripsTaken({ trips }: Trips) {
	const dt = trips.filter((element: TotalTrips) => element.month);

	const data = dt.map<RadialBarSerie>(({ month, denied, lift, sixtyPlus }: TotalTrips) => {
		const properties = {
			id: month,
			data: [
				{ x: 'Denied', y: denied },
				{ x: 'Lift', y: lift },
				{ x: 'SixtyPlus', y: sixtyPlus }
			]
		};
		return properties;
	});

	return (
		// eslint-disable-next-line jsx-a11y/aria-role
		<PieChartContainer role="graphics-document">
			<ChartComponent data={data} />
			<span aria-hidden>
				Below is a Clustered Bar chart for trips which were denied,Lyft provided or over sixty plus by C-Carts vehicles for month of october,november and
				december
			</span>
		</PieChartContainer>
	);
}

/// TO-DO span goes into other sections prevent that from happening

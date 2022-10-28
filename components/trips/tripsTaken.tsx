import { TotalTrips } from '@c-carts/cms';
import { BarDatum } from '@nivo/bar';

import dynamic from 'next/dynamic';

import styled from 'styled-components';

const GroupedBarChartComponent = dynamic(() => import('./responsiveStackedBarChart'), { ssr: false });

interface Trips {
	trips: Array<TotalTrips>;
}

const BarChartContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	grid-area: radial;

	p {
		font-size: 1rem;
		width: 100%;

		font-style: italic;
		font-weight: 500;
	}
	padding: 2rem 0px;
`;

export default function TripsTaken({ trips }: Trips) {
	const dt = trips.filter((element: TotalTrips) => element.month);

	const data = dt.flatMap<BarDatum>(({ month, denied, lift, sixtyPlus }: TotalTrips) => {
		const property = {
			id: month,
			Denied: denied,
			Lift: lift,
			SixtyPlus: sixtyPlus
		};
		return property;
	});

	return (
		// eslint-disable-next-line jsx-a11y/aria-role
		<BarChartContainer role="graphics-document">
			<GroupedBarChartComponent data={data} />
			<p aria-hidden>
				Grouped Bar Chart for trips which were denied,wheel chair lift provided or over sixty plus by C-CARTS vehicles for October, November and December month.
			</p>
		</BarChartContainer>
	);
}

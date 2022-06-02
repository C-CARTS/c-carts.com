import dynamic from 'next/dynamic';
import styled from 'styled-components';

interface Trips {
	trips: Array<Object>;
}

const PieChartContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	max-height: 20rem;
	span {
		font-size: 1rem;
		font-style: italic;
		font-weight: 500;
		width: 100%;
	}
	svg {
		width: 100%;
		font-weight: 800;
	}
`;

const Pie = dynamic(() => import('./responsivePie'), {
	ssr: false
});

export default function TripsTaken({ trips }: Trips) {
	const dt = trips.filter((element: any) => element.month);

	const data = dt.map(({ month, denied, lift, sixtyPlus }: any) => {
		const properties = {
			id: month,
			data: [
				{
					x: 'Denied',
					y: denied
				},
				{
					x: 'Lift',
					y: lift
				},
				{
					x: 'Sixty Plus',
					y: sixtyPlus
				}
			]
		};
		return properties;
	});

	return (
		// eslint-disable-next-line jsx-a11y/aria-role
		<PieChartContainer role="graphics-document" tabIndex={0}>
			<Pie data={data} />
			<span aria-hidden>Radial Pie chart for all trips taken by C-Carts vehicles for month of october,november and december</span>
		</PieChartContainer>
	);
}

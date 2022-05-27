import dynamic from 'next/dynamic';
import styled from 'styled-components';

interface Trips {
	trips: Array<Object>;
}

const PieChartContainer = styled.div`
	max-height: 19rem;
	width: 100%;
	svg {
		width: 100%;
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
		<PieChartContainer>
			<Pie data={data} />
		</PieChartContainer>
	);
}

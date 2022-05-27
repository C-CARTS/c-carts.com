import { ResponsiveRadialBar } from '@nivo/radial-bar';

export default function MyResponsivePie({ data }: any) {
	return (
		<ResponsiveRadialBar
			aria-label="C-Carts Trips taken radial pie chart"
			role="application"
			data={data}
			valueFormat=">-.2f"
			padding={0.4}
			cornerRadius={2}
			margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
			radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
			circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
			legends={[
				{
					anchor: 'right',
					direction: 'column',
					justify: false,
					translateX: 10,
					translateY: 160,
					itemsSpacing: 6,
					itemDirection: 'left-to-right',
					itemWidth: 100,
					itemHeight: 18,
					itemTextColor: '#6b6767',
					symbolSize: 18,
					symbolShape: 'square',
					effects: [
						{
							on: 'hover',
							style: {
								itemTextColor: '#0a0a0a'
							}
						}
					]
				}
			]}
		/>
	);
}

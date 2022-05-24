/* eslint-disable react/jsx-no-bind */

import { ResponsiveBar } from '@nivo/bar';

interface Bar {
	data: any;
}

export default function MyResponsiveBar({ data }: Bar) {
	return (
		<ResponsiveBar
			data={data}
			keys={['education', 'employment', 'medical', 'misc', 'personal', 'shopping', 'social']}
			indexBy="month"
			margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
			padding={0.3}
			valueScale={{ type: 'linear' }}
			indexScale={{ type: 'band', round: true }}
			colors={{ scheme: 'nivo' }}
			borderColor={{
				from: 'color',
				modifiers: [['darker', 1.6]]
			}}
			axisTop={undefined}
			axisRight={null}
			axisBottom={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: 'Month',
				legendPosition: 'middle',
				legendOffset: 42
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: 'Trip Type',
				legendPosition: 'middle',
				legendOffset: -48
			}}
			labelSkipWidth={12}
			labelSkipHeight={12}
			labelTextColor={{
				from: 'color',
				modifiers: [['darker', 1.6]]
			}}
			legends={[
				{
					dataFrom: 'keys',
					anchor: 'bottom-right',
					direction: 'column',
					justify: false,
					translateX: 120,
					translateY: 0,
					itemsSpacing: 2,
					itemWidth: 100,
					itemHeight: 20,
					itemDirection: 'left-to-right',
					itemOpacity: 0.85,
					symbolSize: 20,
					effects: [
						{
							on: 'hover',
							style: {
								itemOpacity: 1
							}
						}
					]
				}
			]}
			role="application"
			ariaLabel="Bar chart for displaying different trip types"
		/>
	);
}

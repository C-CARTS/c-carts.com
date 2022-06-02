/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */

import { ResponsiveBar } from '@nivo/bar';

interface Bar {
	data: any;
}

const extraProp = {
	description: `Above diagram is a stacked bar chart with X axis representing months October, Novermber and december from left to right respectively. The Y axis
				represents a numeric value representing total trips of certain type. Types of trips being represented include:
				education,employment,medical,misc,personal,shopping and social.`
};

export default function MyResponsiveBar({ data }: Bar) {
	return (
		<ResponsiveBar
			{...extraProp}
			isFocusable
			data={data}
			keys={['education', 'employment', 'medical', 'misc', 'personal', 'shopping', 'social']}
			indexBy="month"
			margin={{ top: 50, right: 130, bottom: 60, left: 60 }}
			padding={0.3}
			valueScale={{ type: 'band' }}
			indexScale={{ type: 'band', round: true }}
			colors={{ scheme: 'dark2' }}
			enableLabel
			innerPadding={2}
			groupMode="stacked"
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

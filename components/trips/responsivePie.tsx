/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable react/jsx-props-no-spreading */
import { ResponsiveRadialBar } from '@nivo/radial-bar';

const extraProps = {
	title: 'Radial Pie Chart denoting total trips by C-Carts Vehicle',
	description: `Chart consist of three concentric circles with data for December, November and October from outer to innermost circle
				respectively and, each concentric circle, provides a distribution of total
				number of trips which were of type denied, lift ,sixty plus.`
};

export default function MyResponsivePie({ data }: any) {
	return (
		<ResponsiveRadialBar
			labelsTextColor="#000000"
			enableTracks={false}
			enableLabels
			colors={{ scheme: 'dark2' }}
			{...extraProps}
			isInteractive
			padAngle={4}
			role="graphics-object"
			data={data}
			valueFormat=">-.2f"
			padding={0.4}
			label="category"
			cornerRadius={2}
			margin={{ top: 40, right: 40, bottom: 80, left: 40 }}
			radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
			circularAxisOuter={{ tickSize: 5, tickPadding: 15, tickRotation: 0 }}
			legends={[
				{
					anchor: 'left',
					direction: 'column',
					justify: false,
					translateX: 0,
					translateY: -50,
					itemsSpacing: 6,
					itemDirection: 'left-to-right',
					itemWidth: 80,
					itemHeight: 16,
					itemTextColor: '#6b6767',
					symbolSize: 15,
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

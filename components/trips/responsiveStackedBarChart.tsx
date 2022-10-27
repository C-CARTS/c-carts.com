/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable react/jsx-props-no-spreading */
import { BarDatum, ResponsiveBar } from '@nivo/bar';
import styled from 'styled-components';
import theme from '../../styles/theme';

interface Props {
	data: Array<BarDatum>;
}

const FigureContainer = styled.figure`
	width: 100%;
	height: 25rem;
`;

const FigureCaption = styled.figure`
	position: absolute;
	left: -10000px;
	top: auto;
	width: 1px;
	height: 1px;
	overflow: hidden;
`;

export default function ResponsiveGroupedBarChart({ data }: Props) {
	const {
		colors: { chartTheme }
	} = theme;
	const textColor = theme.colors.secondary.contrastColor;
	const keys = ['Denied', 'Lift', 'SixtyPlus'];
	return (
		<FigureContainer role="group">
			<ResponsiveBar
				role="figure"
				ariaLabel="Grouped Bar chart for trips taken by C-CART vehicle in October, November and December month "
				indexBy="id"
				keys={keys}
				data={data}
				margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
				padding={0.3}
				innerPadding={1}
				groupMode="grouped"
				enableGridX
				label="id"
				colors={chartTheme}
				labelTextColor={textColor}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'Months',
					legendPosition: 'middle',
					legendOffset: 42
				}}
				legends={[
					{
						dataFrom: 'keys',
						anchor: 'bottom-right',
						direction: 'row',
						justify: false,
						translateX: 120,
						translateY: 0,
						itemsSpacing: 5,
						itemWidth: 100,
						itemHeight: 20,
						itemDirection: 'left-to-right',
						itemOpacity: 5,
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
			/>
			<FigureCaption>
				<h2>Overview</h2>
				<p>Grouped Bar Chart with trips Wheel Chair lift, denied or over sixty plus</p>
				<h2>Values</h2>
				<table>
					<caption>C-Carts vehicle trips for October, November and December month</caption>
					<thead>
						<tr>
							<th id="blankPie" aria-hidden="true">
								&nbsp;
							</th>
							<th scope="col">Denied</th>
							<th scope="col">Lift</th>
							<th scope="col">Sixty Plus</th>
						</tr>
					</thead>
					<tbody>
						{data.map((dt: BarDatum) => (
							<tr key={dt.id}>
								<th scope="row">{dt.id}</th>
								<td>{dt.Denied}</td>
								<td>{dt.Lift}</td>
								<td>{dt.SixtyPlus}</td>
							</tr>
						))}
					</tbody>
				</table>
			</FigureCaption>
		</FigureContainer>
	);
}

/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable react/jsx-props-no-spreading */
import { RadialBarSerie, ResponsiveRadialBar } from '@nivo/radial-bar';
import styled from 'styled-components';

// const extraProps = {
// 	title: 'Radial Pie Chart denoting total trips by C-Carts Vehicle',
// 	description: `Chart consist of three concentric circles with data for December, November and October from outer to innermost circle
// 				respectively and, each concentric circle, provides a distribution of total
// 				number of trips which were of type denied, lift ,sixty plus.`
// };

interface Props {
	data: Array<RadialBarSerie>;
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

export default function MyResponsivePie({ data }: Props) {
	const colorScheme = ['#1718e2', '#904200', '#ae0063'];

	return (
		<FigureContainer role="group">
			<ResponsiveRadialBar
				aria-label="Radial Pie Chart displaying trips denied, accepted or lift and trips over Sixty Plus for months of October , November and December "
				role="figure"
				colors={colorScheme}
				labelsTextColor={{
					from: 'color',
					modifiers: [['darker', 50]]
				}}
				padAngle={5}
				data={data}
				valueFormat=">-.2f"
				padding={0.4}
				cornerRadius={2}
				margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
				radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
				circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
				legends={[
					{
						anchor: 'top',
						direction: 'column',
						justify: false,
						translateX: -80,
						translateY: 75,
						itemsSpacing: 6,
						itemDirection: 'left-to-right',
						itemWidth: 100,
						itemHeight: 18,
						itemTextColor: '#474747',
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
			<FigureCaption>
				<h2>Overview</h2>
				<p>Radial Pie Chart with trips lifted, denied or over Sixty Plus</p>
				<h2>Values</h2>
				<table>
					<caption>C-Carts vehicle trips for october, november and december month</caption>
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
						<tr>
							<th scope="row">October</th>
							<td>{data[0].data[0].y}</td>
							<td>{data[0].data[1].y}</td>
							<td>{data[0].data[2].y}</td>
						</tr>
						<tr>
							<th scope="row">November</th>
							<td>{data[1].data[0].y}</td>
							<td>{data[1].data[1].y}</td>
							<td>{data[1].data[2].y}</td>
						</tr>
						<tr>
							<th scope="row">December</th>
							<td>{data[2].data[0].y}</td>
							<td>{data[2].data[1].y}</td>
							<td>{data[2].data[2].y}</td>
						</tr>
					</tbody>
				</table>
			</FigureCaption>
		</FigureContainer>
	);
}

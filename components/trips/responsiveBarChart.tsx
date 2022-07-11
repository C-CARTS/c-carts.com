/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */

import { BarDatum, ResponsiveBar } from '@nivo/bar';
import styled from 'styled-components';
import theme from '../../styles/theme';

interface Bar {
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

export default function ResponsiveBarChart({ data }: Bar) {
	const {
		colors: { chartTheme }
	} = theme;
	const textColor = '#fff';
	return (
		<FigureContainer role="group">
			<ResponsiveBar
				role="figure"
				data={data}
				ariaLabel="Bar chart for displaying different trip types"
				keys={['education', 'employment', 'medical', 'misc', 'personal', 'shopping', 'social']}
				indexBy="month"
				margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
				padding={0.3}
				innerPadding={1}
				valueScale={{ type: 'linear' }}
				indexScale={{ type: 'band', round: true }}
				colors={chartTheme}
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
				labelTextColor={textColor}
				legends={[
					{
						dataFrom: 'keys',
						anchor: 'bottom-right',
						direction: 'column',
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
				<p>Bar Chart depicting trips taken for purpose of education,employment,medical,miscellanious,personal, shopping and social</p>
				<h2>Values</h2>
				<table>
					<caption>C-Carts vehicle different trip types for month of october,november and december</caption>
					<thead>
						<tr>
							<th id="blank" aria-hidden="true">
								&nbsp;
							</th>
							<th scope="col">October</th>
							<th scope="col">November</th>
							<th scope="col">December</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">education</th>
							<td>{data[0].education}</td>
							<td>{data[1].education}</td>
							<td>{data[2].education}</td>
						</tr>
						<tr>
							<th scope="row">employment</th>
							<td>{data[0].employment}</td>
							<td>{data[1].employment}</td>
							<td>{data[2].employment}</td>
						</tr>
						<tr>
							<th scope="row">medical</th>
							<td>{data[0].medical}</td>
							<td>{data[1].medical}</td>
							<td>{data[2].medical}</td>
						</tr>
						<tr>
							<th scope="row">misc</th>
							<td>{data[0].misc}</td>
							<td>{data[1].misc}</td>
							<td>{data[2].misc}</td>
						</tr>
						<tr>
							<th scope="row">personal</th>
							<td>{data[0].personal}</td>
							<td>{data[1].personal}</td>
							<td>{data[2].personal}</td>
						</tr>
						<tr>
							<th scope="row">shopping</th>
							<td>{data[0].shopping}</td>
							<td>{data[1].shopping}</td>
							<td>{data[2].shopping}</td>
						</tr>
						<tr>
							<th scope="row">social</th>
							<td>{data[0].social}</td>
							<td>{data[1].social}</td>
							<td>{data[2].social}</td>
						</tr>
					</tbody>
				</table>
			</FigureCaption>
		</FigureContainer>
	);
}

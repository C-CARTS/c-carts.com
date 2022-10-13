/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable react/jsx-props-no-spreading */
import { BarDatum, ResponsiveBar } from '@nivo/bar';
import styled from 'styled-components';
import theme from '../../styles/theme';

// const extraProps = {
// 	title: 'Radial Pie Chart denoting total trips by C-Carts Vehicle',
// 	description: `Chart consist of three concentric circles with data for December, November and October from outer to innermost circle
// 				respectively and, each concentric circle, provides a distribution of total
// 				number of trips which were of type denied, lift ,sixty plus.`
// };

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
	const keys = ['Denied', 'Lift', 'Sizty Plus'];
	return (
		<FigureContainer role="group">
			<ResponsiveBar
				role="figure"
				ariaLabel="Grouped Bar chart for trips taken by C-CART vehicle in October, November and December month "
				indexBy="id"
				keys={keys}
				data={data}
				groupMode="grouped"
				enableGridY
				enableGridX
				label="id"
				gridYValues={['October', 'November', 'December']}
				colors={chartTheme}
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
						{data.map((dt) => (
							<tr key={dt.month}>
								<th scope="row">{dt.month}</th>
								<td>{dt.denied}</td>
								<td>{dt.lift}</td>
								<td>{dt.sixtyPlus}</td>
							</tr>
						))}
					</tbody>
				</table>
			</FigureCaption>
		</FigureContainer>
	);
}

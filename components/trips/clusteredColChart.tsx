/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable react/jsx-props-no-spreading */

import { useEffect, useRef } from 'react';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import styled from 'styled-components';
import MyTheme from './chartsTheme';
// const extraProps = {
// 	title: 'Radial Pie Chart denoting total trips by C-Carts Vehicle',
// 	description: `Chart consist of three concentric circles with data for December, November and October from outer to innermost circle
// 				respectively and, each concentric circle, provides a distribution of total
// 				number of trips which were of type denied, lift ,sixty plus.`
// };

const ClusteredChartConntainer = styled.div`
	min-width: 25rem;
	height: 35rem;
`;

interface Props {
	data: any;
	chartId: string;
}

export default function ClusterdColumChart({ data, chartId }: Props) {
	const toor = useRef<any>(null);

	useEffect(() => {
		const root = am5.Root.new(chartId, {
			useSafeResolution: true
		});

		root.setThemes([am5themes_Animated.new(root)]);
		const xy = root.container.children.push(
			am5xy.XYChart.new(root, {
				panX: false,
				panY: false,
				wheelX: 'panX',
				wheelY: 'panY',
				layout: root.verticalLayout,
				focusable: true,
				tabindexOrder: 10,
				ariaLabel: 'Stacked Bar chart depicting different ride types and their amount for month of october, november and december'
			})
		);

		const legend = xy.children.push(
			am5.Legend.new(root, {
				x: 90,
				position: 'relative',
				toggleKey: 'active'
			})
		);

		const xAxi = xy.xAxes.push(
			am5xy.CategoryAxis.new(root, {
				categoryField: 'id',
				renderer: am5xy.AxisRendererX.new(root, {
					cellStartLocation: 0.1,
					cellEndLocation: 0.9
				}),
				tooltip: am5.Tooltip.new(root, {})
			})
		);

		xAxi.data.setAll(data);

		const yAxi = xy.yAxes.push(
			am5xy.ValueAxis.new(root, {
				renderer: am5xy.AxisRendererY.new(root, {})
			})
		);

		function makeSeries(nam: string, fieldName: any) {
			const series = xy.series.push(
				am5xy.ColumnSeries.new(root, {
					name: nam,
					xAxis: xAxi,
					yAxis: yAxi,
					valueYField: fieldName,
					categoryXField: 'id',
					tooltip: am5.Tooltip.new(root, {
						labelText: '{name}, {categoryX}: {valueY}'
					})
				})
			);

			series.columns.template.setAll({
				tooltipText: '{name}, {categoryX}:{valueY}',
				width: am5.percent(90),
				tooltipY: 0,
				focusable: true,
				focusableGroup: 'Trips Types',
				ariaLabel: 'Column {name}. Trip type {categoryX}, trip value {valueY}. Use arrow keys to select other columns in this series',
				tabindexOrder: 30
			});

			series.data.setAll(data);
			series.appear(1000, 100);
			series.bullets.push(() => {
				return am5.Bullet.new(root, {
					locationY: 1,
					sprite: am5.Label.new(root, {
						text: '{valueY}',
						fill: root.interfaceColors.get('alternativeText'),
						focusable: true,
						ariaLabel: 'Column: {name}, Trip : {valueX}, Number of Trips {valueY}',
						centerY: 0,
						centerX: am5.p50,
						populateText: true
					})
				});
			});

			legend.data.push(series);
		}

		// series.columns.template.set('focusable', true);
		makeSeries('Denied', 'Denied');
		makeSeries('Lift', 'Lift');
		makeSeries('Sixty Plus', 'SixtyPlus');

		xy.appear(1000, 100);

		toor.current = root;
		return () => {
			root.dispose();
		};
	}, [chartId, data]);

	return <ClusteredChartConntainer id={chartId} />;
}

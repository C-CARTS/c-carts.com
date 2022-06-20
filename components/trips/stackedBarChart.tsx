/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { TripTypeRow } from '@c-carts/cms';

interface Bar {
	data: Array<TripTypeRow | 'tripTypes'>;
	chartId: string;
}

const StackedChartContainer = styled.div`
	width: 100%;
	height: 35rem;
`;

// const extraProp = {
// 	description: `Above diagram is a stacked bar chart with X axis representing months October, Novermber and december from left to right respectively. The Y axis
// 				represents a numeric value representing total trips of certain type. Types of trips being represented include:
// 				education,employment,medical,misc,personal,shopping and social.`
// };

export default function StackedBarChart({ data, chartId }: Bar) {
	const toor = useRef<any>(null);

	useEffect(() => {
		const root = am5.Root.new(chartId, {
			useSafeResolution: true
		});
		root.setThemes([am5themes_Animated.new(root)]);
		root.tabindex = 0;
		const xy = root.container.children.push(
			am5xy.XYChart.new(root, {
				panX: false,
				panY: false,
				wheelX: 'panX',
				wheelY: 'panY',
				layout: root.verticalLayout,
				scale: 1,
				focusable: true,
				ariaLabel: 'Chart: depicting total trips taken for different purposes in october, november and december',
				tabindexOrder: 10
			})
		);

		const xAxi = xy.xAxes.push(
			am5xy.CategoryAxis.new(root, {
				categoryField: 'month',
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
				min: 0,
				renderer: am5xy.AxisRendererY.new(root, {})
			})
		);

		const legend = xy.children.push(
			am5.Legend.new(root, {
				centerX: 0,
				position: 'relative',
				toggleKey: 'active'
			})
		);

		function makeSeries(nam: string, fieldName: string) {
			const series = xy.series.push(
				am5xy.ColumnSeries.new(root, {
					name: nam,
					stacked: true,
					xAxis: xAxi,
					yAxis: yAxi,
					valueYField: fieldName,
					categoryXField: 'month',
					maskBullets: false,
					focusable: true,
					focusableGroup: 'types',
					tabindexOrder: 30,
					role: 'figure'
				})
			);
			series.columns.template.setAll({
				tooltipText: '{name}, {categoryX}: {valueY}',
				tooltipY: am5.percent(20)
			});
			// If DataItem is zero
			// series.columns.template.onPrivate('height', (height, target) => {
			// 	if (target !== undefined && target.dataItem?.bullets !== undefined) {
			// 		am5.array.each(target.dataItem.bullets, (bullet) => {
			// 			if (height === 0) {
			// 				bullet.get('sprite').hide();
			// 			} else {
			// 				bullet.get('sprite').show();
			// 			}
			// 		});
			// 	}
			// });
			// series.columns.template.set('focusable', true);
			series.columns.template.set('width', 60);

			series.data.setAll(data);
			series.appear(1000, 100);

			series.bullets.push(() => {
				return am5.Bullet.new(root, {
					sprite: am5.Label.new(root, {
						text: '{valueY}',
						fill: root.interfaceColors.get('alternativeText'),
						focusable: true,
						tabindexOrder: 40,
						ariaLabel: 'Column: {categoryX}, TripType : {name}, Number of Trips {valueY}',
						centerY: am5.p50,
						centerX: am5.p50,
						populateText: true,
						role: 'figure'
					})
				});
			});

			legend.data.push(series);
		}
		makeSeries('Education', 'education');
		makeSeries('Employment', 'employment');
		makeSeries('Medical', 'medical');
		makeSeries('Misc', 'misc');
		makeSeries('Personal', 'personal');
		makeSeries('Shopping', 'shopping');
		makeSeries('Social', 'social');

		xy.appear(1000, 100);
		toor.current = root;
		return () => {
			root.dispose();
		};
	}, [data, chartId]);

	return <StackedChartContainer id={chartId} />;
}

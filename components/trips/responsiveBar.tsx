/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */

import * as am5 from '@amcharts/amcharts5';
import * as am5Pie from '@amcharts/amcharts5/';
import { useLayoutEffect, useRef } from 'react';

interface Bar {
	data: any;
}

const extraProp = {
	description: `Above diagram is a stacked bar chart with X axis representing months October, Novermber and december from left to right respectively. The Y axis
				represents a numeric value representing total trips of certain type. Types of trips being represented include:
				education,employment,medical,misc,personal,shopping and social.`
};

export default function MyResponsiveBar({ data }: Bar) {
	const toor = useRef(null);

	useLayoutEffect(() => {
		const root = am5.Root.new('pieChart');

		const pie = root.container.children.push(
			am5Pie.PieChart.new(root, {
				layout: root.verticalLayout,
				innerRadius: am5.percent(40)
			})
		);

		const pp = am5Pie;
		const series = pie.series.push(
			am5Pie.PieSeries.new(root, {
				valueField: data.y,
				categoryField: data.x,
				alignLabels: false,
				legendLabelText: data.id
			})
		);

		series.ticks.template.setAll({ forceHidden: true });
		series.labels.template.setAll({ forceHidden: true });
		series.slices.template.setAll({
			tooltipText: '{category}: {value} '
		});
		series.slices.template.states.create('hover', { scale: 0.95 });

		series.data.setAll(data);
		toor.current = root;

		return () => {
			root.dispose();
		};
	}, [data]);

	return <div id="pieChart" style={{ width: '100%', height: '500px', backgroundColor: 'Highlight' }} />;
}

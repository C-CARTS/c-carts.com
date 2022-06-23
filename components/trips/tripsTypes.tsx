/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-syntax */
import { TripTypeRow, TripTypes } from '@c-carts/cms';
import { BarDatum } from '@nivo/bar';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { ThemeProps } from '../../types/theme';

const BarChart = dynamic(() => import('./responsiveBarChart'), {
	ssr: false
});

interface TTypes {
	ttypes: TripTypes;
}

const BarChartContainer = styled.div`
	height: 25rem;
	width: 90%;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	z-index: 10;
	span {
		width: 100%;
		font-size: 1rem;
		font-style: italic;
		font-weight: 500;
	}
`;

export default function TripsTypes({ ttypes }: TTypes) {
	const months = Object.entries(ttypes).splice(1);

	const field = months.flatMap<BarDatum>((item) => {
		if (typeof item[1] !== 'string') return item[1];
		return {};
	});

	return (
		<BarChartContainer role="graphics-document">
			<BarChart data={field} />
			<span aria-hidden>Stacked Bar chart represent trips taken for specific purpose by C-Carts vehicles for month of Cotober, november and december</span>
		</BarChartContainer>
	);
}

/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-syntax */
import { TripTypeRow, TripTypes } from '@c-carts/cms';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { ThemeProps } from '../../types/theme';

const BarChart = dynamic(() => import('./stackedBarChart'), {
	ssr: false
});

interface TTypes {
	ttypes: TripTypes;
}

const BarChartContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	z-index: 10;
	span {
		width: ${({ theme }: ThemeProps) => theme.widths.eightByTwelve}%;
		font-size: 1rem;
		font-style: italic;
		font-weight: 500;
	}
`;

type tripst = [string, TripTypeRow | 'tripTypes'];

export default function TripsTypes({ ttypes }: TTypes) {
	const months = Object.entries(ttypes).splice(1);
	const field = months.flatMap((item: tripst) => {
		return item[1];
	});

	return (
		<BarChartContainer role="graphics-document">
			<BarChart data={field} chartId="tripTypesChart" />
			<span aria-hidden>Stacked Bar chart represent trips taken for specific purpose by C-Carts vehicles for month of Cotober, november and december</span>
		</BarChartContainer>
	);
}

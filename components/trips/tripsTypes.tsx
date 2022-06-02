/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-syntax */
import { TripTypes } from '@c-carts/cms';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

const BarChart = dynamic(() => import('./responsiveBar'), {
	ssr: false
});

interface TTypes {
	ttypes: TripTypes;
}

const BarChartContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	height: 100%;
	svg {
		max-height: 20rem;
		width: 100%;
		font-weight: bold;
	}
	span {
		font-size: 1rem;
		font-style: italic;
		font-weight: 500;
	}
`;

export default function TripsTypes({ ttypes }: TTypes) {
	const { month1, month2, month3 } = ttypes;
	const months: any = [month1, month2, month3];

	const field = months.flatMap((item: any) => {
		if (item.month !== '' || item.month !== undefined) {
			item.education;
			item.educationColor = 'hsl(292, 70%, 50%)';
			item.employment;
			item.employmentColor = 'hsl(303, 70%, 50%)';
			item.medical;
			item.medicalColor = 'hsl(169, 20%, 36%)';
			item.misc;
			item.miscColor = 'hsl(395, 70%, 50%)';
			item.personal;
			item.personalColor = 'hsl(3, 20%, 50%)';
			item.shopping;
			item.shoppingColor = 'hsl(25, 70%, 50%)';
			item.social;
			item.socialColor = 'hsl(36, 70%, 50%)';
		}
		return item;
	});

	return (
		<BarChartContainer>
			<BarChart data={field} />
			<span aria-hidden>Bar chart for all different type of trips taken by C-Carts vehicles</span>
		</BarChartContainer>
	);
}

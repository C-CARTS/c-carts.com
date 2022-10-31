import { Performance } from '@c-carts/cms';
import { useCallback } from 'react';
import { RecoilRoot, SetRecoilState } from 'recoil';
import styled from 'styled-components';
import usePerformance from '../../data-hooks/usePerformance';
import { fiscalDataState } from '../../state/archiveState';
import { mediaQueryMaxWidths } from '../../styles/theme';
import Archive from '../trips/archive';
import SystemOperations from '../trips/systemOperations';
import TripsTaken from '../trips/tripsTaken';
import TripsTypes from '../trips/tripsTypes';

const ChartsContainer = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: auto;
	align-items: center;
	justify-content: center;
	grid-gap: 2rem;
	grid-template-areas: 'radial stacked' 'table table' 'selector selector';

	@media (max-width: ${mediaQueryMaxWidths.performance}px) {
		grid-template-columns: repeat(1, 100%);
		grid-template-areas: 'selector' 'radial' 'stacked' 'table';
	}
`;

export default function PerformanceOperations() {
	const performance = usePerformance();

	const initializeState = useCallback(
		({ set }: { set: SetRecoilState }) => {
			set(fiscalDataState, performance[0].finance);
		},
		[performance]
	);

	return (
		<div style={{ width: '100%' }}>
			{performance.map((val: Performance) => (
				<ChartsContainer className="charts" key={val._id}>
					<TripsTaken trips={val.trips} />
					<TripsTypes ttypes={val.tripTypes} />
					<SystemOperations system={val.systemOps} />
					<RecoilRoot initializeState={initializeState}>
						<Archive />
					</RecoilRoot>
				</ChartsContainer>
			))}
		</div>
	);
}

PerformanceOperations.dataHooks = [usePerformance];

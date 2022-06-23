import { PerformanceSection, Performance } from '@c-carts/cms';
import styled from 'styled-components';
import usePerformance from '../../data-hooks/usePerformance';
import Archive from '../trips/archive';
import SystemOperations from '../trips/systemOperations';
import TripsTaken from '../trips/tripsTaken';
import TripsTypes from '../trips/tripsTypes';

interface Props {
	block: PerformanceSection;
}

const ChartsContainer = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: minmax(450px, auto);
	align-items: center;
	justify-content: center;
	grid-row-gap: 4rem;
	grid-column-gap: 2rem;
	@media (max-width: 1100px) {
		grid-template-columns: repeat(1, 100%);
	}
`;

export default function PerformanceOperations({ block }: Props) {
	const prfm = usePerformance();

	if (!prfm && block.label.length < 0) {
		return (
			<p className="performanceData unavailable">
				<strong>There are currently no schedules available</strong>
			</p>
		);
	}

	return (
		<div style={{ width: '100%' }}>
			{prfm.map((val: Performance) => (
				<ChartsContainer className="charts" key={val._id}>
					<TripsTaken trips={val.trips} />
					<TripsTypes ttypes={val.tripTypes} />
					<SystemOperations system={val.systemOps} />
					<Archive data={val.finance} />
				</ChartsContainer>
			))}
		</div>
	);
}

PerformanceOperations.dataHooks = [usePerformance];

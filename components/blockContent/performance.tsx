import { PerformanceSection } from '@c-carts/cms';
import styled from 'styled-components';
import usePerformance from '../../data-hooks/usePerformance';
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

	@media (max-width: 1100px) {
		grid-template-columns: 1fr;
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
		<ChartsContainer>
			{prfm.map((val) => (
				<>
					<TripsTaken key={val._id} trips={val.trips} />
					<TripsTypes key={val._id} ttypes={val.tripTypes} />
				</>
			))}
		</ChartsContainer>
	);
}

PerformanceOperations.dataHooks = [usePerformance];

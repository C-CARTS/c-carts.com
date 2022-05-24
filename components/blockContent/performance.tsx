import { PerformanceSection } from '@c-carts/cms';
import usePerformance from '../../data-hooks/usePerformance';
import TripsTaken from '../trips/tripsTaken';
import TripsTypes from '../trips/tripsTypes';

interface Props {
	block: PerformanceSection;
}

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
		<div>
			{prfm.map((val) => (
				<>
					<TripsTaken key={val._id} trips={val.trips} />
					<TripsTypes key={val._id} ttypes={val.tripTypes} />
				</>
			))}
		</div>
	);
}

PerformanceOperations.dataHooks = [usePerformance];

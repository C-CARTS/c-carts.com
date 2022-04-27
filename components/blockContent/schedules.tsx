import { MapsSection } from '@c-carts/cms';
import useSchedule from '../../data-hooks/useSchedules';
import Schedl from './schedule';

interface Props {
	block: MapsSection;
}

export default function ScheduleComponent({ block: { count } }: Props) {
	const mps = useSchedule();

	if (mps.length === 0) {
		return (
			<p className="news unavailable">
				<strong>There are currently no schedules available</strong>
			</p>
		);
	}

	const filtered = count === 0 ? mps : mps.slice(0, count);

	return (
		<>
			{filtered.map((j: any) => (
				<Schedl key={j._id} />
			))}
		</>
	);
}

ScheduleComponent.datahooks = [useSchedule];

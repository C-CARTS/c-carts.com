import useSchedule from '../../data-hooks/useSchedules';
import SubTab from '../tabs/subTab';
import Tab from '../tabs/tab';
import Tabs from '../tabs/tabs';

export default function ScheduleComponent() {
	const mps = useSchedule();

	if (mps.length === 0) {
		return (
			<p className="news unavailable">
				<strong>There are currently no schedules available</strong>
			</p>
		);
	}

	return (
		<Tabs activeIndex={0}>
			{mps.map((j: any) => (
				<Tab key={j._id} label={j.slug.current}>
					<SubTab content={j.content} pdf={j.routePdfs} map={j.images} key={j._id} />
				</Tab>
			))}
		</Tabs>
	);
}

ScheduleComponent.datahooks = [useSchedule];

import { EagleExpressSection, Maps } from '@c-carts/cms';
import useSchedule from '../../data-hooks/useSchedules';
import SubTab from './subTab';
import Tab from './tab';
import Tabs from './tabs';

interface Prop {
	block: EagleExpressSection;
}

export default function EagleExpress({ block: { label } }: Prop) {
	const mps = useSchedule();
	if (mps.length === 0 && label.length < 0) {
		return (
			<p className="eagleExpress unavailable">
				<strong>There are currently no schedules available</strong>
			</p>
		);
	}

	const eagle = mps.filter((val: Maps) => val.routeType.route[0] === label);
	return (
		<Tabs activeIndex={0}>
			{eagle.map((j: Maps) => (
				<Tab key={j._id} label={j.slug.current}>
					<SubTab content={j.content} pdf={j.routePdfs} map={j.images} key={j._id} />
				</Tab>
			))}
		</Tabs>
	);
}

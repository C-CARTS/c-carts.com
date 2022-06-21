import { DemandResponseSection, Maps } from '@c-carts/cms';
import useSchedule from '../../data-hooks/useSchedules';
import SubTab from './subTab';

interface Prop {
	block: DemandResponseSection;
}

export default function DemandResponse({ block: { label } }: Prop) {
	const mps = useSchedule();

	if (mps.length === 0 && label.length < 0) {
		return (
			<p className="news unavailable">
				<strong>There are currently no schedules available</strong>
			</p>
		);
	}

	const demand = mps.filter((mp: Maps) => mp.routeType.route[0] === label);

	return (
		<div style={{ width: '100%' }}>
			{demand.map(({ content, routePdfs, images, _id }) => (
				<SubTab content={content} pdf={routePdfs} map={images} key={_id} />
			))}
		</div>
	);
}

DemandResponse.dataHooks = [useSchedule];

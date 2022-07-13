import { Maps, RantoulSection } from '@c-carts/cms';
import useSchedule from '../../data-hooks/useSchedules';
import SubTab from './subTab';

interface Props {
	block: RantoulSection;
}

export default function RantoulConnect({ block: { label } }: Props) {
	const mps = useSchedule();
	if (mps.length === 0 && label.length < 0) {
		return (
			<p className="Schedule unavailable">
				<strong>There are currently no schedules available</strong>
			</p>
		);
	}

	const rantoul = mps.filter((val: Maps) => val.routeType.route[0] === label);
	return (
		<div style={{ width: '100%' }}>
			{rantoul.map(({ content, routePdfs, images, _id }) => (
				<SubTab content={content} pdf={routePdfs} map={images} key={_id} />
			))}
		</div>
	);
}

RantoulConnect.dataHooks = [useSchedule];

import { Routes } from '@c-carts/cms';
import useSchedules from '../../data-hooks/useSchedules';

import SubTab from './subTab';

interface Prop {
	id: string;
}

export default function Schedule({ id }: Prop) {
	const schedules = useSchedules();
	const schedule = schedules.filter((mp: Routes) => mp._id === id);

	return (
		<div style={{ width: '100%' }}>
			{schedule.map(({ content, routePdfs, images, _id }) => (
				<SubTab content={content} pdf={routePdfs} map={images} key={_id} />
			))}
		</div>
	);
}

Schedule.dataHooks = [useSchedules];

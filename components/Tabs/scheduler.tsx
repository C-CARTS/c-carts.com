import { Routes } from '@c-carts/cms';
import useSchedules from '../../data-hooks/useSchedules';
import EagleExpress from './eagleExpress';
import Schedule from './schedule';

interface Props {
	ids: string[];
}

type eagleType = any | Routes;

export default function Scheduler({ ids }: Props) {
	const schedules = useSchedules();
	let eagle = 0;
	const eagleExp: eagleType[] = [];
	schedules.map((sch: Routes) => {
		if (sch.slug.current.match('eagle')) {
			eagle += 1;
			eagleExp.push(sch);
		}
		return null;
	});

	if (ids.length === eagle) {
		return <EagleExpress eagle={eagleExp} />;
	}
	return (
		<>
			{ids.map((id: string) => (
				<Schedule id={id} key={id} />
			))}
		</>
	);
}

Scheduler.dataHooks = [useSchedules];

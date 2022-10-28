import { RoutesReferences } from '@c-carts/cms';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import useSchedules from '../../data-hooks/useSchedules';
import { loadedRoutesState } from '../../state/tabState';
import Scheduler from './scheduler';

interface Prop {
	block: RoutesReferences;
}

export default function SchedulesRoutes({ block: { routesList } }: Prop) {
	const schedules = useSchedules();
	const ids = routesList.map(({ _ref }) => _ref);
	const setLoadedRoutesState = useSetRecoilState(loadedRoutesState);

	useEffect(() => {
		const routesToUse = schedules.filter(({ _id: id }) => ids.indexOf(id) > -1);
		setLoadedRoutesState(routesToUse);
	}, [ids, schedules, setLoadedRoutesState]);

	return <Scheduler />;
}

SchedulesRoutes.dataHooks = [useSchedules];

import { RoutesReferences } from '@c-carts/cms';
import Scheduler from './scheduler';

interface Prop {
	block: RoutesReferences;
}

export default function SchedulesRoutes({ block: { routesList, _type } }: Prop) {
	const ids = routesList.map(({ _ref }) => _ref);
	return <Scheduler key={_type} ids={ids} />;
}

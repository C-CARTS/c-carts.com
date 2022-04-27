/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-danger */

import useScheduleData from '../../data-hooks/useSchedule';
import Tables from '../Tabs/tables';
import Tabs from '../Tabs/tabs';

export default function ScheduleComponent() {
	const data = useScheduleData();
	const { code } = data;
	if (!data) {
		return <div>Nothing to render</div>;
	}

	return (
		<>
			<Tables code={code} />
			<Tabs />
		</>
	);
}
ScheduleComponent.dataHooks = [useScheduleData];

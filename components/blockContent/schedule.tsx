/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-danger */

import useScheduleData from '../../data-hooks/useSchedule';

import Tabs from '../Tabs/tabs';

export default function ScheduleComponent() {
	const data = useScheduleData();

	if (!data) {
		return <div>Nothing to render</div>;
	}

	return <Tabs />;
}
ScheduleComponent.dataHooks = [useScheduleData];

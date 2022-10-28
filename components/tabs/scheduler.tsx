import { useRecoilValue } from 'recoil';
import useSchedules from '../../data-hooks/useSchedules';
import { tabLabelCountSelector } from '../../state/tabState';
import CurrentContent from './currentContent';
import MultiRoutePicker from './multiRoutePicker';
import SubTab from './subTab';

export default function Scheduler() {
	const tabLabelCount = useRecoilValue(tabLabelCountSelector);

	if (tabLabelCount === 0) {
		return null;
	}

	return (
		<>
			{tabLabelCount > 1 && <MultiRoutePicker />}
			<SubTab />
			<CurrentContent />
		</>
	);
}

Scheduler.dataHooks = [useSchedules];

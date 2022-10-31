import { useRecoilValue } from 'recoil';
import useSchedules from '../../data-hooks/useSchedules';
import { currentTabState, tabLabelCountSelector } from '../../state/tabState';
import CurrentContent from './currentContent';
import MultiRoutePicker from './multiRoutePicker';
import SubTab from './subTab';

export default function Scheduler() {
	const tabLabelCount = useRecoilValue(tabLabelCountSelector);
	const currentTab = useRecoilValue(currentTabState);

	if (tabLabelCount === 0) {
		return null;
	}

	return (
		<>
			{tabLabelCount > 1 && <MultiRoutePicker />}
			{tabLabelCount > 1 ? (
				<div role="tabpanel" aria-labelledby={`variant-button-${currentTab}`}>
					<SubTab />
					<CurrentContent />
				</div>
			) : (
				<>
					<SubTab />
					<CurrentContent />
				</>
			)}
		</>
	);
}

Scheduler.dataHooks = [useSchedules];

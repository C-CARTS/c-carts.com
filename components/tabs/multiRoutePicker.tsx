import { Routes } from '@c-carts/cms';
import { KeyboardEventHandler, useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { breakPointState } from '../../state/changeProperty';
import { loadedRoutesState, tabFocusState, tabLabelCountSelector } from '../../state/tabState';
import TabButton from './tabsButton';

export default function MultiRoutePicker() {
	const routes = useRecoilValue(loadedRoutesState);
	const breakpoint = useRecoilValue(breakPointState);
	const tabLabelCount = useRecoilValue(tabLabelCountSelector);
	const [tabFocus, setTabFocus] = useRecoilState(tabFocusState);

	const keyPress = useCallback<KeyboardEventHandler<HTMLElement>>(
		(event) => {
			const { key } = event;
			const maxIndex = tabLabelCount - 1;
			if (key === 'ArrowLeft') {
				if (tabFocus === null) {
					setTabFocus(0);
				} else if (tabFocus === 0) {
					setTabFocus(maxIndex);
				} else {
					setTabFocus(tabFocus - 1);
				}
			}
			if (key === 'ArrowRight') {
				if (tabFocus === null) {
					setTabFocus(0);
				} else if (tabFocus === maxIndex) {
					setTabFocus(0);
				} else {
					setTabFocus(tabFocus + 1);
				}
			}

			return null;
		},
		[tabFocus, setTabFocus, tabLabelCount]
	);

	return (
		<div tabIndex={0} onKeyUp={keyPress} aria-orientation={breakpoint ? 'vertical' : 'horizontal'} role="tablist" aria-label="Services tab panel" id="tablist">
			{routes.map(({ _id: id }: Routes, index) => (
				<TabButton key={id} index={index} />
			))}
		</div>
	);
}

import { Routes } from '@c-carts/cms';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { breakPointState } from '../../state/changeProperty';
import { loadedRoutesState, tabLabelCountSelector } from '../../state/tabState';
import TabButton from './tabsButton';

const PickerWrap = styled.div<{ mobile: boolean }>`
	display: flex;
	flex-flow: ${({ mobile }) => (mobile ? 'column nowrap' : 'row nowrap')};
	width: 100%;
	align-items: center;
	justify-content: center;
	margin: 0 0 1rem 0;
`;

export default function MultiRoutePicker() {
	const routes = useRecoilValue(loadedRoutesState);
	const breakpoint = useRecoilValue(breakPointState);
	const tabLabelCount = useRecoilValue(tabLabelCountSelector);

	return (
		// eslint-disable-next-line jsx-a11y/interactive-supports-focus
		<PickerWrap mobile={breakpoint} aria-orientation={breakpoint ? 'vertical' : 'horizontal'} role="tablist" aria-label="Services tab panel" id="tablist">
			{routes.map(({ _id: id }: Routes, index) => (
				<TabButton key={id} index={index} first={index === 0} last={index === tabLabelCount - 1} />
			))}
		</PickerWrap>
	);
}

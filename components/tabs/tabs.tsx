/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { KeyboardEventHandler, useCallback, useEffect, useMemo, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import ConvertToCapital from '../../helpers/capitalizationUtil';
import { breakPointState } from '../../state/changeProperty';
import { activeIndexAtom, labelArrayAtom, activeLabelSelector, tabIndexState } from '../../state/tabState';

import { ThemeProps } from '../../types/theme';
import TabButton from './tabsButton';

const TabNames = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;

	align-content: center;
	background: ${({ theme }: ThemeProps) => theme.colors.primary.tabsBackground};
	width: 100%;
	padding: calc(${({ theme }: ThemeProps) => theme.sizes.contentPaddingBottom} * 0.15);
`;

const TabContent = styled.div`
	width: 100%;
`;

interface TabsProps {
	activeIndex: number;
	children: JSX.Element[] | JSX.Element;
}

function Tabs(props: TabsProps) {
	const [activeIndex, setActiveIndex] = useRecoilState(activeIndexAtom);
	const setLabelArray = useSetRecoilState(labelArrayAtom);
	const breakpoint = useRecoilValue(breakPointState);
	const currentLabel = useRecoilValue(activeLabelSelector);
	const labelTab = useRecoilValue(labelArrayAtom);
	const { activeIndex: initialActiveIndex, children } = props;
	const childrenArray = useMemo(() => (Array.isArray(children) ? children : [children]), [children]);
	const tabReference = useRef<HTMLDivElement>(null);
	const setTabFocus = useSetRecoilState(tabIndexState);

	useEffect(() => {
		const tabLabels = childrenArray.map((tab) => tab.props.label);
		setLabelArray(tabLabels);
		if (initialActiveIndex > 0 && initialActiveIndex < tabLabels.length) {
			setActiveIndex(initialActiveIndex);
		}
	}, [childrenArray, initialActiveIndex, setActiveIndex, setLabelArray]);

	const keyPress = useCallback<KeyboardEventHandler<HTMLButtonElement>>((event) => {
		const currentContent = event.currentTarget.textContent;
		const { key } = event;
		if (key === 'ArrowLeft') {
			switch (currentContent) {
				case 'eagle  express  direct':
					setTabFocus(2);
					break;
				case 'eagle  express  north':
					setTabFocus(0);
					break;
				case 'eagle  express  south':
					setTabFocus(1);
					break;
				default:
					break;
			}
		}
		if (key === 'ArrowRight') {
			switch (currentContent) {
				case 'eagle  express  direct':
					setTabFocus(1);

					break;
				case 'eagle  express  south':
					setTabFocus(0);

					break;
				case 'eagle  express  north':
					setTabFocus(2);

					break;
				default:
					break;
			}
		}

		return null;
	}, []);

	const tabAttribute = currentLabel === labelTab[0];
	return (
		<>
			<TabNames ref={tabReference} aria-orientation={breakpoint ? 'vertical' : 'horizontal'} role="tablist" aria-label="Services tab panel">
				{childrenArray.map((tab, index) => (
					<TabButton
						subAttribute={tabAttribute}
						index={index}
						currentId={tab.props.label}
						onKeyDown={keyPress}
						ariaControls={tab.props.label}
						id={tab.props.label}
						key={tab.props.label}
						onClick={() => setActiveIndex(index)}
					>
						{ConvertToCapital(tab.props.label)}
					</TabButton>
				))}
			</TabNames>
			<TabContent className="tabbed-content" role="tabpanel" aria-label={currentLabel}>
				{childrenArray[activeIndex] && childrenArray[activeIndex].props.children}
			</TabContent>
		</>
	);
}

export default Tabs;

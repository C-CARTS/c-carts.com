import { KeyboardEventHandler, useCallback, useEffect, useMemo, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { breakPointState } from '../../state/changeProperty';
import { currentTabState, focusTabState, routeFamilySelector, tabLabelCountSelector } from '../../state/tabState';
import { ThemeProps } from '../../types/theme';

interface Props {
	index: number;
	first: boolean;
	last: boolean;
}

const radius = '10px';

const Button = styled.button<{ mobile: boolean; current: boolean; first: boolean; last: boolean }>`
	-webkit-appearance: none;
	padding: 0.5rem 1.25rem;
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize * 1.1}px;

	background: ${({ theme, current }) => (current ? theme.colors.secondary.color : theme.colors.primary.background)};
	color: ${({ theme, current }) => (current ? theme.colors.secondary.contrast : theme.colors.primary.text)};

	border: 2px solid ${({ theme }: ThemeProps) => theme.colors.secondary.color};

	border-top-left-radius: ${({ first, mobile }) => (first && !mobile ? radius : 0)};
	border-bottom-left-radius: ${({ first, mobile }) => (first && !mobile ? radius : 0)};
	border-top-right-radius: ${({ last, mobile }) => (last && !mobile ? radius : 0)};
	border-bottom-right-radius: ${({ last, mobile }) => (last && !mobile ? radius : 0)};

	width: ${({ mobile }) => (mobile ? '100%' : 'auto')};

	+ button {
		margin-left: ${({ mobile }) => (mobile ? 0 : '-2px')};
		margin-top: ${({ mobile }) => (mobile ? '-2px' : 0)};
	}

	&:focus {
		outline: none;
	}

	&:focus-visible {
		box-shadow: inset 0 0 0 2px ${({ theme }: ThemeProps) => theme.colors.secondary.contrastColor};
	}
`;

export default function TabButton({ index, first, last }: Props) {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const activeIndex = useRecoilValue(currentTabState);
	const isCurrent = useMemo(() => index === activeIndex, [index, activeIndex]);
	const { name } = useRecoilValue(routeFamilySelector(index));
	const breakpoint = useRecoilValue(breakPointState);
	const tabLabelCount = useRecoilValue(tabLabelCountSelector);
	const [focusTab, setFocusTab] = useRecoilState(focusTabState);
	const [currentTab, setCurrentTab] = useRecoilState(currentTabState);

	const keyPress = useCallback<KeyboardEventHandler<HTMLElement>>(
		({ key }) => {
			const maxIndex = tabLabelCount - 1;
			const current = focusTab ?? currentTab;

			if (key === 'ArrowLeft') {
				if (current === 0) {
					setFocusTab(maxIndex);
				} else {
					setFocusTab(current - 1);
				}
			} else if (key === 'ArrowRight') {
				if (current === maxIndex) {
					setFocusTab(0);
				} else {
					setFocusTab(current + 1);
				}
			}
		},
		[tabLabelCount, focusTab, currentTab, setFocusTab]
	);

	const selectTab = useCallback(() => {
		setCurrentTab(index);
	}, [index, setCurrentTab]);

	useEffect(() => {
		if (focusTab === index) {
			buttonRef.current?.focus();
		}
	}, [focusTab, index]);

	return (
		<Button
			mobile={breakpoint}
			current={isCurrent}
			first={first}
			last={last}
			ref={buttonRef}
			onKeyUp={keyPress}
			onClick={selectTab}
			className="tabs-btn"
			aria-controls="tablist"
			role="tab"
			aria-selected={isCurrent}
		>
			{name}
		</Button>
	);
}

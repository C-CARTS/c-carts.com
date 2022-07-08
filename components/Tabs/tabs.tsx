/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { KeyboardEventHandler, useCallback, useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import ConvertToCapital from '../../helpers/capitalizationUtil';
import { breakPointState } from '../../state/changeProperty';
import { activeIndexAtom, labelArrayAtom, activeLabelSelector } from '../../state/tabState';
import { ThemeProps } from '../../types/theme';

const TabNames = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;

	align-content: center;
	background: #29af1d;
	width: 100%;

	padding: calc(${({ theme }: ThemeProps) => theme.sizes.contentPaddingBottom} * 0.15);

	& :hover {
		border-bottom: 0.15rem solid ${({ theme }: ThemeProps) => theme.colors.link.color};
		background-color: #fff;
		color: #000;
	}
	@media (max-width: 720px) {
		flex-direction: column;
		flex-wrap: wrap;
	}
`;

const IndividualTab = styled.button`
	padding: 0.25rem 0px;
	text-transform: capitalize;
	background: none;
	border: none;
	color: #000000;
	width: 30%;
	cursor: pointer;
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize}px;

	&:focus,
	&:active,
	&:focus-visible {
		border-bottom: 0.15rem solid ${({ theme }: ThemeProps) => theme.colors.link.underline};
		background-color: #fff;
		color: #000;
	}
	@media (max-width: 580px) {
		width: ${({ theme }: ThemeProps) => theme.widths.sixByTwelve}%;
	}
`;

const DefaultTab = styled(IndividualTab)`
	&:first-child {
		border-bottom: 0.15rem solid ${({ theme }: ThemeProps) => theme.colors.link.underline};
		background-color: #fff;
		color: #000;
	}
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

	useEffect(() => {
		const tabLabels = childrenArray.map((tab) => tab.props.label);
		setLabelArray(tabLabels);
		if (initialActiveIndex > 0 && initialActiveIndex < tabLabels.length) {
			setActiveIndex(initialActiveIndex);
		}
	}, [childrenArray, initialActiveIndex, setActiveIndex, setLabelArray]);

	const keyPress = useCallback<KeyboardEventHandler<HTMLButtonElement>>((event) => {
		const tabPanel = document.getElementsByClassName('tabs-buttons');
		const currentContent = event.currentTarget.textContent;
		const { key } = event;
		if (key === 'ArrowLeft') {
			// const changeTab = tabPanel.namedItem(currentFocus?.previousSibling);
			switch (currentContent) {
				case 'eagle  express  direct':
					document.getElementById(tabPanel[2].id)?.focus();
					break;
				case 'eagle  express  south':
					document.getElementById(tabPanel[1].id)?.focus();
					break;
				case 'eagle  express  north':
					document.getElementById(tabPanel[0].id)?.focus();
					break;
				default:
					break;
			}
		}
		if (key === 'ArrowRight') {
			// const changeTab = tabPanel.namedItem(currentFocus?.previousSibling);
			switch (currentContent) {
				case 'eagle  express  direct':
					document.getElementById(tabPanel[1].id)?.focus();
					break;
				case 'eagle  express  south':
					document.getElementById(tabPanel[0].id)?.focus();
					break;
				case 'eagle  express  north':
					document.getElementById(tabPanel[2].id)?.focus();
					break;
				default:
					break;
			}
		}

		return null;
	}, []);

	const ActiveTab = currentLabel === labelTab[0] ? DefaultTab : IndividualTab;
	return (
		<>
			<TabNames aria-orientation={breakpoint ? 'vertical' : 'horizontal'} role="tablist" aria-label="Services tab panel">
				{childrenArray.map((tab, index) => (
					<ActiveTab
						role="tab"
						className="tabs-buttons"
						onKeyDown={keyPress}
						aria-controls={tab.props.label}
						aria-selected={currentLabel === tab.props.label}
						id={tab.props.label}
						key={tab.props.label}
						onClick={() => setActiveIndex(index)}
					>
						{ConvertToCapital(tab.props.label)}
					</ActiveTab>
				))}
			</TabNames>
			<TabContent className="tabbed-content" role="presentation">
				{childrenArray[activeIndex] && childrenArray[activeIndex].props.children}
			</TabContent>
		</>
	);
}

export default Tabs;

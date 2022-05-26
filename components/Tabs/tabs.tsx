/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import ConvertToCapital from '../../helpers/capitalizationUtil';
import { activeIndexAtom, labelArrayAtom, activeLabelSelector } from '../../state/tabState';
import { ThemeProps } from '../../types/theme';

const TabNames = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;

	align-content: center;
	background: #29af1d;
	width: 100%;

	padding: calc(${({ theme }: ThemeProps) => theme.sizes.contentPaddingBottom} * 0.25);

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
	padding: 0.25rem calc(${({ theme }: ThemeProps) => theme.sizes.contentPaddingSides} * 0.115) 0.25rem;
	text-transform: capitalize;
	background: none;
	border: none;
	color: #000000;
	width: ${({ theme }: ThemeProps) => theme.widths.twoByTwelve}%;
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

	const ActiveTab = currentLabel === labelTab[0] ? DefaultTab : IndividualTab;
	return (
		<>
			<TabNames role="tablist" aria-label="Schedules and Maps tab panel">
				{childrenArray.map((tab, index) => (
					<ActiveTab
						role="tab"
						aria-controls={tab.props.label}
						aria-selected={currentLabel === tab.props.label}
						key={tab.props.label}
						onClick={() => setActiveIndex(index)}
					>
						{ConvertToCapital(tab.props.label)}
					</ActiveTab>
				))}
			</TabNames>
			<TabContent className="tabbed-content" aria-labelledby={labelTab[activeIndex]} tabIndex={0}>
				{childrenArray[activeIndex] && childrenArray[activeIndex].props.children}
			</TabContent>
		</>
	);
}

export default Tabs;

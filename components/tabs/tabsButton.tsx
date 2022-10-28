import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { currentTabState, routeFamilySelector, tabFocusState } from '../../state/tabState';
import { mediaQueryMaxWidths } from '../../styles/theme';
import { ThemeProps } from '../../types/theme';

interface Props {
	index: number;
}

const IndividualTab = styled.button`
	padding: 0.25rem 0px;
	text-transform: capitalize;
	background: none;
	border: none;
	color: ${({ theme }: ThemeProps) => theme.colors.secondary.contrastColor};
	width: ${({ theme }: ThemeProps) => theme.widths.threeByTwelve}%;
	cursor: pointer;
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize}px;

	&:focus,
	&:active,
	&:focus-visible {
		border-bottom: 0.15rem solid ${({ theme }: ThemeProps) => theme.colors.link.underline};
		background-color: ${({ theme }: ThemeProps) => theme.colors.primary.background};
		color: ${({ theme }: ThemeProps) => theme.colors.secondary.contrastColor};
	}
	@media (max-width: ${mediaQueryMaxWidths.tablesSm}px) {
		width: ${({ theme }: ThemeProps) => theme.widths.sixByTwelve}%;
	}
`;

const DefaultTab = styled(IndividualTab)`
	&:first-child {
		border-bottom: 0.15rem solid ${({ theme }: ThemeProps) => theme.colors.link.underline};
		background-color: ${({ theme }: ThemeProps) => theme.colors.primary.background};
		color: ${({ theme }: ThemeProps) => theme.colors.secondary.contrastColor};
	}
`;

export default function TabButton({ index }: Props) {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [activeIndex, setActiveIndex] = useRecoilState(currentTabState);
	const isCurrent = useMemo(() => index === activeIndex, [index, activeIndex]);
	const [tabFocus, setTabFocus] = useRecoilState(tabFocusState);
	const { name } = useRecoilValue(routeFamilySelector(index));

	const selectTab = useCallback(() => {
		setActiveIndex(index);
		setTabFocus(index);
	}, [index, setActiveIndex, setTabFocus]);

	const ButtonElement = useMemo(() => (isCurrent ? DefaultTab : IndividualTab), [isCurrent]);

	useEffect(() => {
		if (index === tabFocus) {
			buttonRef.current?.focus();
		}
	}, [index, tabFocus]);

	return (
		<ButtonElement ref={buttonRef} onClick={selectTab} onKeyUp={selectTab} className="tabs-btn" aria-controls="tablist" role="tab" aria-selected={isCurrent}>
			{name}
		</ButtonElement>
	);
}

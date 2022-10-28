import { KeyboardEventHandler, useCallback, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import assertUnreachable from '../../helpers/assertUnreachable';
import { breakPointState } from '../../state/changeProperty';
import { currentSubTabState, focusSubTabState, SubTab as SubTabType } from '../../state/subTabState';
import { mediaQueryMaxWidths } from '../../styles/theme';
import { ThemeProps } from '../../types/theme';

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-content: center;
	width: 100%;
	margin: 0.5rem 0px 0px 0px;
	padding: 0px;

	@media (max-width: ${mediaQueryMaxWidths.subtab}px) {
		flex-direction: column;
		flex-wrap: nowrap;
	}
	#file {
		display: flex;
		flex-direction: row;
		flex-wrap: none;
		align-items: center;
		justify-content: center;
	}
`;

const Span = styled.span`
	margin-left: 10px;
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize * 0.0419}rem;
`;

export default function SubTab() {
	const scheduleRef = useRef<HTMLButtonElement>(null);
	const mapRef = useRef<HTMLButtonElement>(null);
	const pdfRef = useRef<HTMLButtonElement>(null);
	const [currentSubTab, setCurrentSubTab] = useRecoilState(currentSubTabState);
	const breakpoint = useRecoilValue(breakPointState);
	const [focusSubTab, setFocusSubTab] = useRecoilState(focusSubTabState);

	const keyPress = useCallback<KeyboardEventHandler<HTMLButtonElement>>(() => {
		// const { key } = event;
		// const tabCount = Object.keys(SubTabType).length / 2;
		// if (key === 'ArrowLeft') {
		// 	if (focusSubTab === 0) {
		// 		setFocusSubTab(tabCount - 1);
		// 	} else {
		// 		setFocusSubTab(currentSubTab - 1);
		// 	}
		// }
		// if (key === 'ArrowRight') {
		// 	if (currentSubTab === currentSubTab - 1) {
		// 		setFocusSubTab(0);
		// 	} else {
		// 		setFocusSubTab(currentSubTab + 1);
		// 	}
		// }
	}, []);

	useEffect(() => {
		if (focusSubTab !== null) {
			switch (focusSubTab) {
				case SubTabType.Schedule:
					scheduleRef.current?.focus();
					break;
				case SubTabType.Map:
					mapRef.current?.focus();
					break;
				case SubTabType.Download:
					pdfRef.current?.focus();
					break;
				default:
					assertUnreachable(focusSubTab);
			}
		}
	}, [focusSubTab, setFocusSubTab]);

	const onSubTabClick = useCallback(
		(tab: SubTabType) => {
			setCurrentSubTab(tab);
		},
		[setCurrentSubTab]
	);

	return (
		<ButtonContainer id="tabsContainer" aria-orientation={breakpoint ? 'vertical' : 'horizontal'} role="tablist" aria-label="subtab panel">
			<button ref={scheduleRef} onKeyDown={keyPress} id="content" onClick={() => onSubTabClick(SubTabType.Schedule)} type="button">
				Schedule
			</button>
			<button ref={mapRef} onKeyDown={keyPress} id="image" onClick={() => onSubTabClick(SubTabType.Map)} type="button">
				Map
			</button>
			<button ref={pdfRef} onKeyDown={keyPress} id="file" onClick={() => onSubTabClick(SubTabType.Download)} type="button">
				<Span id="pdfPanel" aria-label="Download Pdf" role="link">
					Pdf
				</Span>
			</button>
		</ButtonContainer>
	);
}

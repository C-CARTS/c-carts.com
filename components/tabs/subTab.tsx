import { KeyboardEventHandler, useCallback, useEffect, useRef } from 'react';
import { MdMap, MdPictureAsPdf, MdSchedule } from 'react-icons/md';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import assertUnreachable from '../../helpers/assertUnreachable';
import { breakPointState } from '../../state/changeProperty';
import { currentSubTabState, focusSubTabState, SubTab as SubTabType } from '../../state/subTabState';
import { tabLabelCountSelector } from '../../state/tabState';
import { ThemeProps } from '../../types/theme';

const PickerWrap = styled.div<{ multiple: boolean; mobile: boolean }>`
	display: flex;
	flex-flow: ${({ mobile }) => (mobile ? 'column nowrap' : 'row nowrap')};
	width: 100%;
	align-items: center;
	justify-content: ${({ multiple }) => (multiple ? 'center' : 'flex-start')};
`;

const radius = '5px';

const Button = styled.button<{ mobile: boolean; hasMultiple: boolean; current: boolean; first: boolean; last: boolean }>`
	-webkit-appearance: none;
	min-width: 12rem;
	padding: 0.25rem 0.75rem;
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize}px;

	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;

	background: ${({ theme, current }) => (current ? theme.colors.primary.tabsBackground : theme.colors.primary.background)};
	color: ${({ theme, current }) => (current ? theme.colors.primary.tabsBackgroundContrast : theme.colors.primary.text)};

	border: 2px solid ${({ theme }) => theme.colors.primary.tabsBackground};

	border-top-left-radius: ${({ first, mobile }) => (first && !mobile ? radius : 0)};
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

	> svg {
		color: ${({ theme, current }) => (current ? theme.colors.primary.tabsBackgroundContrast : theme.colors.primary.text)};
		margin-right: 0.25rem;
		font-size: 1.2rem;
	}
`;

export default function SubTab() {
	const scheduleRef = useRef<HTMLButtonElement>(null);
	const mapRef = useRef<HTMLButtonElement>(null);
	const pdfRef = useRef<HTMLButtonElement>(null);
	const [currentSubTab, setCurrentSubTab] = useRecoilState(currentSubTabState);
	const tabLabelCount = useRecoilValue(tabLabelCountSelector);
	const breakpoint = useRecoilValue(breakPointState);
	const [focusSubTab, setFocusSubTab] = useRecoilState(focusSubTabState);

	const keyPress = useCallback<KeyboardEventHandler<HTMLButtonElement>>(
		({ key }) => {
			const current = focusSubTab ?? currentSubTab;
			if (key === 'ArrowRight') {
				switch (current) {
					case SubTabType.Schedule:
						setFocusSubTab(SubTabType.Map);
						break;
					case SubTabType.Map:
						setFocusSubTab(SubTabType.Download);
						break;
					case SubTabType.Download:
						setFocusSubTab(SubTabType.Schedule);
						break;
					default:
						assertUnreachable(current);
				}
			}
			if (key === 'ArrowLeft') {
				switch (current) {
					case SubTabType.Schedule:
						setFocusSubTab(SubTabType.Download);
						break;
					case SubTabType.Map:
						setFocusSubTab(SubTabType.Schedule);
						break;
					case SubTabType.Download:
						setFocusSubTab(SubTabType.Map);
						break;
					default:
						setFocusSubTab(current);
				}
			}
		},
		[currentSubTab, focusSubTab, setFocusSubTab]
	);

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
		<PickerWrap
			multiple={tabLabelCount > 1}
			mobile={breakpoint}
			id="tabsContainer"
			aria-orientation={breakpoint ? 'vertical' : 'horizontal'}
			role="tablist"
			aria-label="subtab panel"
		>
			<Button
				mobile={breakpoint}
				hasMultiple={tabLabelCount > 1}
				current={currentSubTab === SubTabType.Schedule}
				first
				last={false}
				ref={scheduleRef}
				onKeyDown={keyPress}
				id="content"
				onFocus={() => setFocusSubTab(SubTabType.Schedule)}
				onClick={() => onSubTabClick(SubTabType.Schedule)}
				type="button"
			>
				<MdSchedule />
				<span>Schedule</span>
			</Button>
			<Button
				mobile={breakpoint}
				hasMultiple={tabLabelCount > 1}
				current={currentSubTab === SubTabType.Map}
				first={false}
				last={false}
				ref={mapRef}
				onKeyDown={keyPress}
				id="image"
				onFocus={() => setFocusSubTab(SubTabType.Map)}
				onClick={() => onSubTabClick(SubTabType.Map)}
				type="button"
			>
				<MdMap />
				<span>Map</span>
			</Button>
			<Button
				mobile={breakpoint}
				hasMultiple={tabLabelCount > 1}
				current={currentSubTab === SubTabType.Download}
				first={false}
				last
				ref={pdfRef}
				onKeyDown={keyPress}
				id="file"
				onFocus={() => setFocusSubTab(SubTabType.Download)}
				onClick={() => onSubTabClick(SubTabType.Download)}
				type="button"
			>
				<MdPictureAsPdf />
				<span id="pdfPanel" aria-label="Download Pdf" role="link">
					Pdf
				</span>
			</Button>
		</PickerWrap>
	);
}

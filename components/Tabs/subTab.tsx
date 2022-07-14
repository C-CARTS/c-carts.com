/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Maps } from '@c-carts/cms';
import { useRouter } from 'next/router';
import { KeyboardEventHandler, MouseEventHandler, useCallback, useRef, useState } from 'react';
import { GoDesktopDownload } from 'react-icons/go';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import urlFor from '../../sanity/urlFor';
import { breakPointState } from '../../state/changeProperty';
import subTabAtom, { focusTabState } from '../../state/subTabState';
import { mediaQueryMaxWidths } from '../../styles/theme';
import { ThemeProps } from '../../types/theme';
import getPdfUrl from '../../utils/getPdfUrl';
import MapsTab from './mapTab';
import SubTabButton from './subTabButton';
import Tables from './tables';

interface Prop {
	content: Maps['content'];
	map: Maps['images'];
	pdf: Maps['routePdfs'];
}

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

function SubTab({ content, map, pdf }: Prop) {
	const [subTabAttribute, setSubTabAttribute] = useRecoilState(subTabAtom);
	const breakpoint = useRecoilValue(breakPointState);
	const { code } = content;
	const imageUrl = urlFor(map.asset._ref);
	const url = getPdfUrl(pdf);
	const buttonRef = useRef<HTMLDivElement | null>(null);
	const setFocusTab = useSetRecoilState(focusTabState);
	const [currentId, setId] = useState<string | null>('content');
	const { push } = useRouter();

	const pushUrl = useCallback(
		(link: string) => {
			push(`${link}`);
		},
		[push]
	);

	const keyPress = useCallback<KeyboardEventHandler<HTMLButtonElement>>(
		(event) => {
			const currentContent = event.currentTarget.textContent;
			const { key } = event;
			if (key === 'ArrowLeft') {
				// const changeTab = tabPanel.namedItem(currentFocus?.previousSibling);
				switch (currentContent) {
					case 'Schedule':
						setFocusTab(2);
						break;
					case 'Map':
						setFocusTab(0);
						break;
					case 'Pdf':
						setFocusTab(1);
						break;

					default:
						break;
				}
			}
			if (key === 'ArrowRight') {
				// const changeTab = tabPanel.namedItem(currentFocus?.previousSibling);
				switch (currentContent) {
					case 'Schedule':
						setFocusTab(1);
						break;
					case 'Map':
						setFocusTab(2);
						break;
					case 'Pdf':
						setFocusTab(0);
						break;

					default:
						break;
				}
			}

			return null;
		},
		[setFocusTab]
	);

	const onSubTabClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			if (event.currentTarget !== null) {
				const attribute = event.currentTarget.getAttribute('id');
				setId(attribute);
				if (typeof attribute === 'string') {
					setSubTabAttribute(attribute);
				}
				if (attribute === 'file') {
					pushUrl(url);
				}
			}
		},
		[setSubTabAttribute, setId, url, pushUrl]
	);

	const display = (val: string) => {
		switch (val) {
			case 'image':
				return <MapsTab mapUrl={imageUrl} />;
			default:
				return <Tables code={code} />;
		}
	};

	const subAttribute = subTabAttribute === 'code' || subTabAttribute === null;

	return (
		<>
			<ButtonContainer id="tabsContainer" aria-orientation={breakpoint ? 'vertical' : 'horizontal'} role="tablist" aria-label="subtab panel" ref={buttonRef}>
				<SubTabButton
					index={0}
					currentId={currentId}
					onKeyDown={keyPress}
					ariaControls="tablesPanel"
					id="content"
					onClick={onSubTabClick}
					subAttribute={subAttribute}
				>
					Schedule
				</SubTabButton>
				<SubTabButton
					index={1}
					currentId={currentId}
					onKeyDown={keyPress}
					ariaControls="mapPanel"
					id="image"
					onClick={onSubTabClick}
					subAttribute={subAttribute}
				>
					Map
				</SubTabButton>
				<SubTabButton
					index={2}
					currentId={currentId}
					onKeyDown={keyPress}
					ariaControls="pdfPanel"
					id="file"
					onClick={onSubTabClick}
					subAttribute={subAttribute}
				>
					<GoDesktopDownload aria-hidden />
					<Span id="pdfPanel" aria-label="Download Pdf" role="link">
						Pdf
					</Span>
				</SubTabButton>
			</ButtonContainer>
			{display(subTabAttribute)}
		</>
	);
}

export default SubTab;

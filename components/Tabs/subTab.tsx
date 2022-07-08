/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { GoDesktopDownload } from 'react-icons/go';
import { KeyboardEventHandler, MouseEventHandler, useCallback, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Maps } from '@c-carts/cms';
import { useRouter } from 'next/router';
import urlFor from '../../sanity/urlFor';
import subTabAtom from '../../state/subTabState';
import { ThemeProps } from '../../types/theme';
import MapsTab from './mapTab';
import Tables from './tables';
import getPdfUrl from '../../utils/getPdfUrl';
import { breakPointState } from '../../state/changeProperty';

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

	@media (max-width: 580px) {
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

const ActiveButton = styled.button`
	background-color: ${({ theme }: ThemeProps) => theme.colors.primary.subtle};
	border: none;
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize * 0.0419}rem;
	width: ${({ theme }: ThemeProps) => theme.widths.twoByTwelve}%;
	margin-right: 0.6rem;

	padding: 5px;
	&:last-child {
		border-right: none;
	}

	&:hover {
		border-bottom: 0.18rem solid ${({ theme }: ThemeProps) => theme.colors.link.color};
		color: #000000;
	}

	&:focus,
	&:active,
	&:focus-visible {
		border-bottom: 0.2rem solid ${({ theme }: ThemeProps) => theme.colors.link.underline};
	}

	@media (max-width: 580px) {
		width: 100%;
		margin-bottom: 0.65rem;
	}
`;

const Span = styled.span`
	margin-left: 10px;
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize * 0.0419}rem;
`;

const FirstButton = styled(ActiveButton)`
	&:first-child {
		border-bottom: 0.2rem solid ${({ theme }: ThemeProps) => theme.colors.link.underline};
	}
`;

function SubTab({ content, map, pdf }: Prop) {
	const [subTabAttribute, setSubTabAttribute] = useRecoilState(subTabAtom);
	const breakpoint = useRecoilValue(breakPointState);
	const { code } = content;
	const imageUrl = urlFor(map.asset._ref);
	const url = getPdfUrl(pdf);
	const buttonRef = useRef<HTMLDivElement | null>(null);
	const [currentId, setId] = useState<string | null>('content');
	const { push } = useRouter();

	const pushUrl = useCallback(
		(link: string) => {
			push(`${link}`);
		},
		[push]
	);

	const keyPress = useCallback<KeyboardEventHandler<HTMLButtonElement>>((event) => {
		const tabPanel = document.getElementsByClassName('tabs-btn');
		const currentContent = event.currentTarget.textContent;
		const { key } = event;
		if (key === 'ArrowLeft') {
			// const changeTab = tabPanel.namedItem(currentFocus?.previousSibling);
			switch (currentContent) {
				case 'Schedule':
					const schd = tabPanel[0].textContent;
					if (schd === currentContent) {
						document.getElementById(tabPanel[2].id)?.focus();
					}
					break;
				case 'Map':
					const mapTxt = tabPanel[1].textContent;
					if (mapTxt === currentContent) {
						document.getElementById(tabPanel[0].id)?.focus();
					}
					break;
				case 'Pdf':
					const pdfTxt = tabPanel[2].textContent;
					if (pdfTxt === currentContent) {
						document.getElementById(tabPanel[1].id)?.focus();
					}
					break;

				default:
					break;
			}
		}
		if (key === 'ArrowRight') {
			// const changeTab = tabPanel.namedItem(currentFocus?.previousSibling);
			switch (currentContent) {
				case 'Schedule':
					const schd = tabPanel[0].textContent;
					if (schd === currentContent) {
						document.getElementById(tabPanel[1].id)?.focus();
					}
					break;
				case 'Map':
					const mapTxt = tabPanel[1].textContent;
					if (mapTxt === currentContent) {
						document.getElementById(tabPanel[2].id)?.focus();
					}
					break;
				case 'Pdf':
					const pdfTxt = tabPanel[2].textContent;
					if (pdfTxt === currentContent) {
						document.getElementById(tabPanel[0].id)?.focus();
					}
					break;

				default:
					break;
			}
		}

		return null;
	}, []);

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

	const Button = subTabAttribute === 'code' || subTabAttribute === '' ? FirstButton : ActiveButton;
	return (
		<>
			<ButtonContainer id="tabsContainer" aria-orientation={breakpoint ? 'vertical' : 'horizontal'} role="tablist" aria-label="subtab panel" ref={buttonRef}>
				<Button
					className="tabs-btn"
					onKeyDown={keyPress}
					role="tab"
					aria-controls="tablesPanel"
					aria-selected={currentId === 'content'}
					id="content"
					onClick={onSubTabClick}
				>
					Schedule
				</Button>
				<Button
					className="tabs-btn"
					onKeyDown={keyPress}
					role="tab"
					aria-controls="mapPanel"
					aria-selected={currentId === 'image'}
					id="image"
					onClick={onSubTabClick}
				>
					Map
				</Button>
				<Button
					className="tabs-btn"
					onKeyDown={keyPress}
					role="tab"
					aria-controls="pdfPanel"
					aria-selected={currentId === 'file'}
					id="file"
					onClick={onSubTabClick}
				>
					<GoDesktopDownload aria-hidden />
					<Span id="pdfPanel" aria-label="Download Pdf" role="link">
						Pdf
					</Span>
				</Button>
			</ButtonContainer>
			{display(subTabAttribute)}
		</>
	);
}

export default SubTab;

/* eslint-disable jsx-a11y/anchor-is-valid */
import { GoDesktopDownload } from 'react-icons/go';
import { MouseEventHandler, useCallback, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Maps } from '@c-carts/cms';
import { useRouter } from 'next/router';
import urlFor from '../../sanity/urlFor';
import subTabAtom from '../../state/subTabState';
import { ThemeProps } from '../../types/theme';
import MapsTab from './mapTab';
import Tables from './tables';
import getPdfUrl from '../../utils/getPdfUrl';

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
			<ButtonContainer role="tablist" aria-label="subtab panel" ref={buttonRef}>
				<Button role="tab" aria-controls={content._type} aria-selected={currentId === 'content'} id="content" onClick={onSubTabClick}>
					Schedule
				</Button>
				<Button role="tab" aria-controls={map._type} aria-selected={currentId === 'image'} id="image" onClick={onSubTabClick}>
					Map
				</Button>
				<Button role="tab" aria-controls={pdf._type} aria-selected={currentId === 'file'} id="file" onClick={onSubTabClick}>
					<GoDesktopDownload aria-hidden />
					<Span aria-label="Download Pdf">Pdf</Span>
				</Button>
			</ButtonContainer>
			{display(subTabAttribute)}
		</>
	);
}

export default SubTab;
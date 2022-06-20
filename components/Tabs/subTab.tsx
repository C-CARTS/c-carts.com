/* eslint-disable jsx-a11y/anchor-is-valid */
import { MouseEventHandler, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { Maps } from '@c-carts/cms';
import urlFor from '../../sanity/urlFor';
import subTabAtom from '../../state/subTabState';
import { ThemeProps } from '../../types/theme';
import MapsTab from './mapTab';
import Tables from './tables';
import PdfTab from './pdfTab';
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
	}
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
	const onSubTabClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			if (event.currentTarget !== null) {
				const attribute = event.currentTarget.getAttribute('id');
				if (typeof attribute === 'string') {
					setSubTabAttribute(attribute);
				}
			}
		},
		[setSubTabAttribute]
	);
	const display = (val: string) => {
		switch (val) {
			case 'file':
				return <PdfTab pdfUrl={url} />;
			case 'image':
				return <MapsTab mapUrl={imageUrl} />;
			default:
				return <Tables code={code} />;
		}
	};

	const Button = subTabAttribute === 'code' || subTabAttribute === '' ? FirstButton : ActiveButton;
	return (
		<>
			<ButtonContainer role="tablist" aria-label="subtab panel">
				<Button role="tab" aria-controls={content._type} aria-selected={content._type === subTabAttribute} id={content._type} onClick={(e) => onSubTabClick(e)}>
					ScheduleTab
				</Button>
				<Button role="tab" aria-controls={map._type} aria-selected={map._type === subTabAttribute} id={map._type} onClick={(e) => onSubTabClick(e)}>
					MapTab
				</Button>
				<Button role="tab" aria-controls={pdf._type} aria-selected={pdf._type === subTabAttribute} id={pdf._type} onClick={(e) => onSubTabClick(e)}>
					PdfTab
				</Button>
			</ButtonContainer>
			{display(subTabAttribute)}
		</>
	);
}

export default SubTab;

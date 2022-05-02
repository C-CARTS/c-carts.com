/* eslint-disable jsx-a11y/anchor-is-valid */
// import Link from 'next/link';
// import { withRouter } from 'next/router';
// import { ButtonHTMLAttributes, useCallback, useEffect, useMemo, useState } from 'react';
// import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
// import { activeIndexAtom, labelArrayAtom, mapTabstate, pdfTabState, scheduleTabstate } from '../../state/subTabState';
import { ThemeProps } from '../../types/theme';
// import MapsTab from './mapTab';
// import PdfTab from './pdfTab';
// import Tables from './tables';

interface Prop {
	code: any;
	url: string;
	pdfUrl: string;
	tabActive: string;
}

interface Label {
	subHeading: string;
}

const Button = styled.button.attrs(({ subHeading }: Label) => ({
	lbl: subHeading
}))`
	background: none;
	border: none;
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize * 0.04}rem;
	border-bottom: 2px;
	border-bottom-color: #cccce0;
	border-bottom-style: solid;
	&:hover {
		border-bottom-color: #51c6d0;
	}
`;

function SubTab({ code, url, pdfUrl, tabActive }: Prop) {
	// const [currentIndex, setCurrentIndex] = useRecoilState(activeIndexAtom);
	// const setLabelArray = useSetRecoilState(labelArrayAtom);

	return (
		<div>
			<p>
				{code}
				{url}
				{pdfUrl}
				{tabActive}
			</p>

			<Button lbl="schedule">ScheduleTab</Button>
			<Button lbl="map">MapTab</Button>
			<Button lbl="pdf">PdfTab</Button>
		</div>
	);
}

export default SubTab;

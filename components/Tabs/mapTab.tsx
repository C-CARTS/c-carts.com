/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { ThemeProps } from '../../types/theme';

interface Prop {
	mapUrl: string;
}

const Button = styled.button`
	background: none;
	border: none;
	font-size: ${({ theme }: ThemeProps) => theme.typography.baseFontSize * 0.09}rem;
	border-bottom: 2px;
	border-bottom-color: #cccce0;
	border-bottom-style: solid;
	&:hover {
		border-bottom-color: #51c6d0;
	}
`;

const DisplayMap = styled.div`
	width: 100%;
	height: max-content;
	img {
		width: 100%;
		max-width: max-content;
	}
`;

export default function MapsTab({ mapUrl }: Prop) {
	const [show, setDisplay] = useState(false);
	const ref = useRef(show);
	const clickEvent = () => {
		setDisplay(!ref.current);
	};
	ref.current = show;

	return (
		<>
			<Button onClick={clickEvent}>Map</Button>
			<DisplayMap style={show ? { display: 'block' } : { display: 'none' }}>
				<img src={mapUrl} alt="Display Route Maps" />
			</DisplayMap>
		</>
	);
}

/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */

import styled from 'styled-components';

interface Prop {
	mapUrl: string;
}

const DisplayMap = styled.div`
	width: 100%;
	height: max-content;
	img {
		width: 100%;
		max-width: max-content;
	}
`;

export default function MapsTab({ mapUrl }: Prop) {
	return (
		<DisplayMap>
			<img src={mapUrl} alt="Display Route Maps" />
		</DisplayMap>
	);
}

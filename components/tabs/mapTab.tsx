/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */

import styled from 'styled-components';

interface Prop {
	mapUrl: string | null;
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
	if (!mapUrl || mapUrl.length === 0) {
		return <div>Unable to load image, image url null or incorrect</div>;
	}
	return (
		<DisplayMap id="mapPanel" aria-labelledby="image" tabIndex={0} role="tabpanel">
			<img src={mapUrl} alt="Display Route Maps" />
		</DisplayMap>
	);
}

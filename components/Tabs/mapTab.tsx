/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { ImageUrlBuilder } from 'next-sanity-image';
import styled from 'styled-components';

interface Prop {
	mapUrl: ImageUrlBuilder;
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
	const url: string | null = mapUrl.toString();
	if (url === null) {
		return <div>Image is either incorrect or null</div>;
	}
	return (
		<DisplayMap aria-labelledby="image" tabIndex={0}>
			<img src={url} alt="Display Route Maps" />
		</DisplayMap>
	);
}

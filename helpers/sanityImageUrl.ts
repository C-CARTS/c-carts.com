import { SanityImageAsset, SanityImageCrop, SanityImageHotspot, SanityReference } from 'sanity-codegen';

const projectId = process.env.NEXT_PUBLIC_SANITY_ID ?? '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? '';

interface Image {
	_type: 'image';
	asset: SanityReference<SanityImageAsset>;
	crop?: SanityImageCrop;
	hotspot?: SanityImageHotspot;
}

export interface SanityImageUrlParams {
	image: Image;
	width: number;
	height: number;
	deviceScale: number;
}

export function sanityImageUrl({
	image: {
		asset: { _ref: imageName },
		hotspot
	},
	width,
	height,
	deviceScale
}: SanityImageUrlParams): string {
	const params = new URLSearchParams();

	params.append('auto', 'format');
	params.append('fit', 'crop');
	params.append('dpr', deviceScale.toString());
	params.append('h', height.toString());
	params.append('w', width.toString());

	if (hotspot) {
		const { x, y } = hotspot;
		params.append('crop', 'focalpoint');
		params.append('fp-x', x.toString());
		params.append('fp-y', y.toString());
	} else {
		params.append('crop', 'entropy');
	}

	return `https://cdn.sanity.io/images/${projectId}/${dataset}/${imageName}?${params.toString()}`;
}

interface ScaledResults {
	url: string;
	scale: number;
}

export default function sanityImageSet(params: Omit<SanityImageUrlParams, 'deviceScale'>): ScaledResults[] {
	return [
		{
			url: sanityImageUrl({ ...params, deviceScale: 1 }),
			scale: 1
		},
		{
			url: sanityImageUrl({ ...params, deviceScale: 1.5 }),
			scale: 1.5
		},
		{
			url: sanityImageUrl({ ...params, deviceScale: 2 }),
			scale: 2
		},
		{
			url: sanityImageUrl({ ...params, deviceScale: 3 }),
			scale: 3
		}
	];
}

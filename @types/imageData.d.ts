import type { SanityDocument } from "sanity";

export type SanityImagePaletteSwatch = {
	background: string;
	_type: "sanity.imagePaletteSwatch";
	foreground: string;
	title: string;
	population: number;
};

export type SanityImagePalette = {
	darkVibrant: SanityImagePaletteSwatch;
	lightMuted: SanityImagePaletteSwatch;
	vibrant: SanityImagePaletteSwatch;
	dominant: SanityImagePaletteSwatch;
	_type: "sanity.imagePalette";
	darkMuted: SanityImagePaletteSwatch;
	muted: SanityImagePaletteSwatch;
	lightVibrant: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
	height: number;
	_type: "sanity.imageDimensions";
	width: number;
	aspectRatio: number;
};

export type SanityImageMetadata = {
	dimensions: SanityImageDimensions;
	isOpaque: boolean;
	blurHash: string;
	_type: "sanity.imageMetadata";
	palette: SanityImagePalette;
	hasAlpha: boolean;
	lqip: string;
};

type ImageData = SanityDocument & {
	extension: "jpg" | "png" | "gif" | "webp" | "svg" | "jpeg";
	sha1hash: string;
	metadata: SanityImageMetadata;
	assetId: string;
	_type: "sanity.imageAsset";
	originalFilename: string;
	size: number;
	url: string;
};

export default ImageData;

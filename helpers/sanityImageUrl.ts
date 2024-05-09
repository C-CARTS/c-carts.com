import type ImageData from "../@types/imageData";
import type ImageWithAlt from "../@types/imageWithAlt";
import throwError from "./throwError";

const projectId =
	process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? throwError("No Sanity ID");
const dataset =
	process.env.NEXT_PUBLIC_SANITY_DATASET ?? throwError("No Sanity dataset");

export interface SanityImageUrlParams {
	image: ImageWithAlt;
	width: number;
	height: number;
	deviceScale: number;
}

function getImageNameFromRef(ref: string): string {
	const split = ref.split("-");
	return `${split[1]}-${split[2]}.${split[3]}`;
}

export function buildUrl(
	url: string,
	width: number,
	height: number,
	deviceScale: number,
): string {
	const params = new URLSearchParams();

	params.append("auto", "format");
	params.append("fit", "crop");
	params.append("dpr", deviceScale.toString());
	params.append("h", height.toString());
	params.append("w", width.toString());
	params.append("crop", "entropy");

	return `${url}?${params.toString()}`;
}

export function sanityImageUrl({
	image: { asset },
	width,
	height,
	deviceScale,
}: SanityImageUrlParams): string {
	const ref = asset?._ref;
	if (!ref) {
		return "";
	}

	const imageName = getImageNameFromRef(ref);
	return buildUrl(imageName, width, height, deviceScale);
}

interface ScaledResults {
	url: string;
	width: number;
	height: number;
	pixelRatio: number;
}

export async function sanityImageSourceSet({
	originalFilename,
	metadata: {
		dimensions: { width: originalWidth, aspectRatio, height: originalHeight },
	},
}: ImageData): Promise<ScaledResults[]> {
	const widths = [1500, 1000, 750, 500, 300];
	const deviceScales = [1, 2, 3];

	const results: ScaledResults[] = [];
	for (const width of widths) {
		for (const deviceScale of deviceScales) {
			const height = Math.round(width / aspectRatio);
			const url = buildUrl(originalFilename, width, height, deviceScale);

			results.push({ url, width, height, pixelRatio: deviceScale });
		}
	}

	return results;
}

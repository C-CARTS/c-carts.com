import "server-only";
import ImageWithAlt from "../../@types/imageWithAlt";
import { getImage } from "../../api";
import buildUrl from "../../helpers/sanityImageUrl";
import throwError from "../../helpers/throwError";
import SanityImage from "./sanityImage";

const MAX_IMAGE_SIZE = parseInt(
	process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE ??
		throwError("Missing environment variable: NEXT_PUBLIC_MAX_IMAGE_SIZE"),
);

interface Props {
	value: ImageWithAlt;
}

/*

Generates an image with alt text
Passes it to the SanityImage component to be rendered by Next/Image

*/

export default async function Table({ value }: Props) {
	const { alt, decorative, asset } = value;
	const altText = decorative ? "" : alt;

	// Get the detailed image data from the sanity server.
	const image = await getImage(
		asset?._ref ?? throwError("asset._ref is missing"),
	);

	// this should never happen
	if (!image) {
		throwError("Image not found");
	}

	const {
		url,
		metadata: {
			lqip, // low quality image placeholder
			dimensions: { width: originalWidth, aspectRatio },
		},
	} = image;

	// make sure our max width isn't bigger than the image
	const width = Math.min(originalWidth, MAX_IMAGE_SIZE);

	// calculate a fixed height based on the aspect ratio
	const height = Math.round(width / aspectRatio);

	// build the image url. We'll build it at 3x max size and next/image will scale it down as needed
	const src = buildUrl(url, width, height, 3);

	return (
		<SanityImage
			src={src}
			alt={altText}
			width={width}
			height={height}
			blurDataURL={lqip}
		/>
	);
}

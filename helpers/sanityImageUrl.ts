import imageUrlBuilder from "@sanity/image-url";
import "server-only";
import { client } from "../sanity/lib/client";

export default function buildUrl(
	url: string,
	width: number,
	height: number,
	deviceScale: number,
	quality: number = 75,
): string {
	const builder = imageUrlBuilder(client);
	return builder
		.image(url)
		.width(width)
		.height(height)
		.dpr(deviceScale)
		.crop("focalpoint")
		.quality(quality)
		.url();
}

"use client";

import Image from "next/image";
import throwError from "../../../helpers/throwError";
import styles from "./sanityImage.module.css";

interface Props {
	src: string;
	alt: string;
	width: number;
	height: number;
	blurDataURL: string;
}

const MAX_IMAGE_SIZE = parseInt(
	process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE ??
		throwError("Missing environment variable: NEXT_PUBLIC_MAX_IMAGE_SIZE"),
);

/*

This component is a wrapper for <next />
It is called by the ImageWithAlt component in the sanityBlock folder

sizes should render the image at 100% width up to MAX_IMAGE_SIZE
It should be rendered at MAX_IMAGE_SIZE if the screen is larger than MAX_IMAGE_SIZE

Image will scale to fit the full screen width.

Since we don't include a loader, this will use next's built in loader and generate appropriate sizes for the image to serve from the server.

*/

export default function SanityImage({
	src,
	alt,
	width,
	height,
	blurDataURL,
}: Props) {
	return (
		<Image
			src={src}
			alt={alt}
			width={width}
			height={height}
			placeholder="blur"
			blurDataURL={`data:image/jpeg${blurDataURL}`}
			className={styles.imgWrap}
			sizes={`(max-width: ${MAX_IMAGE_SIZE}px) 100vw, ${MAX_IMAGE_SIZE}px`}
			quality={70}
		/>
	);
}

import Image from "next/image";
import "server-only";
import type { FixedRoute } from "@c-carts/types";
import { getImage } from "../../../api";
import { globalEnv } from "../../../env/global";
import buildUrl from "../../../helpers/sanityImageUrl";
import styles from "./map.module.css";

const MAX_IMAGE_SIZE = globalEnv.NEXT_PUBLIC_MAX_IMAGE_SIZE;

interface Props {
	image: FixedRoute["image"];
}

export default async function RouteMap({ image }: Props) {
	const ref = image.asset?._ref;
	if (!ref) throw new Error("Fixed route map has no image asset");
	const {
		url,
		metadata: {
			lqip,
			dimensions: { width: originalWidth, aspectRatio },
		},
	} = await getImage(ref);

	const width = Math.round(Math.min(MAX_IMAGE_SIZE, originalWidth));
	const height = Math.round(width / aspectRatio);
	const src = buildUrl(url, width, height, 3);

	return (
		<Image
			src={src}
			blurDataURL={lqip}
			width={width}
			height={height}
			placeholder={lqip ? "blur" : "empty"}
			alt="Route map with time points labeled as letters."
			className={styles.map}
			sizes={`(max-width: ${MAX_IMAGE_SIZE}px) 100vw, ${MAX_IMAGE_SIZE}px`}
		/>
	);
}

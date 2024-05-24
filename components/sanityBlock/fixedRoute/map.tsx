import Image from "next/image";
import "server-only";
import { getImage } from "../../../helpers/api";
import buildUrl from "../../../helpers/sanityImageUrl";
import throwError from "../../../helpers/throwError";
import styles from "./map.module.css";

const MAX_IMAGE_SIZE = parseInt(
	process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE ??
		throwError("Missing environment variable: NEXT_PUBLIC_MAX_IMAGE_SIZE"),
);

interface Props {
	image: {
		_type: "image";
		asset: {
			_ref: string;
			_type: "reference";
		};
	};
}

export default async function Map({
	image: {
		asset: { _ref: ref },
	},
}: Props) {
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
			blurDataURL={`data:image/jpeg${lqip}`}
			width={width}
			height={height}
			placeholder="blur"
			alt="Route map with time points labeled as letters."
			className={styles.map}
			sizes={`(max-width: ${MAX_IMAGE_SIZE}px) 100vw, ${MAX_IMAGE_SIZE}px`}
		/>
	);
}

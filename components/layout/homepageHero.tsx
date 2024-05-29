import Image from "next/image";
import "server-only";
import { getImage, getSiteConfig } from "../../api";
import buildUrl from "../../helpers/sanityImageUrl";
import styles from "./homepageHero.module.css";

export default async function HomepageHero() {
	const {
		bannerImage: { asset },
	} = await getSiteConfig();
	const image = await getImage(asset?._ref ?? "");

	const {
		url,
		metadata: {
			lqip, // low quality image placeholder
			dimensions: { width, height },
		},
	} = image;

	// build the image url. We'll build it at 3x max size and next/image will scale it down as needed
	const src = buildUrl(url, width, height, 1, 60);

	return (
		<div className={styles.imgWrap}>
			<Image
				src={src}
				placeholder="blur"
				priority
				blurDataURL={lqip}
				alt=""
				sizes="100vw"
				fill
				style={{ objectFit: "cover", objectPosition: "center" }}
			/>
		</div>
	);
}

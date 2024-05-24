import "server-only";
import { getImage, getSiteConfig } from "../../api";
import buildUrl from "../../helpers/sanityImageUrl";
import styles from "./homepageHero.module.css";
import HomepageHeroImage from "./homepageHeroImage";

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
	const src = buildUrl(url, width, height, 1);

	return (
		<div className={styles.imgWrap}>
			<HomepageHeroImage src={src} blurDataURL={lqip} />
		</div>
	);
}

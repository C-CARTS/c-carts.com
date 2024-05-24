import Image from "next/image";
import "server-only";
import { getImage, getSiteConfig } from "../api";
import buildUrl from "../helpers/sanityImageUrl";
import throwError from "../helpers/throwError";
import styles from "./footer.module.css";

export default async function Footer() {
	const {
		title,
		address,
		phone,
		brandLogo: { asset: logo },
	} = await getSiteConfig();
	const {
		url,
		metadata: {
			dimensions: { aspectRatio },
		},
	} = await getImage(logo?._ref ?? throwError("No logo"));
	const width = 400;
	const height = Math.round(400 / aspectRatio);
	const src = buildUrl(url, width, height, 3);

	return (
		<footer className={styles.footer}>
			<div className={styles.footerContent}>
				<div className={styles.contact}>
					<p className={styles.address}>
						<strong>{title}</strong>
						{address.split("\n").map((line) => (
							<span key={`${line}`}>
								{line}
								<br />
							</span>
						))}
					</p>
					<p className={styles.phone}>
						<a href={`tel:${phone}`}>{phone}</a>
					</p>
				</div>
				<div className={styles.logo}>
					<Image
						src={src}
						alt={`${title} logo`}
						width={width}
						height={height}
						placeholder="empty"
						className={styles.img}
						sizes={`(max-width: ${width}px) 100vw, ${width}px`}
						quality={70}
					/>
				</div>
			</div>
		</footer>
	);
}

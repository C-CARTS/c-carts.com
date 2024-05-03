import type { Metadata } from "next";
import { ReactNode } from "react";
import { getSiteConfig } from "../../helpers/api";
import "./global.css";
import HeaderContent from "./headerContent";
import styles from "./layout.module.css";
import SkipLink from "./skipLink";

export async function generateMetadata(): Promise<Metadata> {
	const config = await getSiteConfig();
	const { shortTitle, title } = config;

	const metadata: Metadata = {
		title: shortTitle,
		description: title,
	};

	return metadata;
}

export default async function RootLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	const config = await getSiteConfig();
	const { lang, bannerImage } = config;

	return (
		<html lang={lang}>
			<body>
				<div className={styles.contentWrap}>
					<SkipLink />
					<HeaderContent bannerImage={bannerImage} />
					<div className={styles.mainWrap}>
						<main id="main-content" className={styles.main}>
							{children}
						</main>
					</div>
				</div>
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import { ReactNode } from "react";
import "server-only";
import Footer from "../../components/footer";
import SkipLink from "../../components/skipLink";
import { getSiteConfig } from "../../helpers/api";
import "./global.css";
import styles from "./layout.module.css";

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
	const { lang } = config;

	return (
		<html lang={lang}>
			<body>
				<div className={styles.contentWrap}>
					<SkipLink />
					{children}
					<Footer />
				</div>
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import Head from "next/head";
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
		themeColor: "#3feee6",
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
			<Head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/images/icon-180.png"
				/>
			</Head>
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

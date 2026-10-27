import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "server-only";
import { getSiteConfig } from "../../api";
import Footer from "../../components/footer";
import SkipLink from "../../components/skipLink";
import "./global.css";
import styles from "./layout.module.css";

export async function generateMetadata(): Promise<Metadata> {
	const config = await getSiteConfig();
	const { shortTitle, title } = config;

	const metadata: Metadata = {
		title: shortTitle,
		description: title,
		openGraph: {
			siteName: shortTitle,
		},
		icons: { apple: [{ url: "/images/icon-180.png", sizes: "180x180" }] },
	};

	return metadata;
}

export const viewport: Viewport = { themeColor: "#3feee6" };

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	const config = await getSiteConfig();
	const { lang } = config;

	return (
		<html lang={lang} data-scroll-behavior="smooth">
			<body>
				<div className={styles.contentWrap}>
					<SkipLink />
					{children}
					<Footer />
				</div>
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}

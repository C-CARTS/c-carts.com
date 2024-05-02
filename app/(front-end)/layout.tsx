import type { Metadata } from "next";
import { ReactNode } from "react";
import SiteConfig from "../../@types/siteConfig";
import { client } from "../../sanity/lib/client";
import "./global.css";
import classes from "./layout.module.css";
import SkipLink from "./skipLink";

async function getConfig() {
	const query = `*[ _id == 'siteConfig' && _type == 'siteConfig' ][0]`;
	const config = await client.fetch<SiteConfig>(query);
	return config;
}

export async function generateMetadata(): Promise<Metadata> {
	const config = await getConfig();
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
	const config = await getConfig();
	const { shortTitle, lang } = config;

	return (
		<html lang={lang}>
			<body>
				<SkipLink />
				<div className="classes.contentWrap">
					<header className={classes.contentBlock}>
						<h1>{shortTitle}</h1>
					</header>
					.
					<main id="main-content" className={classes.mainContent}>
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}

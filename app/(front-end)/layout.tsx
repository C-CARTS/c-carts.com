import type { Metadata } from "next";
import { ReactNode } from "react";
import { getSiteConfig } from "../../helpers/api";
import MainMenu from "./(nav)/mainMenu";
import "./global.css";
import classes from "./layout.module.css";
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
	const { lang } = config;

	return (
		<html lang={lang}>
			<body>
				<SkipLink />
				<div className="classes.contentWrap">
					<MainMenu />
					<main id="main-content" className={classes.mainContent}>
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}

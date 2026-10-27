import Link from "next/link";
import "server-only";
import { getSiteConfig } from "../../api";
import styles from "./mainMenu.module.css";
import MainNav from "./mainNav";

export default async function MainMenu() {
	const config = await getSiteConfig();
	const { shortTitle } = config;
	return (
		<header className={styles.header}>
			<div className={styles.outerWrap}>
				<div className={styles.innerWrap}>
					<Link href="/" className={styles.logoLink}>
						{shortTitle}
					</Link>
					<MainNav />
				</div>
			</div>
		</header>
	);
}

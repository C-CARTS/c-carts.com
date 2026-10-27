import clsx from "clsx";
import type { ReactNode } from "react";
import MainMenu from "../nav/mainMenu";
import HomepageHero from "./homepageHero";
import styles from "./standardLayout.module.css";

interface Props {
	isHomepage?: boolean;
	children: ReactNode;
}

export default function StandardLayout({ isHomepage = false, children }: Props) {
	const wrapper = clsx({
		[styles.homepageWrapper]: isHomepage,
		[styles.wrapper]: true,
	});

	return (
		<>
			<div className={wrapper}>
				<div className={styles.menuWrapper}>
					<MainMenu />
					{isHomepage && <HomepageHero />}
				</div>
			</div>
			<div className={styles.mainWrap}>
				<main id="main-content" className={styles.main}>
					{children}
				</main>
			</div>
		</>
	);
}

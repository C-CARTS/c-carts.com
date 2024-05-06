"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import ImageWithAlt from "../../@types/imageWithAlt";
import MainMenu from "./(nav)/mainMenu";
import styles from "./headerContent.module.css";
import HomePageHero from "./homepageHero";

interface Props {
	bannerImage: ImageWithAlt;
}

export default function HeaderContent({ bannerImage }: Props) {
	const pathname = usePathname();
	const isHomePage = useMemo(() => pathname === "/", [pathname]);

	const wrapperClass = clsx({
		[styles.wrapper]: true,
		[styles.homepageWrapper]: isHomePage,
	});

	return (
		<>
			{isHomePage && <HomePageHero bannerImage={bannerImage} />}
			<div className={wrapperClass}>
				<div className={styles.menuWrapper}>
					<MainMenu />
				</div>
			</div>
		</>
	);
}

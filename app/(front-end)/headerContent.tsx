"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import ImageWithAlt from "../../@types/imageWithAlt";
import { sanityImageUrl } from "../../helpers/sanityImageUrl";
import MainMenu from "./(nav)/mainMenu";
import styles from "./headerContent.module.css";

type RootElement = Element & {
	style: {
		setProperty: (_name: string, _value: string) => void;
	};
};

interface Props {
	bannerImage: ImageWithAlt;
}

export default function HeaderContent({ bannerImage }: Props) {
	const pathname = usePathname();
	const isHomePage = useMemo(() => pathname === "/", [pathname]);

	useEffect(() => {
		if (isHomePage) {
			const r = document.querySelector<RootElement>(":root");
			if (r) {
				const url = sanityImageUrl({
					image: bannerImage,
					width: 2500,
					height: 450,
					deviceScale: 1.5,
				});
				const prop = `url('${url}')`;
				console.log("url", prop);

				r.style.setProperty("--hero-bg", prop);
			}
		}
	}, [bannerImage, isHomePage]);

	const wrapperClass = clsx({
		[styles.wrapper]: true,
		[styles.homepageWrapper]: isHomePage,
	});

	return (
		<div className={wrapperClass}>
			<div className={styles.menuWrapper}>
				<MainMenu />
			</div>
		</div>
	);
}

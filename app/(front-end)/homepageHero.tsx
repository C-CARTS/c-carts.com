"use client";

import { useEffect, useMemo } from "react";
import { useWindowSize } from "usehooks-ts";
import ImageWithAlt from "../../@types/imageWithAlt";
import { sanityImageUrl } from "../../helpers/sanityImageUrl";
import { useDevicePixelRatio } from "../../hooks/useDevicePixelRatio";

type RootElement = Element & {
	style: {
		setProperty: (_name: string, _value: string) => void;
	};
};

function setHeroOptions(url: string) {
	const r = document.querySelector<RootElement>(":root");
	if (r) {
		r.style.setProperty("--hero-bg", url);
	}
}

interface Props {
	bannerImage: ImageWithAlt;
}

export default function HomePageHero({ bannerImage }: Props) {
	const { width: windowWidth } = useWindowSize({
		debounceDelay: 100,
	});
	const deviceScale = useDevicePixelRatio();

	useEffect(() => {
		console.log("info", {
			bannerImage,
			windowWidth,
			deviceScale,
		});
	});

	const imageUrl = useMemo(() => {
		let width = 2500;
		let height = 450;

		if (!bannerImage) {
			return "none";
		}

		if (windowWidth <= 768) {
			width = 768;
			height = 550;
		} else if (windowWidth <= 900) {
			width = 900;
			height = 550;
		} else if (windowWidth <= 1920) {
			width = 1920;
			height = 400;
		}

		const url = sanityImageUrl({
			image: bannerImage,
			width,
			height,
			deviceScale,
		});

		return `url('${url}')`;
	}, [bannerImage, windowWidth, deviceScale]);

	useEffect(() => {
		console.log("imageUrl", imageUrl);
		if (imageUrl) {
			setHeroOptions(imageUrl);
		}
	}, [imageUrl]);

	return null;
}

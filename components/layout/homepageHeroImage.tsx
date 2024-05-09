"use client";

import Image from "next/image";

interface Props {
	src: string;
	width: number;
	height: number;
	blurDataURL: string;
}

export default function HomepageHeroImage({
	src,
	width,
	height,
	blurDataURL,
}: Props) {
	return (
		<Image
			src={src}
			placeholder="blur"
			priority
			blurDataURL={blurDataURL}
			alt=""
			sizes="100vw"
			quality={60}
			fill
			objectFit="cover"
		/>
	);
}

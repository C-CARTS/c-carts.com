"use client";

import Image from "next/image";

interface Props {
	src: string;
	blurDataURL: string;
}

export default function HomepageHeroImage({ src, blurDataURL }: Props) {
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

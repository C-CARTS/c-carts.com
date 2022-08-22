/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-props-no-spreading */

import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';
import useSiteConfig from '../../data-hooks/useSiteConfig';
import { basicClient } from '../../sanity/sanityClient';

export default function ImageOptimized() {
	const { bannerImage } = useSiteConfig(); // Image from CDN
	const { hotspot } = bannerImage;

	const imageProps = useNextSanityImage(basicClient, bannerImage);

	const attributes: { [key: string]: string } = {};
	if (hotspot?.x && hotspot?.y) {
		const { x, y } = hotspot;
		attributes.objectPosition = `${x * 100}% ${y * 100}%`;
	}
	return <Image {...imageProps} {...attributes} layout="fixed" loading="eager" width={600} height={200} />;
}

ImageOptimized.dataHooks = useSiteConfig;

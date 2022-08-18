/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-props-no-spreading */

import { ImageUrlBuilder, useNextSanityImage, UseNextSanityImageBuilderOptions } from 'next-sanity-image';
import Image from 'next/image';
import { useCallback, useRef } from 'react';
import useSiteConfig from '../data-hooks/useSiteConfig';
import { imageConfig } from '../sanity/sanityConfig';

export default function ImageOptimized() {
	const propsRef = useRef<any>(0);
	const { bannerImage } = useSiteConfig(); // Image from CDN
	// Custom Image - cropping, focal point set etc
	useCallback(() => {
		const customImageBuilder = (imageUrlbuilder: ImageUrlBuilder, options: UseNextSanityImageBuilderOptions) => {
			return imageUrlbuilder
				.focalPoint(0.2, 0.2)
				.crop('focalpoint')
				.blur(options.quality || 1);
		};
		propsRef.current = customImageBuilder;
	}, [propsRef]);

	const ImageProps = useNextSanityImage(imageConfig, bannerImage, { imageBuilder: propsRef.current, enableBlurUp: true });

	return <Image {...ImageProps} src={ImageProps.src} layout="responsive" loading="lazy" />;
}

ImageOptimized.dataHooks = useSiteConfig;

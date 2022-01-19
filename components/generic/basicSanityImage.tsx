import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { useNextSanityImage, UseNextSanityImageBuilder } from 'next-sanity-image';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { useCallback, useMemo } from 'react';
import { basicClient } from '../../sanity/sanityClient';

export interface BaseProps extends Omit<ImageProps, 'src' | 'width' | 'height' | 'alt' | 'layout'> {
	src: SanityImageSource;
	width: number;
	layout: 'fill' | 'fixed' | 'intrinsic' | 'responsive';
	alt?: string;
	omitAlt?: true;
}

interface FixedProps extends BaseProps {
	height: number;
}

interface AspectProps extends BaseProps {
	aspectRatio: string;
}

export type Props = FixedProps | AspectProps;

export function isAspectProps(props: Props): props is AspectProps {
	return typeof (props as AspectProps)?.aspectRatio === 'string';
}

export default function SanityImage(props: Props) {
	const { src, alt: altText, omitAlt, width, ...rest } = props;

	const alt = useMemo(() => {
		if (omitAlt) {
			return '';
		}

		if (!altText || altText.length === 0) {
			throw new Error('Must provide alt text unless explicitly setting omitAlt');
		}

		return altText;
	}, [altText, omitAlt]);

	const calculatedAspectRatio = useMemo(() => {
		if (isAspectProps(props)) {
			const { aspectRatio } = props;
			const [w, h] = aspectRatio.trim().split('/');
			return parseInt(w, 10) / parseInt(h, 10);
		}
		const { height } = props;
		return width / height;
	}, [props, width]);

	const imageBuilder: UseNextSanityImageBuilder = useCallback(
		(imageUrlBuilder, { width: rWidth, originalImageDimensions: { width: originalWidth, height: originalHeight } }) => {
			const w = rWidth ?? width;
			const h = Math.round(w / calculatedAspectRatio);

			return imageUrlBuilder.width(w).rect(0, 0, originalWidth, originalHeight).height(h).fit('fillmax').format('webp');
		},
		[calculatedAspectRatio, width]
	);

	const imageProps = useNextSanityImage(basicClient, src, {
		imageBuilder
	});

	const combinedProps = {
		...rest,
		...imageProps
	};

	// eslint-disable-next-line react/jsx-props-no-spreading
	return <Image alt={alt} {...combinedProps} />;
}

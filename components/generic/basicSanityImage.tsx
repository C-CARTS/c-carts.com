import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { useNextSanityImage, UseNextSanityImageBuilder } from 'next-sanity-image';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { useCallback, useMemo } from 'react';
import { basicClient } from '../../sanity/sanityClient';

/* It's defining the props that are required for the SanityImage component. */
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
	aspectratio: string;
}

export type Props = FixedProps | AspectProps;

/**
 * It checks if the props object has an aspectratio property.
 * @param {Props} props - Props
 * @returns A boolean value.
 */
export function isAspectProps(props: Props): props is AspectProps {
	return typeof (props as AspectProps)?.aspectratio === 'string';
}

/**
 * It takes a bunch of props and returns an image
 * @param {Props} props - Props
 */
export default function SanityImage(props: Props) {
	const { src, alt: altText, omitAlt, width, ...rest } = props;

	/* It's a memoization helper that makes sure that the alt text is only calculated once. */
	const alt = useMemo(() => {
		if (omitAlt) {
			return '';
		}

		if (!altText || altText.length === 0) {
			throw new Error('Must provide alt text unless explicitly setting omitAlt');
		}

		return altText;
	}, [altText, omitAlt]);

	/* It's a memoization helper that makes sure that the aspect ratio is only calculated once. */
	const calculatedAspectRatio = useMemo(() => {
		if (isAspectProps(props)) {
			const { aspectratio } = props;
			const [w, h] = aspectratio.trim().split('/');
			return parseInt(w, 10) / parseInt(h, 10);
		}
		const { height } = props;
		return width / height;
	}, [props, width]);

	/* It's a memoization helper that makes sure that the aspect ratio is only calculated once. */
	const imageBuilder: UseNextSanityImageBuilder = useCallback(
		(imageUrlBuilder, { width: rWidth, originalImageDimensions: { width: originalWidth, height: originalHeight } }) => {
			const w = rWidth ?? width;
			const h = Math.round(w / calculatedAspectRatio);

			return imageUrlBuilder.width(w).rect(0, 0, originalWidth, originalHeight).height(h).fit('fill').format('webp');
		},
		[calculatedAspectRatio, width]
	);

	/* It's using the `useNextSanityImage` hook to get the image props. */
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

/* eslint-disable @next/next/no-img-element */
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { useNextSanityImage } from 'next-sanity-image';
import Image, { ImageProps } from 'next/image';
import { FC } from 'react';
import { imageClient } from '../../sanity/sanityClient';

interface Props extends Omit<ImageProps, 'src'> {
	img: SanityImageSource;
}

const SanityImage: FC<Props> = ({ img, ...rest }: Props) => {
	const imageProps = useNextSanityImage(imageClient, img);
	if (imageProps?.src) {
		// eslint-disable-next-line react/jsx-props-no-spreading
		return <Image {...imageProps} {...rest} />;
	}
	return null;
};

export default SanityImage;

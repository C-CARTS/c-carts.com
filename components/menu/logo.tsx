/* eslint-disable @next/next/no-img-element */
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { ImageProps } from 'next/image';
import { FC } from 'react';
import SanityImage from '../generic/sanityImage';

interface Props extends Omit<ImageProps, 'src'> {
	logo: SanityImageSource | undefined;
}

const Logo: FC<Props> = ({ logo }: Props) => {
	if (logo) {
		return <SanityImage img={logo} layout="intrinsic" width={110} height={55} alt="" />;
	}
	return null;
};

export default Logo;

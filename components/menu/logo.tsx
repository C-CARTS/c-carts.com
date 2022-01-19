/* eslint-disable @next/next/no-img-element */
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { ImageProps } from 'next/image';
import styled from 'styled-components';
import SanityImage from '../generic/basicSanityImage';

const LogoWrap = styled.div`
	margin: 1rem 0;
`;

interface Props extends Omit<ImageProps, 'src'> {
	logo: SanityImageSource | undefined;
}

export default function Logo({ logo }: Props) {
	if (logo) {
		return (
			<LogoWrap>
				<SanityImage src={logo} layout="intrinsic" width={110} height={55} omitAlt />
			</LogoWrap>
		);
	}
	return null;
}

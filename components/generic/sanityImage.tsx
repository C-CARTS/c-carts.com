import { ImageWithAlt } from '@c-carts/cms';
import BasicSanityImage, { BaseProps } from './basicSanityImage';

interface SharedProps extends Omit<BaseProps, 'src' | 'omitAlt' | 'alt'> {
	src: ImageWithAlt;
}

interface FixedProps extends SharedProps {
	height: number;
}

interface AspectProps extends SharedProps {
	aspectratio: string;
}

export type Props = FixedProps | AspectProps;

export default function SanityImage({ src: { asset, alt, emptyAlt }, ...rest }: Props) {
	// eslint-disable-next-line react/jsx-props-no-spreading
	return <BasicSanityImage src={asset} alt={alt} omitAlt={emptyAlt || undefined} {...rest} />;
}

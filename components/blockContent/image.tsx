import { ImageSection } from '@c-carts/cms';
import SanityImage from '../generic/sanityImage';

interface Props {
	block: ImageSection;
}

export default function ImageComponent({ block: { image, aspectRatio } }: Props) {
	return <SanityImage src={image} aspectRatio={aspectRatio || '4/3'} width={1200} layout="responsive" />;
}

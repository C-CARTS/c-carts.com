import { FC } from 'react';
import { ImageSection } from '../../sanity/schema';

interface Props {
	block: ImageSection;
}

const ImageComponent: FC<Props> = () => {
	return <p>Image</p>;
};

export default ImageComponent;

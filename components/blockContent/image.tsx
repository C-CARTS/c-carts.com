import { FC, useEffect, useState } from 'react';
import uuidv4 from '../../helpers/uuid';
import PortableText from '../../sanity/portableText';
import { ImageSection } from '../../sanity/schema';
import SanityImage from '../generic/sanityImage';

interface Props {
	block: ImageSection;
}

const ImageComponent: FC<Props> = ({ block: { text, image } }: Props) => {
	const [uuid, setUuid] = useState<string>('');
	useEffect(() => {
		setUuid(uuidv4());
	}, []);
	const figCaptId = `figcapt-${uuid}`;

	if (image) {
		const { alt, caption } = image;
		const hasFigCaption = text || caption;

		// eslint-disable-next-line react/jsx-props-no-spreading
		const img = <SanityImage alt={alt} img={image} layout="intrinsic" {...(hasFigCaption ? { 'aria-describedby': figCaptId } : {})} />;

		if (hasFigCaption) {
			return (
				<figure>
					{img}
					<figcaption className="sr" id={figCaptId}>
						{text ? <PortableText blocks={text} /> : caption}
					</figcaption>
				</figure>
			);
		}
		return <div className="standalone-img">{img}</div>;
	}
	return null;
};

export default ImageComponent;

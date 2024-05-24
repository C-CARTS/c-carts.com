import type { Image } from "sanity";

type ImageWithAlt = Image & {
	_type: "imageWithAlt";
	alt: string;
	decorative: boolean;
};

export default ImageWithAlt;

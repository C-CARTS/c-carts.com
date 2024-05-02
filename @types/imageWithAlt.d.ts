import type { Image } from "sanity";

type ImageWithAlt = Image & {
	alt: string;
	decorative: boolean;
};

export default ImageWithAlt;

import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import createImageUrlBuilder from '@sanity/image-url';
import config from './sanityConfig';

const urlFor = (source: SanityImageSource) => createImageUrlBuilder(config).image(source);

export default urlFor;

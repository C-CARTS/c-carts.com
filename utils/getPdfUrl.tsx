import { Maps } from '@c-carts/cms';
import { getFile } from '@sanity/asset-utils';
import config from '../sanity/sanityConfig';

const getPdfUrl = (input: Maps['routePdfs']) => {
	const filedData = getFile(input, config);
	const {
		asset: { url }
	} = filedData;
	if (url) {
		return url;
	}
	return null;
};

export default getPdfUrl;

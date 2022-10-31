import { Routes } from '@c-carts/cms';
import { getFile } from '@sanity/asset-utils';
import config from '../sanity/sanityConfig';

const getPdfUrl = (input: Routes['routePdfs']) => {
	const filedData = getFile(input, config);

	const {
		asset: { url }
	} = filedData;
	if (url) {
		return url;
	}
	return '';
};

export default getPdfUrl;

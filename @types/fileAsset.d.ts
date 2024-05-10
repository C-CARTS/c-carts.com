import { SanityDocument } from "next-sanity";

type FileAsset = SanityDocument & {
	uploadId: string;
	assetId: string;
	extension: string;
	size: number;
	mimeType: string;
	sha1hash: string;
	url: string;
	path: string;
	originalFilename: string;
	_type: "sanity.fileAsset";
};

export default FileAsset;

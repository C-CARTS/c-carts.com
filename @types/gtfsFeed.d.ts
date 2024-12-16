import { SanityAssetDocument, SanityDocument } from "next-sanity";

type GtfsFeed = SanityDocument & {
	type: "gtfsFeed";
	feed: {
		asset: SanityAssetDocument & {
			_type: "sanity.fileAsset";
		};
	};
};

export default GtfsFeed;

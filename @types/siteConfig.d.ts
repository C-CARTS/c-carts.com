import type { SanityDocument } from "sanity";
import ImageWithAlt from "./imageWithAlt";

type SiteConfig = SanityDocument & {
	_type: "siteConfig";
	title: string;
	shortTitle: string;
	bannerImage: ImageWithAlt;
	url: string;
	lang: string;
	brandLogo: ImageWithAlt;
	address: string;
	phone: string;
};

export default SiteConfig;

import type { Metadata } from "next";
import type Page from "../@types/page";
import { getImage, getSiteConfig } from "../api";
import { globalEnv } from "../env/global";
import buildUrl from "./sanityImageUrl";

const baseUrl = globalEnv.NEXT_PUBLIC_BASE_URL;

export default async function generatePageMetadata(page: Page, isHomepage: boolean): Promise<Metadata> {
	const { shortTitle: siteTitle } = await getSiteConfig();

	if (page === null) {
		return {};
	}

	const {
		title: pageTitle,
		openGraphImage,
		description,
		slug: { current: slug },
	} = page;
	const asset = openGraphImage?.asset;
	const alt = openGraphImage?.alt ?? "";
	const title = `${siteTitle} | ${pageTitle}`;

	let metadata: Metadata = {
		title,
		description,
	};

	if (asset) {
		const { _ref: id } = asset;
		const { url } = await getImage(id);
		const src = buildUrl(url, 1200, 630, 1);

		metadata = {
			...metadata,
			twitter: {
				card: "summary_large_image",
				description,
				title,
				images: {
					alt,
					url: src,
					width: "1200",
					height: "630",
				},
			},
			openGraph: {
				type: "website",
				title,
				description,
				siteName: siteTitle,
				url: isHomepage ? `${baseUrl}/` : `${baseUrl}/${slug}`,
				images: [
					{
						url: src,
						width: "1200",
						height: "630",
						alt,
					},
				],
			},
		};
	}

	return metadata;
}

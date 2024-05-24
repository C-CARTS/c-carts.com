import { Metadata } from "next";
import Page from "../@types/page";
import { getImage, getSiteConfig } from "../api";
import buildUrl from "./sanityImageUrl";
import throwError from "./throwError";

const baseUrl =
	process.env.NEXT_PUBLIC_BASE_URL ?? throwError("No NEXT_PUBLIC_BASE_URL");

export default async function generatePageMetadata(
	page: Page,
	isHomepage: boolean,
): Promise<Metadata> {
	const { shortTitle: siteTitle } = await getSiteConfig();
	const {
		title: pageTitle,
		openGraphImage: { asset, alt },
		description,
		slug: { current: slug },
	} = page;
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

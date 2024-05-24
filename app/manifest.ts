import { MetadataRoute } from "next";
import { getSiteConfig } from "../helpers/api";

type FormFactorManifestType = MetadataRoute.Manifest & {
	screenshots: {
		src: string;
		sizes: string;
		type: string;
		form_factor: "wide" | "narrow";
	}[];
};

export default async function manifest(): Promise<FormFactorManifestType> {
	const { shortTitle, title } = await getSiteConfig();

	return {
		name: title,
		short_name: shortTitle,
		description: title,
		start_url: "/",
		display: "standalone",
		background_color: "#fff",
		theme_color: "#3feee6",
		screenshots: [
			{
				src: "/images/screenshot-wide.jpeg",
				sizes: "3501x1823",
				type: "	image/jpeg",
				form_factor: "wide",
			},
			{
				src: "/images/screenshot-mobile.jpeg",
				sizes: "585x1262",
				type: "	image/jpeg",
				form_factor: "narrow",
			},
		],
		icons: [
			{
				src: "/images/icon-48.png",
				sizes: "48x48",
				type: "image/png",
			},
			{
				src: "/images/icon-72.png",
				sizes: "72x72",
				type: "image/png",
			},
			{
				src: "/images/icon-96.png",
				sizes: "96x96",
				type: "image/png",
			},
			{
				src: "/images/icon-128.png",
				sizes: "128x128",
				type: "image/png",
			},
			{
				src: "/images/icon-144.png",
				sizes: "144x144",
				type: "image/png",
			},
			{
				src: "/images/icon-152.png",
				sizes: "152x152",
				type: "image/png",
			},
			{
				src: "/images/icon-192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/images/icon-256.png",
				sizes: "256x256",
				type: "image/png",
			},
			{
				src: "/images/icon-384.png",
				sizes: "384x384",
				type: "image/png",
			},
			{
				src: "/images/icon-512.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/images/maskable_icon-512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
	};
}

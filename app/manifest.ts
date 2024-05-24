import { MetadataRoute } from "next";
import { getSiteConfig } from "../helpers/api";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
	const { shortTitle, title } = await getSiteConfig();

	return {
		name: title,
		short_name: shortTitle,
		description: title,
		start_url: "/",
		display: "standalone",
		background_color: "#fff",
		theme_color: "#3feee6",
		icons: [
			{
				src: "/icons/icon-48x48.png",
				sizes: "48x48",
				type: "image/png",
			},
			{
				src: "/icons/icon-72x72.png",
				sizes: "72x72",
				type: "image/png",
			},
			{
				src: "/icons/icon-96x96.png",
				sizes: "96x96",
				type: "image/png",
			},
			{
				src: "/icons/icon-128x128.png",
				sizes: "128x128",
				type: "image/png",
			},
			{
				src: "/icons/icon-144x144.png",
				sizes: "144x144",
				type: "image/png",
			},
			{
				src: "/icons/icon-152x152.png",
				sizes: "152x152",
				type: "image/png",
			},
			{
				src: "/icons/icon-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/icons/icon-256x256.png",
				sizes: "256x256",
				type: "image/png",
			},
			{
				src: "/icons/icon-384x384.png",
				sizes: "384x384",
				type: "image/png",
			},
			{
				src: "/icons/icon-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/icons/maskable_icon-512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
	};
}

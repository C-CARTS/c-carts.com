import type { NextConfig } from "next";
import { studioRewrites } from "./lib/studio-routing";

const nextConfig: NextConfig = {
	images: {
		dangerouslyAllowSVG: true,
		qualities: [70, 75],
		remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" }],
	},
	async rewrites() {
		return { beforeFiles: studioRewrites(process.env.STUDIO_ORIGIN), afterFiles: [], fallback: [] };
	},
};

export default nextConfig;

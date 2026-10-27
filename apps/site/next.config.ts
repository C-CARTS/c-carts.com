import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { studioRedirects } from "./lib/studio-routing";

const nextConfig = (phase: string): NextConfig => ({
	images: {
		dangerouslyAllowSVG: true,
		qualities: [70, 75],
		remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" }],
	},
	async redirects() {
		return studioRedirects(process.env.STUDIO_ORIGIN, {
			permanent: phase !== PHASE_DEVELOPMENT_SERVER,
			...(process.env.NEXT_PUBLIC_BASE_URL ? { siteOrigin: process.env.NEXT_PUBLIC_BASE_URL } : {}),
		});
	},
});

export default nextConfig;

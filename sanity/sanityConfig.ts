const projectId = process.env.NEXT_PUBLIC_SANITY_ID ?? 'No-NEXT-PUBLIC-SANITY-ID';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'No-NEXT-PUBLIC-SANITY-DATASET';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? 'No-NEXT-PUBLIC-SANITY-API-VERSION';
const previewMode = process.env.NEXT_PUBLIC_SANITY_PREVIEW === 'true';
const useCdn = process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'false';
const config = {
	projectId,
	dataset,
	previewMode,
	useCdn,
	apiVersion,
	fetch
};

export default config;

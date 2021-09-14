const projectId = process.env.NEXT_PUBLIC_SANITY_ID ?? 'No NEXT_PUBLIC_SANITY_ID';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'No NEXT_PUBLIC_SANITY_DATASET';
const previewMode = process.env.NEXT_PUBLIC_SANITY_PREVIEW === 'true';
const useCdn = process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true';

const config = {
	projectId,
	dataset,
	previewMode,
	useCdn,
	fetch
};

export default config;

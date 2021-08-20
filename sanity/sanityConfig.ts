const projectId = process.env.SANITY_ID ?? 'No SANITY_ID';
const dataset = process.env.SANITY_DATASET ?? 'No SANITY_DATASET';
const previewMode = process.env.SANITY_PREVIEW === 'true';
const useCdn = process.env.SANITY_USE_CDN === 'true';

export default {
	projectId,
	dataset,
	previewMode,
	useCdn,
	fetch
};

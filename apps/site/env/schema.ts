import { z } from "zod";

const documentId = z.string().trim().min(1);
export const PublicEnvSchema = z.object({
	NEXT_PUBLIC_BASE_URL: z.url({ protocol: /^https?$/ }),
	NEXT_PUBLIC_MAX_IMAGE_SIZE: z.coerce.number().int().positive(),
});

export const ServerEnvSchema = z.object({
	NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().regex(/^[a-z0-9-]+$/),
	NEXT_PUBLIC_SANITY_DATASET: z.string().regex(/^[a-z0-9_-]+$/),
	NEXT_PUBLIC_SANITY_API_VERSION: z.iso.date(),
	NEXT_PUBLIC_SETTINGS_DOC_NAME: documentId,
	NEXT_PUBLIC_HOMEPAGE_DOC_NAME: documentId,
	NEXT_PUBLIC_JOBS_PAGE_DOC_NAME: documentId,
	NEXT_PUBLIC_NEWS_PAGE_DOC_NAME: documentId,
	NEXT_PUBLIC_PERFORMANCE_PAGE_DOC_NAME: documentId,
	SANITY_WEBHOOK_SECRET: z.string().trim().min(1),
	STATIC_SLUGS: z
		.string()
		.min(1)
		.transform((value) =>
			value
				.split(",")
				.map((slug) => slug.trim())
				.filter(Boolean),
		)
		.pipe(z.array(z.string()).min(1)),
	STUDIO_ORIGIN: z.url(),
});

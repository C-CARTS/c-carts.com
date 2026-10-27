export const DATA_CACHE_TTL_SECONDS = 14_400;

export function cacheOptions(tags: string[], development = process.env.NODE_ENV === "development") {
	return development ? { cache: "no-store" as const } : { next: { revalidate: DATA_CACHE_TTL_SECONDS, tags } };
}

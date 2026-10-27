import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { z } from "zod";

const PayloadSchema = z.object({
	_id: z.string().min(1),
	_type: z.string().min(1),
	slug: z.object({ current: z.string() }).optional(),
});

export async function readWebhook(request: Request, secret: string) {
	const signature = request.headers.get(SIGNATURE_HEADER_NAME);
	const raw = await request.text();
	if (!signature || !(await isValidSignature(raw, signature, secret.trim()))) {
		return { status: 401 as const, error: "Invalid signature" };
	}
	let parsed: unknown;
	try {
		parsed = JSON.parse(raw);
	} catch {
		return { status: 400 as const, error: "Invalid JSON" };
	}
	const payload = PayloadSchema.safeParse(parsed);
	if (!payload.success) return { status: 400 as const, error: "Invalid webhook payload" };
	return { status: 200 as const, body: payload.data };
}

export function invalidationTargets(body: z.infer<typeof PayloadSchema>, homepageId: string, settingsId: string) {
	const tags: string[] = [];
	const paths: string[] = [];
	const slug = body.slug?.current;
	switch (body._type) {
		case "page":
			tags.push(`page-${body._id}`);
			if (body._id === homepageId) paths.push("/");
			if (slug) {
				tags.push(`page-${slug}`);
				if (slug !== "/") paths.push(`/${slug}`);
			}
			break;
		case "news":
		case "job": {
			const group = body._type === "job" ? "jobs" : "news";
			tags.push(group);
			if (slug) {
				tags.push(`${group}-${slug}`);
				paths.push(`/${group}/${slug}`);
			}
			break;
		}
		case "gtfsFeed":
		case "performance":
			tags.push(body._type);
			break;
		case "siteConfig":
			tags.push(settingsId);
			break;
		case "navItem":
			tags.push("nav");
			break;
		case "sanity.imageAsset":
			tags.push("images");
			break;
		case "sanity.fileAsset":
			tags.push("files", "gtfsFeed");
			break;
	}
	return { tags, paths };
}

export const waitForContentLake = () => new Promise<void>((resolve) => setTimeout(resolve, 3000));

import { revalidatePath, revalidateTag } from "next/cache";
import { serverEnv } from "../../../env/server";
import { invalidationTargets, readWebhook, waitForContentLake } from "../../../lib/sanity/webhook";

export async function POST(request: Request) {
	try {
		const result = await readWebhook(request, serverEnv.SANITY_WEBHOOK_SECRET);
		if (result.status !== 200) {
			console.warn("Webhook rejected", { status: result.status, reason: result.error });
			return new Response(result.error, { status: result.status });
		}
		const { tags, paths } = invalidationTargets(
			result.body,
			serverEnv.NEXT_PUBLIC_HOMEPAGE_DOC_NAME,
			serverEnv.NEXT_PUBLIC_SETTINGS_DOC_NAME,
		);
		if (!tags.length) return new Response(null, { status: 204 });
		await waitForContentLake();
		for (const tag of tags) revalidateTag(tag, { expire: 0 });
		for (const path of paths) revalidatePath(path);
		console.info("Sanity content invalidated", { type: result.body._type, tags, paths });
		return Response.json({ revalidated: true });
	} catch (error) {
		console.error("Sanity webhook revalidation failed", error);
		return new Response("Error revalidating", { status: 500 });
	}
}

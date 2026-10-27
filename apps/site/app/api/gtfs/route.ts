import { getGtfsFeed } from "../../../api";
import { gtfsResponse } from "../../../lib/sanity/gtfs";

export async function GET() {
	try {
		const feed = await getGtfsFeed();
		return await gtfsResponse(feed.feed?.asset?.url);
	} catch (error) {
		console.error("GTFS download failed", error);
		return Response.json({ error: "Unable to download GTFS feed" }, { status: 500 });
	}
}

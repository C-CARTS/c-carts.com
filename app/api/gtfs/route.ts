import { NextResponse } from "next/server";
import { getGtfsFeed } from "../../../api";
import throwError from "../../../helpers/throwError";

export async function GET() {
	try {
		// Extract the URL of the GTFS feed file
		const feed = await getGtfsFeed();

		console.log("feed", feed);

		const {
			feed: {
				asset: { url },
			},
		} = feed;

		console.log("url", url);

		if (!url) {
			throwError("GTFS feed URL is missing or undefined");
		}

		// Fetch the ZIP file from the remote URL
		const response = await fetch(url);
		if (!response.ok) {
			throwError(`Failed to fetch GTFS feed file. Status: ${response.status}`);
		}

		// Get the file as a Blob or ArrayBuffer
		const fileBuffer = await response.arrayBuffer();

		// Return the file as a response with proper headers
		return new NextResponse(fileBuffer, {
			headers: {
				"Content-Disposition": "attachment; filename=gtfs.zip",
				"Content-Type": "application/zip",
			},
		});
	} catch (error) {
		// Handle any errors gracefully and return a 500 error response
		return new NextResponse(
			JSON.stringify({ error: (error as Error)?.message }),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}
}

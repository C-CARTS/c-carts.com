export async function gtfsResponse(url: string | undefined, fetchFile = fetch) {
	if (!url) throw new Error("GTFS feed URL is missing");
	const response = await fetchFile(url, { cache: "no-store" });
	if (!response.ok) throw new Error(`GTFS upstream returned ${response.status}`);
	return new Response(await response.arrayBuffer(), {
		headers: {
			"Content-Disposition": "attachment; filename=gtfs.zip",
			"Content-Type": "application/zip",
		},
	});
}

import "server-only";

export default function buildUrl(
	url: string,
	width: number,
	height: number,
	deviceScale: number,
): string {
	const params = new URLSearchParams();

	params.append("auto", "format");
	params.append("fit", "crop");
	params.append("dpr", deviceScale.toString());
	params.append("h", height.toString());
	params.append("w", width.toString());
	params.append("crop", "entropy");

	return `${url}?${params.toString()}`;
}

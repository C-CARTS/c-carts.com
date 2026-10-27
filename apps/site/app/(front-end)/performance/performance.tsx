import "server-only";
import type PerformanceType from "../../../@types/performance";
import { getFile } from "../../../api";

interface Props {
	performance: PerformanceType;
}

export default async function Performance({ performance: { year, quarter, file } }: Props) {
	if (!file) return null;
	const asset = file.asset;
	if (!asset) throw new Error("Performance report has no file asset");
	const { url } = await getFile(asset._ref);

	return (
		<li>
			<a href={url}>
				Download Report for Q{quarter} {year}
			</a>
		</li>
	);
}

import "server-only";
import PerformanceType from "../../../@types/performance";
import { getFile } from "../../../api";

interface Props {
	performance: PerformanceType;
}

export default async function Performance({
	performance: {
		year,
		quarter,
		file: { asset },
	},
}: Props) {
	const { url } = await getFile(asset._ref);

	return (
		<li>
			<a href={url}>
				Download Report for Q{quarter} {year}
			</a>
		</li>
	);
}

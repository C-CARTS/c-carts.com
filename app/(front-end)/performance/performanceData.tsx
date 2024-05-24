import "server-only";
import { getPerformanceData } from "../../../api";
import Year from "./year";
export default async function PerformanceData() {
	const performanceData = await getPerformanceData();

	const years = performanceData
		.map(({ year }) => year)
		.filter((year, index, array) => array.indexOf(year) === index)
		.sort((a, b) => b - a);

	return (
		<>
			<h2>Performance Data</h2>
			{years.map((year) => (
				<Year
					key={year}
					year={year}
					performance={performanceData.filter((p) => p.year === year)}
				/>
			))}
		</>
	);
}

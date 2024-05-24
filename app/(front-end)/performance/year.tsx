import "server-only";
import PerformanceType from "../../../@types/performance";
import Performance from "./performance";

interface Props {
	year: number;
	performance: PerformanceType[];
}

export default function Year({ year, performance }: Props) {
	return (
		<div>
			<h3>{year}</h3>
			<ul>
				{performance
					.sort(({ quarter: qa }, { quarter: qb }) => qb - qa)
					.map((performance) => (
						<Performance key={performance._id} performance={performance} />
					))}
			</ul>
		</div>
	);
}

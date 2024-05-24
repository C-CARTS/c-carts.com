import "server-only";
import { getPerformancePage } from "../../../api";
import SanityPage from "../../../components/sanityPage";
import PerformanceData from "./performanceData";

export default async function Home() {
	const performancePage = await getPerformancePage();
	return (
		<SanityPage page={performancePage}>
			<PerformanceData />
		</SanityPage>
	);
}

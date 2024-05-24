import "server-only";
import SanityPage from "../../../components/sanityPage";
import { getPerformancePage } from "../../../helpers/api";
import PerformanceData from "./performanceData";

export default async function Home() {
	const performancePage = await getPerformancePage();
	return (
		<SanityPage page={performancePage}>
			<PerformanceData />
		</SanityPage>
	);
}

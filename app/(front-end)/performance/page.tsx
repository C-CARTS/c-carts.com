import "server-only";
import { getPerformancePage } from "../../../api";
import SanityPage from "../../../components/sanityPage";
import PerformanceData from "./performanceData";

export const revalidate = 14_400; // 4 hours

export default async function Home() {
	const performancePage = await getPerformancePage();
	return (
		<SanityPage page={performancePage}>
			<PerformanceData />
		</SanityPage>
	);
}

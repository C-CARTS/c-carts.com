import SanityPage from "../../components/sanityPage";
import { getHomepage } from "../../helpers/api";

export default async function Home() {
	const homepage = await getHomepage();
	return <SanityPage page={homepage} isHomepage />;
}

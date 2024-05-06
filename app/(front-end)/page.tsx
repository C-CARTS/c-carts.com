import { getHomepage } from "../../helpers/api";
import SanityPage from "./sanityPage";

export default async function Home() {
	const homepage = await getHomepage();
	return <SanityPage page={homepage} />;
}

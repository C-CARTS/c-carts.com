import { Metadata } from "next";
import "server-only";
import SanityPage from "../../components/sanityPage";
import { getHomepage } from "../../helpers/api";
import generatePageMetadata from "../../helpers/generatePageMetadata";

export async function generateMetadata(): Promise<Metadata> {
	const homepage = await getHomepage();
	const metadata = await generatePageMetadata(homepage, true);
	return metadata;
}

export default async function Home() {
	const homepage = await getHomepage();
	return <SanityPage page={homepage} isHomepage />;
}

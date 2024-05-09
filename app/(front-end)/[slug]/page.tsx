import "server-only";
import SanityPage from "../../../components/sanityPage";
import { getPage } from "../../../helpers/api";

interface Props {
	params: {
		slug: string;
	};
}

export default async function Page({ params: { slug } }: Props) {
	const page = await getPage(slug);

	if (!page) {
		return null;
	}

	return <SanityPage page={page} />;
}

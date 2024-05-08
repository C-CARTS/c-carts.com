import SanityBlockContent from "../(sanityBlock)/sanityBlockContent";
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

	return (
		<>
			<h1>{page.title}</h1>
			<SanityBlockContent content={page.content} />
		</>
	);
}

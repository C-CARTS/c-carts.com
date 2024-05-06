import { getPage } from "../../../helpers/api";
import SanityBlockContent from "../sanityBlockContent";

interface Props {
	params: {
		slug: string;
	};
}

export default async function Page({ params: { slug } }: Props) {
	const { title, content } = await getPage(slug);
	return (
		<>
			<h1>{title}</h1>
			<SanityBlockContent content={content} />
		</>
	);
}

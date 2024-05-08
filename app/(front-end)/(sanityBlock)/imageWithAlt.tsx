import ImageWithAlt from "../../../@types/imageWithAlt";
import { getImage } from "../../../helpers/api";
import throwError from "../../../helpers/throwError";

interface Props {
	value: ImageWithAlt;
}

export default async function Table({ value }: Props) {
	const { alt, decorative, asset } = value;
	const image = await getImage(
		asset?._ref ?? throwError("asset._ref is missing"),
	);

	console.log("img", image);

	const altValue = decorative ? "" : alt;

	return <p>foo</p>;
}

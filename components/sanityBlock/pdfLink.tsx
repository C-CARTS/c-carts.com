import { PortableTextMarkComponentProps } from "@portabletext/react";
import { TypedObject } from "sanity";
import "server-only";
import { getFile } from "../../api";

type File = TypedObject & {
	file: {
		_type: "file";
		asset: {
			_ref: string;
			_type: "reference";
		};
	};
};

export default async function PdfLink({
	value,
	children,
}: PortableTextMarkComponentProps<File>) {
	if (!value) {
		return <>{children}</>;
	}

	const {
		file: {
			asset: { _ref: fileId },
		},
	} = value;

	const { url } = await getFile(fileId);

	return <a href={url}>{children}</a>;
}

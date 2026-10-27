import type { PortableTextMarkComponentProps } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";
import "server-only";
import type { PdfLinkFile } from "@c-carts/types";
import { getFile } from "../../api";

type File = TypedObject & {
	file?: PdfLinkFile;
};

export default async function PdfLink({ value, children }: PortableTextMarkComponentProps<File>) {
	if (!value) {
		return <>{children}</>;
	}

	const fileId = value.file?.asset?._ref;
	if (!fileId) throw new Error("PDF link is missing its file asset");

	const { url } = await getFile(fileId);

	return <a href={url}>{children}</a>;
}

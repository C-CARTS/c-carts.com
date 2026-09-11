import type { File } from "sanity";

type FileAttachment = File & {
	_type: "fileAttachment";
	_key: string;
	title?: string;
};

export default FileAttachment;

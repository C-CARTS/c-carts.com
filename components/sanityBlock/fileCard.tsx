import { MdAttachFile } from "react-icons/md";
import "server-only";
import FileAttachment from "../../@types/fileAttachment";
import { getFile } from "../../api";
import throwError from "../../helpers/throwError";
import styles from "./fileCard.module.css";

interface Props {
	value: FileAttachment;
}

function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	const units = ["KB", "MB", "GB"];
	let value = bytes;
	let unit = -1;
	do {
		value /= 1024;
		unit += 1;
	} while (value >= 1024 && unit < units.length - 1);
	return `${value >= 10 ? Math.round(value) : value.toFixed(1)} ${units[unit]}`;
}

export default async function FileCard({ value }: Props) {
	const { title, asset } = value;

	const file = await getFile(
		asset?._ref ?? throwError("asset._ref is missing"),
	);

	// this should never happen
	if (!file) {
		throwError("File not found");
	}

	const { url, originalFilename, extension, size } = file;
	const label = title ?? originalFilename;

	return (
		<div className={styles.card}>
			<MdAttachFile className={styles.icon} aria-hidden="true" />
			<div className={styles.details}>
				<a className={styles.link} href={url}>
					{label}
				</a>
				<span className={styles.meta}>
					{extension.toUpperCase()} file, {formatBytes(size)}
				</span>
			</div>
		</div>
	);
}

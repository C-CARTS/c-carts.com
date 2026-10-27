import "server-only";
import { sanitizeTimetable } from "../../../lib/sanitize-timetable";
import styles from "./timeTable.module.css";
import "./timeTableGlobal.css";

interface Props {
	code: string;
}

export default function TimeTable({ code }: Props) {
	// biome-ignore lint/security/noDangerouslySetInnerHtml: The HTML is sanitized to the timetable allowlist before rendering.
	return <div className={styles.tableContainer} dangerouslySetInnerHTML={{ __html: sanitizeTimetable(code) }} />;
}

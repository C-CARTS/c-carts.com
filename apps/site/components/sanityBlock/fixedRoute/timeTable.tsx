import "server-only";
import styles from "./timeTable.module.css";
import "./timeTableGlobal.css";

interface Props {
	code: string;
}

export default function TimeTable({ code }: Props) {
	// biome-ignore lint/security/noDangerouslySetInnerHtml: Timetable markup is authored by trusted Sanity editors; preserve its existing HTML contract.
	return <div className={styles.tableContainer} dangerouslySetInnerHTML={{ __html: code }} />;
}

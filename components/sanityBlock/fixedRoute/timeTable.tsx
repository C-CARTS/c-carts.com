import "server-only";
import styles from "./timeTable.module.css";
import "./timeTableGlobal.css";

interface Props {
	code: string;
}

export default function TimeTable({ code }: Props) {
	return (
		<div
			className={styles.tableContainer}
			dangerouslySetInnerHTML={{ __html: code }}
		/>
	);
}

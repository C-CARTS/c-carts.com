import "server-only";
import type { Table as TableType } from "../../@types/block";
import styles from "./table.module.css";

interface Props {
	value: TableType;
}

export default function Table({ value: { rows } }: Props) {
	return (
		<div className={styles.tableContainer}>
			<table>
				<thead key="thead">
					<tr key="tr">
						{rows[0].cells.map((cell, index) => (
							<th key={`${rows[0]._key}-${index}-${cell}`}>{cell}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.slice(1).map(({ _key, cells }) => (
						<tr key={_key}>
							{cells.map((cell, index) => (
								<td key={`${_key}-${index}-${cell}`}>{cell}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

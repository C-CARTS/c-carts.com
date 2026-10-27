import "server-only";
import type { Table as TableType } from "../../@types/block";
import styles from "./table.module.css";

interface Props {
	value: TableType;
}

export default function Table({ value: { rows } }: Props) {
	const header = rows?.[0];
	if (!header) return null;
	if (!header.cells) throw new Error("Table header has no cells");
	return (
		<div className={styles.tableContainer}>
			<table>
				<thead key="thead">
					<tr key="tr">
						{header.cells.map((cell, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: Sanity stores cells as strings without IDs; repeated values require a position key.
							<th key={`${header._key}-${index}-${cell}`}>{cell}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows?.slice(1).map(({ _key, cells }) => (
						<tr key={_key}>
							{cells?.map((cell, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: Sanity stores cells as strings without IDs; repeated values require a position key.
								<td key={`${_key}-${index}-${cell}`}>{cell}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

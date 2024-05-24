import Link from "next/link";
import { RiFilePdf2Fill } from "react-icons/ri";
import "server-only";
import type FixedRouteType from "../../../@types/fixedRoute";
import { getFile } from "../../../api";
import styles from "./fixedRoute.module.css";
import Map from "./map";
import TimeTable from "./timeTable";

interface Props {
	value: FixedRouteType;
}

export default async function FixedRoute({
	value: {
		pdf: {
			asset: { _ref: ref },
		},
		table: { code },
		image,
	},
}: Props) {
	const { url } = await getFile(ref);
	return (
		<>
			<h2>Schedule</h2>
			<p className={styles.pdfDownload}>
				<RiFilePdf2Fill role="none" />
				<Link href={url}>Download Map and Schedule (PDF)</Link>
			</p>
			<TimeTable code={code} />
			<h2>Map</h2>
			<Map image={image} />
		</>
	);
}

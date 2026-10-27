import Link from "next/link";
import { RiFilePdf2Fill } from "react-icons/ri";
import "server-only";
import type FixedRouteType from "../../../@types/fixedRoute";
import { getFile } from "../../../api";
import styles from "./fixedRoute.module.css";
import RouteMap from "./map";
import TimeTable from "./timeTable";

interface Props {
	value: FixedRouteType;
}

export default async function FixedRoute({
	value: {
		pdf,
		table: { code },
		image,
	},
}: Props) {
	const ref = pdf.asset?._ref;
	if (!ref) throw new Error("Fixed route PDF has no asset");
	if (!code) throw new Error("Fixed route timetable is missing");
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
			<RouteMap image={image} />
		</>
	);
}

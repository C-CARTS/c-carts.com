import { getSiteConfig } from "../../helpers/api";

export default async function Home() {
	const config = await getSiteConfig();
	const { title } = config;
	return <h1>{title}</h1>;
}

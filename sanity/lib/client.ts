import { createClient } from "@sanity/client";
import "server-only";
import { apiVersion, dataset, projectId } from "../env";

const isDev = process.env.NODE_ENV === "development";

export const client = createClient({
	apiVersion,
	dataset,
	projectId,
	useCdn: isDev ? true : false,
});

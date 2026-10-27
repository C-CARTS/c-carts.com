import { createClient } from "@sanity/client";
import "server-only";
import { serverEnv } from "../../env/server";

export const client = createClient({
	apiVersion: serverEnv.NEXT_PUBLIC_SANITY_API_VERSION,
	dataset: serverEnv.NEXT_PUBLIC_SANITY_DATASET,
	projectId: serverEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
	useCdn: process.env.NODE_ENV === "development",
});
